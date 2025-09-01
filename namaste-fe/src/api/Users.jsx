import apiClient from './client';

export const UserService = {
  // Get current user profile
  getContacts: async (id) => {
    try {
      const response = await apiClient.get(`/user/${id}/contacts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
    }catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  }
};
