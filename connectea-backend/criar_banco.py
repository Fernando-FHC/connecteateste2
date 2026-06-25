import sqlite3

with open("schema.sql", "r", encoding="utf-8") as f:
    sql = f.read()

conn = sqlite3.connect("connectea.db")
conn.executescript(sql)
conn.close()

print("Banco criado com sucesso: connectea.db")
