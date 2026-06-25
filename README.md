# Censo Autista – ConnecTea

Plataforma web desenvolvida no **IFSP - Campus Bragança Paulista** para coletar e centralizar dados demográficos, socioeconômicos e clínicos da comunidade autista local. Os dados coletados visam subsidiar políticas públicas municipais.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, React Router 7, Vite |
| Backend | Python 3, Flask |
| Banco de dados | SQLite3 |
| Estilização | CSS3 puro |

---

## Estrutura do Projeto

```
ConnecTea-main/
├── connectea-backend/      # API Flask
│   ├── app.py              # Servidor Flask com classes OOP
│   ├── schema.sql          # Definição das 6 tabelas
│   ├── queries.sql         # 12 consultas SQL para BDD
│   └── criar_banco.py      # Script para criar o banco SQLite3
└── src/                    # Frontend React
    ├── components/
    │   ├── layout/         # Header e Footer
    │   └── pages/          # Home, Login, Cadastro, Dashboard, Políticas
    ├── services/api.js     # Integração com a API Flask
    └── routes/             # Configuração de rotas
```

---

## Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Python](https://python.org/) 3.10+
- Git

---

### 1. Backend (Flask + SQLite3)

```bash
# Entre na pasta do backend
cd connectea-backend

# Instale as dependências Python
pip install flask

# Crie o banco de dados SQLite3
python criar_banco.py

# Inicie o servidor (porta 5000)
python app.py
```

O backend estará disponível em `http://localhost:5000`.

---

### 2. Frontend (React)

Em outro terminal, na raiz do projeto:

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento (porta 5173)
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> **Importante:** os dois servidores precisam estar rodando ao mesmo tempo para o formulário funcionar.

---

## Rotas da aplicação

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (landing page) |
| `/login` | Login e cadastro de responsável |
| `/formulario` | Formulário do censo (7 etapas) |
| `/dashboard` | Dashboard com as 4 tabelas do banco |
| `/politica-privacidade` | Política de privacidade (LGPD) |
| `/termos-de-uso` | Termos de uso |

---

## Banco de Dados

6 tabelas com relacionamentos 1:1, 1:N e N:N:

```
RESPONSAVEL (1) ──< (N) PESSOA_TEA (1) ──── (1) PERFIL_CLINICO
                              │         └──── (1) PERFIL_CENSO
                              │
                              └──< (N) ACOMPANHAMENTO >── (N) PROFISSIONAL_SAUDE
```

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/responsavel` | Cadastrar responsável |
| GET | `/api/responsaveis` | Listar responsáveis |
| POST | `/api/pessoa` | Cadastrar pessoa com TEA |
| GET | `/api/pessoas` | Listar pessoas |
| GET | `/api/pessoa/<id>` | Buscar pessoa por ID |
| POST | `/api/profissional` | Cadastrar profissional |
| GET | `/api/profissionais` | Listar profissionais |
| POST | `/api/acompanhamento` | Registrar acompanhamento |
| GET | `/api/acompanhamentos/<id>` | Listar acompanhamentos por pessoa |
| GET | `/api/dados` | Todos os dados para o dashboard |

---

## Equipe

- David Miquéias Santos Paixão
- Fernando Henrique Camargo
- Letícia Zavazi de Almeida
- Lucas Nogueira Sanchez
- Michele Maria de Oliveira

**IFSP - Campus Bragança Paulista | 2026**
