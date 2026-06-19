--   date('now')            = CURDATE()
--   date('now', '-30 days') = CURDATE() - INTERVAL 30 DAY
--   strftime('%m', coluna) = month(coluna)
--   julianday()            = calculo de diferenca em dias/anos

PRAGMA foreign_keys = ON;


-- #1 Listar todas as pessoas com TEA e seus responsaveis
select PESSOA_TEA.ID_Pessoa, PESSOA_TEA.Nome_Completo, PESSOA_TEA.Data_Nascimento, PESSOA_TEA.Sexo, RESPONSAVEL.Email
from PESSOA_TEA
inner join RESPONSAVEL on RESPONSAVEL.ID_Responsavel = PESSOA_TEA.ID_Responsavel
order by PESSOA_TEA.Nome_Completo;


-- #2 Perfil clinico completo de cada pessoa
select PESSOA_TEA.Nome_Completo, PESSOA_TEA.Sexo, PERFIL_CLINICO.Nivel_Suporte, PERFIL_CLINICO.Idade_Diagnostico, PERFIL_CENSO.Renda_Familiar, PERFIL_CENSO.Plano_Saude
from PESSOA_TEA
inner join PERFIL_CLINICO on PERFIL_CLINICO.ID_Pessoa = PESSOA_TEA.ID_Pessoa
inner join PERFIL_CENSO on PERFIL_CENSO.ID_Pessoa = PESSOA_TEA.ID_Pessoa;


-- #3 Contagem de pessoas por nivel de suporte
select PERFIL_CLINICO.Nivel_Suporte, count(PERFIL_CLINICO.ID_Pessoa) as Total
from PERFIL_CLINICO
group by PERFIL_CLINICO.Nivel_Suporte
order by Total desc;


-- #4 Media, minimo e maximo de idade ao diagnostico por sexo
select PESSOA_TEA.Sexo, round(avg(PERFIL_CLINICO.Idade_Diagnostico), 1) as Media_Idade, min(PERFIL_CLINICO.Idade_Diagnostico) as Menor_Idade, max(PERFIL_CLINICO.Idade_Diagnostico) as Maior_Idade
from PESSOA_TEA
inner join PERFIL_CLINICO on PERFIL_CLINICO.ID_Pessoa = PESSOA_TEA.ID_Pessoa
group by PESSOA_TEA.Sexo;


-- #5 Responsaveis cadastrados nos ultimos 30 dias
select RESPONSAVEL.Email, RESPONSAVEL.Data_Aceite
from RESPONSAVEL
where RESPONSAVEL.Data_Aceite >= date('now', '-30 days');


-- #6 Distribuicao de renda familiar
select PERFIL_CENSO.Renda_Familiar, count(PERFIL_CENSO.ID_Pessoa) as Quantidade
from PERFIL_CENSO
where PERFIL_CENSO.Renda_Familiar is not null
group by PERFIL_CENSO.Renda_Familiar
order by Quantidade desc;


-- #7 Pessoas com acompanhamento profissional
select PESSOA_TEA.Nome_Completo, PROFISSIONAL_SAUDE.Nome_Profissional, PROFISSIONAL_SAUDE.Especialidade, ACOMPANHAMENTO.Data_Inicio_Tratamento
from PESSOA_TEA
inner join ACOMPANHAMENTO on ACOMPANHAMENTO.ID_Pessoa = PESSOA_TEA.ID_Pessoa
inner join PROFISSIONAL_SAUDE on PROFISSIONAL_SAUDE.ID_Profissional = ACOMPANHAMENTO.ID_Profissional
order by PESSOA_TEA.Nome_Completo;


-- #8 Pessoas sem nenhum profissional cadastrado
select PESSOA_TEA.ID_Pessoa, PESSOA_TEA.Nome_Completo, PESSOA_TEA.Bairro
from PESSOA_TEA
where PESSOA_TEA.ID_Pessoa not in (
    select distinct ID_Pessoa from ACOMPANHAMENTO
);


-- #9  Profissionais e quantidade de pacientes ativos (HAVING)
select PROFISSIONAL_SAUDE.Nome_Profissional, PROFISSIONAL_SAUDE.Especialidade, count(ACOMPANHAMENTO.ID_Pessoa) as Total_Pacientes
from PROFISSIONAL_SAUDE
left join ACOMPANHAMENTO on ACOMPANHAMENTO.ID_Profissional = PROFISSIONAL_SAUDE.ID_Profissional
group by PROFISSIONAL_SAUDE.ID_Profissional
having Total_Pacientes >= 1
order by Total_Pacientes desc;


-- #10 Distribuicao por forma de comunicacao com percentual
select PERFIL_CENSO.Comunicacao, count(PERFIL_CENSO.ID_Pessoa) as Quantidade,
    round(count(PERFIL_CENSO.ID_Pessoa) * 100.0 / (select count(*) from PERFIL_CENSO where Comunicacao is not null), 1) as Percentual
from PERFIL_CENSO
where PERFIL_CENSO.Comunicacao is not null
group by PERFIL_CENSO.Comunicacao
order by Quantidade desc;


--#11 Criancas (menos de 18 anos) em lista de espera
-- julianday() calcula diferenca em dias; dividir por 365.25 da a idade em anos
select PESSOA_TEA.Nome_Completo, PESSOA_TEA.Data_Nascimento,
    cast((julianday('now') - julianday(PESSOA_TEA.Data_Nascimento)) / 365.25 as integer) as Idade,
    PERFIL_CENSO.Lista_Espera
from PESSOA_TEA
inner join PERFIL_CENSO on PERFIL_CENSO.ID_Pessoa = PESSOA_TEA.ID_Pessoa
where PERFIL_CENSO.Lista_Espera is not null and PERFIL_CENSO.Lista_Espera != ''
and (julianday('now') - julianday(PESSOA_TEA.Data_Nascimento)) / 365.25 < 18
order by Idade;


--#12 Resumo geral do censo
select
    (select count(*) from RESPONSAVEL) as Total_Responsaveis,
    (select count(*) from PESSOA_TEA) as Total_Pessoas_TEA,
    (select count(*) from PROFISSIONAL_SAUDE) as Total_Profissionais,
    (select count(*) from ACOMPANHAMENTO) as Total_Acompanhamentos,
    (select round(avg(Idade_Diagnostico), 1) from PERFIL_CLINICO) as Media_Idade_Diagnostico,
    (select count(*) from PERFIL_CENSO where Plano_Saude = 'exclusivo_sus') as Usuarios_SUS;
