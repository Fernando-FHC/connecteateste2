export function Step6Rotina({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>6. Rotina e Características</h2>
      <p className="form-subtitle">Informações sobre o dia a dia e sensibilidades específicas.</p>
      
      <div className="form-group">
        <label htmlFor="sensibilidadeSensorial">Possui hipersensibilidade sensorial? (Luz, barulho, texturas, cheiros)</label>
        <textarea 
          id="sensibilidadeSensorial" 
          name="sensibilidadeSensorial" 
          value={data.sensibilidadeSensorial || ''} 
          onChange={handleChange} 
          placeholder="Descreva o que costuma causar desconforto e como a pessoa reage..."
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rotinaSono">Qualidade do Sono: <span className="obrigatorio">*</span></label>
          <select 
            id="rotinaSono" 
            name="rotinaSono" 
            value={data.rotinaSono || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="boa">Dorme bem a noite toda</option>
            <option value="dificuldade_pegar">Dificuldade para pegar no sono</option>
            <option value="despertar_noturno">Acorda muitas vezes à noite</option>
            <option value="insonia">Insônia frequente</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="seletividadeAlimentar">Seletividade Alimentar: <span className="obrigatorio">*</span></label>
          <select 
            id="seletividadeAlimentar" 
            name="seletividadeAlimentar" 
            value={data.seletividadeAlimentar || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="nao_possui">Não possui seletividade</option>
            <option value="leve">Leve (rejeita poucos alimentos)</option>
            <option value="moderada">Moderada (aceita grupos específicos)</option>
            <option value="severa">Severa (dieta muito restrita)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="comunicacao">Forma de comunicação predominante: <span className="obrigatorio">*</span></label>
        <select 
          id="comunicacao" 
          name="comunicacao" 
          value={data.comunicacao || ''} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecione...</option>
          <option value="verbal">Verbal (fala fluente)</option>
          <option value="verbal_limitada">Verbal limitada / frases curtas</option>
          <option value="nao_verbal_gestos">Não verbal (comunica-se por gestos)</option>
          <option value="nao_verbal_pecs">Não verbal (usa PECS ou tablet)</option>
          <option value="ecolalia">Predomínio de ecolalia</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="interacaoSocial">Como é a interação social com outras pessoas?</label>
        <textarea 
          id="interacaoSocial" 
          name="interacaoSocial" 
          value={data.interacaoSocial || ''} 
          onChange={handleChange} 
          placeholder="Ex: Prefere brincar sozinho, tem dificuldade em manter contato visual, interage bem com conhecidos..."
        ></textarea>
      </div>
    </section>
  );
}