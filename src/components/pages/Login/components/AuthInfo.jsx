export function AuthInfo() {
  return (
    <div className="auth-info">
      <div className="info-content">
        <h3>Sistema de Censo Autista</h3>
        <p>
          Plataforma desenvolvida pelo IFSP Bragança Paulista para coleta e 
          análise de dados da comunidade autista.
        </p>
        <div className="info-features">
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <div>
              <h4>Segurança</h4>
              <p>Seus dados protegidos com criptografia</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <div>
              <h4>Análise de Dados</h4>
              <p>Informações para políticas públicas</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤝</span>
            <div>
              <h4>Comunidade</h4>
              <p>Juntos por um futuro inclusivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}