// src/components/pages/Formulario/index.jsx
// Página que exibe o censo. Só acessível após cadastro
// (verifica se existe id_responsavel no sessionStorage).

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cadastro } from '../Cadastro';

export function Formulario() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem('id_responsavel');
    if (!id) {
      // Se não tem cadastro na sessão, manda para o login/cadastro
      navigate('/login');
    }
  }, [navigate]);

  return <Cadastro />;
}
