export function ForgotPasswordModal({ isOpen, onClose }) {
  // Se isOpen for falso, não renderizamos nada na tela
  if (!isOpen) return null;

  return (
    <div className={`forgot-password-modal ${isOpen ? 'show' : ''}`}>
      <div className="forgot-password-content">
        <div className="forgot-password-icon">
          <span>🔒</span>
        </div>
        
        <h3>Recuperação de Senha</h3>
        <p>Para redefinir sua senha, por favor entre em contato com o suporte técnico do projeto através do e-mail abaixo:</p>
        
        {/* Informação de contato baseada no padrão do IFSP */}
        <div className="email-contact">
          censoautista@ifsp.edu.br
        </div>
        
        <p>Nossa equipe enviará um link seguro para a redefinição.</p>
        
        <button 
          className="forgot-password-btn" 
          onClick={onClose}
        >
          Entendi, Voltar
        </button>
      </div>
    </div>
  );
}