import apiClient from './api';

export default {
  async getDoctors() {
    try {
      const response = await apiClient.get('api/patient/doctors');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      throw error;
    }
  },

  getProfilePhotoUrl(photo) {
    if (!photo) {
      return 'https://via.placeholder.com/150';
    }
    // If it's already a full URL, return as is
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return photo;
    }
    // Otherwise, construct the full URL using the backend base URL
    // Assuming images are stored in an 'uploads' directory
    const API_BASE_URL = 'https://doctorbaddy-backend.onrender.com/';
    return `${API_BASE_URL}uploads/${photo}`;
  }
};
