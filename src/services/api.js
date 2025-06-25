import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Branch API
export const branchAPI = {
  getBranches: () => api.get('/branches'),
  getBranch: (id) => api.get(`/branches/${id}`),
  getBranchTables: (id) => api.get(`/branches/${id}/tables`),
  checkAvailability: (id, date, time) => 
    api.get(`/branches/${id}/availability?date=${date}&time=${time}`),
};

// add login api
export const loginAPI = {
  login: (data) => api.post('/users/login', data),
};

// Table API
export const tableAPI = {
  getTables: () => api.get('/tables'),
  getTable: (id) => api.get(`/tables/${id}`),
  getTablesByBranch: (branchId) => api.get(`/tables/branch/${branchId}`),
  checkTableAvailability: (data) => api.post('/tables/availability', data),
};

// Booking API
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getBookings: (params) => api.get('/bookings', { params }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  getBookingByRef: (ref) => api.get(`/bookings/ref/${ref}`),
  getCustomerBookings: (phone) => api.get(`/bookings/customer/${phone}`),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
  confirmBooking: (id) => api.put(`/bookings/${id}/confirm`),
};

// User API
export const userAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  getUserByLineID: (lineId) => api.get(`/users/line/${lineId}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  loginUser: (data) => api.post('/users/login', data),
  getUserProfile: (lineId) => api.get(`/users/profile?line_id=${lineId}`),
};

export default api; 