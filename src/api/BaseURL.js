import axios from 'axios';

// Base URL of your API
const BASE_URL = import.meta.env.VITE_BASE_URL;
  
// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach token to headers
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;

