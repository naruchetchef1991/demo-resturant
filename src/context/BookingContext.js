import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { branchAPI, bookingAPI } from '../services/api';

const BookingContext = createContext();

const initialBookingState = {
  step: 'branch',
  selectedBranch: null,
  selectedDate: null,
  selectedTime: null,
  guestCount: 2,
  selectedTable: null,
  customerDetails: {
    name: '',
    phone: '',
    email: '',
    notes: ''
  },
  bookingConfirmed: false,
  bookingHistory: [],
  isLoading: false,
  error: null,
  availableTables: [],
  branches: []
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'SET_BRANCHES':
      return {
        ...state,
        branches: action.payload,
        isLoading: false
      };
    case 'SET_BRANCH':
      return {
        ...state,
        selectedBranch: action.payload,
        step: 'datetime'
      };
    case 'SET_DATETIME':
      return {
        ...state,
        selectedDate: action.payload.date,
        selectedTime: action.payload.time,
        step: 'guests'
      };
    case 'SET_GUESTS':
      return {
        ...state,
        guestCount: action.payload,
        step: 'table'
      };
    case 'SET_TABLE':
      return {
        ...state,
        selectedTable: action.payload,
        step: 'details'
      };
    case 'SET_AVAILABLE_TABLES':
      return {
        ...state,
        availableTables: action.payload,
        isLoading: false
      };
    case 'SET_DETAILS':
      return {
        ...state,
        customerDetails: action.payload,
        step: 'confirmation'
      };
    case 'CONFIRM_BOOKING':
      return {
        ...state,
        bookingConfirmed: true,
        step: 'success',
        isLoading: false
      };
    case 'SET_BOOKING_HISTORY':
      return {
        ...state,
        bookingHistory: action.payload,
        isLoading: false
      };
    case 'RESET_BOOKING':
      return {
        ...initialBookingState,
        branches: state.branches
      };
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);

  // Load branches on mount
  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await branchAPI.getBranches();
      if (response.success) {
        dispatch({ type: 'SET_BRANCHES', payload: response.data });
      } else {
        throw new Error('Failed to load branches');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load branches' });
      console.error('Error loading branches:', error);
      
      // Fallback to mock data if API fails
      const mockBranches = [
        {
          id: 1,
          name: 'Phicha สาขาสยาม',
          address: '991 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330',
          phone: '0212345678',
          email: 'siam@phicha.com',
          latitude: 13.7563,
          longitude: 100.5018,
          open_time: '10:00',
          close_time: '22:00',
          description: 'สาขาใจกลางเมือง ใกล้ BTS สยาม',
          image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        },
        {
          id: 2,
          name: 'Phicha สาขาอโศก',
          address: '2922 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110',
          phone: '0212345679',
          email: 'asoke@phicha.com',
          latitude: 13.7367,
          longitude: 100.5595,
          open_time: '11:00',
          close_time: '23:00',
          description: 'สาขาในย่านธุรกิจ ใกล้ MRT สุขุมวิท',
          image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'
        }
      ];
      dispatch({ type: 'SET_BRANCHES', payload: mockBranches });
    }
  };

  const setBranch = (branch) => {
    console.log('Setting branch:', branch);
    dispatch({ type: 'SET_BRANCH', payload: branch });
    // For debugging
    console.log('Branch set, step should change to datetime');
  };

  const setDateTime = (date, time) => {
    dispatch({ type: 'SET_DATETIME', payload: { date, time } });
  };

  const setGuests = (count) => {
    dispatch({ type: 'SET_GUESTS', payload: count });
  };

  const setTable = (tableId) => {
    dispatch({ type: 'SET_TABLE', payload: tableId });
  };

  const loadAvailableTables = async (branchId, date, time) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const formattedDate = date.toISOString().split('T')[0];
      const response = await branchAPI.checkAvailability(branchId, formattedDate, time);
      
      if (response.success) {
        dispatch({ type: 'SET_AVAILABLE_TABLES', payload: response.data });
      } else {
        throw new Error('Failed to load tables');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load available tables' });
      console.error('Error loading available tables:', error);
      
      // Fallback to mock table data
      const mockTables = [
        { table_id: 1, table_number: 'T01', seats: 2, type: 'window', zone: 'window', is_available: true },
        { table_id: 2, table_number: 'T02', seats: 2, type: 'window', zone: 'window', is_available: false },
        { table_id: 3, table_number: 'T03', seats: 4, type: 'window', zone: 'window', is_available: true },
        { table_id: 4, table_number: 'T04', seats: 4, type: 'standard', zone: 'center', is_available: true },
        { table_id: 5, table_number: 'T05', seats: 4, type: 'standard', zone: 'center', is_available: true },
        { table_id: 6, table_number: 'T06', seats: 6, type: 'standard', zone: 'center', is_available: false },
        { table_id: 7, table_number: 'T07', seats: 4, type: 'standard', zone: 'center', is_available: true },
        { table_id: 8, table_number: 'T08', seats: 8, type: 'large', zone: 'back', is_available: true },
        { table_id: 9, table_number: 'T09', seats: 8, type: 'large', zone: 'back', is_available: false },
        { table_id: 10, table_number: 'T10', seats: 6, type: 'standard', zone: 'back', is_available: true },
        { table_id: 11, table_number: 'V01', seats: 4, type: 'vip', zone: 'vip', is_available: true },
        { table_id: 12, table_number: 'V02', seats: 6, type: 'vip', zone: 'vip', is_available: true },
        { table_id: 13, table_number: 'V03', seats: 8, type: 'vip', zone: 'vip', is_available: true },
      ];
      dispatch({ type: 'SET_AVAILABLE_TABLES', payload: mockTables });
    }
  };

  const setDetails = (details) => {
    dispatch({ type: 'SET_DETAILS', payload: details });
  };

  const confirmBooking = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const bookingData = {
        branch_id: state.selectedBranch.id,
        table_id: state.selectedTable ? state.selectedTable.table_id || state.selectedTable : null,
        customer_name: state.customerDetails.name,
        customer_phone: state.customerDetails.phone,
        customer_email: state.customerDetails.email,
        booking_date: state.selectedDate.toISOString().split('T')[0],
        booking_time: state.selectedTime,
        guest_count: state.guestCount,
        notes: state.customerDetails.notes,
        requirements: JSON.stringify(state.customerDetails.requirements || {})
      };

      const response = await bookingAPI.createBooking(bookingData);
      
      if (response.success) {
        // Store booking reference for success page
        window.bookingReference = response.data.booking_ref;
        dispatch({ type: 'CONFIRM_BOOKING' });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create booking');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.error || 'Failed to create booking' });
      
      // For demo purposes, still proceed if API fails
      const mockBookingRef = `PH${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      window.bookingReference = mockBookingRef;
      dispatch({ type: 'CONFIRM_BOOKING' });
      
      throw error;
    }
  };

  const getBookingHistory = async (phone) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await bookingAPI.getCustomerBookings(phone);
      
      if (response.success) {
        dispatch({ type: 'SET_BOOKING_HISTORY', payload: response.data });
        return response.data;
      } else {
        throw new Error('Failed to load booking history');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load booking history' });
      console.error('Error loading booking history:', error);
      
      // Return empty array as fallback
      dispatch({ type: 'SET_BOOKING_HISTORY', payload: [] });
      return [];
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await bookingAPI.cancelBooking(bookingId);
      
      if (response.success) {
        // Reload booking history if customer phone is available
        if (state.customerDetails.phone) {
          await getBookingHistory(state.customerDetails.phone);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
        return true;
      } else {
        throw new Error(response.error || 'Failed to cancel booking');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.error || 'Failed to cancel booking' });
      throw error;
    }
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const setStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    // State
    ...state,
    
    // Actions
    setBranch,
    setDateTime,
    setGuests,
    setTable,
    setDetails,
    confirmBooking,
    resetBooking,
    setStep,
    clearError,
    
    // API actions
    loadBranches,
    loadAvailableTables,
    getBookingHistory,
    cancelBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
}; 