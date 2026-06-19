import { Link } from 'react-router-dom';

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container text-center">
        <h2>Faça a Diferença Hoje</h2>
        <p>Junte-se a centenas de famílias que já participaram do Censo Autista de Bragança Paulista.</p>
        <Link to="/login" className="btn btn-secondary">
          Cadastrar Agora
        </Link>
      </div>
    </section>
  );
}