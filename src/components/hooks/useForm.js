import { useState } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  // Função para aplicar a máscara de CPF (000.000.000-00)
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o nono e o décimo dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Impede a digitação de mais de 14 caracteres
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Se for o campo de CPF, aplica a máscara antes de salvar no estado
    let newValue = type === 'checkbox' ? checked : value;
    if (name === 'cpf') {
      newValue = maskCPF(value);
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  // Função para limpar o formulário
  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}