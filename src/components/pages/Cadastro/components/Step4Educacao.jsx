export function Step4Educacao({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>4. Educação e Escolaridade</h2>
      <p className="form-subtitle">Informações sobre o ambiente escolar e necessidades de adaptação.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nivelEscolaridade">Nível de Escolaridade Atual: <span className="obrigatorio">*</span></label>
          <select 
            id="nivelEscolaridade" 
            name="nivelEscolaridade" 
            value={data.nivelEscolaridade || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="nao_frequenta">Não frequenta a escola</option>
            <option value="creche">Creche / Educação Infantil</option>
            <option value="fundamental_1">Ensino Fundamental I (1º ao 5º ano)</option>
            <option value="fundamental_2">Ensino Fundamental II (6º ao 9º ano)</option>
            <option value="medio">Ensino Médio</option>
            <option value="superior">Ensino Superior / Técnico</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tipoEscola">Tipo de Instituição: <span className="obrigatorio">*</span></label>
          <select 
            id="tipoEscola" 
            name="tipoEscola" 
            value={data.tipoEscola || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="publica_municipal">Pública Municipal</option>
            <option value="publica_estadual">Pública Estadual</option>
            <option value="privada">Privada / Particular</option>
            <option value="nao_se_aplica">Não se aplica</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="mediadorEscolar">Possui Acompanhante Terapêutico (AT) ou Mediador Escolar? <span className="obrigatorio">*</span></label>
        <select 
          id="mediadorEscolar" 
          name="mediadorEscolar" 
          value={data.mediadorEscolar || ''} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione...</option>
          <option value="sim_escola">Sim, fornecido pela escola</option>
          <option value="sim_familia">Sim, pago pela família</option>
          <option value="nao_precisa">Não, e não tem necessidade</option>
          <option value="nao_mas_precisa">Não possui, mas tem necessidade</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="desafiosEscolares">Quais os principais desafios no ambiente escolar? (Adaptação de material, bullying, acessibilidade, etc.)</label>
        <textarea 
          id="desafiosEscolares" 
          name="desafiosEscolares" 
          value={data.desafiosEscolares || ''} 
          onChange={handleChange} 
          placeholder="Descreva brevemente os desafios enfrentados na escola..."
        ></textarea>
      </div>
    </section>
  );
}