import sqlite3
import json
from datetime import date
from flask import Flask, request, jsonify

app = Flask(__name__)
DB_PATH = "connectea.db"


class Database:
    def __init__(self, path=DB_PATH):
        self.path = path

    def conectar(self):
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        return conn

    def linhas(self, cursor):
        return [dict(row) for row in cursor.fetchall()]


db = Database()


def serializar(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    raise TypeError


class Responsavel:
    def criar(self, nome_completo, email, senha, data_aceite, telefone_contato=None):
        with db.conectar() as conn:
            try:
                cur = conn.execute(
                    """INSERT INTO RESPONSAVEL
                       (Nome_Completo, Email, Senha, Data_Aceite, Telefone_Contato)
                       VALUES (?, ?, ?, ?, ?)""",
                    (nome_completo, email, senha, data_aceite, telefone_contato),
                )
                conn.commit()
                return {"id_responsavel": cur.lastrowid, "mensagem": "Responsável cadastrado"}, 201
            except sqlite3.IntegrityError:
                return {"erro": "E-mail já cadastrado"}, 409

    def listar(self):
        with db.conectar() as conn:
            cur = conn.execute(
                "SELECT ID_Responsavel, Nome_Completo, Email, Data_Aceite, Telefone_Contato FROM RESPONSAVEL"
            )
            return db.linhas(cur), 200

    def atualizar(self, id_responsavel, d):
        with db.conectar() as conn:
            try:
                cur = conn.execute(
                    """UPDATE RESPONSAVEL
                       SET Nome_Completo = ?, Email = ?, Telefone_Contato = ?
                       WHERE ID_Responsavel = ?""",
                    (d["nome_completo"], d["email"], d.get("telefone_contato"), id_responsavel),
                )
                conn.commit()
            except sqlite3.IntegrityError:
                return {"erro": "E-mail já cadastrado"}, 409
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            return {"mensagem": "Responsável atualizado"}, 200

    def excluir(self, id_responsavel):
        with db.conectar() as conn:
            dep = conn.execute(
                "SELECT COUNT(*) AS n FROM PESSOA_TEA WHERE ID_Responsavel = ?", (id_responsavel,)
            ).fetchone()["n"]
            if dep > 0:
                return {"erro": f"Possui {dep} pessoa(s) vinculada(s). Exclua-as primeiro."}, 409
            cur = conn.execute("DELETE FROM RESPONSAVEL WHERE ID_Responsavel = ?", (id_responsavel,))
            conn.commit()
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            return {"mensagem": "Responsável excluído"}, 200


class PessoaTEA:
    def criar(self, dados):
        with db.conectar() as conn:
            cur = conn.execute(
                """INSERT INTO PESSOA_TEA
                   (Nome_Completo, Data_Nascimento, Sexo, Bairro, Grau_Parentesco, ID_Responsavel)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (dados["nome_completo"], dados["data_nascimento"], dados["sexo"],
                 dados["bairro"], dados["grau_parentesco"], dados["id_responsavel"]),
            )
            id_pessoa = cur.lastrowid

            conn.execute(
                """INSERT INTO PERFIL_CLINICO
                   (ID_Pessoa, Idade_Diagnostico, Nivel_Suporte, Medicacoes_Continuas)
                   VALUES (?, ?, ?, ?)""",
                (id_pessoa, dados["idade_diagnostico"], dados["nivel_suporte"],
                 dados.get("medicacoes_continuas")),
            )

            conn.execute(
                """INSERT INTO PERFIL_CENSO
                   (ID_Pessoa,
                    Renda_Familiar, Num_Moradores, Beneficio_Governo, Situacao_Moradia,
                    Nivel_Escolaridade, Tipo_Escola, Mediador_Escolar, Desafios_Escolares,
                    Plano_Saude, Lista_Espera, Comorbidades, Rede_Apoio,
                    Sensibilidade_Sensorial, Rotina_Sono, Seletividade_Alimentar,
                    Comunicacao, Interacao_Social, Observacoes)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (id_pessoa,
                 dados.get("renda_familiar"), dados.get("num_moradores"),
                 dados.get("beneficio_governo"), dados.get("situacao_moradia"),
                 dados.get("nivel_escolaridade"), dados.get("tipo_escola"),
                 dados.get("mediador_escolar"), dados.get("desafios_escolares"),
                 dados.get("plano_saude"), dados.get("lista_espera"),
                 dados.get("comorbidades"), dados.get("rede_apoio"),
                 dados.get("sensibilidade_sensorial"), dados.get("rotina_sono"),
                 dados.get("seletividade_alimentar"), dados.get("comunicacao"),
                 dados.get("interacao_social"), dados.get("observacoes")),
            )

            conn.commit()
            return {"id_pessoa": id_pessoa, "mensagem": "Dependente cadastrado"}, 201

    def listar(self):
        with db.conectar() as conn:
            cur = conn.execute("""
                SELECT p.*, pc.Idade_Diagnostico, pc.Nivel_Suporte, pc.Medicacoes_Continuas
                FROM PESSOA_TEA p
                LEFT JOIN PERFIL_CLINICO pc ON pc.ID_Pessoa = p.ID_Pessoa
            """)
            return db.linhas(cur), 200

    def obter(self, id_pessoa):
        with db.conectar() as conn:
            cur = conn.execute("""
                SELECT p.*, pc.Idade_Diagnostico, pc.Nivel_Suporte, pc.Medicacoes_Continuas,
                       ce.Renda_Familiar, ce.Num_Moradores, ce.Beneficio_Governo,
                       ce.Situacao_Moradia, ce.Nivel_Escolaridade, ce.Tipo_Escola,
                       ce.Mediador_Escolar, ce.Plano_Saude, ce.Comunicacao
                FROM PESSOA_TEA p
                LEFT JOIN PERFIL_CLINICO pc ON pc.ID_Pessoa = p.ID_Pessoa
                LEFT JOIN PERFIL_CENSO   ce ON ce.ID_Pessoa = p.ID_Pessoa
                WHERE p.ID_Pessoa = ?
            """, (id_pessoa,))
            rows = db.linhas(cur)
            if not rows:
                return {"erro": "Não encontrado"}, 404
            return rows[0], 200

    def atualizar(self, id_pessoa, d):
        with db.conectar() as conn:
            cur = conn.execute(
                """UPDATE PESSOA_TEA
                   SET Nome_Completo = ?, Data_Nascimento = ?, Sexo = ?,
                       Bairro = ?, Grau_Parentesco = ?
                   WHERE ID_Pessoa = ?""",
                (d["nome_completo"], d["data_nascimento"], d["sexo"],
                 d["bairro"], d["grau_parentesco"], id_pessoa),
            )
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            # Atualiza o perfil clínico
            conn.execute(
                """INSERT INTO PERFIL_CLINICO (ID_Pessoa, Idade_Diagnostico, Nivel_Suporte)
                   VALUES (?, ?, ?)
                   ON CONFLICT(ID_Pessoa) DO UPDATE SET
                       Idade_Diagnostico = excluded.Idade_Diagnostico,
                       Nivel_Suporte     = excluded.Nivel_Suporte""",
                (id_pessoa, d.get("idade_diagnostico"), d.get("nivel_suporte")),
            )
            conn.commit()
            return {"mensagem": "Pessoa atualizada"}, 200

    def excluir(self, id_pessoa):
        with db.conectar() as conn:
            conn.execute("DELETE FROM ACOMPANHAMENTO WHERE ID_Pessoa = ?", (id_pessoa,))
            conn.execute("DELETE FROM PERFIL_CLINICO WHERE ID_Pessoa = ?", (id_pessoa,))
            conn.execute("DELETE FROM PERFIL_CENSO   WHERE ID_Pessoa = ?", (id_pessoa,))
            cur = conn.execute("DELETE FROM PESSOA_TEA WHERE ID_Pessoa = ?", (id_pessoa,))
            conn.commit()
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            return {"mensagem": "Pessoa excluída"}, 200


class ProfissionalSaude:
    def criar(self, nome, especialidade, telefone=None):
        with db.conectar() as conn:
            cur = conn.execute(
                "INSERT INTO PROFISSIONAL_SAUDE (Nome_Profissional, Especialidade, Telefone) VALUES (?, ?, ?)",
                (nome, especialidade, telefone),
            )
            conn.commit()
            return {"id_profissional": cur.lastrowid, "mensagem": "Profissional cadastrado"}, 201

    def listar(self):
        with db.conectar() as conn:
            cur = conn.execute("SELECT * FROM PROFISSIONAL_SAUDE ORDER BY Nome_Profissional")
            return db.linhas(cur), 200

    def atualizar(self, id_profissional, nome, especialidade, telefone=None):
        with db.conectar() as conn:
            cur = conn.execute(
                """UPDATE PROFISSIONAL_SAUDE
                   SET Nome_Profissional = ?, Especialidade = ?, Telefone = ?
                   WHERE ID_Profissional = ?""",
                (nome, especialidade, telefone, id_profissional),
            )
            conn.commit()
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            return {"mensagem": "Profissional atualizado"}, 200

    def excluir(self, id_profissional):
        with db.conectar() as conn:
            conn.execute("DELETE FROM ACOMPANHAMENTO WHERE ID_Profissional = ?", (id_profissional,))
            cur = conn.execute("DELETE FROM PROFISSIONAL_SAUDE WHERE ID_Profissional = ?", (id_profissional,))
            conn.commit()
            if cur.rowcount == 0:
                return {"erro": "Não encontrado"}, 404
            return {"mensagem": "Profissional excluído"}, 200


# acompanhamento
class Acompanhamento:
    def criar(self, id_pessoa, id_profissional, data_inicio):
        with db.conectar() as conn:
            conn.execute(
                """INSERT INTO ACOMPANHAMENTO (ID_Pessoa, ID_Profissional, Data_Inicio_Tratamento)
                   VALUES (?, ?, ?)""",
                (id_pessoa, id_profissional, data_inicio),
            )
            conn.commit()
            return {"mensagem": "Acompanhamento registrado"}, 201

    def listar_por_pessoa(self, id_pessoa):
        with db.conectar() as conn:
            cur = conn.execute("""
                SELECT a.*, ps.Nome_Profissional, ps.Especialidade, ps.Telefone
                FROM ACOMPANHAMENTO a
                JOIN PROFISSIONAL_SAUDE ps ON ps.ID_Profissional = a.ID_Profissional
                WHERE a.ID_Pessoa = ?
            """, (id_pessoa,))
            return db.linhas(cur), 200


# Instâncias
responsavel     = Responsavel()
pessoa_tea      = PessoaTEA()
profissional    = ProfissionalSaude()
acompanhamento  = Acompanhamento()


# CORS 
@app.after_request
def cors(response):
    response.headers["Access-Control-Allow-Origin"]  = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response

@app.route("/api/<path:p>", methods=["OPTIONS"])
def preflight(_):
    return "", 204


@app.route("/api/login", methods=["POST"])
def login():
    d = request.get_json()
    with db.conectar() as conn:
        cur = conn.execute(
            "SELECT ID_Responsavel FROM RESPONSAVEL WHERE Email = ? AND Senha = ?",
            (d["email"], d["senha"]),
        )
        row = cur.fetchone()
    if not row:
        return jsonify({"erro": "E-mail ou senha incorretos"}), 401
    return jsonify({"id_responsavel": row["ID_Responsavel"], "mensagem": "Login realizado"}), 200

@app.route("/api/responsavel", methods=["POST"])
def criar_responsavel():
    d = request.get_json()
    dados, status = responsavel.criar(
        d["nome_completo"], d["email"], d["senha"], d["data_aceite"], d.get("telefone_contato")
    )
    return jsonify(dados), status

@app.route("/api/responsaveis", methods=["GET"])
def listar_responsaveis():
    dados, status = responsavel.listar()
    return app.response_class(
        json.dumps(dados, default=serializar), mimetype="application/json"
    ), status

@app.route("/api/responsavel/<int:id_responsavel>", methods=["PUT"])
def atualizar_responsavel(id_responsavel):
    dados, status = responsavel.atualizar(id_responsavel, request.get_json())
    return jsonify(dados), status

@app.route("/api/responsavel/<int:id_responsavel>", methods=["DELETE"])
def excluir_responsavel(id_responsavel):
    dados, status = responsavel.excluir(id_responsavel)
    return jsonify(dados), status


@app.route("/api/pessoa", methods=["POST"])
def criar_pessoa():
    d = request.get_json()
    dados, status = pessoa_tea.criar(d)
    return jsonify(dados), status

@app.route("/api/pessoas", methods=["GET"])
def listar_pessoas():
    dados, status = pessoa_tea.listar()
    return app.response_class(
        json.dumps(dados, default=serializar), mimetype="application/json"
    ), status

@app.route("/api/pessoa/<int:id_pessoa>", methods=["GET"])
def obter_pessoa(id_pessoa):
    dados, status = pessoa_tea.obter(id_pessoa)
    return app.response_class(
        json.dumps(dados, default=serializar), mimetype="application/json"
    ), status

@app.route("/api/pessoa/<int:id_pessoa>", methods=["PUT"])
def atualizar_pessoa(id_pessoa):
    dados, status = pessoa_tea.atualizar(id_pessoa, request.get_json())
    return jsonify(dados), status

@app.route("/api/pessoa/<int:id_pessoa>", methods=["DELETE"])
def excluir_pessoa(id_pessoa):
    dados, status = pessoa_tea.excluir(id_pessoa)
    return jsonify(dados), status


@app.route("/api/profissional", methods=["POST"])
def criar_profissional():
    d = request.get_json()
    dados, status = profissional.criar(
        d["nome_profissional"], d["especialidade"], d.get("telefone")
    )
    return jsonify(dados), status

@app.route("/api/profissionais", methods=["GET"])
def listar_profissionais():
    dados, status = profissional.listar()
    return jsonify(dados), status

@app.route("/api/profissional/<int:id_profissional>", methods=["PUT"])
def atualizar_profissional(id_profissional):
    d = request.get_json()
    dados, status = profissional.atualizar(
        id_profissional, d["nome_profissional"], d["especialidade"], d.get("telefone")
    )
    return jsonify(dados), status

@app.route("/api/profissional/<int:id_profissional>", methods=["DELETE"])
def excluir_profissional(id_profissional):
    dados, status = profissional.excluir(id_profissional)
    return jsonify(dados), status


@app.route("/api/acompanhamento", methods=["POST"])
def criar_acompanhamento():
    d = request.get_json()
    dados, status = acompanhamento.criar(
        d["id_pessoa"], d["id_profissional"], d["data_inicio_tratamento"]
    )
    return jsonify(dados), status

@app.route("/api/acompanhamentos/<int:id_pessoa>", methods=["GET"])
def listar_acompanhamentos(id_pessoa):
    dados, status = acompanhamento.listar_por_pessoa(id_pessoa)
    return app.response_class(
        json.dumps(dados, default=serializar), mimetype="application/json"
    ), status


@app.route("/api/dados", methods=["GET"])
def dados_dashboard():
    with db.conectar() as conn:
        responsaveis = db.linhas(conn.execute(
            "SELECT ID_Responsavel, Nome_Completo, Email, Data_Aceite, Telefone_Contato FROM RESPONSAVEL"
        ))
        pessoas = db.linhas(conn.execute("""
            SELECT p.ID_Pessoa, p.Nome_Completo, p.Data_Nascimento, p.Sexo,
                   p.Bairro, p.Grau_Parentesco,
                   pc.Nivel_Suporte, pc.Idade_Diagnostico,
                   ce.Renda_Familiar, ce.Num_Moradores, ce.Beneficio_Governo,
                   ce.Situacao_Moradia, ce.Nivel_Escolaridade, ce.Tipo_Escola,
                   ce.Mediador_Escolar, ce.Plano_Saude, ce.Rede_Apoio,
                   ce.Rotina_Sono, ce.Seletividade_Alimentar, ce.Comunicacao,
                   ce.Observacoes
            FROM PESSOA_TEA p
            LEFT JOIN PERFIL_CLINICO pc ON pc.ID_Pessoa = p.ID_Pessoa
            LEFT JOIN PERFIL_CENSO   ce ON ce.ID_Pessoa = p.ID_Pessoa
        """))
        profissionais = db.linhas(conn.execute(
            "SELECT * FROM PROFISSIONAL_SAUDE ORDER BY Nome_Profissional"
        ))
        acompanhamentos = db.linhas(conn.execute("""
            SELECT a.ID_Pessoa, a.ID_Profissional, a.Data_Inicio_Tratamento,
                   p.Nome_Completo, ps.Nome_Profissional, ps.Especialidade
            FROM ACOMPANHAMENTO a
            JOIN PESSOA_TEA p ON p.ID_Pessoa = a.ID_Pessoa
            JOIN PROFISSIONAL_SAUDE ps ON ps.ID_Profissional = a.ID_Profissional
        """))

    payload = {
        "responsaveis":    responsaveis,
        "pessoas":         pessoas,
        "profissionais":   profissionais,
        "acompanhamentos": acompanhamentos,
    }
    return app.response_class(
        json.dumps(payload, default=serializar), mimetype="application/json"
    )


# ════════════════════════════════════════════════════════════
if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
