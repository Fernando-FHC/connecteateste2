import { useState } from 'react';
import { Link } from 'react-router-dom';
import mainImg from '../../../../assets/images/main.svg';
import main2Img from '../../../../assets/images/main2.jpeg';
import main3Img from '../../../../assets/images/main3.jpeg';

const slides = [
  {
    title: "Junto construímos um futuro mais inclusivo",
    description: "Cadastre sua família no Censo Autista de Bragança Paulista. Seus dados são fundamentais para o desenvolvimento de políticas públicas que atendam às reais necessidades da comunidade autista.",
    buttonText: "Cadastre-se",
    buttonLink: "/login",
    image: mainImg
  },
  {
    title: "Sua voz importa para nossa comunidade",
    description: "Participe do censo e ajude a mapear as necessidades das famílias autistas. Cada cadastro representa um passo importante para políticas mais efetivas e inclusivas em nossa cidade.",
    buttonText: "Saiba Mais",
    buttonLink: "#sobre",
    image: main2Img
  },
  {
    title: "Dados seguros e confidenciais",
    description: "Todas as informações coletadas são tratadas com total sigilo e segurança. O censo respeita a privacidade das famílias e utiliza os dados exclusivamente para planejamento de políticas públicas.",
    buttonText: "Política de Privacidade",
    buttonLink: "/politica-privacidade",
    image: main3Img
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      <div className="carousel-wrapper">
        <div 
          className="carousel-container" 
          style={{ transform: `translateX(-${currentSlide * 100}%)`, display: 'flex', transition: 'transform 0.5s ease' }}
        >
          {slides.map((slide, index) => (
            <div className="carousel-slide" key={index} style={{ minWidth: '100%' }}>
              <div className="container hero-content">
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="hero-buttons">
                    {slide.buttonLink.startsWith('/') ? (
                      <Link to={slide.buttonLink} className="btn btn-primary">{slide.buttonText}</Link>
                    ) : (
                      <a href={slide.buttonLink} className="btn btn-primary">{slide.buttonText}</a>
                    )}
                  </div>
                </div>
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de Navegação */}
        <button className="carousel-nav prev" onClick={prevSlide} aria-label="Slide anterior">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button className="carousel-nav next" onClick={nextSlide} aria-label="Próximo slide">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        {/* Indicadores */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`} 
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}