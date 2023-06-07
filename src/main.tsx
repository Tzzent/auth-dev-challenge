import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from '../src/context/ModalCtx';
import { AuthProvider } from '../src/auth/context/AuthCtx';
import { ToastProvider } from '../src/providers/ToastProvider';

import App from './App';
import './sass/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode >,
)
