import logo from '../../../assets/images/logo.png';

export function Footer() {
  return (
    <footer id="contato" className="main-footer">
      <div className="container footer-container">
        <div className="logo-footer">
          <img src={logo} alt="Logo IFSP" className="footer-logo" />
          <p>Instituto Federal de São Paulo<br />Bragança Paulista</p>
        </div>
        <div className="footer-column">
          <h3>Contato</h3>
          <ul className="contact-list">
            <li><a href="mailto:censoautista@ifsp.edu.br"><span>📧</span> censoautista@ifsp.edu.br</a></li>
            <li><a href="tel:+55112039XXXX"><span>📞</span> (11) 2039-XXXX</a></li>
            <li><span>📍</span> Bragança Paulista</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Links úteis</h3>
          <ul className="footer-links">
            <li><a href="#">Portal IFSP-BRA</a></li>
            <li><a href="/politica-privacidade">Política de Privacidade</a></li>
            <li><a href="/termos-de-uso">Termos de Uso</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <div className="container">
          <p>&copy; 2025 IFSP Bragança Paulista. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}