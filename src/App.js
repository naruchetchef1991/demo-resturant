import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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
import { BookingProvider, useBookingContext } from './context/BookingContext';

function BookingFlow() {
  const { step } = useBookingContext();

  const renderCurrentStep = () => {
    switch (step) {
      case 'branch':
        return <BranchSelection />;
      case 'datetime':
        return <DateTimeSelection />;
      case 'guests':
        return <GuestCountSelection />;
      case 'table':
        return <TableSelection />;
      case 'details':
        return <BookingDetails />;
      case 'confirmation':
        return <BookingConfirmation />;
      case 'success':
        return <BookingSuccess />;
      default:
        return <BranchSelection />;
    }
  };

  return renderCurrentStep();
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<BookingFlow />} />
      <Route path="/history" element={<BookingHistory />} />
      <Route path="*" element={<BookingFlow />} />
    </Routes>
  );
}

function App() {
  return (
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
  );
}

export default App; 