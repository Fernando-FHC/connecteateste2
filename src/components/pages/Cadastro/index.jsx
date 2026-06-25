import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/cadastro.css';
import { ProgressBar } from './components/ProgressBar';
import { FormNavigation } from './components/FormNavigation';
import { Step1GeneralInfo } from './components/Step1GeneralInfo';
import { Step2Diagnostico } from './components/Step2Diagnostico';
import { Step3Socioeconomico } from './components/Step3Socioeconomico';
import { Step4Educacao } from './components/Step4Educacao';
import { Step5Saude } from './components/Step5Saude';
import { Step6Rotina } from './components/Step6Rotina';
import { Step7Finalizacao } from './components/Step7Finalizacao';
import { enviarCenso } from '../../../services/api';

export function Cadastro() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [formData, setFormData] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const formRef = useRef(null);

  const updateData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    // Só avança se todos os campos obrigatórios da etapa atual estiveremválidos. reportValidity()
    if (formRef.current && !formRef.current.reportValidity()) return;

    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleKeyDown = (e) => {
    // Impede que o Enter num campo de texto envie o formulário antes de o usuário clicar em Enviar na última etapa.
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep !== totalSteps) return;

    setErro('');
    setEnviando(true);

    try {
      await enviarCenso(formData);
      alert('Censo enviado com sucesso! Obrigado pela participação.');
      // Limpa a sessão e volta para a home após envio
      sessionStorage.removeItem('id_responsavel');
      navigate('/');
    } catch (e) {
      setErro('Erro ao enviar o censo: ' + e.message);
      console.error(e);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="form-main">
      <div className="container">
        <div className="form-wrapper">
          <header className="form-header">
            <h1>Censo Autista</h1>
            <ProgressBar current={currentStep} total={totalSteps} />
          </header>

          {erro && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
              {erro}
            </p>
          )}

          <form id="censusForm" ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            {currentStep === 1 && <Step1GeneralInfo    data={formData} updateData={updateData} />}
            {currentStep === 2 && <Step2Diagnostico    data={formData} updateData={updateData} />}
            {currentStep === 3 && <Step3Socioeconomico data={formData} updateData={updateData} />}
            {currentStep === 4 && <Step4Educacao       data={formData} updateData={updateData} />}
            {currentStep === 5 && <Step5Saude          data={formData} updateData={updateData} />}
            {currentStep === 6 && <Step6Rotina         data={formData} updateData={updateData} />}
            {currentStep === 7 && <Step7Finalizacao    data={formData} updateData={updateData} />}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrev={handlePrev}
              enviando={enviando}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
