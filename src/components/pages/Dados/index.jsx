import { useEffect, useState } from 'react';
import { buscarDados } from '../../../services/api';
import { dadosCenso } from '../../../data/dadosCenso';
import '../../../assets/css/dados.css';

function badgeNivel(nivel) {
  const mapa = { '1': 'badge-1', '2': 'badge-2', '3': 'badge-3' };
  const classe = mapa[nivel] || 'badge-default';
  return <span className={`badge ${classe}`}>{nivel || '—'}</span>;
}

function TabelaResponsaveis({ lista }) {
  return (
    <div className="tabela-secao">
      <h2>
        Responsáveis
        <span className="contagem">{lista.length}</span>
      </h2>
      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Data de Aceite</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((r) => (
              <tr key={r.ID_Responsavel}>
                <td>{r.ID_Responsavel}</td>
                <td>{r.Nome_Completo || '—'}</td>
                <td>{r.Email}</td>
                <td>{r.Telefone_Contato || '—'}</td>
                <td>{r.Data_Aceite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaPessoas({ lista }) {
  return (
    <div className="tabela-secao">
      <h2>
        Pessoas com TEA
        <span className="contagem">{lista.length}</span>
      </h2>
      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>Sexo</th>
              <th>Bairro</th>
              <th>Nível Suporte</th>
              <th>Idade Diagnóstico</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.ID_Pessoa}>
                <td>{p.ID_Pessoa}</td>
                <td>{p.Nome_Completo}</td>
                <td>{p.Data_Nascimento}</td>
                <td>{p.Sexo}</td>
                <td>{p.Bairro}</td>
                <td>{badgeNivel(p.Nivel_Suporte)}</td>
                <td>{p.Idade_Diagnostico ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaProfissionais({ lista }) {
  return (
    <div className="tabela-secao">
      <h2>
        Profissionais de Saúde
        <span className="contagem">{lista.length}</span>
      </h2>
      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.ID_Profissional}>
                <td>{p.ID_Profissional}</td>
                <td>{p.Nome_Profissional}</td>
                <td>{p.Especialidade}</td>
                <td>{p.Telefone || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabelaAcompanhamentos({ lista }) {
  return (
    <div className="tabela-secao">
      <h2>
        Acompanhamentos
        <span className="contagem">{lista.length}</span>
      </h2>
      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Profissional</th>
              <th>Especialidade</th>
              <th>Início do Tratamento</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a, i) => (
              <tr key={i}>
                <td>{a.Nome_Completo}</td>
                <td>{a.Nome_Profissional}</td>
                <td>{a.Especialidade}</td>
                <td>{a.Data_Inicio_Tratamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Dados() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    buscarDados()
      .then(setDados)
      .catch(() => {
        // API indisponível (ex.: build na Vercel sem backend): usa os dados de demonstração exportados do BRAPROB como fallback.
        setDados(dadosCenso);
        setDemo(true);
      })
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main className="dados-main">
      <div className="container">
        <h1>Dados do Censo</h1>
        <p className="subtitulo">Visualização dos registros armazenados no banco de dados.</p>

        {carregando && <p className="msg-carregando">Carregando dados...</p>}
        {demo && (
          <p className="msg-demo">
            📊 Exibindo <strong>dados de demonstração</strong> — a API não está
            disponível no momento.
          </p>
        )}

        {dados && (
          <>
            {dados.responsaveis.length === 0 &&
             dados.pessoas.length === 0 &&
             dados.profissionais.length === 0 ? (
              <p className="msg-vazio">Nenhum registro encontrado. Preencha o censo para ver os dados aqui.</p>
            ) : (
              <>
                <TabelaResponsaveis    lista={dados.responsaveis}    />
                <TabelaPessoas         lista={dados.pessoas}         />
                <TabelaProfissionais   lista={dados.profissionais}   />
                <TabelaAcompanhamentos lista={dados.acompanhamentos} />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
