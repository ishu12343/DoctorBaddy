// API Configuration
const config = {
  // Base URL for API requests
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com' 
    : 'http://127.0.0.1:5000',
  
  // API endpoints
  endpoints: {
    auth: '/api/auth',
    doctors: '/api/doctors',
    patients: '/api/patients',
    appointments: '/api/appointments',
    // Add other endpoints as needed
  },
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const BASE_URL = config.baseURL;
export const ENDPOINTS = config.endpoints;
export const HEADERS = config.headers;

export default config;
