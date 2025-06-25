import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';

const BranchSelection = () => {
  const navigate = useNavigate();
  const { branches, selectBranch, isLoading, error } = useBooking();
  
  console.log('BranchSelection - branches:', branches, 'type:', typeof branches, 'isArray:', Array.isArray(branches));

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            ลองใหม่
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          เลือกสาขาที่ต้องการจอง
        </h1>
        <p className="text-gray-600">
          เลือกสาขาที่คุณต้องการมารับประทานอาหาร
        </p>
      </div>

      {/* Branches Grid */}
      <div className="space-y-4">
        {Array.isArray(branches) && branches.map((branch) => (
          <div 
            key={branch.id} 
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
          >
            {/* Branch Details */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {branch.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                {/* Address */}
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 text-sm">
                    {branch.address}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-gray-600 text-sm">
                    {branch.phone}
                  </p>
                </div>

                {/* Working Hours */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 text-sm">
                    เปิด {branch.open_time} - {branch.close_time} น.
                  </p>
                </div>

                {/* Description */}
                {branch.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {branch.description}
                  </p>
                )}
              </div>

              {/* Select Button */}
              <Button
                onClick={() => {
                  selectBranch(branch);
                  navigate('/datetime');
                }}
                className="w-full"
              >
                เลือกสาขานี้
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* No branches message */}
      {(!Array.isArray(branches) || branches.length === 0) && !isLoading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">ไม่พบข้อมูลสาขา</p>
          <p className="text-xs text-gray-400 mt-2">
            Debug: branches type = {typeof branches}, isArray = {Array.isArray(branches).toString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default BranchSelection; 