import React from 'react';
import { useBookingContext } from '../../context/BookingContext';

const Header = () => {
  const { step, setStep } = useBookingContext();

  const getPageTitle = () => {
    switch (step) {
      case 'branch':
        return 'เลือกสาขา';
      case 'datetime':
        return 'เลือกวันและเวลา';
      case 'guests':
        return 'จำนวนที่นั่ง';
      case 'table':
        return 'เลือกโต๊ะ';
      case 'details':
        return 'ข้อมูลการจอง';
      case 'confirmation':
        return 'ยืนยันการจอง';
      case 'success':
        return 'จองสำเร็จ';
      default:
        return 'Phicha Booking';
    }
  };

  const canGoBack = () => {
    return !['branch', 'success'].includes(step);
  };

  const handleBack = () => {
    if (canGoBack()) {
      switch (step) {
        case 'datetime':
          setStep('branch');
          break;
        case 'guests':
          setStep('datetime');
          break;
        case 'table':
          setStep('guests');
          break;
        case 'details':
          setStep('table');
          break;
        case 'confirmation':
          setStep('details');
          break;
        default:
          setStep('branch');
      }
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button */}
          <div className="flex items-center">
            {canGoBack() && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
          </div>

          {/* Restaurant Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 