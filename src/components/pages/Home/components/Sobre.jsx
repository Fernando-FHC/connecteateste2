export function Sobre() {
  return (
    <section id="sobre" className="about-project">
      <div className="container">
        <h2>Sobre o Projeto</h2>
        <p>
          Este projeto é uma iniciativa do Instituto Federal de São Paulo (IFSP) - Campus 
          Bragança Paulista, desenvolvido em parceria com a comunidade local e órgãos 
          municipais. Nosso objetivo é coletar dados socioeconômicos que subsidiem a criação 
          e aprimoramento de políticas públicas voltadas para pessoas com Transtorno do 
          Espectro Autista (TEA) e suas famílias.
        </p>
        <ul className="features-list">
          <li>
            <span className="check-icon">✓</span>
            <h3>Confidencialidade Garantida</h3>
            <p>Todos os dados são protegidos e utilizados apenas para fins de pesquisa</p>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <h3>Processo Simples e Rápido</h3>
            <p>O questionário leva, no máximo, 10 minutos para ser preenchido</p>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <h3>Impacto Real na Comunidade</h3>
            <p>Resultados serão compartilhados com gestores públicos para ação imediata</p>
          </li>
        </ul>
      </div>
    </section>
  );
}