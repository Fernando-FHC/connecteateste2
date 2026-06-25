import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../components/layout/DefaultLayout';
import { Home } from '../components/pages/Home';
import { Login } from '../components/pages/Login';
import { Cadastro } from '../components/pages/Cadastro';
import { Formulario } from '../components/pages/Formulario';
import { Dashboard } from '../components/pages/Dashboard';
import { RequireAdmin } from '../components/RequireAdmin';
import { PoliticaPrivacidade } from '../components/pages/Politicas';
import { TermosDeUso } from '../components/pages/Politicas/TermosDeUso';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/',                     element: <Home /> },
      { path: '/login',                element: <Login /> },
      { path: '/cadastro',             element: <Cadastro /> },
      { path: '/formulario',           element: <Formulario /> },
      { path: '/dashboard',            element: <RequireAdmin><Dashboard /></RequireAdmin> },
      { path: '/politica-privacidade', element: <PoliticaPrivacidade /> },
      { path: '/termos-de-uso',        element: <TermosDeUso /> },
    ],
  },
]);