import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Button from '../components/UI/Button';

const GuestCountSelection = () => {
  const navigate = useNavigate();
  const { guestCount, setGuestCount } = useBooking();

  const guestOptions = [
    { value: 1, label: '1 ท่าน' },
    { value: 2, label: '2 ท่าน' },
    { value: 3, label: '3 ท่าน' },
    { value: 4, label: '4 ท่าน' },
    { value: 5, label: '5 ท่าน' },
    { value: 6, label: '6 ท่าน' },
    { value: 7, label: '7 ท่าน' },
    { value: 8, label: '8 ท่าน' },
    { value: 9, label: '9 ท่าน' },
    { value: 10, label: '10 ท่าน' }
  ];

  const handleContinue = () => {
    navigate('/table');
  };

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">จำนวนผู้ใช้บริการ</h2>
        <p className="text-gray-600">เลือกจำนวนลูกค้าที่จะมารับประทานอาหาร</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {guestOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setGuestCount(option.value)}
              className={`p-4 text-center border-2 rounded-lg transition-all ${
                guestCount === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="text-lg font-semibold">{option.value}</div>
              <div className="text-sm">{option.label}</div>
            </button>
          ))}
        </div>

        {/* Custom guest count input */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หรือระบุจำนวนเอง
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max="50"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="จำนวนผู้ใช้บริการ"
            />
            <span className="text-gray-600">ท่าน</span>
          </div>
        </div>
      </div>

      {/* Selected Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-center text-gray-700">
          คุณเลือก <span className="font-semibold text-blue-600">{guestCount} ท่าน</span>
        </p>
      </div>

      {/* Continue Button */}
      <div className="mt-8">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          ดำเนินการต่อ
        </Button>
      </div>
    </div>
  );
};

export default GuestCountSelection; 