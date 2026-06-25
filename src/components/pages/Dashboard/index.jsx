import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  buscarDados,
  atualizarResponsavel, excluirResponsavel,
  atualizarPessoa, excluirPessoa,
  atualizarProfissional, excluirProfissional,
} from '../../../services/api';
import '../../../assets/css/dashboard.css';

const MSG_ERRO = 'Não foi possível carregar os dados. Verifique se o servidor (API) está em execução.';


const CORES = ['#16a34a', '#0891b2', '#f59e0b', '#7c3aed', '#dc2626', '#2563eb', '#db2777', '#ca8a04'];
const TOTAL_BAIRROS_MUNICIPIO = 47; // Bragança Paulista

// Ícones 
function Icone({ tipo }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (tipo === 'pessoas') return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (tipo === 'clipboard') return <svg {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>;
  if (tipo === 'predio') return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>;
  if (tipo === 'coracao') return <svg {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>;
  if (tipo === 'grafico') return <svg {...props}><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" /><rect x="12" y="7" width="3" height="10" /><rect x="17" y="13" width="3" height="4" /></svg>;
  if (tipo === 'balao') return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
  if (tipo === 'editar') return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" /></svg>;
  if (tipo === 'lixeira') return <svg {...props}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>;
  return null;
}

const FORMATOS = {
  Tipo_Escola: {
    publica_federal: 'Pública Federal', publica_estadual: 'Pública Estadual',
    publica_municipal: 'Pública Municipal', privada: 'Privada / Particular',
    filantropica: 'Filantrópica / ONG', nao_se_aplica: 'Não se aplica',
  },
  Plano_Saude: {
    exclusivo_sus: 'Exclusivo SUS', convenio_particular: 'Convênio particular', ambos: 'Ambos',
  },
  Nivel_Suporte: { 1: 'Nível 1', 2: 'Nível 2', 3: 'Nível 3' },
};
function formatar(campo, valor) {
  if (valor === null || valor === undefined || valor === '') return '—';
  return FORMATOS[campo]?.[valor] ?? String(valor);
}

// Botões de editar / excluir
function Acoes({ onEditar, onExcluir }) {
  return (
    <div className="dash-acoes">
      <button className="dash-btn-icone editar" onClick={onEditar} title="Editar" aria-label="Editar">
        <Icone tipo="editar" />
      </button>
      <button className="dash-btn-icone excluir" onClick={onExcluir} title="Excluir" aria-label="Excluir">
        <Icone tipo="lixeira" />
      </button>
    </div>
  );
}

// Seção com tabela genérica: colunas = [{ chave, rotulo, render? }]
function SecaoTabela({ titulo, lista, colunas, comAcoes, onEditar, onExcluir, idChave }) {
  return (
    <div className="dash-secao">
      <div className="dash-secao-cabecalho">
        <h2>{titulo}</h2>
        <span className="dash-contagem">{lista.length}</span>
      </div>
      {lista.length === 0 ? (
        <p className="dash-vazio">Nenhum registro encontrado.</p>
      ) : (
        <div className="dash-tabela-wrap">
          <table className="dash-tabela">
            <thead>
              <tr>
                {colunas.map((c) => <th key={c.chave}>{c.rotulo}</th>)}
                {comAcoes && <th className="col-acoes">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {lista.map((row, i) => (
                <tr key={idChave ? row[idChave] : i}>
                  {colunas.map((c) => (
                    <td key={c.chave}>{c.render ? c.render(row) : (row[c.chave] ?? '—')}</td>
                  ))}
                  {comAcoes && (
                    <td className="col-acoes">
                      <Acoes onEditar={() => onEditar(row)} onExcluir={() => onExcluir(row)} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Lista de sugestões
function SecaoSugestoes({ pessoas }) {
  const comSugestao = pessoas.filter((p) => p.Observacoes && p.Observacoes.trim() !== '');
  return (
    <div className="dash-secao">
      <div className="dash-secao-cabecalho">
        <h2>Sugestões e observações</h2>
        <span className="dash-contagem">{comSugestao.length}</span>
      </div>
      {comSugestao.length === 0 ? (
        <p className="dash-vazio">Nenhuma sugestão enviada nos formulários.</p>
      ) : (
        <div className="dash-sugestoes">
          {comSugestao.map((p) => (
            <div className="dash-sugestao" key={p.ID_Pessoa}>
              <div className="dash-sugestao-autor">{p.Nome_Completo} · {p.Bairro || '—'}</div>
              <p className="dash-sugestao-texto">{p.Observacoes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Modal de edição genérico. campos = [{ nome, label, type?, opcoes? }]
function ModalEdicao({ titulo, campos, valoresIniciais, onSalvar, onFechar }) {
  const [form, setForm] = useState(valoresIniciais);
  const [salvando, setSalvando] = useState(false);

  const handle = (nome, valor) => setForm((f) => ({ ...f, [nome]: valor }));

  const submeter = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await onSalvar(form);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="dash-modal-fundo" onClick={onFechar}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{titulo}</h3>
        <form onSubmit={submeter}>
          {campos.map((c) => (
            <div className="dash-campo" key={c.nome}>
              <label>{c.label}</label>
              {c.type === 'select' ? (
                <select value={form[c.nome] ?? ''} onChange={(e) => handle(c.nome, e.target.value)}>
                  <option value="">Selecione...</option>
                  {c.opcoes.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
                </select>
              ) : (
                <input
                  type={c.type || 'text'}
                  value={form[c.nome] ?? ''}
                  onChange={(e) => handle(c.nome, e.target.value)}
                />
              )}
            </div>
          ))}
          <div className="dash-modal-acoes">
            <button type="button" className="dash-btn secundario" onClick={onFechar}>Cancelar</button>
            <button type="submit" className="dash-btn primario" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Definição dos campos editáveis por tipo de registro
function configEdicao(tipo, row) {
  if (tipo === 'responsavel') {
    return {
      titulo: 'Editar responsável',
      campos: [
        { nome: 'nome_completo', label: 'Nome completo' },
        { nome: 'email', label: 'E-mail', type: 'email' },
        { nome: 'telefone_contato', label: 'Telefone' },
      ],
      valores: {
        nome_completo: row.Nome_Completo || '',
        email: row.Email || '',
        telefone_contato: row.Telefone_Contato || '',
      },
    };
  }
  if (tipo === 'pessoa') {
    return {
      titulo: 'Editar pessoa com TEA',
      campos: [
        { nome: 'nome_completo', label: 'Nome completo' },
        { nome: 'data_nascimento', label: 'Data de nascimento', type: 'date' },
        { nome: 'sexo', label: 'Sexo', type: 'select', opcoes: [
          { valor: 'Masculino', rotulo: 'Masculino' }, { valor: 'Feminino', rotulo: 'Feminino' },
          { valor: 'Outro', rotulo: 'Outro' }, { valor: 'Não informado', rotulo: 'Não informado' },
        ] },
        { nome: 'bairro', label: 'Bairro' },
        { nome: 'grau_parentesco', label: 'Grau de parentesco' },
        { nome: 'nivel_suporte', label: 'Nível de suporte', type: 'select', opcoes: [
          { valor: '1', rotulo: 'Nível 1' }, { valor: '2', rotulo: 'Nível 2' }, { valor: '3', rotulo: 'Nível 3' },
        ] },
        { nome: 'idade_diagnostico', label: 'Idade no diagnóstico', type: 'number' },
      ],
      valores: {
        nome_completo: row.Nome_Completo || '',
        data_nascimento: row.Data_Nascimento || '',
        sexo: row.Sexo || '',
        bairro: row.Bairro || '',
        grau_parentesco: row.Grau_Parentesco || '',
        nivel_suporte: row.Nivel_Suporte != null ? String(row.Nivel_Suporte) : '',
        idade_diagnostico: row.Idade_Diagnostico ?? '',
      },
    };
  }
  // profissional
  return {
    titulo: 'Editar profissional',
    campos: [
      { nome: 'nome_profissional', label: 'Nome' },
      { nome: 'especialidade', label: 'Especialidade' },
      { nome: 'telefone', label: 'Telefone' },
    ],
    valores: {
      nome_profissional: row.Nome_Profissional || '',
      especialidade: row.Especialidade || '',
      telefone: row.Telefone || '',
    },
  };
}

const SECOES = [
  { id: 'visao', rotulo: 'Visão Geral', icone: 'grafico' },
  { id: 'responsaveis', rotulo: 'Responsáveis', icone: 'pessoas' },
  { id: 'pessoas', rotulo: 'Pessoas com TEA', icone: 'pessoas' },
  { id: 'profissionais', rotulo: 'Profissionais', icone: 'coracao' },
  { id: 'acompanhamentos', rotulo: 'Acompanhamentos', icone: 'clipboard' },
  { id: 'sugestoes', rotulo: 'Sugestões', icone: 'balao' },
];


function contarPor(lista, campo, { rotulo, limite, ordem } = {}) {
  const mapa = new Map();
  for (const item of lista) {
    let chave = item[campo];
    if (chave === null || chave === undefined || chave === '') continue;
    chave = rotulo ? rotulo(chave) : String(chave);
    mapa.set(chave, (mapa.get(chave) || 0) + 1);
  }
  let dados = [...mapa.entries()].map(([name, value]) => ({ name, value }));
  if (ordem) dados.sort((a, b) => ordem.indexOf(a.name) - ordem.indexOf(b.name));
  else dados.sort((a, b) => b.value - a.value);
  if (limite) dados = dados.slice(0, limite);
  return dados;
}

function idadeAtual(dataNasc) {
  if (!dataNasc) return null;
  const nasc = new Date(dataNasc);
  if (Number.isNaN(nasc.getTime())) return null;
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

// Distribuição por faixa etária
function faixasEtarias(lista) {
  const faixas = [
    { name: '0–6 anos', min: 0, max: 6 },
    { name: '7–12 anos', min: 7, max: 12 },
    { name: '13–17 anos', min: 13, max: 17 },
    { name: '18+ anos', min: 18, max: Infinity },
  ];
  return faixas.map((f) => ({
    name: f.name,
    value: lista.filter((p) => {
      const idade = idadeAtual(p.Data_Nascimento);
      return idade !== null && idade >= f.min && idade <= f.max;
    }).length,
  }));
}

const RENDA_ROTULOS = { ate_1: 'Até 1 SM', '1_a_3': '1–3 SM', '3_a_6': '3–6 SM', mais_de_6: '6+ SM' };
const RENDA_ORDEM = ['Até 1 SM', '1–3 SM', '3–6 SM', '6+ SM'];

function censoPreenchido(p) {
  return Boolean(p.Renda_Familiar || p.Nivel_Escolaridade || p.Tipo_Escola || p.Plano_Saude);
}

function CardGrafico({ titulo, dados, children }) {
  const temDados = dados && dados.length > 0 && dados.some((d) => d.value > 0);
  return (
    <div className="dash-card">
      <h3>{titulo}</h3>
      {temDados ? (
        <ResponsiveContainer width="100%" height={280}>
          {children}
        </ResponsiveContainer>
      ) : (
        <p className="vazio">Sem dados para exibir.</p>
      )}
    </div>
  );
}

function GraficoBarra({ dados, cor, tema }) {
  return (
    <BarChart data={dados} margin={{ top: 8, right: 16, left: -10, bottom: 8 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={tema.grid} />
      <XAxis dataKey="name" tick={{ fontSize: 12, fill: tema.muted }} interval={0} angle={-12} textAnchor="end" height={50} />
      <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: tema.muted }} />
      <Tooltip contentStyle={tema.tooltip} cursor={{ fill: tema.grid }} />
      <Bar dataKey="value" name="Cadastros" fill={cor} radius={[4, 4, 0, 0]} />
    </BarChart>
  );
}

function GraficoPizza({ dados, tema, donut = false }) {
  return (
    <PieChart>
      <Pie
        data={dados} dataKey="value" nameKey="name" cx="50%" cy="50%"
        innerRadius={donut ? 60 : 0} outerRadius={95}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        labelLine={false}
      >
        {dados.map((_, i) => (
          <Cell key={i} fill={CORES[i % CORES.length]} stroke={tema.card} strokeWidth={2} />
        ))}
      </Pie>
      <Tooltip contentStyle={tema.tooltip} />
      <Legend wrapperStyle={{ fontSize: 12, color: tema.muted }} />
    </PieChart>
  );
}

function Kpi({ icone, rotulo, valor, sub }) {
  return (
    <div className="dash-kpi">
      <div className="dash-kpi-topo">
        <Icone tipo={icone} />
        <span>{rotulo}</span>
      </div>
      <div className="valor">{valor}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}

export function Dashboard() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [secao, setSecao] = useState('visao');
  const [editando, setEditando] = useState(null); 
  const [feedback, setFeedback] = useState(null);  
  const [temaEscuro, setTemaEscuro] = useState(
    () => localStorage.getItem('dash-tema') === 'escuro'
  );

  async function carregar() {
    try {
      const d = await buscarDados();
      setDados(d);
      setErro(null);
    } catch {
      setErro(MSG_ERRO);
    }
  }

  useEffect(() => {
    buscarDados()
      .then((d) => { setDados(d); setErro(null); })
      .catch(() => setErro(MSG_ERRO))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('dash-tema', temaEscuro ? 'escuro' : 'claro');
  }, [temaEscuro]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(t);
  }, [feedback]);

  async function salvarEdicao(form) {
    const { tipo, row } = editando;
    try {
      if (tipo === 'responsavel') {
        await atualizarResponsavel(row.ID_Responsavel, form);
      } else if (tipo === 'pessoa') {
        await atualizarPessoa(row.ID_Pessoa, {
          ...form,
          idade_diagnostico: form.idade_diagnostico === '' ? null : Number(form.idade_diagnostico),
        });
      } else {
        await atualizarProfissional(row.ID_Profissional, form);
      }
      setEditando(null);
      setFeedback({ tipo: 'ok', texto: 'Registro atualizado com sucesso.' });
      await carregar();
    } catch (e) {
      setFeedback({ tipo: 'erro', texto: e.message });
    }
  }

  async function excluir(tipo, row) {
    const nome = row.Nome_Completo || row.Nome_Profissional || 'este registro';
    if (!window.confirm(`Excluir "${nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      if (tipo === 'responsavel') await excluirResponsavel(row.ID_Responsavel);
      else if (tipo === 'pessoa') await excluirPessoa(row.ID_Pessoa);
      else await excluirProfissional(row.ID_Profissional);
      setFeedback({ tipo: 'ok', texto: 'Registro excluído.' });
      await carregar();
    } catch (e) {
      setFeedback({ tipo: 'erro', texto: e.message });
    }
  }

  // Cores Recharts
  const tema = useMemo(() => (
    temaEscuro
      ? { grid: '#23262a', muted: '#9ca3af', card: '#161819', tooltip: { background: '#161819', border: '1px solid #2a2d2f', borderRadius: 8, color: '#e5e7eb' } }
      : { grid: '#eef2f6', muted: '#64748b', card: '#ffffff', tooltip: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, color: '#1e293b' } }
  ), [temaEscuro]);

  const pessoas = useMemo(() => dados?.pessoas ?? [], [dados]);
  const responsaveis = useMemo(() => dados?.responsaveis ?? [], [dados]);
  const acompanhamentos = useMemo(() => dados?.acompanhamentos ?? [], [dados]);

  const kpis = useMemo(() => {
    const total = pessoas.length;

    // Novos cadastros no mês 
    const agora = new Date();
    const ym = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}`;
    const novosMes = responsaveis.filter((r) => (r.Data_Aceite || '').startsWith(ym)).length;

    // Questionários preenchidos e % de conclusão
    const preenchidos = pessoas.filter(censoPreenchido).length;
    const conclusao = total ? Math.round((preenchidos / total) * 100) : 0;

    // Bairros distintos mapeados
    const bairros = new Set(pessoas.map((p) => p.Bairro).filter(Boolean)).size;

    //  % de pessoas com ao menos um acompanhamento
    const comSuporte = new Set(acompanhamentos.map((a) => a.ID_Pessoa)).size;
    const pctSuporte = total ? Math.round((comSuporte / total) * 100) : 0;

    return { total, novosMes, preenchidos, conclusao, bairros, pctSuporte };
  }, [pessoas, responsaveis, acompanhamentos]);

  const porFaixaEtaria = useMemo(() => faixasEtarias(pessoas), [pessoas]);
  const porRenda = useMemo(
    () => contarPor(pessoas, 'Renda_Familiar', { rotulo: (v) => RENDA_ROTULOS[v] || v, ordem: RENDA_ORDEM }),
    [pessoas]
  );
  const porSexo = useMemo(() => contarPor(pessoas, 'Sexo'), [pessoas]);
  const porSuporte = useMemo(
    () => contarPor(pessoas, 'Nivel_Suporte', { rotulo: (v) => `Nível ${v}` }),
    [pessoas]
  );
  const porBairro = useMemo(() => contarPor(pessoas, 'Bairro', { limite: 8 }), [pessoas]);
  const porEscolaridade = useMemo(() => contarPor(pessoas, 'Nivel_Escolaridade'), [pessoas]);
  const porTipoEscola = useMemo(() => contarPor(pessoas, 'Tipo_Escola'), [pessoas]);
  const porPlanoSaude = useMemo(() => contarPor(pessoas, 'Plano_Saude'), [pessoas]);

  const config = editando ? configEdicao(editando.tipo, editando.row) : null;

  return (
    <div className={`dash-root${temaEscuro ? ' tema-escuro' : ''}`}>
      <header className="dash-header">
        <div>
          <h1>Painel de dados socioeconômicos</h1>
          <p>Bragança Paulista · ConnecTea / Censo Autista</p>
        </div>
        <button
          className="dash-tema-btn"
          onClick={() => setTemaEscuro((v) => !v)}
          aria-label="Alternar tema"
        >
          {temaEscuro ? '☀️' : '🌙'}
        </button>
      </header>
      <hr className="dash-sep" />

      {feedback && (
        <div className={`dash-feedback ${feedback.tipo}`}>{feedback.texto}</div>
      )}

      {erro && (
        <div className="dash-feedback erro">⚠️ {erro}</div>
      )}

      {carregando && <p className="dash-status">Carregando dados...</p>}

      {dados && !carregando && (
        <div className="dash-layout">
          <nav className="dash-sidebar">
            {SECOES.map((s) => (
              <button
                key={s.id}
                className={`dash-nav-item${secao === s.id ? ' ativo' : ''}`}
                onClick={() => setSecao(s.id)}
              >
                <Icone tipo={s.icone} />
                <span>{s.rotulo}</span>
              </button>
            ))}
          </nav>

          <div className="dash-conteudo">
            {secao === 'visao' && (
              <>
                <section className="dash-kpis">
                  <Kpi
                    icone="pessoas" rotulo="Cadastros TEA" valor={kpis.total.toLocaleString('pt-BR')}
                    sub={kpis.novosMes > 0 ? `+${kpis.novosMes} este mês` : 'sem novos este mês'}
                  />
                  <Kpi
                    icone="clipboard" rotulo="Questionários" valor={kpis.preenchidos.toLocaleString('pt-BR')}
                    sub={`${kpis.conclusao}% de conclusão`}
                  />
                  <Kpi
                    icone="predio" rotulo="Bairros mapeados" valor={kpis.bairros}
                    sub={`de ${TOTAL_BAIRROS_MUNICIPIO} no município`}
                  />
                  <Kpi
                    icone="coracao" rotulo="Suporte ativo" valor={`${kpis.pctSuporte}%`}
                    sub="com acompanhamento"
                  />
                </section>

                <section className="dash-grid">
                  <CardGrafico titulo="Diagnóstico por faixa etária" dados={porFaixaEtaria}>
                    <GraficoBarra dados={porFaixaEtaria} cor={CORES[0]} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Perfil de renda familiar" dados={porRenda}>
                    <GraficoPizza dados={porRenda} tema={tema} donut />
                  </CardGrafico>
                  <CardGrafico titulo="Distribuição por sexo" dados={porSexo}>
                    <GraficoPizza dados={porSexo} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Nível de suporte" dados={porSuporte}>
                    <GraficoBarra dados={porSuporte} cor={CORES[2]} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Bairros (top 8)" dados={porBairro}>
                    <GraficoBarra dados={porBairro} cor={CORES[4]} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Nível de escolaridade" dados={porEscolaridade}>
                    <GraficoBarra dados={porEscolaridade} cor={CORES[3]} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Tipo de instituição de ensino" dados={porTipoEscola}>
                    <GraficoPizza dados={porTipoEscola} tema={tema} />
                  </CardGrafico>
                  <CardGrafico titulo="Plano de saúde" dados={porPlanoSaude}>
                    <GraficoPizza dados={porPlanoSaude} tema={tema} />
                  </CardGrafico>
                </section>
              </>
            )}

            {secao === 'responsaveis' && (
              <SecaoTabela
                titulo="Responsáveis" lista={responsaveis} idChave="ID_Responsavel" comAcoes
                colunas={[
                  { chave: 'ID_Responsavel', rotulo: '#' },
                  { chave: 'Nome_Completo', rotulo: 'Nome' },
                  { chave: 'Email', rotulo: 'E-mail' },
                  { chave: 'Telefone_Contato', rotulo: 'Telefone' },
                  { chave: 'Data_Aceite', rotulo: 'Data de Aceite' },
                ]}
                onEditar={(row) => setEditando({ tipo: 'responsavel', row })}
                onExcluir={(row) => excluir('responsavel', row)}
              />
            )}

            {secao === 'pessoas' && (
              <SecaoTabela
                titulo="Pessoas com TEA" lista={pessoas} idChave="ID_Pessoa" comAcoes
                colunas={[
                  { chave: 'ID_Pessoa', rotulo: '#' },
                  { chave: 'Nome_Completo', rotulo: 'Nome' },
                  { chave: 'Data_Nascimento', rotulo: 'Nascimento' },
                  { chave: 'Sexo', rotulo: 'Sexo' },
                  { chave: 'Bairro', rotulo: 'Bairro' },
                  { chave: 'Grau_Parentesco', rotulo: 'Parentesco' },
                  { chave: 'Nivel_Suporte', rotulo: 'Nível Suporte', render: (r) => formatar('Nivel_Suporte', r.Nivel_Suporte) },
                  { chave: 'Idade_Diagnostico', rotulo: 'Idade Diag.' },
                ]}
                onEditar={(row) => setEditando({ tipo: 'pessoa', row })}
                onExcluir={(row) => excluir('pessoa', row)}
              />
            )}

            {secao === 'profissionais' && (
              <SecaoTabela
                titulo="Profissionais de Saúde" lista={dados.profissionais ?? []} idChave="ID_Profissional" comAcoes
                colunas={[
                  { chave: 'ID_Profissional', rotulo: '#' },
                  { chave: 'Nome_Profissional', rotulo: 'Nome' },
                  { chave: 'Especialidade', rotulo: 'Especialidade' },
                  { chave: 'Telefone', rotulo: 'Telefone' },
                ]}
                onEditar={(row) => setEditando({ tipo: 'profissional', row })}
                onExcluir={(row) => excluir('profissional', row)}
              />
            )}

            {secao === 'acompanhamentos' && (
              <SecaoTabela
                titulo="Acompanhamentos" lista={acompanhamentos}
                colunas={[
                  { chave: 'Nome_Completo', rotulo: 'Pessoa' },
                  { chave: 'Nome_Profissional', rotulo: 'Profissional' },
                  { chave: 'Especialidade', rotulo: 'Especialidade' },
                  { chave: 'Data_Inicio_Tratamento', rotulo: 'Início do Tratamento' },
                ]}
              />
            )}

            {secao === 'sugestoes' && <SecaoSugestoes pessoas={pessoas} />}
          </div>
        </div>
      )}

      {editando && (
        <ModalEdicao
          titulo={config.titulo}
          campos={config.campos}
          valoresIniciais={config.valores}
          onSalvar={salvarEdicao}
          onFechar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
