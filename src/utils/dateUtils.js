import { format, addDays, isSameDay, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import { th } from 'date-fns/locale';

// Format date for display
export const formatDisplayDate = (date) => {
  return format(date, 'd MMMM yyyy', { locale: th });
};

// Format date and time for display
export const formatDisplayDateTime = (date, time) => {
  return `${format(date, 'EEEE ที่ d MMMM yyyy', { locale: th })} เวลา ${time} น.`;
};

// Check if date is today
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

// Check if date is in the past
export const isPastDate = (date) => {
  return isBefore(date, startOfDay(new Date()));
};

// Check if date is in the future (within booking window)
export const isValidBookingDate = (date, maxDaysAdvance = 30) => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, maxDaysAdvance);
  
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

// Generate date options for booking
export const generateBookingDates = (daysCount = 14) => {
  const dates = [];
  const today = startOfDay(new Date());
  
  for (let i = 0; i < daysCount; i++) {
    const date = addDays(today, i);
    dates.push(date);
  }
  
  return dates;
};

// Check if time is available for booking
export const isTimeAvailable = (date, time, unavailableTimes = []) => {
  // If it's today, check if time hasn't passed
  if (isToday(date)) {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const timeDate = new Date();
    timeDate.setHours(hours, minutes, 0, 0);
    
    // Add 1 hour buffer for same-day bookings
    const bufferTime = new Date(now.getTime() + (60 * 60 * 1000));
    
    if (isBefore(timeDate, bufferTime)) {
      return false;
    }
  }
  
  // Check against unavailable times
  return !unavailableTimes.includes(time);
};

// Convert time string to Date object for comparison
export const timeStringToDate = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Get Thai day name
export const getThaiDayName = (date) => {
  return format(date, 'EEEE', { locale: th });
};

// Check if date is weekend
export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

// Calculate time difference in hours
export const getHoursDifference = (date1, date2) => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return diffInMs / (1000 * 60 * 60);
};

// Create booking datetime from date and time string
export const createBookingDateTime = (date, timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const bookingDate = new Date(date);
  bookingDate.setHours(hours, minutes, 0, 0);
  return bookingDate;
}; 