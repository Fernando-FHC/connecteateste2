export function Step5Saude({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>5. Saúde e Terapias</h2>
      <p className="form-subtitle">Informações sobre acesso a serviços de saúde e rede de apoio.</p>
      
      <div className="form-group">
        <label htmlFor="planoSaude">Acesso a serviços de saúde: <span className="obrigatorio">*</span></label>
        <select 
          id="planoSaude" 
          name="planoSaude" 
          value={data.planoSaude || ''} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione...</option>
          <option value="exclusivo_sus">Exclusivamente SUS (Rede Pública)</option>
          <option value="convenio_particular">Plano de Saúde Particular</option>
          <option value="ambos">Ambos (SUS e Particular)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="listaEspera">A pessoa com TEA está na lista de espera para alguma terapia ou atendimento especializado? Se sim, quais?</label>
        <textarea 
          id="listaEspera" 
          name="listaEspera" 
          value={data.listaEspera || ''} 
          onChange={handleChange} 
          placeholder="Ex: Aguardando vaga para fonoaudiólogo na rede municipal há 6 meses..."
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="comorbidades">Existem outras condições de saúde associadas (Comorbidades)?</label>
        <textarea 
          id="comorbidades" 
          name="comorbidades" 
          value={data.comorbidades || ''} 
          onChange={handleChange} 
          placeholder="Ex: TDAH, Epilepsia, Transtorno de Ansiedade, Apneia do sono, etc..."
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="redeApoio">A família participa de algum grupo de apoio ou associação de pais?</label>
        <select 
          id="redeApoio" 
          name="redeApoio" 
          value={data.redeApoio || ''} 
          onChange={handleChange} 
        >
          <option value="">Selecione...</option>
          <option value="sim_ong">Sim, de uma ONG / Associação local</option>
          <option value="sim_virtual">Sim, grupos virtuais (WhatsApp, Facebook)</option>
          <option value="nao">Não participo</option>
          <option value="desconhece">Não conheço grupos na minha região</option>
        </select>
      </div>
    </section>
  );
}