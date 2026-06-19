import { RouterProvider } from 'react-router-dom';
// Adicionamos o /index.jsx no final para o Vite não se perder
import { router } from './routes/index.jsx'; 
import './assets/css/style.css'; 

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;