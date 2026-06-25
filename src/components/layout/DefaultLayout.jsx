import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/*(Home, Cadastro, etc) */}
      </main>
      <Footer />
    </>
  );
}