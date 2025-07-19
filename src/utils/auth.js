/**
 * Authentication utility functions
 */

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};

export const setAuthData = (token, userType) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userType', userType);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
};

export const getAuthHeader = () => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};
