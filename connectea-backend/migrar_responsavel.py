import sqlite3

conn = sqlite3.connect("connectea.db")
cols = [r[1] for r in conn.execute("PRAGMA table_info(RESPONSAVEL)")]

if "Nome_Completo" not in cols:
    conn.execute("ALTER TABLE RESPONSAVEL ADD COLUMN Nome_Completo VARCHAR(150) NOT NULL DEFAULT ''")
    print("Coluna Nome_Completo adicionada.")
else:
    print("Nome_Completo já existe.")

if "Telefone_Contato" not in cols:
    conn.execute("ALTER TABLE RESPONSAVEL ADD COLUMN Telefone_Contato VARCHAR(20)")
    print("Coluna Telefone_Contato adicionada.")
else:
    print("Telefone_Contato já existe.")

conn.commit()
print("Colunas atuais:", [r[1] for r in conn.execute("PRAGMA table_info(RESPONSAVEL)")])
conn.close()
