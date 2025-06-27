import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true, // Enable cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    // Clear any localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin ? JSON.parse(admin) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const admin = getCurrentAdmin();
  return admin?.role === 'admin';
};

export const adminSignup = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/auth/admin-signup', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'User creation failed' };
  }
}; 