import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
//import './styles.css'; // Se optar por separar o CSS por componente

export function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo IFSP" />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/#sobre">Sobre</a></li>
            <li><a href="/#impacto">Por que Cadastrar</a></li>
            <li><a href="/#equipe">Responsáveis</a></li>
            <li><a href="/#contato">Contato</a></li>
            <li><Link to="/dados">Dados do Censo</Link></li>
          </ul>
        </nav>
        
        {/* Lógica condicional: se estiver no login, mostra 'Voltar', senão mostra 'Login' */}
        {isLoginPage ? (
          <Link to="/" className="btn btn-login">Voltar</Link>
        ) : (
          <Link to="/login" className="btn btn-login">Login</Link>
        )}
      </div>
    </header>
  );
}