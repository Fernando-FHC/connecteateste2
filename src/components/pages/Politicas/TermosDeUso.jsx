import { Link } from 'react-router-dom';
import '../../../assets/css/politica.css';

export function TermosDeUso() {
  return (
    <main className="policy-main">
      <div className="container">
        <header className="policy-header">
          <h1>Termos e Condições de Uso</h1>
          <p className="last-update">Última atualização: 25 de novembro de 2025</p>
        </header>

        <article className="policy-content">
          <section className="policy-section">
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao utilizar o sistema Censo Autista, você concorda em cumprir estes Termos de Uso. O projeto é uma iniciativa de pesquisa do IFSP Bragança Paulista e o uso indevido da plataforma é estritamente proibido.</p>
          </section>

          <section className="policy-section">
            <h2>2. Uso do Serviço</h2>
            <p>A plataforma destina-se exclusivamente à coleta de dados estatísticos. O utilizador compromete-se a fornecer informações verdadeiras e atualizadas sobre a pessoa com TEA e o seu respetivo contexto socioeconómico.</p>
          </section>

          <section className="policy-section">
            <h2>3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo, logótipos e arquitetura do sistema são de propriedade intelectual do IFSP. A reprodução total ou parcial para fins comerciais sem autorização prévia é proibida.</p>
          </section>

          <section className="policy-section">
            <h2>4. Responsabilidades</h2>
            <p>O utilizador é responsável pela guarda das suas credenciais de acesso. O IFSP não se responsabiliza por danos decorrentes de informações falsas inseridas no sistema ou pelo uso inadequado da conta por terceiros.</p>
          </section>

          <footer className="policy-footer">
            <div className="footer-actions">
              <Link to="/login" className="btn btn-primary">Ir para Login</Link>
              <Link to="/politica-privacidade" className="btn btn-secondary">Ver Privacidade</Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}