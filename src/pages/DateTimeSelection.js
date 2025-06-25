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
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
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
    <div className="space-y-6 fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">เลือกวันและเวลา</h2>
        <p className="text-gray-600">สาขา: {selectedBranch?.name}</p>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เลือกวันที่</h3>
        <div className="grid grid-cols-2 gap-3">
          {dateOptions.map((date, index) => {
            const isToday = isSameDay(date, new Date());
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">
                  {format(date, 'EEEE', { locale: th })}
                </div>
                <div className="text-sm text-gray-600">
                  {format(date, 'd MMMM yyyy', { locale: th })}
                  {isToday && <span className="text-primary-600 ml-1">(วันนี้)</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">เลือกเวลา</h3>
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
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
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
      <div className="pt-4">
        <Button
          fullWidth
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          ดำเนินการต่อ
        </Button>
      </div>

      {/* Working Hours Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">เวลาทำการ</h4>
        <p className="text-yellow-800">
          {selectedBranch?.workingHours.open} - {selectedBranch?.workingHours.close} น.
        </p>
      </div>
    </div>
  );
};

export default DateTimeSelection; 