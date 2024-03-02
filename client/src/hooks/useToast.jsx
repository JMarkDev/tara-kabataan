import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a new context
const ToastContext = createContext();

// Create a custom hook to use the context
export const useToast = () => {
  return useContext(ToastContext);
};

// Provider component to wrap your application
export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={toast}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
