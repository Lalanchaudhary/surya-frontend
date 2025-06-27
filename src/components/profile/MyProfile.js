import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const MyProfile = () => {
  const { user, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profilePicture: user?.profilePicture || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      profilePicture: user?.profilePicture || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Box position="relative">
                <Avatar
                  src={user?.profilePicture}
                  alt={user?.name}
                  sx={{ width: 150, height: 150 }}
                />
                {isEditing && (
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'background.paper'
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              {isEditing ? (
                <Box>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    helperText="Enter URL of your profile picture"
                  />

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">{user?.name}</Typography>
                    <IconButton onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="body1" color="textSecondary" paragraph>
                    Email: {user?.email}
                  </Typography>

                  <Typography variant="body1" color="textSecondary" paragraph>
                    Phone: {user?.phone || 'Not provided'}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Member since: {new Date(user?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile; 