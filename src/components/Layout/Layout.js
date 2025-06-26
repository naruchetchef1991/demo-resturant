import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout; 