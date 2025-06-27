import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getCurrentLocation } from '../../lib/getCurrentLocation';
import { reverseGeocode } from '../../lib/reverseGeocode';
const AddressBook = () => {
  const { user, addAddress, updateAddress, deleteAddress } = useUser();
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    location:{
      latitude:'',
      longitude:''
    },
    isDefault: false
  });

  const handleOpen = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAddress(null);
    setFormData({
      type: 'Home',
      street: '',
      city: '',
      state: '',
      pincode: '',
      location:{
        latitude:'',
        longitude:''
      },
      isDefault: false
    });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.street || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, formData);
      } else {
        await addAddress(formData);
      }
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete address');
      }
    }
  };

  return (
    <Box>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
          <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]" onClick={() => handleOpen()}
          >
            Add New Address
          </button>
        </div>

        <div className="space-y-4">
          {user?.addresses?.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{address.type}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{user.name}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-[#e098b0]" onClick={() => handleOpen(address)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700" onClick={() => handleDelete(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-gray-600">
                <p>{address.address}</p>
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p>{user.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={async () => {
              try {
                setLoading(true);
                const loc = await getCurrentLocation();
                const addr = await reverseGeocode(loc.latitude, loc.longitude);
                setFormData(prev => ({
                  ...prev,
                  location:{
                    ...prev.location,
                  latitude: loc.latitude,
                  longitude: loc.longitude
                  }
                }));
                
                setFormData((prev) => ({
                  ...prev,
                  ...addr,
                }));
              } catch (err) {
                setError("Unable to fetch current location");
                console.error(err);
              } finally {
                setLoading(false);
              }
            }}
          >
            Use Current Location
          </Button>

          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Address Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Address Type"
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />


            <FormControl fullWidth margin="normal">
              <InputLabel>Set as Default</InputLabel>
              <Select
                name="isDefault"
                value={formData.isDefault}
                onChange={handleChange}
                label="Set as Default"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressBook; 