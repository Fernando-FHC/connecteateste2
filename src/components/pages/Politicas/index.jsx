import { Link } from 'react-router-dom';
import '../../../assets/css/politica.css';

export function PoliticaPrivacidade() {
  return (
    <main className="policy-main">
      <div className="container">
        <header className="policy-header">
          <h1>Política de Privacidade e Proteção de Dados</h1>
          <p className="last-update">Última atualização: 25 de novembro de 2025</p>
        </header>

        <article className="policy-content">
          <section className="policy-section">
            <h2>1. Introdução</h2>
            <p>O Instituto Federal de São Paulo (IFSP) - Campus Bragança Paulista, por meio do projeto Censo Autista, está comprometido com a proteção da privacidade e dos dados pessoais de todos os participantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).</p>
          </section>

          <section className="policy-section">
            <h2>2. Dados Coletados</h2>
            <h3>2.1. Dados Pessoais</h3>
            <ul>
              <li>Nome completo da pessoa com TEA</li>
              <li>Data de nascimento e idade</li>
              <li>Sexo</li>
              <li>Município e bairro de residência</li>
              <li>Telefone para contato</li>
              <li>Nome e grau de parentesco do responsável</li>
            </ul>
            <h3>2.2. Dados Sensíveis de Saúde</h3>
            <ul>
              <li>Informações sobre diagnóstico de TEA</li>
              <li>Nível de suporte do TEA</li>
              <li>Profissionais de saúde que acompanham</li>
              <li>Medicações em uso</li>
              <li>Características comportamentais e sensoriais</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Finalidade do Tratamento</h2>
            <p>Os dados coletados serão utilizados exclusivamente para:</p>
            <ul>
              <li>Pesquisa Acadêmica e estudos estatísticos</li>
              <li>Subsidiar a criação de políticas públicas em Bragança Paulista</li>
              <li>Identificar demandas para serviços de saúde e educação</li>
              <li>Facilitar a criação de redes de apoio para as famílias</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Seus Direitos (LGPD)</h2>
            <div className="rights-grid">
              <article className="right-item">
                <h4>📋 Acesso</h4>
                <p>Confirmar a existência de tratamento e aceder aos seus dados</p>
              </article>
              <article className="right-item">
                <h4>✏️ Correção</h4>
                <p>Solicitar a correção de dados incompletos ou inexatos</p>
              </article>
              <article className="right-item">
                <h4>🗑️ Eliminação</h4>
                <p>Solicitar a exclusão de dados tratados com base no consentimento</p>
              </article>
              <article className="right-item">
                <h4>❌ Revogação</h4>
                <p>Revogar o seu consentimento a qualquer momento</p>
              </article>
            </div>
          </section>

          <section className="policy-section highlight-section">
            <h2>5. Consentimento</h2>
            <p>Ao participar do Censo, você declara que compreendeu esta política e autoriza o uso dos dados para as finalidades de pesquisa especificadas.</p>
          </section>

          <footer className="policy-footer">
            <div className="footer-actions">
              <Link to="/cadastro" className="btn btn-primary">Prosseguir para Cadastro</Link>
              <Link to="/" className="btn btn-secondary">Voltar ao Início</Link>
            </div>
            <p className="footer-note">Dúvidas? Entre em contacto: censoautista@ifsp.edu.br</p>
          </footer>
        </article>
      </div>
    </main>
  );
}