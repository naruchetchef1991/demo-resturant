import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';

const BookingConfirmation = () => {
  const {
    selectedBranch,
    selectedDate,
    selectedTime,
    guestCount,
    selectedTable,
    customerDetails,
    confirmBooking,
    setStep,
    isLoading,
    error,
    clearError
  } = useBooking();

  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsConfirming(true);
      clearError();
      
      await confirmBooking();
      
      // BookingContext will automatically navigate to success step
    } catch (error) {
      console.error('Booking confirmation failed:', error);
      // Error is handled by context
    } finally {
      setIsConfirming(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTableInfo = () => {
    if (!selectedTable) return 'ให้ร้านจัดให้';
    
    const tableTypes = {
      'window': 'โต๊ะริมหน้าต่าง',
      'standard': 'โต๊ะธรรมดา', 
      'large': 'โต๊ะใหญ่',
      'vip': 'โต๊ะ VIP'
    };

    const tableName = selectedTable.table_number || `โต๊ะ ${selectedTable}`;
    const tableType = tableTypes[selectedTable.type] || '';
    const seats = selectedTable.seats ? ` (${selectedTable.seats} ที่นั่ง)` : '';
    
    return `${tableName} - ${tableType}${seats}`;
  };

  if (isLoading || isConfirming) {
    return <LoadingScreen message={isConfirming ? "กำลังยืนยันการจอง..." : "กำลังโหลด..."} />;
  }

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ยืนยันการจอง</h1>
            <p className="text-gray-600">กรุณาตรวจสอบข้อมูลการจองให้ถูกต้องก่อนยืนยัน</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">เกิดข้อผิดพลาด</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">สรุปการจอง</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Branch Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ข้อมูลสาขา</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">สาขา:</span>
                    <span className="font-medium">{selectedBranch?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ที่อยู่:</span>
                    <span className="font-medium text-right">{selectedBranch?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">โทร:</span>
                    <span className="font-medium">{selectedBranch?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">รายละเอียดการจอง</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">วันที่:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">เวลา:</span>
                    <span className="font-medium">{selectedTime} น.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวนผู้ใช้บริการ:</span>
                    <span className="font-medium">{guestCount} คน</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">โต๊ะ:</span>
                    <span className="font-medium">{getTableInfo()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ข้อมูลผู้จอง</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ชื่อ:</span>
                    <span className="font-medium">{customerDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">เบอร์โทร:</span>
                    <span className="font-medium">{customerDetails.phone}</span>
                  </div>
                  {customerDetails.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">อีเมล:</span>
                      <span className="font-medium">{customerDetails.email}</span>
                    </div>
                  )}
                  {customerDetails.notes && (
                    <div>
                      <span className="text-gray-600">หมายเหตุ:</span>
                      <p className="font-medium mt-1 text-right">{customerDetails.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">เงื่อนไขการจอง</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>สามารถยกเลิกหรือแก้ไขการจองได้ล่วงหน้าอย่างน้อย 2 ชั่วโมง</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>หากมาช้ากว่าเวลาที่จองเกิน 15 นาที โต๊ะอาจถูกยกเลิก</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>ทางร้านขอสงวนสิทธิ์ในการเปลี่ยนแปลงโต๊ะหากมีความจำเป็น</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>กรุณาแสดงหมายเลขการจองเมื่อมาใช้บริการ</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg"
            >
              {isConfirming ? 'กำลังยืนยัน...' : 'ยืนยันการจอง'}
            </Button>

            <Button
              onClick={() => setStep('details')}
              disabled={isConfirming}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3"
            >
              แก้ไขข้อมูล
            </Button>
          </div>

          {/* Back to home */}
          <div className="text-center mt-8">
            <button
              onClick={() => setStep('branch')}
              disabled={isConfirming}
              className="text-gray-600 hover:text-gray-800 underline disabled:opacity-50"
            >
              ← กลับไปหน้าแรก
            </button>
          </div>
        </div>
      </div>
  );
};

export default BookingConfirmation; 