import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { LiffProvider, useLiffContext } from './context/LiffContext';
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
import Profile from './pages/Profile';
import Promotion from './pages/Promotion';
import Store from './pages/Store';

// Component to check LIFF authentication
const LiffAuthGuard = ({ children }) => {
  const { isLoading, liffUser, error, login } = useLiffContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  if (!liffUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">เข้าสู่ระบบ</h2>
          <p className="text-gray-600 mb-6">กรุณาเข้าสู่ระบบด้วย LINE เพื่อใช้งาน</p>
          <button 
            onClick={login}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            เข้าสู่ระบบด้วย LINE
          </button>
        </div>
      </div>
    );
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BookingProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/store" replace />} />
          <Route path="/branch" element={<BranchSelection />} />
          <Route path="/datetime" element={<DateTimeSelection />} />
          <Route path="/guests" element={<GuestCountSelection />} />
          <Route path="/table" element={<TableSelection />} />
          <Route path="/details" element={<BookingDetails />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/success" element={<BookingSuccess />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Layout>
    </BookingProvider>
  );
};

function App() {
  return (
    <LiffProvider>
      <Router>
        <LiffAuthGuard>
          <AppRoutes />
        </LiffAuthGuard>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Kanit, sans-serif',
            },
          }}
        />
      </Router>
    </LiffProvider>
  );
}

export default App; 