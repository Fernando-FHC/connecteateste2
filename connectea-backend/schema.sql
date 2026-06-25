PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS RESPONSAVEL (
    ID_Responsavel    INTEGER      PRIMARY KEY AUTOINCREMENT,
    Nome_Completo     VARCHAR(150) NOT NULL,
    Email             VARCHAR(100) NOT NULL UNIQUE,
    Senha             VARCHAR(255) NOT NULL,
    Data_Aceite       DATE         NOT NULL,
    Telefone_Contato  VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS PESSOA_TEA (
    ID_Pessoa        INTEGER      PRIMARY KEY AUTOINCREMENT,
    Nome_Completo    VARCHAR(150) NOT NULL,
    Data_Nascimento  DATE         NOT NULL,
    Sexo             VARCHAR(20)  NOT NULL,
    Bairro           VARCHAR(100) NOT NULL,
    Grau_Parentesco  VARCHAR(50)  NOT NULL,
    ID_Responsavel   INTEGER      NOT NULL,
    FOREIGN KEY (ID_Responsavel) REFERENCES RESPONSAVEL(ID_Responsavel)
);

CREATE TABLE IF NOT EXISTS PERFIL_CLINICO (
    ID_Pessoa            INTEGER     PRIMARY KEY,
    Idade_Diagnostico    INTEGER     NOT NULL,
    Nivel_Suporte        VARCHAR(50) NOT NULL,
    Medicacoes_Continuas TEXT,
    FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA_TEA(ID_Pessoa)
);

CREATE TABLE IF NOT EXISTS PERFIL_CENSO (
    ID_Pessoa               INTEGER     PRIMARY KEY,
    Renda_Familiar          VARCHAR(50),
    Num_Moradores           INTEGER,
    Beneficio_Governo       VARCHAR(50),
    Situacao_Moradia        VARCHAR(50),
    Nivel_Escolaridade      VARCHAR(60),
    Tipo_Escola             VARCHAR(50),
    Mediador_Escolar        VARCHAR(60),
    Desafios_Escolares      TEXT,
    Plano_Saude             VARCHAR(30),
    Lista_Espera            TEXT,
    Comorbidades            TEXT,
    Rede_Apoio              VARCHAR(50),
    Sensibilidade_Sensorial TEXT,
    Rotina_Sono             VARCHAR(50),
    Seletividade_Alimentar  VARCHAR(30),
    Comunicacao             VARCHAR(40),
    Interacao_Social        TEXT,
    Observacoes             TEXT,
    FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA_TEA(ID_Pessoa)
);

CREATE TABLE IF NOT EXISTS PROFISSIONAL_SAUDE (
    ID_Profissional   INTEGER      PRIMARY KEY AUTOINCREMENT,
    Nome_Profissional VARCHAR(150) NOT NULL,
    Especialidade     VARCHAR(100) NOT NULL,
    Telefone          VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ACOMPANHAMENTO (
    ID_Pessoa              INTEGER NOT NULL,
    ID_Profissional        INTEGER NOT NULL,
    Data_Inicio_Tratamento DATE    NOT NULL,
    PRIMARY KEY (ID_Pessoa, ID_Profissional),
    FOREIGN KEY (ID_Pessoa)       REFERENCES PESSOA_TEA(ID_Pessoa),
    FOREIGN KEY (ID_Profissional) REFERENCES PROFISSIONAL_SAUDE(ID_Profissional)
);
