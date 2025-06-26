import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'store',
      label: 'ร้านค้า',
      path: '/store',
      icon: (isActive) => (
        <svg 
          className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
          />
        </svg>
      )
    },
    {
      id: 'promotion',
      label: 'โปรโมชั่น',
      path: '/promotion',
      icon: (isActive) => (
        <svg 
          className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
          />
        </svg>
      )
    },
    {
      id: 'booking',
      label: 'จองโต๊ะ',
      path: '/branch',
      icon: (isActive) => (
        <svg 
          className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
          />
        </svg>
      )
    },
    {
      id: 'calendar',
      label: 'ประวัติ',
      path: '/history',
      icon: (isActive) => (
        <svg 
          className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'โปรไฟล์',
      path: '/profile',
      icon: (isActive) => (
        <svg 
          className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      )
    }
  ];

  const isActive = (path) => {
    if (path === '/store') {
      return location.pathname === '/' || location.pathname === '/store';
    }
    if (path === '/branch') {
      return location.pathname === '/branch' || 
             location.pathname === '/datetime' || location.pathname === '/guests' || 
             location.pathname === '/table' || location.pathname === '/details' || 
             location.pathname === '/confirmation' || location.pathname === '/success';
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    // Handle existing routes
    if (path === '/branch' || path === '/history' || path === '/profile' || path === '/promotion' || path === '/store') {
      navigate(path);
    } else {
      // For future implementation
      console.log(`Navigate to ${path} - Not implemented yet`);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 ${
                  active ? 'text-primary-600' : 'text-gray-500'
                } hover:text-primary-600 transition-colors`}
              >
                <div className="mb-1">
                  {item.icon(active)}
                </div>
                <span className={`text-xs font-medium ${
                  active ? 'text-primary-600' : 'text-gray-500'
                } leading-tight`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation; 