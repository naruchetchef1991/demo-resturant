import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiffContext } from '../../context/LiffContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { liffUser } = useLiffContext();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/branch':
        return 'เลือกสาขา';
      case '/datetime':
        return 'เลือกวันและเวลา';
      case '/guests':
        return 'จำนวนผู้ใช้บริการ';
      case '/table':
        return 'เลือกโต๊ะ';
      case '/details':
        return 'รายละเอียดการจอง';
      case '/confirmation':
        return 'ยืนยันการจอง';
      case '/success':
        return 'จองสำเร็จ';
      case '/history':
        return 'ประวัติการจอง';
      case '/profile':
        return 'โปรไฟล์';
      case '/promotion':
        return 'โปรโมชั่น';
      case '/store':
        return 'ร้านค้า';
      default:
        return 'จองโต๊ะ';
    }
  };

  const canGoBack = () => {
    const backPaths = ['/datetime', '/guests', '/table', '/details', '/confirmation'];
    return backPaths.includes(location.pathname);
  };

  const handleBack = () => {
    const pathMap = {
      '/datetime': '/branch',
      '/guests': '/datetime',
      '/table': '/guests',
      '/details': '/table',
      '/confirmation': '/details'
    };
    
    const backPath = pathMap[location.pathname];
    if (backPath) {
      navigate(backPath);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {canGoBack() && (
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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

          <div className="flex items-center space-x-3">
            {liffUser && (
              <div className="flex items-center space-x-2">
                {liffUser.pictureUrl && (
                  <img
                    src={liffUser.pictureUrl}
                    alt={liffUser.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700 hidden sm:block">
                  {liffUser.displayName}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 