export function FormNavigation({ currentStep, totalSteps, onNext, onPrev }) {
  return (
    <div className="form-navigation">
      {currentStep > 1 && (
        <button type="button" className="btn btn-secondary" id="prevBtn" onClick={onPrev}>
          Anterior
        </button>
      )}
      
      {currentStep < totalSteps ? (
        // As `key`s distintas impedem que o React reaproveite o mesmo nó do
        // DOM ao trocar de "Próximo" para "Enviar". Sem isso, o clique em
        // "Próximo" na penúltima etapa cairia no botão que acabou de virar
        // type="submit", enviando o formulário antes da hora.
        <button type="button" key="nextBtn" className="btn btn-primary" id="nextBtn" onClick={onNext}>
          Próximo
        </button>
      ) : (
        <button type="submit" key="submitBtn" className="btn btn-primary" id="submitBtn">
          Enviar Cadastro
        </button>
      )}
    </div>
  );
}