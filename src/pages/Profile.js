import React from 'react';
import { useLiffContext } from '../context/LiffContext';

const Profile = () => {
  const { liffUser, logout, isInClient } = useLiffContext();

  const handleLogout = () => {
    logout();
    if (isInClient) {
      window.close();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">โปรไฟล์</h1>
        <p className="text-gray-600">ข้อมูลส่วนตัวของคุณ</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        {liffUser && (
          <div className="text-center">
            {/* Profile Picture */}
            {liffUser.pictureUrl && (
              <div className="mb-4">
                <img
                  src={liffUser.pictureUrl}
                  alt={liffUser.displayName}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-gray-100"
                />
              </div>
            )}

            {/* User Info */}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {liffUser.displayName || 'ไม่ระบุชื่อ'}
            </h2>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">User ID:</span> {liffUser.userId}
              </p>
              {liffUser.statusMessage && (
                <p>
                  <span className="font-medium">สถานะ:</span> {liffUser.statusMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="divide-y divide-gray-200">
          <button className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-900">แก้ไขโปรไฟล์</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-900">การตั้งค่า</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-900">ช่วยเหลือ</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-red-50 transition-colors text-red-600"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-red-600 font-medium">ออกจากระบบ</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile; 