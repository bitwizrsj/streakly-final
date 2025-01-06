import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // Correctly import AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* Wrap your App component with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
