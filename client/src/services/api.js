import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://asus-jonathan-observer-tackle.trycloudflare.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';

    // Auto logout on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.endsWith('/login') && !window.location.pathname.endsWith('/register')) {
        const basename = process.env.PUBLIC_URL || '/enum-airways';
        window.location.href = `${basename}/login`;
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
