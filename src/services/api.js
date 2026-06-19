const BASE = "http://127.0.0.1:5000/api";

async function req(rota, opcoes = {}) {
  const resposta = await fetch(`${BASE}${rota}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || "Erro na requisição");
  return dados;
}

// Faz login e salva o ID no sessionStorage
export async function fazerLogin(email, senha) {
  const resultado = await req("/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  sessionStorage.setItem("id_responsavel", resultado.id_responsavel);
  return resultado;
}

// Cadastra o responsável e salva o ID no sessionStorage
export async function cadastrarResponsavel(dados) {
  const resultado = await req("/responsavel", {
    method: "POST",
    body: JSON.stringify(dados),
  });
  sessionStorage.setItem("id_responsavel", resultado.id_responsavel);
  return resultado;
}

// Envia todos os dados do censo para o banco
export async function enviarCenso(formData) {
  const id_responsavel = sessionStorage.getItem("id_responsavel");

  const pessoa = await req("/pessoa", {
    method: "POST",
    body: JSON.stringify({
      // Step 1 – informações gerais
      nome_completo:        formData.nomeCompleto,
      data_nascimento:      formData.dataNascimento,
      sexo:                 formData.sexo         || "Não informado",
      bairro:               formData.bairro       || "Não informado",
      grau_parentesco:      formData.parentesco   || "Não informado",
      id_responsavel:       Number(id_responsavel),

      // Step 2 – diagnóstico
      idade_diagnostico:    Number(formData.idadeDiagnostico) || 0,
      nivel_suporte:        formData.nivelSuporte || "Não informado",
      medicacoes_continuas: formData.medicacoes   || null,

      // Step 3 – socioeconômico
      renda_familiar:       formData.rendaFamiliar    || null,
      num_moradores:        Number(formData.pessoasResidencia) || null,
      beneficio_governo:    formData.beneficioGoverno || null,
      situacao_moradia:     formData.situacaoMoradia  || null,

      // Step 4 – educação
      nivel_escolaridade:   formData.nivelEscolaridade || null,
      tipo_escola:          formData.tipoEscola        || null,
      mediador_escolar:     formData.mediadorEscolar   || null,
      desafios_escolares:   formData.desafiosEscolares || null,

      // Step 5 – saúde
      plano_saude:          formData.planoSaude  || null,
      lista_espera:         formData.listaEspera || null,
      comorbidades:         formData.comorbidades || null,
      rede_apoio:           formData.redeApoio   || null,

      // Step 6 – rotina
      sensibilidade_sensorial: formData.sensibilidadeSensorial || null,
      rotina_sono:             formData.rotinaSono             || null,
      seletividade_alimentar:  formData.seletividadeAlimentar  || null,
      comunicacao:             formData.comunicacao            || null,
      interacao_social:        formData.interacaoSocial        || null,

      // Step 7 – observações finais
      observacoes: formData.observacoes || null,
    }),
  });

  // 2. Se informou profissional de saúde, cadastra e vincula
  if (formData.profissionalNome && formData.profissionalNome.trim() !== "") {
    const prof = await req("/profissional", {
      method: "POST",
      body: JSON.stringify({
        nome_profissional: formData.profissionalNome,
        especialidade:     formData.profissionalEspecialidade || "Não especificada",
        telefone:          formData.profissionalTelefone || null,
      }),
    });
    await req("/acompanhamento", {
      method: "POST",
      body: JSON.stringify({
        id_pessoa:              pessoa.id_pessoa,
        id_profissional:        prof.id_profissional,
        data_inicio_tratamento: new Date().toISOString().split("T")[0],
      }),
    });
  }

  return pessoa;
}

// Busca todos os dados para o dashboard
export async function buscarDados() {
  return req("/dados");
}
