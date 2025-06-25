import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Layout from './components/Layout/Layout';
import LoadingScreen from './components/UI/LoadingScreen';

// Pages
import BranchSelection from './pages/BranchSelection';
import DateTimeSelection from './pages/DateTimeSelection';
import GuestCountSelection from './pages/GuestCountSelection';
import TableSelection from './pages/TableSelection';
import BookingDetails from './pages/BookingDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingSuccess from './pages/BookingSuccess';
import BookingHistory from './pages/BookingHistory';

// Context
import { BookingProvider } from './context/BookingContext';
import { LiffProvider } from './context/LiffContext';

// Hooks
import { useLiff } from './hooks/useLiff';

function AppContent() {
  const { isLiffInitialized, liffUser, isLoading, error } = useLiff();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (!isLiffInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">กำลังเชื่อมต่อ LINE</h2>
          <p className="text-yellow-600">กรุณารอสักครู่...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/branch" replace />} />
        <Route path="/branch" element={<BranchSelection />} />
                      <Route path="/datetime" element={<DateTimeSelection />} />
              <Route path="/guests" element={<GuestCountSelection />} />
              <Route path="/table" element={<TableSelection />} />
              <Route path="/details" element={<BookingDetails />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="*" element={<Navigate to="/branch" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <LiffProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            <AppContent />
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  fontFamily: 'Kanit, sans-serif',
                },
              }}
            />
          </div>
        </Router>
      </BookingProvider>
    </LiffProvider>
  );
}

export default App; 