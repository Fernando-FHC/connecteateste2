import { Navigate } from 'react-router-dom';

// Guarda simples de acesso ao dashboard administrativo.
// O acesso é liberado ao logar com admin/admin no LoginForm
export function RequireAdmin({ children }) {
  const ehAdmin = sessionStorage.getItem('admin') === 'true';
  return ehAdmin ? children : <Navigate to="/login" replace />;
}
