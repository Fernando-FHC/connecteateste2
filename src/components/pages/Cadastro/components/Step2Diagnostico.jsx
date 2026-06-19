export function Step2Diagnostico({ data, updateData }) {
  // Função para capturar o que o usuário digita e atualizar o estado central
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>2. Diagnóstico e Acompanhamento</h2>
      <p className="form-subtitle">Informações sobre o laudo e acompanhamento profissional.</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="idadeDiagnostico">Idade em que recebeu o diagnóstico:</label>
          <input 
            type="number" 
            id="idadeDiagnostico" 
            name="idadeDiagnostico" 
            value={data.idadeDiagnostico || ''} 
            onChange={handleChange} 
            placeholder="Ex: 3"
            min="0"
            max="100"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nivelSuporte">Nível de Suporte (TEA): <span className="obrigatorio">*</span></label>
          <select 
            id="nivelSuporte" 
            name="nivelSuporte" 
            value={data.nivelSuporte || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="1">Nível 1 (Suporte Leve)</option>
            <option value="2">Nível 2 (Suporte Moderado)</option>
            <option value="3">Nível 3 (Suporte Substancial)</option>
            <option value="investigacao">Ainda em investigação</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>A pessoa com TEA é acompanhada por algum profissional de saúde?</label>
        <p className="form-subtitle">Se sim, informe os dados do profissional abaixo (Neurologista, Psicólogo, Fonoaudiólogo, etc.).</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="profissionalNome">Nome:</label>
          <input
            type="text"
            id="profissionalNome"
            name="profissionalNome"
            value={data.profissionalNome || ''}
            onChange={handleChange}
            placeholder="Ex: Dra. Juliana Mendes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profissionalEspecialidade">Especialidade:</label>
          <input
            type="text"
            id="profissionalEspecialidade"
            name="profissionalEspecialidade"
            value={data.profissionalEspecialidade || ''}
            onChange={handleChange}
            placeholder="Ex: Fonoaudióloga"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="profissionalTelefone">Telefone:</label>
        <input
          type="tel"
          id="profissionalTelefone"
          name="profissionalTelefone"
          value={data.profissionalTelefone || ''}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
          maxLength="15"
        />
      </div>

      <div className="form-group">
        <label htmlFor="medicacoes">Medicações em uso contínuo (se houver):</label>
        <textarea 
          id="medicacoes" 
          name="medicacoes" 
          value={data.medicacoes || ''} 
          onChange={handleChange} 
          rows="2"
          placeholder="Ex: Risperidona, Aripiprazol..."
        ></textarea>
      </div>
    </section>
  );
}