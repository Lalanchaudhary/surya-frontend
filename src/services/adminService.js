import axios from 'axios';
// import { API_URL } from '../config';

const api = axios.create({
  baseURL: `http://localhost:9000/admin`,
  withCredentials: true, // Enable cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch dashboard statistics' };
  }
};

// Orders
export const getAllOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order status' };
  }
};

// Products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch products' };
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create product' };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update product' };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete product' };
  }
};

// Users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.put(`/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user status' };
  }
};

// Analytics
export const getSalesAnalytics = async (period = 'monthly') => {
  try {
    const response = await api.get(`/analytics/sales?period=${period}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch sales analytics' };
  }
};

export const getProductAnalytics = async () => {
  try {
    const response = await api.get('/analytics/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch product analytics' };
  }
};

// Delivery Boys
export const getAllDeliveryBoys = async () => {
  try {
    const response = await api.get('/delivery');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch delivery boys' };
  }
};

export const createDeliveryBoy = async (deliveryBoyData) => {
  try {
    const response = await api.post('/delivery', deliveryBoyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create delivery boy' };
  }
};

export const updateDeliveryBoy = async (deliveryBoyId, deliveryBoyData) => {
  try {
    const response = await api.put(`/delivery/${deliveryBoyId}`, deliveryBoyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update delivery boy' };
  }
};

export const deleteDeliveryBoy = async (deliveryBoyId) => {
  try {
    const response = await api.delete(`/delivery/${deliveryBoyId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete delivery boy' };
  }
};

export const getAdminDetails = async () => {
  try {
    const response = await api.get('/details');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch admin details' };
  }
};

export const getAllAdmins = async () => {
  try {
    const response = await api.get('/admins');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch admins' };
  }
};

export const assignOrderToAdmin = async (orderId, adminId) => {
  try {
    const response = await api.put(`/orders/${orderId}/assign-admin`, { adminId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to assign order to admin' };
  }
}; 