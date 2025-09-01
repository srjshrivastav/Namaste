// src/services/userService.js
import apiClient from './client';

export const AuthService = {
  // Get current user profile
  login: async (phone, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
            phoneno:phone,
            password:password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Get user by ID
  signup: async (username, email, phone, password) => {
    const response = await apiClient.post('/auth/signup',
        {
            phoneno:phone,
            username,
            email,
            password
        }
    );
    return response.data;
  }
};
