import React, { useEffect, useState } from "react"
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
    CircularProgress,
    RadioGroup,
    Radio,
    FormControlLabel,
  } from '@mui/material';
  import { getCurrentLocation } from '../../lib/getCurrentLocation';
  import { reverseGeocode } from '../../lib/reverseGeocode'
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import { getAllAdmins } from '../../services/adminService';
import { getDistanceFromLatLonInKm } from '../../lib/utils';

const ShipAddr=({setSelectedAddress1, setShippingCost, shippingCost, shippingLoading, setShippingLoading, selectedAddress: selectedAddressProp, onOrderInstructionChange ,orderInstruction ,setOrderInstruction})=>{
    const { cartItems } = useCart();
    const { user, addAddress, updateAddress, deleteAddress } = useUser();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(selectedAddressProp || null);
    const [open, setOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressFormData, setAddressFormData] = useState({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        location: {
          latitude: '',
          longitude: ''
        },
        isDefault: false
      });

      const setSelectAdr=(address)=>{
        setSelectedAddress(address);
        setSelectedAddress1(address);
      }

      useEffect(() => {
        // Set default address if available
        if (user?.addresses?.length > 0) {
          const defaultAddress = user.addresses.find(addr => addr.isDefault);
          setSelectedAddress(defaultAddress || user.addresses[0]);
        }
    
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [user?.addresses]);

      useEffect(() => {
        const calculateShipping = async () => {
            if (!selectedAddress || !setShippingCost || !setShippingLoading) return;
            setShippingLoading(true);
            try {
                const { admins } = await getAllAdmins();
                const userLocation = selectedAddress.location;
                if (userLocation && admins) {
                    let minDistance = Infinity;
                    for (const admin of admins) {
                        const adminLocation = admin.location;
                        if (adminLocation) {
                            const distance = getDistanceFromLatLonInKm(
                                adminLocation.latitude,
                                adminLocation.longitude,
                                userLocation.latitude,
                                userLocation.longitude
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                            }
                        }
                    }
                    if (minDistance !== Infinity) {
                        setShippingCost(minDistance * 10); // Rs 10 per km
                    } else {
                        setShippingCost(0);
                    }
                } else {
                    setShippingCost(0);
                }
            } catch (error) {
                setShippingCost(0);
            } finally {
                setShippingLoading(false);
            }
        };
        calculateShipping();
    }, [selectedAddress, setShippingCost, setShippingLoading]);

      const handleAddressOpen = (address = null) => {
        if (address) {
          setEditingAddress(address);
          setAddressFormData(address);
        } else {
          setEditingAddress(null);
          setAddressFormData({
            type: 'Home',
            street: '',
            city: '',
            state: '',
            pincode: '',
            location: {
              latitude: '',
              longitude: ''
            },
            isDefault: false
          });
        }
        setOpen(true);
      };
    
      const handleAddressClose = () => {
        setOpen(false);
        setEditingAddress(null);
        setAddressFormData({
          type: 'Home',
          street: '',
          city: '',
          state: '',
          pincode: '',
          location: {
            latitude: '',
            longitude: ''
          },
          isDefault: false
        });
        setError(null);
      };
    
      const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

      const handleAddressSubmit = async () => {
        if (!addressFormData.street || !addressFormData.city || !addressFormData.state || !addressFormData.pincode) {
          setError('Please fill in all required fields');
          return;
        }
    
        setLoading(true);
        try {
          if (editingAddress) {
            await updateAddress(editingAddress._id, addressFormData);
          } else {
            await addAddress(addressFormData);
          }
          handleAddressClose();
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to save address');
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <Box>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="mb-6">
            <div className='flex justify-between pb-2'>
              <h3 className="text-lg font-medium">Select a Shipping Address</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddressOpen()}
                sx={{ bgcolor: '#e098b0', '&:hover': { bgcolor: '#d88aa2' } }}
              >
                Add New Address
              </Button>
            </div>
            {user?.addresses?.length === 0 ? (
              <Typography color="textSecondary" align="center" sx={{ py: 2 }}>
                No addresses found. Please add a new address.
              </Typography>
            ) : (
              <div className="space-y-4">
                {user?.addresses?.map((address) => (
                  <Card
                    key={address._id}
                    sx={{
                      cursor: 'pointer',
                      border: selectedAddress?._id === address._id ? '2px solid #e098b0' : '1px solid #e0e0e0',
                      '&:hover': { borderColor: '#e098b0' }
                    }}
                    onClick={() => setSelectAdr(address)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">{address.type}</Typography>
                            {address.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Default
                </span>
                            )}
                          </Box>
                          <Typography color="textSecondary">{user.name}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <Typography>{address.street}</Typography>
                        <Typography>
                          {address.city}, {address.state} {address.pincode}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {/* Shipping charge display for selected address */}
            {selectedAddress && (
              shippingLoading ? (
                <Typography sx={{ color: 'gray', fontSize: '0.95rem', mt: 1 }}>Calculating shipping...</Typography>
              ) : (
                <Typography sx={{ color: 'gray', fontSize: '0.95rem', mt: 1 }}>Shipping Charge: ₹{shippingCost.toFixed(2)}</Typography>
              )
            )}
            {/* Order Instruction Input */}
            <div className="mt-6">
              <TextField
                fullWidth
                label="Order Instructions (e.g., Write name on cake with happy birthday)"
                variant="outlined"
                value={orderInstruction}
                onChange={e => {
                  setOrderInstruction(e.target.value);
                  if (onOrderInstructionChange) onOrderInstructionChange(e.target.value);
                }}
                multiline
                minRows={2}
              />
            </div>
          </div>
        </div>

        <Dialog open={open} onClose={handleAddressClose} maxWidth="sm" fullWidth>
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
                  
                  setAddressFormData(prev => ({
                    ...prev,
                    location: {
                      latitude: loc.latitude,
                      longitude: loc.longitude
                    },
                    ...addr
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
                  value={addressFormData.type}
                  onChange={handleAddressChange}
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
                value={addressFormData.street}
                onChange={handleAddressChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="City"
                name="city"
                value={addressFormData.city}
                onChange={handleAddressChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="State"
                name="state"
                value={addressFormData.state}
                onChange={handleAddressChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Pincode"
                name="pincode"
                value={addressFormData.pincode}
                onChange={handleAddressChange}
                required
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Set as Default</InputLabel>
                <Select
                  name="isDefault"
                  value={addressFormData.isDefault}
                  onChange={handleAddressChange}
                  label="Set as Default"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddressClose}>Cancel</Button>
            <Button
              onClick={handleAddressSubmit}
              variant="contained"
              disabled={loading}
              sx={{ bgcolor: '#e098b0', '&:hover': { bgcolor: '#d88aa2' } }}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
}

export default ShipAddr