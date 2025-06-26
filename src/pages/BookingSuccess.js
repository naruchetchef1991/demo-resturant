import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { 
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  PhoneIcon,
  ShareIcon,
  ClockIcon as HistoryIcon
} from '@heroicons/react/24/outline';
import { useBooking } from '../context/BookingContext';
import Icon from '../components/UI/Icon';

import Button from '../components/UI/Button';

const BookingSuccess = () => {
  const navigate = useNavigate();
    const { 
    selectedBranch, 
    selectedDate, 
    selectedTime, 
    guestCount,
    selectedTable, 
    customerDetails,
    bookingReference,
    resetBooking
  } = useBooking();
  
  // Use booking reference from API or generate fallback
  const bookingRef = bookingReference || `PH${Date.now().toString().slice(-6)}`;

  const handleNewBooking = () => {
    resetBooking();
    navigate('/branch');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  const formatDate = (date) => {
    try {
      if (!date) return 'ไม่ระบุวันที่';
      
      // Convert string to Date if needed
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'วันที่ไม่ถูกต้อง';
      }
      
      return format(dateObj, 'd MMMM yyyy', { locale: th });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'วันที่ไม่ถูกต้อง';
    }
  };

  const formatDateLong = (date) => {
    try {
      if (!date) return 'ไม่ระบุวันที่';
      
      // Convert string to Date if needed
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'วันที่ไม่ถูกต้อง';
      }
      
      return format(dateObj, 'EEEE ที่ d MMMM yyyy', { locale: th });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'วันที่ไม่ถูกต้อง';
    }
  };

  const handleShareBooking = async () => {
    const shareText = `จองโต๊ะร้าน ${selectedBranch?.name} สำเร็จแล้ว!\nวันที่: ${formatDate(selectedDate)}\nเวลา: ${selectedTime} น.\nจำนวน: ${guestCount} คน${getTableDisplay() ? `\nโต๊ะ: ${getTableDisplay()}` : ''}\nรหัสการจอง: ${bookingRef}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'การจองโต๊ะ Phicha',
          text: shareText
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('คัดลอกข้อมูลการจองแล้ว!');
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  // Helper function to get table display name
  const getTableDisplay = () => {
    if (!selectedTable) return '';
    
    if (typeof selectedTable === 'string') {
      return selectedTable;
    }
    
    if (typeof selectedTable === 'object') {
      return selectedTable.table_number || selectedTable.name || `โต๊ะ ${selectedTable.id}`;
    }
    
    return 'โต๊ะที่เลือก';
  };

  return (
    <div className="flex-1 p-4 space-y-6 fade-in max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          การจองสำเร็จ!
        </h1>
        
        <p className="text-gray-600 mb-8">
          ขอบคุณที่ใช้บริการ Phicha Booking! <Icon name="dining" className="w-5 h-5 inline" />
        </p>
      </div>

      {/* Booking Reference */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold text-green-900 mb-1">รหัสการจอง</h3>
        <div className="text-2xl font-bold text-green-800 font-mono">{bookingRef}</div>
        <p className="text-sm text-green-700 mt-2">
          กรุณาเก็บรหัสนี้ไว้สำหรับอ้างอิงและแสดงที่ร้าน
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-primary-500 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">รายละเอียดการจอง</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Branch */}
          <div className="flex items-start space-x-3">
            <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{selectedBranch?.name}</div>
              <div className="text-sm text-gray-600">{selectedBranch?.address}</div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">
                {formatDateLong(selectedDate)}
              </div>
              <div className="text-sm text-gray-600">เวลา {selectedTime || 'ไม่ระบุเวลา'} น.</div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="flex items-center space-x-3">
            <UsersIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{guestCount || 1} คน</div>
              {getTableDisplay() && (
                <div className="text-sm text-gray-600">{getTableDisplay()}</div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-3">
            <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{customerDetails?.name || 'ไม่ระบุชื่อ'}</div>
              <div className="text-sm text-gray-600">{customerDetails?.phone || 'ไม่ระบุเบอร์โทร'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Reminders */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-medium text-primary-900 mb-3">สิ่งที่ควรจำ</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-primary-800">
              กรุณามาถึงก่อนเวลานัดหมาย 5-10 นาที
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-primary-800">
              หากมาช้ากว่า 15 นาที โต๊ะอาจถูกยกเลิก
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-primary-800">
              สามารถแสดงรหัสการจองหรือ LINE ที่หน้าร้าน
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-primary-800">
              หากต้องการยกเลิก กรุณาติดต่อร้านล่วงหน้า 2 ชั่วโมง
            </p>
          </div>
        </div>
      </div>

      {/* Contact Restaurant */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">ติดต่อร้าน</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">หากมีข้อสงสัยหรือต้องการแก้ไข</p>
            <p className="font-medium text-gray-900">{selectedBranch?.phone}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`tel:${selectedBranch?.phone}`)}
          >
            โทร
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          fullWidth
          onClick={handleShareBooking}
          variant="outline"
        >
          <ShareIcon className="w-4 h-4 mr-2" />
          แชร์การจอง
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleViewHistory}
          >
            <HistoryIcon className="w-4 h-4 mr-2" />
            ประวัติการจอง
          </Button>
          
          <Button
            onClick={handleNewBooking}
          >
            จองใหม่
          </Button>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ขอบคุณที่ใช้บริการ Phicha Booking! <Icon name="dining" className="w-5 h-5 inline" />
        </h3>
        <p className="text-gray-600">
          เราหวังว่าคุณจะมีประสบการณ์การรับประทานอาหารที่ดี
        </p>
      </div>
    </div>
  );
};

export default BookingSuccess; 