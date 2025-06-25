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
import { useBookingContext } from '../context/BookingContext';
import { useLiff } from '../hooks/useLiff';
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
    resetBooking
  } = useBookingContext();
  
  const { sendMessage, isInClient } = useLiff();

  // Generate booking reference number
  const bookingRef = `PH${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    // Send confirmation message to LINE chat (if in LINE client)
    const sendConfirmationMessage = async () => {
      if (isInClient) {
        const message = {
          type: 'text',
          text: `🎉 การจองสำเร็จ!\n\nรหัสการจอง: ${bookingRef}\nสาขา: ${selectedBranch?.name}\nวันที่: ${format(selectedDate, 'd MMM yyyy', { locale: th })}\nเวลา: ${selectedTime} น.\nจำนวน: ${guestCount} คน${selectedTable ? `\nโต๊ะ: ${selectedTable}` : ''}\n\nขอบคุณที่ใช้บริการ Phicha Booking! 🍽️`
        };
        
        try {
          await sendMessage([message]);
        } catch (error) {
          console.error('Failed to send LINE message:', error);
        }
      }
    };

    sendConfirmationMessage();
  }, [isInClient, sendMessage, bookingRef, selectedBranch, selectedDate, selectedTime, guestCount, selectedTable]);

  const handleNewBooking = () => {
    resetBooking();
    navigate('/branch');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  const handleShareBooking = async () => {
    const shareText = `จองโต๊ะร้าน ${selectedBranch?.name} สำเร็จแล้ว!\nวันที่: ${format(selectedDate, 'd MMMM yyyy', { locale: th })}\nเวลา: ${selectedTime} น.\nจำนวน: ${guestCount} คน${selectedTable ? `\nโต๊ะ: ${selectedTable}` : ''}\nรหัสการจอง: ${bookingRef}`;
    
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

  return (
    <div className="space-y-6 fade-in">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">จองสำเร็จ!</h2>
        <p className="text-gray-600">การจองโต๊ะของคุณได้รับการยืนยันแล้ว</p>
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
                {format(selectedDate, 'EEEE ที่ d MMMM yyyy', { locale: th })}
              </div>
              <div className="text-sm text-gray-600">เวลา {selectedTime} น.</div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="flex items-center space-x-3">
            <UsersIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{guestCount} คน</div>
              {selectedTable && (
                <div className="text-sm text-gray-600">โต๊ะ {selectedTable}</div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-3">
            <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{customerDetails.name}</div>
              <div className="text-sm text-gray-600">{customerDetails.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Reminders */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">สิ่งที่ควรจำ</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-800">
              กรุณามาถึงก่อนเวลานัดหมาย 5-10 นาที
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-800">
              หากมาช้ากว่า 15 นาที โต๊ะอาจถูกยกเลิก
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-800">
              สามารถแสดงรหัสการจองหรือ LINE ที่หน้าร้าน
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-800">
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
          ขอบคุณที่ใช้บริการ Phicha Booking! 🍽️
        </h3>
        <p className="text-gray-600">
          เราหวังว่าคุณจะมีประสบการณ์การรับประทานอาหารที่ดี
        </p>
      </div>
    </div>
  );
};

export default BookingSuccess; 