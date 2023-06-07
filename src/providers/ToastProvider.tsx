import 'react-toastify/dist/ReactToastify.css';
import {
  ToastContainer,
} from 'react-toastify';
import { ReactNode } from 'react';

interface ToastProviderProps {
  children: ReactNode,
}

export function ToastProvider({
  children,
}: ToastProviderProps) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </>
  );
}