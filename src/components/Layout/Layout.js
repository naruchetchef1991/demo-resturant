import React from 'react';
import Header from './Header';
import ProgressBar from '../UI/ProgressBar';
import { useBookingContext } from '../../context/BookingContext';

const Layout = ({ children }) => {
  const { step } = useBookingContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressBar currentStep={step} />
      <main className="container mx-auto px-4 py-6 pb-20">
        {children}
      </main>
    </div>
  );
};

export default Layout; 