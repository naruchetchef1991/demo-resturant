import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useLiff } from '../../hooks/useLiff';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { liffUser } = useLiff();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/branch':
        return 'เลือกสาขา';
      case '/datetime':
        return 'เลือกวันและเวลา';
      case '/guests':
        return 'จำนวนที่นั่ง';
      case '/details':
        return 'ข้อมูลการจอง';
      case '/confirmation':
        return 'ยืนยันการจอง';
      case '/success':
        return 'จองสำเร็จ';
      case '/history':
        return 'ประวัติการจอง';
      default:
        return 'Phicha Booking';
    }
  };

  const canGoBack = () => {
    return !['/branch', '/success'].includes(location.pathname);
  };

  const handleBack = () => {
    if (canGoBack()) {
      navigate(-1);
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
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            {liffUser ? (
              <div className="flex items-center space-x-2">
                {liffUser.pictureUrl ? (
                  <img
                    src={liffUser.pictureUrl}
                    alt={liffUser.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-sm text-gray-700 hidden sm:block">
                  {liffUser.displayName}
                </span>
              </div>
            ) : (
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 