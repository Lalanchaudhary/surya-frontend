import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ShipAddr from '../components/checkout/ShipAddr';
import Payment from '../components/checkout/Payment';
import { getAllAdmins } from '../services/adminService';
import { getDistanceFromLatLonInKm } from '../lib/utils';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Address form data
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

  const [shippingCost, setShippingCost] = useState(0);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [orderInstruction, setOrderInstruction] = useState("");
  useEffect(() => {
    // Set default address if available
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddress1(defaultAddress || user.addresses[0]);
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

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    // await handlePayment();
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedAddress) {
      setError('Please select a shipping address');
      return;
    }
    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShipAddr setSelectedAddress1={setSelectedAddress1} setShippingCost={setShippingCost} shippingCost={shippingCost} shippingLoading={shippingLoading} setShippingLoading={setShippingLoading} selectedAddress={selectedAddress} orderInstruction={orderInstruction} setOrderInstruction={setOrderInstruction} />
        );
      case 2:
        return (
          <Payment selectedAddress={selectedAddress} orderInstruction={orderInstruction}/>
        );
      case 3:
        return (
          <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Order Review
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
                  Shipping Information
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {user?.name}<br />
                  {selectedAddress?.street}<br />
                  {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.pincode}<br />
                  {user?.email}<br />
                  {user?.phone}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1 }}>
                  Order Summary
                </Typography>
                {cartItems.map(item => (
                  <Box key={item.id} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    <Typography>{item.name} x {item.quantity}</Typography>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
                <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2, pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Shipping</Typography>
                    <Typography>₹{shippingCost.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <Typography>Tax</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: 2, 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}>
                    <Typography variant="subtitle1">Total</Typography>
                    <Typography variant="subtitle1">₹{total.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      py: { xs: 2, sm: 4, md: 6 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto',
        px: { xs: 1, sm: 2, md: 3 }
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Checkout
        </Typography>
        
        {/* Progress Steps */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 }
          }}>
            {['Shipping', 'Payment', 'Review'].map((step, index) => (
              <Box key={step} sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Box sx={{ 
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: currentStep > index + 1 ? 'primary.main' : 
                          currentStep === index + 1 ? 'primary.light' : 'grey.300'
                }}>
                  <Typography sx={{ 
                    color: 'white', 
                    fontWeight: 'medium',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography sx={{ 
                  ml: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: currentStep === index + 1 ? 'primary.main' : 'text.secondary',
                  fontWeight: currentStep === index + 1 ? 'medium' : 'normal'
                }}>
                  {step}
                </Typography>
                {index < 2 && !isMobile && (
                  <Box sx={{ 
                    width: { xs: 32, sm: 64, md: 96 },
                    height: 2,
                    mx: 2,
                    bgcolor: currentStep > index + 1 ? 'primary.main' : 'grey.300'
                  }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleOrderSubmit} sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          p: { xs: 2, sm: 3, md: 4 }
        }}>
          {renderStep()}
          
          {/* Navigation Buttons */}
          <Box sx={{ 
            mt: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            justifyContent: 'space-between'
          }}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                disabled={loading}
                fullWidth={isMobile}
              >
                Back
              </Button>
            )}
            {currentStep < 2 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={loading || (currentStep === 1 && !selectedAddress)}
                sx={{ 
                  ml: { sm: 'auto' },
                  bgcolor: '#272361',
                  '&:hover': { bgcolor: '#272361' },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Next
              </Button>
            ) : ''
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout; 