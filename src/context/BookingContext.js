import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLiffContext } from './LiffContext';
import { branchAPI, tableAPI, bookingAPI } from '../services/api';

const BookingContext = createContext();

const initialState = {
  selectedBranch: null,
  selectedDate: null,
  selectedTime: null,
  guestCount: 2,
  selectedTable: null,
  customerInfo: {
    name: '',
    phone: '',
    email: '',
    lineUserId: '',
    notes: ''
  },
  bookingReference: null,
  isLoading: false,
  error: null,
  availableTables: [],
  branches: [],
  timeSlots: [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ]
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_BRANCHES':
      return { ...state, branches: action.payload };
    case 'SELECT_BRANCH':
      return { 
        ...state, 
        selectedBranch: action.payload,
        selectedDate: null,
        selectedTime: null,
        selectedTable: null,
        availableTables: []
      };
    case 'SELECT_DATE':
      return { 
        ...state, 
        selectedDate: action.payload,
        selectedTime: null,
        selectedTable: null,
        availableTables: []
      };
    case 'SELECT_TIME':
      return { 
        ...state, 
        selectedTime: action.payload,
        selectedTable: null,
        availableTables: []
      };
    case 'SET_GUEST_COUNT':
      return { 
        ...state, 
        guestCount: action.payload,
        selectedTable: null,
        availableTables: []
      };
    case 'SET_AVAILABLE_TABLES':
      return { ...state, availableTables: action.payload };
    case 'SELECT_TABLE':
      return { ...state, selectedTable: action.payload };
    case 'UPDATE_CUSTOMER_INFO':
      return { 
        ...state, 
        customerInfo: { ...state.customerInfo, ...action.payload }
      };
    case 'SET_BOOKING_REFERENCE':
      return { ...state, bookingReference: action.payload };
    case 'RESET_BOOKING':
      return { 
        ...initialState,
        branches: state.branches,
        customerInfo: {
          ...initialState.customerInfo,
          lineUserId: state.customerInfo.lineUserId
        }
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { liffUser } = useLiffContext();

  // Update customer info when LIFF user is available
  useEffect(() => {
    if (liffUser) {
      dispatch({
        type: 'UPDATE_CUSTOMER_INFO',
        payload: {
          name: liffUser.displayName || '',
          lineUserId: liffUser.userId || ''
        }
      });
    }
  }, [liffUser]);

  // Load branches on component mount
  useEffect(() => {
    const loadBranches = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await branchAPI.getBranches();
        console.log('Branches API response:', response);
        
        const branches = response.data || response; // Handle both wrapped and direct response
        console.log('Processed branches:', branches);
        
        if (!Array.isArray(branches)) {
          throw new Error('Branches data is not an array');
        }
        
        dispatch({ type: 'SET_BRANCHES', payload: branches });
      } catch (error) {
        console.error('Failed to load branches:', error);
        dispatch({ type: 'SET_ERROR', payload: 'ไม่สามารถโหลดข้อมูลสาขาได้' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadBranches();
  }, []);

  const selectBranch = (branch) => {
    dispatch({ type: 'SELECT_BRANCH', payload: branch });
  };

  const selectDate = (date) => {
    dispatch({ type: 'SELECT_DATE', payload: date });
  };

  const selectTime = (time) => {
    dispatch({ type: 'SELECT_TIME', payload: time });
  };

  const setGuestCount = (count) => {
    dispatch({ type: 'SET_GUEST_COUNT', payload: count });
  };

  const setDateTime = (date, time) => {
    dispatch({ type: 'SELECT_DATE', payload: date });
    dispatch({ type: 'SELECT_TIME', payload: time });
  };

  const loadAvailableTables = async () => {
    if (!state.selectedBranch || !state.selectedDate || !state.selectedTime) {
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Format date properly for API
      let dateString;
      if (state.selectedDate instanceof Date) {
        dateString = state.selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      } else {
        dateString = state.selectedDate;
      }
      
      const dateTimeString = `${dateString}T${state.selectedTime}:00`;
      console.log('API call data:', {
        branchId: state.selectedBranch.id,
        dateTime: dateTimeString,
        guestCount: state.guestCount
      });
      
      const response = await tableAPI.checkTableAvailability({
        branchId: state.selectedBranch.id,
        dateTime: dateTimeString,
        guestCount: state.guestCount
      });
      
      console.log('API response:', response);
      const tables = response.data || response; // Handle both wrapped and direct response
      console.log('Processed tables:', tables);
      dispatch({ type: 'SET_AVAILABLE_TABLES', payload: tables });
    } catch (error) {
      console.error('Failed to load available tables:', error);
      dispatch({ type: 'SET_ERROR', payload: 'ไม่สามารถโหลดข้อมูลโต๊ะว่างได้' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const selectTable = (table) => {
    dispatch({ type: 'SELECT_TABLE', payload: table });
  };

  const updateCustomerInfo = (info) => {
    dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: info });
  };

  const createBooking = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Format date properly for API
      let dateString;
      if (state.selectedDate instanceof Date) {
        dateString = state.selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      } else {
        dateString = state.selectedDate;
      }

      const bookingData = {
        branchId: state.selectedBranch.id,
        tableId: state.selectedTable?.id,
        dateTime: `${dateString}T${state.selectedTime}:00`,
        guestCount: state.guestCount,
        customerName: state.customerInfo.name,
        customerPhone: state.customerInfo.phone,
        customerEmail: state.customerInfo.email,
        lineUserId: state.customerInfo.lineUserId,
        notes: state.customerInfo.notes
      };

      const response = await bookingAPI.createBooking(bookingData);
      const booking = response.data || response; // Handle both wrapped and direct response
      dispatch({ type: 'SET_BOOKING_REFERENCE', payload: booking.reference });
      
      return booking;
    } catch (error) {
      console.error('Failed to create booking:', error);
      dispatch({ type: 'SET_ERROR', payload: 'ไม่สามารถทำการจองได้ กรุณาลองใหม่อีกครั้ง' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    selectBranch,
    selectDate,
    selectTime,
    setDateTime,
    setGuestCount,
    loadAvailableTables,
    selectTable,
    updateCustomerInfo,
    createBooking,
    resetBooking,
    clearError
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}; 