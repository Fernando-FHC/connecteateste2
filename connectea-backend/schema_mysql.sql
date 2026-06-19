-- ConnecTea – schema MySQL (InnoDB / utf8mb4)
-- Este arquivo é executado automaticamente pelo container do MySQL na
-- primeira inicialização (montado em /docker-entrypoint-initdb.d/).
-- Também pode ser aplicado manualmente com:
--   mysql -u usuario -p connectea < schema_mysql.sql

SET NAMES utf8mb4;

-- ── 1. RESPONSAVEL ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS RESPONSAVEL (
    ID_Responsavel    INT          AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo     VARCHAR(150) NOT NULL,
    Email             VARCHAR(100) NOT NULL UNIQUE,
    Senha             VARCHAR(255) NOT NULL,
    Data_Aceite       DATE         NOT NULL,
    Telefone_Contato  VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 2. PESSOA_TEA ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS PESSOA_TEA (
    ID_Pessoa        INT          AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo    VARCHAR(150) NOT NULL,
    Data_Nascimento  DATE         NOT NULL,
    Sexo             VARCHAR(20)  NOT NULL,
    Bairro           VARCHAR(100) NOT NULL,
    Grau_Parentesco  VARCHAR(50)  NOT NULL,
    ID_Responsavel   INT          NOT NULL,
    FOREIGN KEY (ID_Responsavel) REFERENCES RESPONSAVEL(ID_Responsavel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 3. PERFIL_CLINICO (1:1 com PESSOA_TEA) ───────────────────
CREATE TABLE IF NOT EXISTS PERFIL_CLINICO (
    ID_Pessoa            INT         PRIMARY KEY,
    Idade_Diagnostico    INT         NOT NULL,
    Nivel_Suporte        VARCHAR(50) NOT NULL,
    Medicacoes_Continuas TEXT,
    FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA_TEA(ID_Pessoa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 4. PERFIL_CENSO ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS PERFIL_CENSO (
    ID_Pessoa               INT         PRIMARY KEY,
    Renda_Familiar          VARCHAR(50),
    Num_Moradores           INT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 5. PROFISSIONAL_SAUDE ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS PROFISSIONAL_SAUDE (
    ID_Profissional   INT          AUTO_INCREMENT PRIMARY KEY,
    Nome_Profissional VARCHAR(150) NOT NULL,
    Especialidade     VARCHAR(100) NOT NULL,
    Telefone          VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 6. ACOMPANHAMENTO (N:N entre PESSOA_TEA e PROFISSIONAL) ──
CREATE TABLE IF NOT EXISTS ACOMPANHAMENTO (
    ID_Pessoa              INT  NOT NULL,
    ID_Profissional        INT  NOT NULL,
    Data_Inicio_Tratamento DATE NOT NULL,
    PRIMARY KEY (ID_Pessoa, ID_Profissional),
    FOREIGN KEY (ID_Pessoa)       REFERENCES PESSOA_TEA(ID_Pessoa),
    FOREIGN KEY (ID_Profissional) REFERENCES PROFISSIONAL_SAUDE(ID_Profissional)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
