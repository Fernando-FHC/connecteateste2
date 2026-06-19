import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { cadastrarResponsavel } from '../../../../services/api';

export function RegisterForm({ onSwitch }) {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { values, handleChange, resetForm } = useForm({
    name: '',
    telefone: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    // Validação de senha
    if (values.password !== values.confirmPassword) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (!values.terms) {
      setErro('Você precisa aceitar os termos de uso.');
      return;
    }

    setCarregando(true);
    try {
      await cadastrarResponsavel({
        nome_completo:    values.name,
        email:            values.email,
        senha:            values.password,
        data_aceite:      new Date().toISOString().split('T')[0],
        telefone_contato: values.telefone || null,
      });

      resetForm();
      // Redireciona para o formulário 
      navigate('/formulario');
    } catch (e) {
      setErro(e.message || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form className="auth-form active" onSubmit={handleSubmit}>
      <h2>Criar nova conta</h2>
      <p className="form-subtitle">Preencha os dados abaixo para se cadastrar</p>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="registerName">Nome completo</label>
          <input
            type="text"
            id="registerName"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="Seu nome"
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerTelefone">Telefone</label>
          <input
            type="tel"
            id="registerTelefone"
            name="telefone"
            value={values.telefone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
            maxLength="15"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="registerEmail">E-mail</label>
        <input
          type="email"
          id="registerEmail"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          placeholder="seu@email.com"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="registerPassword">Senha</label>
          <input
            type="password"
            id="registerPassword"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            placeholder="Crie uma senha"
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerConfirmPassword">Confirmar senha</label>
          <input
            type="password"
            id="registerConfirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Repita a senha"
          />
        </div>
      </div>

      {/* Exibe erro se houver */}
      {erro && (
        <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          {erro}
        </p>
      )}

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={handleChange}
            required
          />
          <span>
            Aceito os <a href="/termos-de-uso">termos de uso</a> e{' '}
            <a href="/politica-privacidade">política de privacidade</a>
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-full" disabled={carregando}>
        {carregando ? 'Cadastrando...' : 'Criar conta'}
      </button>

      <div className="form-divider"><span>ou</span></div>

      <p className="form-footer">
        Já tem uma conta?{' '}
        <a
          href="#login"
          className="switch-form"
          onClick={(e) => { e.preventDefault(); onSwitch(); }}
        >
          Faça login aqui
        </a>
      </p>
    </form>
  );
}