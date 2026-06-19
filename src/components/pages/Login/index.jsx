import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AuthInfo } from './components/AuthInfo';
// Certifique-se de importar o CSS correspondente
import '../../../assets/css/login.css'; 

export function Login() {
  // Estado que controla qual formulário está visível
  const [activeTab, setActiveTab] = useState('login');

  return (
    <main className="auth-main">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => setActiveTab('login')}
            >
              Entrar
            </button>
            <button 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`} 
              onClick={() => setActiveTab('register')}
            >
              Cadastrar
            </button>
          </div>
          
          {/* Renderização Condicional: Mostra um ou outro baseado no estado */}
          {activeTab === 'login' ? (
            <LoginForm onSwitch={() => setActiveTab('register')} />
          ) : (
            <RegisterForm onSwitch={() => setActiveTab('login')} />
          )}
        </div>
        
        {/* Painel lateral estático isolado no seu próprio componente */}
        <AuthInfo />
      </div>
    </main>
  );
}