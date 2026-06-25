import { HeroCarousel } from './components/HeroCarousel';
import { Sobre } from './components/Sobre'; 
import { Equipe } from './components/Equipe';
import { Impacto } from './components/Impacto';
import { CallToAction } from './components/CallToAction';

export function Home() {
  return (
    <>
        <HeroCarousel />
        <Sobre /> 
        <Impacto /> 
        <Equipe />
        <CallToAction /> 
    </>
  );
}