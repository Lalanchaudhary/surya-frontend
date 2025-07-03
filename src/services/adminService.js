import axios from 'axios';
// import { API_URL } from '../config';

const api = axios.create({
  baseURL: `https://backend-patient-night-4790.fly.dev`,
  withCredentials: true, // Enable cookies
});


// Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch dashboard statistics' };
  }
};

// Orders
export const getAllOrders = async () => {
  try {
    const response = await api.get('/admin/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order status' };
  }
};

// Products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/admin/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch products' };
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/admin/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create product' };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/admin/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update product' };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete product' };
  }
};

// Users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user status' };
  }
};

// Analytics
export const getSalesAnalytics = async (period = 'monthly') => {
  try {
    const response = await api.get(`/admin/analytics/sales?period=${period}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch sales analytics' };
  }
};

export const getProductAnalytics = async () => {
  try {
    const response = await api.get('/admin/analytics/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch product analytics' };
  }
};

// Delivery Boys
export const getAllDeliveryBoys = async () => {
  try {
    const response = await api.get('/admin/delivery');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch delivery boys' };
  }
};

export const createDeliveryBoy = async (deliveryBoyData) => {
  try {
    const response = await api.post('/admin/delivery', deliveryBoyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create delivery boy' };
  }
};

export const updateDeliveryBoy = async (deliveryBoyId, deliveryBoyData) => {
  try {
    const response = await api.put(`/admin/delivery/${deliveryBoyId}`, deliveryBoyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update delivery boy' };
  }
};

export const deleteDeliveryBoy = async (deliveryBoyId) => {
  try {
    const response = await api.delete(`/admin/delivery/${deliveryBoyId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete delivery boy' };
  }
};

export const getAdminDetails = async () => {
  try {
    const response = await api.get('/admin/details');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch admin details' };
  }
};

export const getAllAdmins = async () => {
  try {
    const response = await api.get('/admin/admins');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch admins' };
  }
};

export const assignOrderToAdmin = async (orderId, adminId) => {
  try {
    const response = await api.put(`/admin/orders/${orderId}/assign-admin`, { adminId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to assign order to admin' };
  }
};

// Addons
export const getAllAddons = async () => {
  try {
    const response = await api.get('/adons/addons');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch addons' };
  }
};

export const createAddon = async (addonData) => {
  try {
    const response = await api.post('/adons/addons', addonData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create addon' };
  }
};

export const updateAddon = async (addonId, addonData) => {
  try {
    const response = await api.put(`/adons/addons/${addonId}`, addonData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update addon' };
  }
};

export const deleteAddon = async (addonId) => {
  try {
    const response = await api.delete(`/adons/addons/${addonId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete addon' };
  }
}; 