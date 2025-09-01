// src/services/apiClient.js
import axios from 'axios';
import {NAMASTE_BACKEND} from '@/config/Config'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: NAMASTE_BACKEND,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('namaste-api-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


whatsappApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    return Promise.reject(error);
  }
)

export default apiClient;
