"""
OPCIONAL: copia os dados já existentes em connectea.db (SQLite) para o MySQL.

Só execute isto se você já tem cadastros reais salvos localmente e quer
preservá-los. Se vai começar do zero em produção, ignore este script —
o schema_mysql.sql já cria as tabelas vazias.

Como usar:
  1. Copie este arquivo e o connectea.db para a mesma pasta.
  2. Ajuste MYSQL_CONFIG abaixo (use 127.0.0.1 se rodar no próprio VPS,
     ou o host/porta corretos se estiver migrando de outro lugar).
  3. pip install pymysql
  4. python migrar_sqlite_para_mysql.py
"""
import sqlite3
import pymysql

SQLITE_PATH = "connectea.db"

MYSQL_CONFIG = dict(
    host="127.0.0.1",
    port=3306,
    user="connectea_user",
    password="SENHA_AQUI",
    database="connectea",
    charset="utf8mb4",
)

# Ordem que respeita as chaves estrangeiras (pai antes do filho)
TABELAS_EM_ORDEM = [
    "RESPONSAVEL",
    "PESSOA_TEA",
    "PERFIL_CLINICO",
    "PERFIL_CENSO",
    "PROFISSIONAL_SAUDE",
    "ACOMPANHAMENTO",
]


def migrar():
    sqlite_conn = sqlite3.connect(SQLITE_PATH)
    sqlite_conn.row_factory = sqlite3.Row
    mysql_conn = pymysql.connect(**MYSQL_CONFIG)

    try:
        for tabela in TABELAS_EM_ORDEM:
            linhas = sqlite_conn.execute(f"SELECT * FROM {tabela}").fetchall()
            if not linhas:
                print(f"{tabela}: nada para migrar.")
                continue

            colunas = linhas[0].keys()
            placeholders = ", ".join(["%s"] * len(colunas))
            colunas_sql = ", ".join(colunas)
            sql = f"INSERT INTO {tabela} ({colunas_sql}) VALUES ({placeholders})"

            with mysql_conn.cursor() as cur:
                for linha in linhas:
                    cur.execute(sql, tuple(linha))

            mysql_conn.commit()
            print(f"{tabela}: {len(linhas)} linha(s) migrada(s).")
    finally:
        sqlite_conn.close()
        mysql_conn.close()


if __name__ == "__main__":
    migrar()
