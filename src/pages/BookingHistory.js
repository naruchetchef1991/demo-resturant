import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';

const BookingHistory = () => {
  const { 
    bookingHistory, 
    getBookingHistory, 
    cancelBooking, 
    isLoading, 
    error 
  } = useBooking();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) return;
    
    try {
      setSearchPerformed(true);
      await getBookingHistory(phoneNumber.trim());
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('คุณต้องการยกเลิกการจองนี้หรือไม่?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await cancelBooking(bookingId);
      alert('ยกเลิกการจองเรียบร้อยแล้ว');
    } catch (error) {
      alert('ไม่สามารถยกเลิกการจองได้: ' + (error.message || 'เกิดข้อผิดพลาด'));
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'ยืนยันแล้ว';
      case 'pending':
        return 'รอยืนยัน';
      case 'cancelled':
        return 'ยกเลิกแล้ว';
      case 'completed':
        return 'เสร็จสิ้น';
      default:
        return status;
    }
  };

  const canCancelBooking = (booking) => {
    if (booking.status !== 'confirmed' && booking.status !== 'pending') {
      return false;
    }

    // Check if booking is at least 2 hours in the future
    const bookingDateTime = new Date(`${booking.booking_date}T${booking.booking_time}`);
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    return bookingDateTime > twoHoursFromNow;
  };

  const getTableInfo = (booking) => {
    if (!booking.table_number) return 'ให้ร้านจัดให้';
    return `${booking.table_number} (${booking.table_seats || ''} ที่นั่ง)`;
  };

  if (isLoading && !searchPerformed) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ประวัติการจอง</h1>
        <p className="text-gray-600">ค้นหาประวัติการจองด้วยหมายเลขโทรศัพท์</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              หมายเลขโทรศัพท์
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="กรอกหมายเลขโทรศัพท์ เช่น 0812345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!phoneNumber.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
          </Button>
        </div>
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

      {/* Results */}
      {searchPerformed && (
        <div className="space-y-4">
          {!Array.isArray(bookingHistory) || bookingHistory.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบประวัติการจอง</h3>
              <p className="text-gray-600">ไม่พบประวัติการจองสำหรับหมายเลขโทรศัพท์นี้</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ประวัติการจอง ({bookingHistory.length} รายการ)
              </h2>
              
              {bookingHistory.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.booking_ref || `การจอง #${booking.id}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          จองเมื่อ: {formatDate(booking.created_at)}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-3">
                      {/* Basic Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">สาขา:</span>
                          <p className="text-gray-900">{booking.branch_name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">วันที่:</span>
                          <p className="text-gray-900">{formatDate(booking.booking_date)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">เวลา:</span>
                          <p className="text-gray-900">{booking.booking_time} น.</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">จำนวนคน:</span>
                          <p className="text-gray-900">{booking.guest_count} คน</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">โต๊ะ:</span>
                          <p className="text-gray-900">{getTableInfo(booking)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">ชื่อผู้จอง:</span>
                          <p className="text-gray-900">{booking.customer_name}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">หมายเหตุ:</span>
                          <p className="text-gray-900 mt-1">{booking.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-end pt-3 border-t border-gray-200">
                        {canCancelBooking(booking) && (
                          <Button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancellingId === booking.id}
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            {cancellingId === booking.id ? 'กำลังยกเลิก...' : 'ยกเลิกการจอง'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingHistory; 