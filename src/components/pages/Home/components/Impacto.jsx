import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import sobre1 from '../../../../assets/images/sobre1.svg';
import sobre2 from '../../../../assets/images/sobre2.svg';
import sobre3 from '../../../../assets/images/sobre3.svg';


function AnimatedBlock({ img, alt, title, text, reverse, delay }) {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <article
      ref={ref}
      className={`blocks ${reverse ? 'reverse' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
      }}
    >
      <img src={img} alt={alt} />
      <div className="text">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

export function Impacto() {
  return (
    <section id="impacto" className="impact-section">
      <div className="container">
        <h2>Cada Resposta Conta</h2>
        <p className="impact-subtitle">
          Seus dados ajudam a construir um panorama real das necessidades da comunidade autista
        </p>
        
        <div className="benefits-grid">
          <AnimatedBlock
            img={sobre1}
            alt="Ilustração políticas"
            title="Políticas Públicas Direcionadas"
            text="Com dados precisos, gestores públicos podem criar programas e serviços que realmente atendam às necessidades específicas das famílias autistas."
            delay={0}
          />
          
          <AnimatedBlock
            img={sobre2}
            alt="Ilustração visibilidade"
            title="Visibilidade e Recursos"
            text="Demonstrar a dimensão da comunidade autista auxilia na captação de recursos e na priorização de investimentos em educação, saúde e assistência social."
            reverse={true}
            delay={0.2}
          />
          
          <AnimatedBlock
            img={sobre3}
            alt="Ilustração rede de apoio"
            title="Fortalecimento da Rede de Apoio"
            text="O censo permite identificar demandas comuns e facilita a criação de grupos de apoio, eventos e iniciativas de conscientização na comunidade."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}