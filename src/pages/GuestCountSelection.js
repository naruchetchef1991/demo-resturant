import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinusIcon, PlusIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useBookingContext } from '../context/BookingContext';
import Button from '../components/UI/Button';

const GuestCountSelection = () => {
  const navigate = useNavigate();
  const { guestCount, setGuests } = useBookingContext();
  const [selectedCount, setSelectedCount] = useState(guestCount);

  const handleCountChange = (newCount) => {
    if (newCount >= 1 && newCount <= 20) {
      setSelectedCount(newCount);
    }
  };

  const handleContinue = () => {
    setGuests(selectedCount);
    navigate('/table');
  };

  const getTableInfo = (count) => {
    if (count <= 2) return 'โต๊ะสำหรับ 2 ที่นั่ง';
    if (count <= 4) return 'โต๊ะสำหรับ 4 ที่นั่ง';
    if (count <= 6) return 'โต๊ะสำหรับ 6 ที่นั่ง';
    if (count <= 8) return 'โต๊ะสำหรับ 8 ที่นั่ง';
    if (count <= 10) return 'โต๊ะขนาดใหญ่ (8-10 ที่นั่ง)';
    return 'จัดโต๊ะแยกหลายโต๊ะให้';
  };

  const getAdditionalInfo = (count) => {
    if (count > 10) {
      return 'สำหรับ 10 คนขึ้นไป ทางร้านจะจัดโต๊ะแยกให้ใกล้กัน';
    }
    if (count > 6) {
      return 'โต๊ะขนาดใหญ่อาจมีจำนวนจำกัด กรุณาติดต่อล่วงหน้า';
    }
    return null;
  };

  // Quick select options
  const quickOptions = [2, 4, 6, 8];

  return (
    <div className="space-y-6 fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">จำนวนที่นั่ง</h2>
        <p className="text-gray-600">เลือกจำนวนคนที่จะมาใช้บริการ</p>
      </div>

      {/* Quick Select Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เลือกด่วน</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickOptions.map((count) => (
            <button
              key={count}
              onClick={() => setSelectedCount(count)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCount === count
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
              }`}
            >
              <UsersIcon className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">{count} คน</div>
              <div className="text-sm text-gray-600">{getTableInfo(count)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Counter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">หรือระบุจำนวนเอง</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleCountChange(selectedCount - 1)}
              disabled={selectedCount <= 1}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              <MinusIcon className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{selectedCount}</div>
              <div className="text-sm text-gray-600">คน</div>
            </div>
            
            <button
              onClick={() => handleCountChange(selectedCount + 1)}
              disabled={selectedCount >= 20}
              className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-200 transition-colors"
            >
              <PlusIcon className="w-5 h-5 text-primary-600" />
            </button>
          </div>
          
          <div className="text-center mt-4">
            <div className="text-lg font-medium text-gray-900">
              {getTableInfo(selectedCount)}
            </div>
            {getAdditionalInfo(selectedCount) && (
              <div className="text-sm text-gray-600 mt-2">
                {getAdditionalInfo(selectedCount)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          fullWidth
          onClick={handleContinue}
        >
          ดำเนินการต่อ
        </Button>
      </div>

      {/* Special Requirements Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">ข้อมูลเพิ่มเติม</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• เด็กเล็กที่ไม่ต้องการที่นั่งแยก ไม่ต้องนับรวม</li>
          <li>• หากต้องการโต๊ะพิเศษ (เก้าอี้เด็ก, โต๊ะวีลแชร์) กรุณาระบุในหมายเหตุ</li>
          <li>• กลุ่มใหญ่กว่า 10 คน สามารถโทรสอบถามเพิ่มเติมได้</li>
        </ul>
      </div>
    </div>
  );
};

export default GuestCountSelection; 