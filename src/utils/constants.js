// App Constants
export const APP_NAME = 'Phicha Booking';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_ENDPOINTS = {
  BRANCHES: '/api/branches',
  AVAILABILITY: '/api/availability',
  BOOKINGS: '/api/bookings',
  USERS: '/api/users'
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show'
};

// Time Constants
export const TIME_CONSTANTS = {
  BOOKING_ADVANCE_HOURS: 2, // Hours before booking can be cancelled
  MAX_BOOKING_DAYS: 30, // Maximum days in advance booking is allowed
  LATE_ARRIVAL_MINUTES: 15 // Minutes after which table may be released
};

// Validation Rules
export const VALIDATION_RULES = {
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^[0-9]{10}$/
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  EMAIL: {
    PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  GUEST_COUNT: {
    MIN: 1,
    MAX: 20
  }
};

// UI Constants
export const UI_CONSTANTS = {
  TOAST_DURATION: 3000,
  LOADING_DELAY: 500,
  ANIMATION_DURATION: 300
};

// Feature Flags
export const FEATURES = {
  ENABLE_EMAIL_BOOKING: true,
  ENABLE_PUSH_NOTIFICATIONS: false,
  ENABLE_ANALYTICS: true,
  ENABLE_OFFLINE_MODE: false
}; 