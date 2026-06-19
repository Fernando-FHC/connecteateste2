export function Step3Socioeconomico({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>3. Perfil Socioeconômico</h2>
      <p className="form-subtitle">Dados para compreensão da realidade estrutural e financeira da família.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rendaFamiliar">Renda Familiar Mensal: <span className="obrigatorio">*</span></label>
          <select 
            id="rendaFamiliar" 
            name="rendaFamiliar" 
            value={data.rendaFamiliar || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="ate_1">Até 1 salário mínimo</option>
            <option value="1_a_3">De 1 a 3 salários mínimos</option>
            <option value="3_a_6">De 3 a 6 salários mínimos</option>
            <option value="mais_de_6">Mais de 6 salários mínimos</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="pessoasResidencia">Nº de pessoas na residência: <span className="obrigatorio">*</span></label>
          <input 
            type="number" 
            id="pessoasResidencia" 
            name="pessoasResidencia" 
            value={data.pessoasResidencia || ''} 
            onChange={handleChange} 
            required
            min="1"
            max="20"
            placeholder="Ex: 4"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="beneficioGoverno">A pessoa com TEA recebe algum benefício do governo? (Ex: BPC/LOAS, Bolsa Família) <span className="obrigatorio">*</span></label>
        <select 
          id="beneficioGoverno" 
          name="beneficioGoverno" 
          value={data.beneficioGoverno || ''} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione...</option>
          <option value="bpc">Sim, BPC/LOAS</option>
          <option value="bolsa_familia">Sim, Bolsa Família</option>
          <option value="outros">Sim, outros</option>
          <option value="nao">Não recebe</option>
          <option value="aguardando">Aguardando aprovação</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="situacaoMoradia">Situação de Moradia: <span className="obrigatorio">*</span></label>
        <select 
          id="situacaoMoradia" 
          name="situacaoMoradia" 
          value={data.situacaoMoradia || ''} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione...</option>
          <option value="propria">Própria quitada</option>
          <option value="propria_financiada">Própria financiada</option>
          <option value="alugada">Alugada</option>
          <option value="cedida">Cedida (por parentes, empresa, etc.)</option>
          <option value="ocupacao">Ocupação / Área irregular</option>
        </select>
      </div>
    </section>
  );
}