// Dados de demonstração exportados do banco SQLite3/MySQL (BRAPROB).
// Usados como fallback quando a API Flask não está disponível
// (ex.: build estático publicado na Vercel, sem backend rodando).
//
// O formato é idêntico ao retornado por GET /api/dados, para que a
// página /dados consuma sem precisar de adaptações.
//
// Obs.: Nivel_Suporte é gravado como "1" | "2" | "3" (mesmo formato do
// formulário) para que os badges coloridos do dashboard funcionem.

export const dadosCenso = {
  responsaveis: [
    { ID_Responsavel: 1,  Nome_Completo: "Maria Silva",      Email: "maria.silva@email.com",      Telefone_Contato: "(11) 99876-5432", Data_Aceite: "2026-01-15" },
    { ID_Responsavel: 2,  Nome_Completo: "Carlos Souza",     Email: "carlos.souza@email.com",     Telefone_Contato: "(11) 98765-4321", Data_Aceite: "2026-02-10" },
    { ID_Responsavel: 3,  Nome_Completo: "Ana Oliveira",     Email: "ana.oliveira@email.com",     Telefone_Contato: "(11) 97654-3210", Data_Aceite: "2026-03-01" },
    { ID_Responsavel: 4,  Nome_Completo: "Marcos Santos",    Email: "marcos.santos@email.com",    Telefone_Contato: "(11) 96543-2109", Data_Aceite: "2026-03-22" },
    { ID_Responsavel: 5,  Nome_Completo: "Patricia Lima",    Email: "patricia.lima@email.com",    Telefone_Contato: "(11) 95432-1100", Data_Aceite: "2026-04-05" },
    { ID_Responsavel: 6,  Nome_Completo: "Roberto Alves",    Email: "roberto.alves@email.com",    Telefone_Contato: "(11) 94321-2200", Data_Aceite: "2026-04-18" },
    { ID_Responsavel: 7,  Nome_Completo: "Fernanda Costa",   Email: "fernanda.costa@email.com",   Telefone_Contato: "(11) 93210-3300", Data_Aceite: "2026-05-02" },
    { ID_Responsavel: 8,  Nome_Completo: "Juliano Pereira",  Email: "juliano.pereira@email.com",  Telefone_Contato: "(11) 92109-4400", Data_Aceite: "2026-05-20" },
    { ID_Responsavel: 9,  Nome_Completo: "Sandra Rocha",     Email: "sandra.rocha@email.com",     Telefone_Contato: "(11) 91098-5500", Data_Aceite: "2026-05-28" },
    { ID_Responsavel: 10, Nome_Completo: "Eduardo Gomes",    Email: "eduardo.gomes@email.com",    Telefone_Contato: "(11) 99887-6600", Data_Aceite: "2026-06-01" },
    { ID_Responsavel: 11, Nome_Completo: "Vanessa Martins",  Email: "vanessa.martins@email.com",  Telefone_Contato: "(11) 98776-7700", Data_Aceite: "2026-06-05" },
    { ID_Responsavel: 12, Nome_Completo: "Ricardo Barros",   Email: "ricardo.barros@email.com",   Telefone_Contato: "(11) 97665-8800", Data_Aceite: "2026-06-08" },
    { ID_Responsavel: 13, Nome_Completo: "Camila Dias",      Email: "camila.dias@email.com",      Telefone_Contato: "(11) 96554-9900", Data_Aceite: "2026-06-10" },
    { ID_Responsavel: 14, Nome_Completo: "Thiago Nunes",     Email: "thiago.nunes@email.com",     Telefone_Contato: "(11) 95443-1010", Data_Aceite: "2026-06-12" },
    { ID_Responsavel: 15, Nome_Completo: "Luana Freitas",    Email: "luana.freitas@email.com",    Telefone_Contato: "(11) 94332-2020", Data_Aceite: "2026-06-14" },
  ],

  // PESSOA_TEA + PERFIL_CLINICO (Nivel_Suporte, Idade_Diagnostico)
  pessoas: [
    { ID_Pessoa: 1,  Nome_Completo: "Pedro Silva Oliver",   Data_Nascimento: "2018-05-12", Sexo: "Masculino", Bairro: "Jardim Sevilha", Grau_Parentesco: "Filho",   Nivel_Suporte: "1", Idade_Diagnostico: 3 },
    { ID_Pessoa: 2,  Nome_Completo: "Lucas Silva Oliver",   Data_Nascimento: "2020-09-30", Sexo: "Masculino", Bairro: "Jardim Sevilha", Grau_Parentesco: "Filho",   Nivel_Suporte: "3", Idade_Diagnostico: 2 },
    { ID_Pessoa: 3,  Nome_Completo: "Beatriz Souza",        Data_Nascimento: "2015-03-22", Sexo: "Feminino",  Bairro: "Matadouro",      Grau_Parentesco: "Filha",   Nivel_Suporte: "2", Idade_Diagnostico: 5 },
    { ID_Pessoa: 4,  Nome_Completo: "Arthur Oliveira Ramos",Data_Nascimento: "2012-07-07", Sexo: "Masculino", Bairro: "Cruzeiro",       Grau_Parentesco: "Filho",   Nivel_Suporte: "1", Idade_Diagnostico: 7 },
    { ID_Pessoa: 5,  Nome_Completo: "Mariana Santos Reis",  Data_Nascimento: "2019-11-18", Sexo: "Feminino",  Bairro: "Centro",         Grau_Parentesco: "Enteada", Nivel_Suporte: "2", Idade_Diagnostico: 4 },
    { ID_Pessoa: 6,  Nome_Completo: "Gabriel Lima Castro",  Data_Nascimento: "2016-02-14", Sexo: "Masculino", Bairro: "Penha",          Grau_Parentesco: "Filho",   Nivel_Suporte: "3", Idade_Diagnostico: 2 },
    { ID_Pessoa: 7,  Nome_Completo: "Sophia Alves Pinto",   Data_Nascimento: "2017-08-09", Sexo: "Feminino",  Bairro: "Taboao",         Grau_Parentesco: "Filha",   Nivel_Suporte: "1", Idade_Diagnostico: 6 },
    { ID_Pessoa: 8,  Nome_Completo: "Miguel Costa Dantas",  Data_Nascimento: "2014-12-01", Sexo: "Masculino", Bairro: "Centro",         Grau_Parentesco: "Filho",   Nivel_Suporte: "2", Idade_Diagnostico: 3 },
    { ID_Pessoa: 9,  Nome_Completo: "Helena Pereira Luz",   Data_Nascimento: "2021-04-25", Sexo: "Feminino",  Bairro: "Lavapes",        Grau_Parentesco: "Filha",   Nivel_Suporte: "3", Idade_Diagnostico: 1 },
    { ID_Pessoa: 10, Nome_Completo: "Davi Rocha Menezes",   Data_Nascimento: "2013-06-30", Sexo: "Masculino", Bairro: "Cruzeiro",       Grau_Parentesco: "Filho",   Nivel_Suporte: "1", Idade_Diagnostico: 8 },
    { ID_Pessoa: 11, Nome_Completo: "Laura Gomes Vidal",    Data_Nascimento: "2018-10-10", Sexo: "Feminino",  Bairro: "Matadouro",      Grau_Parentesco: "Filha",   Nivel_Suporte: "2", Idade_Diagnostico: 4 },
    { ID_Pessoa: 12, Nome_Completo: "Enzo Martins Faria",   Data_Nascimento: "2011-01-19", Sexo: "Masculino", Bairro: "Matadouro",      Grau_Parentesco: "Filho",   Nivel_Suporte: "1", Idade_Diagnostico: 5 },
    { ID_Pessoa: 13, Nome_Completo: "Valentina Barros Sa",  Data_Nascimento: "2020-03-03", Sexo: "Feminino",  Bairro: "Centro",         Grau_Parentesco: "Filha",   Nivel_Suporte: "3", Idade_Diagnostico: 2 },
    { ID_Pessoa: 14, Nome_Completo: "Bernardo Dias Lopes",  Data_Nascimento: "2015-07-22", Sexo: "Masculino", Bairro: "Penha",          Grau_Parentesco: "Filho",   Nivel_Suporte: "2", Idade_Diagnostico: 6 },
    { ID_Pessoa: 15, Nome_Completo: "Alice Nunes Teles",    Data_Nascimento: "2019-09-14", Sexo: "Feminino",  Bairro: "Taboao",         Grau_Parentesco: "Filha",   Nivel_Suporte: "1", Idade_Diagnostico: 3 },
  ],

  profissionais: [
    { ID_Profissional: 1,  Nome_Profissional: "Dr. Roberto Alencar",  Especialidade: "Neuropediatra",                      Telefone: "(11) 95432-1098" },
    { ID_Profissional: 2,  Nome_Profissional: "Dra. Juliana Mendes",  Especialidade: "Psicóloga Cognitivo-Comportamental", Telefone: "(11) 94321-0987" },
    { ID_Profissional: 3,  Nome_Profissional: "Dra. Camila Costa",    Especialidade: "Fonoaudióloga",                      Telefone: "(11) 93210-9876" },
    { ID_Profissional: 4,  Nome_Profissional: "Dr. Fernando Rocha",   Especialidade: "Terapeuta Ocupacional",              Telefone: "(11) 92109-8765" },
    { ID_Profissional: 5,  Nome_Profissional: "Dra. Patricia Nunes",  Especialidade: "Psicopedagoga",                      Telefone: "(11) 91098-7654" },
    { ID_Profissional: 6,  Nome_Profissional: "Dr. Andre Tavares",    Especialidade: "Psiquiatra Infantil",                Telefone: "(11) 99087-6543" },
    { ID_Profissional: 7,  Nome_Profissional: "Dra. Beatriz Moraes",  Especialidade: "Fonoaudióloga",                      Telefone: "(11) 98076-5432" },
    { ID_Profissional: 8,  Nome_Profissional: "Dr. Marcelo Vieira",   Especialidade: "Neuropediatra",                      Telefone: "(11) 97065-4321" },
    { ID_Profissional: 9,  Nome_Profissional: "Dra. Renata Campos",   Especialidade: "Terapeuta Ocupacional",              Telefone: "(11) 96054-3210" },
    { ID_Profissional: 10, Nome_Profissional: "Dr. Gustavo Pires",    Especialidade: "Psicólogo Cognitivo-Comportamental", Telefone: "(11) 95043-2109" },
  ],

  // ACOMPANHAMENTO + nomes de PESSOA_TEA e PROFISSIONAL_SAUDE (join)
  acompanhamentos: [
    { ID_Pessoa: 1,  ID_Profissional: 2, Data_Inicio_Tratamento: "2024-02-10", Nome_Completo: "Pedro Silva Oliver",    Nome_Profissional: "Dra. Juliana Mendes", Especialidade: "Psicóloga Cognitivo-Comportamental" },
    { ID_Pessoa: 1,  ID_Profissional: 3, Data_Inicio_Tratamento: "2024-03-15", Nome_Completo: "Pedro Silva Oliver",    Nome_Profissional: "Dra. Camila Costa",   Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 2,  ID_Profissional: 1, Data_Inicio_Tratamento: "2025-01-20", Nome_Completo: "Lucas Silva Oliver",    Nome_Profissional: "Dr. Roberto Alencar", Especialidade: "Neuropediatra" },
    { ID_Pessoa: 2,  ID_Profissional: 4, Data_Inicio_Tratamento: "2025-02-11", Nome_Completo: "Lucas Silva Oliver",    Nome_Profissional: "Dr. Fernando Rocha",  Especialidade: "Terapeuta Ocupacional" },
    { ID_Pessoa: 3,  ID_Profissional: 2, Data_Inicio_Tratamento: "2023-08-05", Nome_Completo: "Beatriz Souza",         Nome_Profissional: "Dra. Juliana Mendes", Especialidade: "Psicóloga Cognitivo-Comportamental" },
    { ID_Pessoa: 3,  ID_Profissional: 3, Data_Inicio_Tratamento: "2023-09-01", Nome_Completo: "Beatriz Souza",         Nome_Profissional: "Dra. Camila Costa",   Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 4,  ID_Profissional: 1, Data_Inicio_Tratamento: "2022-10-10", Nome_Completo: "Arthur Oliveira Ramos", Nome_Profissional: "Dr. Roberto Alencar", Especialidade: "Neuropediatra" },
    { ID_Pessoa: 5,  ID_Profissional: 4, Data_Inicio_Tratamento: "2025-05-14", Nome_Completo: "Mariana Santos Reis",   Nome_Profissional: "Dr. Fernando Rocha",  Especialidade: "Terapeuta Ocupacional" },
    { ID_Pessoa: 5,  ID_Profissional: 6, Data_Inicio_Tratamento: "2025-06-01", Nome_Completo: "Mariana Santos Reis",   Nome_Profissional: "Dr. Andre Tavares",   Especialidade: "Psiquiatra Infantil" },
    { ID_Pessoa: 6,  ID_Profissional: 3, Data_Inicio_Tratamento: "2024-07-19", Nome_Completo: "Gabriel Lima Castro",   Nome_Profissional: "Dra. Camila Costa",   Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 6,  ID_Profissional: 5, Data_Inicio_Tratamento: "2024-08-22", Nome_Completo: "Gabriel Lima Castro",   Nome_Profissional: "Dra. Patricia Nunes", Especialidade: "Psicopedagoga" },
    { ID_Pessoa: 7,  ID_Profissional: 2, Data_Inicio_Tratamento: "2023-11-30", Nome_Completo: "Sophia Alves Pinto",    Nome_Profissional: "Dra. Juliana Mendes", Especialidade: "Psicóloga Cognitivo-Comportamental" },
    { ID_Pessoa: 8,  ID_Profissional: 1, Data_Inicio_Tratamento: "2024-01-15", Nome_Completo: "Miguel Costa Dantas",   Nome_Profissional: "Dr. Roberto Alencar", Especialidade: "Neuropediatra" },
    { ID_Pessoa: 8,  ID_Profissional: 7, Data_Inicio_Tratamento: "2024-02-20", Nome_Completo: "Miguel Costa Dantas",   Nome_Profissional: "Dra. Beatriz Moraes", Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 9,  ID_Profissional: 6, Data_Inicio_Tratamento: "2025-03-10", Nome_Completo: "Helena Pereira Luz",    Nome_Profissional: "Dr. Andre Tavares",   Especialidade: "Psiquiatra Infantil" },
    { ID_Pessoa: 9,  ID_Profissional: 4, Data_Inicio_Tratamento: "2025-04-05", Nome_Completo: "Helena Pereira Luz",    Nome_Profissional: "Dr. Fernando Rocha",  Especialidade: "Terapeuta Ocupacional" },
    { ID_Pessoa: 10, ID_Profissional: 8, Data_Inicio_Tratamento: "2022-09-09", Nome_Completo: "Davi Rocha Menezes",    Nome_Profissional: "Dr. Marcelo Vieira",  Especialidade: "Neuropediatra" },
    { ID_Pessoa: 11, ID_Profissional: 3, Data_Inicio_Tratamento: "2024-05-25", Nome_Completo: "Laura Gomes Vidal",     Nome_Profissional: "Dra. Camila Costa",   Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 11, ID_Profissional: 9, Data_Inicio_Tratamento: "2024-06-30", Nome_Completo: "Laura Gomes Vidal",     Nome_Profissional: "Dra. Renata Campos",  Especialidade: "Terapeuta Ocupacional" },
    { ID_Pessoa: 12, ID_Profissional: 1, Data_Inicio_Tratamento: "2023-02-14", Nome_Completo: "Enzo Martins Faria",    Nome_Profissional: "Dr. Roberto Alencar", Especialidade: "Neuropediatra" },
    { ID_Pessoa: 13, ID_Profissional: 6, Data_Inicio_Tratamento: "2025-07-08", Nome_Completo: "Valentina Barros Sa",   Nome_Profissional: "Dr. Andre Tavares",   Especialidade: "Psiquiatra Infantil" },
    { ID_Pessoa: 13, ID_Profissional: 7, Data_Inicio_Tratamento: "2025-08-12", Nome_Completo: "Valentina Barros Sa",   Nome_Profissional: "Dra. Beatriz Moraes", Especialidade: "Fonoaudióloga" },
    { ID_Pessoa: 14, ID_Profissional: 4, Data_Inicio_Tratamento: "2024-10-01", Nome_Completo: "Bernardo Dias Lopes",   Nome_Profissional: "Dr. Fernando Rocha",  Especialidade: "Terapeuta Ocupacional" },
    { ID_Pessoa: 14, ID_Profissional: 5, Data_Inicio_Tratamento: "2024-11-11", Nome_Completo: "Bernardo Dias Lopes",   Nome_Profissional: "Dra. Patricia Nunes", Especialidade: "Psicopedagoga" },
  ],
};
