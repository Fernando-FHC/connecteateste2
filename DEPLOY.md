# Deploy do ConnecTea — Backend Flask + MySQL em VPS (AlmaLinux + Docker + Nginx)

Este guia leva o projeto do estado atual (Flask + SQLite, tudo em
`localhost`) até uma API em produção, em containers Docker, com MySQL,
HTTPS via Nginx/Certbot, e o frontend no Vercel apontando para ela.

## Arquitetura final

```
[ Vercel: connec-tea.vercel.app ]  --HTTPS-->  [ Nginx :443 no VPS ]
                                                       |
                                                proxy_pass :8000
                                                       |
                                          [ container "api" (Gunicorn+Flask) ]
                                                       |
                                          [ container "db" (MySQL 8) ]
```

Só o Nginx (portas 80/443) fica exposto à internet. A API (porta 8000) e o
MySQL ficam acessíveis apenas internamente — isso é importante para
segurança e é configurado nos arquivos deste pacote.

> **Pré-requisito que você precisa resolver antes do Passo 6:** um
> domínio ou subdomínio (ex: `api.seudominio.com.br`) com um registro DNS
> tipo **A** apontando para o IP do seu VPS. Sem isso não é possível
> emitir certificado TLS gratuito (Let's Encrypt), e o navegador vai
> bloquear as chamadas do frontend HTTPS (Vercel) para uma API em HTTP
> puro ("mixed content"). Se ainda não tiver um domínio, qualquer
> registrador (ou mesmo um subdomínio gratuito) resolve — só não dá para
> pular essa etapa.

---

## Passo 1 — Preparar o VPS (AlmaLinux)

Conecte por SSH no servidor e atualize o sistema:

```bash
sudo dnf update -y
```

### 1.1 Instalar Docker e Docker Compose

```bash
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

(Opcional, para não precisar de `sudo` em todo comando docker):

```bash
sudo usermod -aG docker $USER
# saia e entre de novo na sessão SSH para o grupo ter efeito
```

### 1.2 Abrir o firewall (firewalld, padrão no AlmaLinux)

Só HTTP e HTTPS precisam ficar públicos — a porta 8000 (API) e 3306
(MySQL) **não** devem ser abertas, pois ficam só na rede interna do
Docker / em `127.0.0.1`.

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 1.3 Instalar Nginx

```bash
sudo dnf install -y nginx
sudo systemctl enable --now nginx
```

### 1.4 Liberar o SELinux para o Nginx fazer proxy reverso

Esse é um detalhe específico de AlmaLinux/RHEL que costuma travar quem
vem do Ubuntu: por padrão o SELinux **bloqueia** o Nginx de fazer
conexões de saída (como o `proxy_pass` para a API). Sem isso, você vai
ver "502 Bad Gateway" mesmo com tudo configurado certo:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

---

## Passo 2 — Enviar o projeto para o VPS

Escolha uma pasta, por exemplo `/opt/connectea`:

```bash
sudo mkdir -p /opt/connectea
sudo chown $USER:$USER /opt/connectea
```

Se o projeto está num repositório Git, clone direto no servidor:

```bash
cd /opt/connectea
git clone <url-do-seu-repositorio> .
```

Caso contrário, envie os arquivos da sua máquina com `scp`:

```bash
scp -r ConnecTea-main/* usuario@IP_DO_VPS:/opt/connectea/
```

Depois, copie os arquivos deste pacote de deploy para dentro do projeto,
mantendo a mesma estrutura de pastas:

- `connectea-backend/app.py` → substitui o `app.py` atual
- `connectea-backend/requirements.txt` → novo
- `connectea-backend/schema_mysql.sql` → novo
- `connectea-backend/Dockerfile` → novo
- `connectea-backend/.dockerignore` → novo
- `connectea-backend/migrar_sqlite_para_mysql.py` → novo (opcional, veja nota no fim)
- `docker-compose.yml` → na raiz do projeto
- `.env.example` → na raiz do projeto

Os arquivos `criar_banco.py` e `migrar_responsavel.py` (específicos do
SQLite) não são mais necessários nesse fluxo — o `schema_mysql.sql` já
cria as tabelas automaticamente quando o container do MySQL sobe pela
primeira vez. Pode deixá-los no repositório para referência histórica ou
remover, como preferir.

---

## Passo 3 — Configurar as variáveis de ambiente

Na raiz do projeto, no VPS:

```bash
cd /opt/connectea
cp .env.example .env
nano .env   # preencha senhas fortes e ajuste ALLOWED_ORIGINS se precisar
chmod 600 .env
```

Garanta que `.env` está no `.gitignore` (o projeto já ignora `*.local` e
`connectea-backend/connectea.db`, mas adicione esta linha também):

```
.env
```

---

## Passo 4 — Subir os containers

```bash
cd /opt/connectea
sudo docker compose up -d --build
sudo docker compose ps
```

Acompanhe os logs até ver o Gunicorn de pé:

```bash
sudo docker compose logs -f api
```

Teste localmente, ainda dentro do VPS:

```bash
curl http://127.0.0.1:8000/api/health
# esperado: {"status":"ok"}
```

---

## Passo 5 — Configurar o Nginx com o domínio

Copie o arquivo de configuração, trocando o domínio de exemplo pelo seu:

```bash
sudo cp deploy/nginx_connectea.conf /etc/nginx/conf.d/connectea.conf
sudo nano /etc/nginx/conf.d/connectea.conf   # ajuste server_name
sudo nginx -t
sudo systemctl reload nginx
```

Teste pelo domínio (ainda em HTTP, antes do certificado):

```bash
curl http://api.seudominio.com.br/api/health
```

---

## Passo 6 — Emitir o certificado HTTPS (Let's Encrypt)

```bash
sudo dnf install -y epel-release
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.seudominio.com.br
```

O certbot edita o bloco do Nginx automaticamente, adicionando o
`listen 443 ssl` e o redirecionamento de HTTP para HTTPS. Teste:

```bash
curl https://api.seudominio.com.br/api/health
```

O certificado renova automaticamente via timer do systemd que o certbot
já instala (`certbot.timer`) — não precisa de cron manual.

---

## Passo 7 — Apontar o frontend (Vercel) para a API

No painel do Vercel: **Project Settings → Environment Variables**, adicione:

| Nome | Valor | Ambiente |
|---|---|---|
| `VITE_API_URL` | `https://api.seudominio.com.br/api` | Production (e Preview, se quiser) |

Como o Vite "embute" as variáveis de ambiente no momento do *build*, é
preciso disparar um novo deploy depois de salvar a variável (aba
**Deployments** → menu do último deploy → **Redeploy**, ou simplesmente
faça um novo `git push`).

Depois, substitua `src/services/api.js` do frontend pela versão deste
pacote (`frontend/api.js`), que lê `import.meta.env.VITE_API_URL` em vez
de ter a URL fixa em `127.0.0.1`.

Para desenvolvimento local, copie `frontend/.env.example` para
`.env.local` na raiz do projeto React (esse arquivo não deve ser
commitado).

---

## Passo 8 (opcional) — Garantir que tudo volta sozinho após reiniciar o VPS

Como os serviços no `docker-compose.yml` já usam `restart:
unless-stopped`, eles voltam automaticamente quando o Docker reinicia
(e o Docker já está habilitado para iniciar no boot, do Passo 1.1). A
unidade systemd abaixo é só uma conveniência para gerenciar a stack
inteira com um único comando:

```bash
sudo cp deploy/connectea-docker.service /etc/systemd/system/
sudo nano /etc/systemd/system/connectea-docker.service   # confirme o WorkingDirectory
sudo systemctl daemon-reload
sudo systemctl enable connectea-docker.service
```

---

## Checklist final

- [ ] `curl https://api.seudominio.com.br/api/health` responde `{"status":"ok"}` de fora do VPS
- [ ] No DevTools do navegador, abrindo `connec-tea.vercel.app`, a aba Network mostra as chamadas indo para `https://api.seudominio.com.br/api/...` sem erro de CORS
- [ ] Login e cadastro funcionam de ponta a ponta
- [ ] `docker compose ps` mostra `api` e `db` como `healthy`/`Up`
- [ ] `.env` não está versionado no Git

---

## Comandos úteis no dia a dia

```bash
# Logs em tempo real
sudo docker compose logs -f api
sudo docker compose logs -f db

# Atualizar só a API depois de um git pull com mudanças no código
sudo docker compose up -d --build api

# Backup do banco
sudo docker compose exec db sh -c 'mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" connectea' > backup_$(date +%F).sql

# Entrar no MySQL para inspecionar dados manualmente
sudo docker compose exec db mysql -u root -p connectea
```

---

## Notas importantes de segurança (leia antes de ir a campo com dados reais)

1. **Senha em texto puro:** o `app.py` atual compara `Senha = %s`
   diretamente — ou seja, as senhas dos responsáveis ficam salvas sem
   hash no banco. Isso passou na migração sem alteração para não mudar
   o comportamento sem você pedir, mas para um sistema que vai coletar
   dados reais (e sensíveis — saúde e dados de pessoas com TEA são
   dados sensíveis pela LGPD), o ideal é trocar para
   `werkzeug.security.generate_password_hash` / `check_password_hash`
   (já vem junto com o Flask, não precisa de dependência nova). Posso
   te ajudar a implementar isso se quiser.
2. A porta do MySQL não está publicada para fora do container — não a
   exponha publicamente em produção.
3. Troque as senhas padrão do `.env.example` por senhas fortes e únicas
   antes de subir os containers.
4. Faça backups periódicos do volume `db_data` (veja o comando de
   `mysqldump` acima) — ele é o que de fato guarda os dados entre
   reinicializações dos containers.

---

## Sobre o script `migrar_sqlite_para_mysql.py`

É opcional. Só faz sentido se você já tem respostas reais salvas
localmente em `connectea.db` (testes de formulário, por exemplo) e quer
preservá-las ao migrar para o MySQL em produção. Se o banco vai nascer
vazio em produção, ignore esse arquivo — o `schema_mysql.sql` já cria as
tabelas vazias automaticamente.
