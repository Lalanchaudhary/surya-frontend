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

const ManageUPI = () => {
  const { user, addUPI, updateUPI, deleteUPI } = useUser();
  const [open, setOpen] = useState(false);
  const [editingUPI, setEditingUPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    upiId: '',
    isDefault: false
  });

  const handleOpen = (upi = null) => {
    if (upi) {
      setEditingUPI(upi);
      setFormData(upi);
    } else {
      setEditingUPI(null);
      setFormData({
        name: '',
        upiId: '',
        isDefault: false
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUPI(null);
    setFormData({
      name: '',
      upiId: '',
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

  const validateUPI = (upiId) => {
    // Basic UPI ID validation (you can enhance this based on your requirements)
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upiId);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.upiId) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validateUPI(formData.upiId)) {
      setError('Please enter a valid UPI ID');
      return;
    }

    setLoading(true);
    try {
      if (editingUPI) {
        await updateUPI(editingUPI._id, formData);
      } else {
        await addUPI(formData);
      }
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save UPI account');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (upiId) => {
    if (window.confirm('Are you sure you want to delete this UPI account?')) {
      try {
        await deleteUPI(upiId);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete UPI account');
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          Manage UPI Accounts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add New UPI
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {user?.upiAccounts?.map((upi) => (
          <Grid item xs={12} md={6} key={upi._id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {upi.name}
                      {upi.isDefault && (
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ ml: 1, fontSize: '0.875rem' }}
                        >
                          (Default)
                        </Typography>
                      )}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {upi.upiId}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(upi)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(upi._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUPI ? 'Edit UPI Account' : 'Add New UPI Account'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Account Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              helperText="Enter a name to identify this UPI account"
            />

            <TextField
              fullWidth
              margin="normal"
              label="UPI ID"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              required
              helperText="Enter your UPI ID (e.g., username@bank)"
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

export default ManageUPI; 