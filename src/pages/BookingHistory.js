import React, { useState, useEffect } from 'react';
import { useBookingContext } from '../context/BookingContext';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';

const BookingHistory = () => {
  const { 
    bookingHistory, 
    getBookingHistory, 
    cancelBooking, 
    isLoading, 
    error 
  } = useBookingContext();
  
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
    return <LoadingScreen message="กำลังโหลด..." />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ประวัติการจอง</h1>
            <p className="text-gray-600">ค้นหาประวัติการจองด้วยหมายเลขโทรศัพท์</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเลขโทรศัพท์
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="กรอกหมายเลขโทรศัพท์ เช่น 0812345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={!phoneNumber.trim() || isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
                >
                  {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
                </Button>
              </div>
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
            <div className="space-y-6">
              {bookingHistory.length === 0 ? (
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
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.booking_ref || `การจอง #${booking.id}`}
                            </h3>
                            <p className="text-sm text-gray-600">
                              จองเมื่อ: {formatDate(booking.created_at)}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Booking Details */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">รายละเอียดการจอง</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">สาขา:</span>
                                <span className="font-medium">{booking.branch_name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">วันที่:</span>
                                <span className="font-medium">{formatDate(booking.booking_date)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">เวลา:</span>
                                <span className="font-medium">{booking.booking_time} น.</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">จำนวนผู้ใช้บริการ:</span>
                                <span className="font-medium">{booking.guest_count} คน</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">โต๊ะ:</span>
                                <span className="font-medium">{getTableInfo(booking)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Customer Details */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">ข้อมูลผู้จอง</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">ชื่อ:</span>
                                <span className="font-medium">{booking.customer_name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">โทร:</span>
                                <span className="font-medium">{booking.customer_phone}</span>
                              </div>
                              {booking.customer_email && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">อีเมล:</span>
                                  <span className="font-medium">{booking.customer_email}</span>
                                </div>
                              )}
                              {booking.notes && (
                                <div>
                                  <span className="text-gray-600">หมายเหตุ:</span>
                                  <p className="font-medium mt-1">{booking.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        {canCancelBooking(booking) && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <Button
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancellingId === booking.id}
                              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                            >
                              {cancellingId === booking.id ? 'กำลังยกเลิก...' : 'ยกเลิกการจอง'}
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">
                              * สามารถยกเลิกได้ล่วงหน้าอย่างน้อย 2 ชั่วโมง
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Back to home */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← กลับไปหน้าแรก
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingHistory; 