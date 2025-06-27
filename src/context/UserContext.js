import React, { createContext, useContext, useState, useEffect } from 'react';
import * as userService from '../services/userService';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await userService.getProfile();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load user data');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // const login = async (credentials) => {
  //   try {
  //     const data = await userService.login(credentials);
  //     setUser(data.user);
  //     setError(null);
  //     return data;
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Login failed');
  //     throw err;
  //   }
  // };

  const register = async (userData) => {
    try {
      const data = await userService.register(userData);
      setUser(data.user);
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    setError(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await userService.updateProfile(profileData);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      throw err;
    }
  };

  const addAddress = async (addressData) => {
    try {
      const addresses = await userService.addAddress(addressData);
      setUser(prev => ({ ...prev, addresses }));
      setError(null);
      return addresses;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add address');
      throw err;
    }
  };

  const syncLocationAddress = async (addressData) => {
    try {
      const addresses = await userService.syncLocationAddress(addressData);
      setUser(prev => ({ ...prev, addresses }));
      setError(null);
      return addresses;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sync address');
      throw err;
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      const addresses = await userService.updateAddress(addressId, addressData);
      setUser(prev => ({ ...prev, addresses }));
      setError(null);
      return addresses;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update address');
      throw err;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const addresses = await userService.deleteAddress(addressId);
      setUser(prev => ({ ...prev, addresses }));
      setError(null);
      return addresses;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete address');
      throw err;
    }
  };

  const addUPI = async (upiData) => {
    try {
      const upiAccounts = await userService.addUPI(upiData);
      setUser(prev => ({ ...prev, upiAccounts }));
      setError(null);
      return upiAccounts;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add UPI account');
      throw err;
    }
  };

  const updateUPI = async (upiId, upiData) => {
    try {
      const upiAccounts = await userService.updateUPI(upiId, upiData);
      setUser(prev => ({ ...prev, upiAccounts }));
      setError(null);
      return upiAccounts;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update UPI account');
      throw err;
    }
  };

  const deleteUPI = async (upiId) => {
    try {
      const upiAccounts = await userService.deleteUPI(upiId);
      setUser(prev => ({ ...prev, upiAccounts }));
      setError(null);
      return upiAccounts;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete UPI account');
      throw err;
    }
  };

  const addMoney = async (amount) => {
    try {
      const wallet = await userService.addMoney(amount);
      setUser(prev => ({ ...prev, wallet }));
      setError(null);
      return wallet;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add money');
      throw err;
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      const settings = await userService.updateSettings(settingsData);
      setUser(prev => ({ ...prev, settings }));
      setError(null);
      return settings;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update settings');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    // login,
    register,
    logout,
    updateProfile,
    addAddress,
    syncLocationAddress,
    updateAddress,
    deleteAddress,
    addUPI,
    updateUPI,
    deleteUPI,
    addMoney,
    updateSettings
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 