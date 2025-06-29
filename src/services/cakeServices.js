import axios from 'axios';

const API_URL ='http://localhost:9000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all cakes
export const getAllCakes = () => {
  return api.get('/cake')
    .then(response => {
      if (response.data) {
        return response.data;
      }
      throw new Error('No data received from server');
    })
    .catch(error => {
      console.error('Error fetching cakes:', error);
      throw error;
    });
};

// Get single cake by ID
export const getCakeById = async (id) => {
  try {
    const response = await api.get(`/cake/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cake ${id}:`, error);
    throw error;
  }
};

// Create new cake (admin only)
export const createCake = async (cakeData) => {
  try {
    const response = await api.post('/cake', cakeData);
    return response.data;
  } catch (error) {
    console.error('Error creating cake:', error);
    throw error;
  }
};

// Create multiple cakes (admin only)
export const createMultipleCakes = async (cakesData) => {
  try {
    const response = await api.post('/cake/many', cakesData);
    return response.data;
  } catch (error) {
    console.error('Error creating multiple cakes:', error);
    throw error;
  }
};

// Update cake (admin only)
export const updateCake = async (id, cakeData) => {
  try {
    const response = await api.put(`/cake/${id}`, cakeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating cake ${id}:`, error);
    throw error;
  }
};

// Delete cake (admin only)
export const deleteCake = async (id) => {
  try {
    const response = await api.delete(`/cake/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cake ${id}:`, error);
    throw error;
  }
};

// Add review to cake
export const addReview = async (cakeId, reviewData) => {
    console.log('====================================');
    console.log(cakeId);
    console.log('====================================');
  try {
    const response = await api.post(`/cake/${cakeId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error(`Error adding review to cake ${cakeId}:`, error);
    throw error;
  }
};

// Search cakes
export const searchCakes = async (query) => {
  try {
    const response = await api.get(`/cake/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching cakes:', error);
    throw error;
  }
};

// Filter cakes by category/flavor
export const filterCakes = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/cake/filter?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error filtering cakes:', error);
    throw error;
  }
};

// Get cakes by category
export const getCakesByCategory = async (category) => {
  try {
    const response = await api.get(`/cake/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cakes by category ${category}:`, error);
    throw error;
  }
};

// Get cakes by flavor
export const getCakesByFlavor = async (flavor) => {
  try {
    const response = await api.get(`/cake/flavor/${flavor}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cakes by flavor ${flavor}:`, error);
    throw error;
  }
}; 