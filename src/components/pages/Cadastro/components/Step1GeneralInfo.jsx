export function Step1GeneralInfo({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const novoDado = { [name]: value };

    // Sempre que dia, mês ou ano mudar, recalcula idade e dataNascimento
    const dia  = name === 'diaNascimento'  ? value : data.diaNascimento  || '';
    const mes  = name === 'mesNascimento'  ? value : data.mesNascimento  || '';
    const ano  = name === 'anoNascimento'  ? value : data.anoNascimento  || '';

    if (dia && mes && ano && ano.length === 4) {
      // Monta a data no formato YYYY-MM-DD para o banco
      const dataFormatada = `${ano}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;
      novoDado.dataNascimento = dataFormatada;

      // Calcula a idade
      const hoje = new Date();
      const nascimento = new Date(dataFormatada);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
      if (aindaNaoFezAniversario) idade--;
      novoDado.idade = idade >= 0 ? idade : '';
    }

    updateData(novoDado);
  };

  return (
    <section className="form-section active">
      <h2>1. Informações Gerais</h2>
      <div className="form-group">
        <label htmlFor="nomeCompleto">Nome completo da pessoa com TEA: <span className="obrigatorio">*</span></label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          value={data.nomeCompleto || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Data de nascimento: <span className="obrigatorio">*</span></label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              inputMode="numeric"
              maxLength="2"
              name="diaNascimento"
              value={data.diaNascimento || ''}
              onChange={handleChange}
              placeholder="Dia"
              required
              style={{ width: '70px' }}
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength="2"
              name="mesNascimento"
              value={data.mesNascimento || ''}
              onChange={handleChange}
              placeholder="Mês"
              required
              style={{ width: '70px' }}
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength="4"
              name="anoNascimento"
              value={data.anoNascimento || ''}
              onChange={handleChange}
              placeholder="Ano"
              required
              style={{ width: '90px' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="idade">Idade: <span className="obrigatorio">*</span></label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={data.idade || ''}
            readOnly
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sexo">Sexo: <span className="obrigatorio">*</span></label>
          <select
            id="sexo"
            name="sexo"
            value={data.sexo || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro não informar">Prefiro não informar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="parentesco">Grau de parentesco com a pessoa com TEA: <span className="obrigatorio">*</span></label>
          <select
            id="parentesco"
            name="parentesco"
            value={data.parentesco || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Filho">Filho(a)</option>
            <option value="Enteado">Enteado(a)</option>
            <option value="Neto">Neto(a)</option>
            <option value="Irmao">Irmão(ã)</option>
            <option value="Sobrinho">Sobrinho(a)</option>
            <option value="Responsavel legal">Responsável legal</option>
            <option value="O proprio">A própria pessoa com TEA</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bairro">Bairro: <span className="obrigatorio">*</span></label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={data.bairro || ''}
          onChange={handleChange}
          placeholder="Ex: Centro"
          required
        />
      </div>
    </section>
  );
}