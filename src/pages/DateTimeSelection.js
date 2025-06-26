import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import { th } from 'date-fns/locale';
import { useBooking } from '../context/BookingContext';
import Button from '../components/UI/Button';

const DateTimeSelection = () => {
  const navigate = useNavigate();
  const { selectedBranch, timeSlots, setDateTime } = useBooking();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);

  console.log('DateTimeSelection - selectedBranch:', selectedBranch);
  console.log('DateTimeSelection - timeSlots:', timeSlots);

  // Redirect back to branch selection if no branch selected
  if (!selectedBranch) {
    navigate('/branch');
    return null;
  }

  // Generate next 14 days
  const generateDateOptions = () => {
    const dates = [];
    const today = startOfDay(new Date());
    
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      dates.push(date);
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  // Mock unavailable times (replace with API call)
  const getUnavailableTimes = (date) => {
    // Mock logic: some times are unavailable
    const unavailable = [];
    if (isSameDay(date, new Date())) {
      // Today: times before current time + 1 hour are unavailable
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      
      timeSlots.forEach(time => {
        const [hour, minute] = time.split(':').map(Number);
        if (hour < currentHour + 1 || (hour === currentHour + 1 && minute <= currentMinute)) {
          unavailable.push(time);
        }
      });
    }
    
    // Mock: some random times are booked
    if (Math.random() > 0.5) {
      unavailable.push('12:00', '13:00', '19:00', '20:00');
    }
    
    return unavailable;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection
    setShowTimeModal(true); // Open time selection modal
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeModal(false); // Close modal after selection
  };

  const closeTimeModal = () => {
    setShowTimeModal(false);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setDateTime(selectedDate, selectedTime);
      navigate('/guests');
    }
  };

  const isTimeUnavailable = (time) => {
    if (!selectedDate) return false;
    return getUnavailableTimes(selectedDate).includes(time);
  };

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">เลือกวันและเวลา</h2>
        <p className="text-gray-600">สาขา: {selectedBranch?.name}</p>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">เลือกวันที่</h3>
        <div className="grid grid-cols-2 gap-3">
          {dateOptions.map((date, index) => {
            const isToday = isSameDay(date, new Date());
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">
                  {format(date, 'EEEE', { locale: th })}
                </div>
                <div className="text-sm text-gray-600">
                  {format(date, 'd MMMM yyyy', { locale: th })}
                  {isToday && <span className="text-blue-600 ml-1">(วันนี้)</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection Button */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">เลือกเวลา</h3>
          <button
            onClick={() => setShowTimeModal(true)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedTime
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {selectedTime ? `${selectedTime} น.` : 'กรุณาเลือกเวลา'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  คลิกเพื่อเลือกเวลาที่ต้องการ
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">การจองที่เลือก</h4>
          <p className="text-green-800">
            <span className="font-medium">วันที่:</span> {format(selectedDate, 'd MMMM yyyy', { locale: th })}
          </p>
          <p className="text-green-800">
            <span className="font-medium">เวลา:</span> {selectedTime} น.
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="w-full"
        >
          ดำเนินการต่อ
        </Button>
      </div>

      {/* Working Hours Info */}
      {selectedBranch && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">เวลาทำการ</h4>
          <p className="text-yellow-800">
            {selectedBranch.open_time} - {selectedBranch.close_time} น.
          </p>
        </div>
      )}

      {/* Time Selection Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">เลือกเวลา</h3>
              <button
                onClick={closeTimeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="text-sm text-gray-600 mb-4">
                วันที่: {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: th })}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => {
                  const isUnavailable = isTimeUnavailable(time);
                  const isSelected = selectedTime === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => !isUnavailable && handleTimeSelect(time)}
                      disabled={isUnavailable}
                      className={`p-3 rounded-lg border-2 transition-all font-medium ${
                        isUnavailable
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {time}
                      {isUnavailable && (
                        <div className="text-xs text-gray-400 mt-1">ไม่ว่าง</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={closeTimeModal}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelection; 