import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fazerLogin } from '../../../../services/api';
import { ForgotPasswordModal } from '../../../ForgotPasswordModal';
import { PasswordField } from './PasswordField';

export function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    // Acesso ao dashboard do site (admin/admin)
    if (email.trim().toLowerCase() === 'admin' && senha === 'admin') {
      sessionStorage.setItem('admin', 'true');
      setCarregando(false);
      navigate('/dashboard');
      return;
    }

    try {
      await fazerLogin(email, senha);
      navigate('/formulario');
    } catch (e) {
      setErro(e.message || 'E-mail ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <form className="auth-form active" onSubmit={handleSubmit}>
        <h2>Bem-vindo de volta!</h2>
        <p className="form-subtitle">Entre com suas credenciais para acessar o sistema</p>

        <div className="form-group">
          <label htmlFor="loginEmail">E-mail</label>
          <input
            type="text"
            id="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loginPassword">Senha</label>
          <PasswordField
            id="loginPassword"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="form-options">
          <label className="checkbox-label">
            <input type="checkbox" name="remember" />
            <span>Lembrar-me</span>
          </label>
          <a
            href="#recuperar"
            className="forgot-link"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
          >
            Esqueceu a senha?
          </a>
        </div>

        {erro && (
          <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            {erro}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-full" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="form-divider"><span>ou</span></div>

        <p className="form-footer">
          Não tem uma conta?{' '}
          <a href="#cadastro" className="switch-form" onClick={(e) => {
            e.preventDefault();
            onSwitch();
          }}>
            Cadastre-se aqui
          </a>
        </p>
      </form>

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
