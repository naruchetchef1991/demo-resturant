import React, { createContext, useContext } from 'react';
import { useLiff } from '../hooks/useLiff';

const LiffContext = createContext(null);

export const LiffProvider = ({ children }) => {
  const liffData = useLiff();

  return (
    <LiffContext.Provider value={liffData}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiffContext = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error('useLiffContext must be used within LiffProvider');
  }
  return context;
}; 