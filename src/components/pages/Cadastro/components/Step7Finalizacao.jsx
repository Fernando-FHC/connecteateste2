export function Step7Finalizacao({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="form-section active">
      <h2>7. Considerações Finais</h2>
      <p className="form-subtitle">Espaço para observações adicionais e finalização do cadastro.</p>
      
      <div className="form-group">
        <label htmlFor="observacoes">Observações Gerais:</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={data.observacoes || ''}
          onChange={handleChange}
          rows="6"
          placeholder="Use este espaço para relatar qualquer informação importante que não foi mencionada nas seções anteriores..."
        ></textarea>
      </div>

      <div className="final-notice">
        <p>Ao clicar em <strong>Finalizar Cadastro</strong>, seus dados serão processados e incluídos na base estatística do Censo Autista de Bragança Paulista.</p>
        <p>Agradecemos imensamente pela sua participação e contribuição para a comunidade.</p>
      </div>
    </section>
  );
}