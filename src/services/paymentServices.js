import axios from 'axios';
import { SiRazorpay } from "react-icons/si";
import { CiWallet } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
const API_URL = 'http://localhost:9000';
const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // Add token to requests if it exists
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No authentication token found');
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    console.warn('401 error: token might be invalid or expired');
    }
    return Promise.reject(error);
  }
);

// Initialize Razorpay
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create Razorpay Order
const createRazorpayOrder = async (orderData) => {
  console.log('====================================');
  console.log(orderData);
  console.log('====================================');
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }

    const response = await api.post('/payment/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

// Verify Razorpay Payment
const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await api.post('/payment/verify-order', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error(error.response?.data?.message || 'Payment verification failed');
  }
};

// Handle Razorpay Payment
const handleRazorpayPayment = async (orderData) => {
    try {
      const res = await initializeRazorpay();
      if (!res) throw new Error('Razorpay SDK failed to load');
  
      const order = await createRazorpayOrder(orderData);
  
      return new Promise((resolve, reject) => {
        const options = {
          key: 'rzp_test_1FGhUyAJx6vnYE',
          amount: order.amount,
          currency: order.currency,
          name: 'EggLessCake',
          description: 'Payment for your order',
          order_id: order.id,
  
          handler: async function (response) {
            try {
              const verifyData = await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order.orderId || orderData.orderId || order._id, // fix this if needed
              });
  
              resolve({ success: true, data: verifyData });
            } catch (err) {
              console.error('Payment verification error:', err);
              reject(new Error('Payment verification failed'));
            }
          },
  
          prefill: {
            name: orderData.userData?.name || 'Test User',
            email: orderData.userData?.email || 'test@example.com',
            contact: orderData.userData?.phoneNumber || '9999999999',
          },
  
          theme: { color: '#272361' },
  
          modal: {
            escape: false,
            backdropclose: false,
          },
        };
  
        const paymentObject = new window.Razorpay(options);
  
        paymentObject.on('payment.failed', function (response) {
          console.error('Razorpay payment failed:', response.error);
          reject(new Error(response.error.description || 'Payment failed'));
        });
  
        paymentObject.on('modal.closed', function () {
          console.warn('Payment popup was closed by user');
          reject(new Error('Payment cancelled by user'));
        });
  
        paymentObject.open();
      });
    } catch (error) {
      console.error('Razorpay payment error:', error);
      throw error;
    }
  };
  

// Handle COD Payment
const handleCODPayment = async (orderData) => {
  console.log("cod pe");
  
  try {
    const response = await api.post('/payment/cod', {
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      orderInstruction:orderData.orderInstruction
    });
    return response.data;
  } catch (error) {
    console.error('COD payment error:', error);
    throw new Error(error.response?.data?.message || 'Failed to place COD order');
  }
};

// Handle Wallet Payment
const handleWalletPayment = async (orderData) => {
  try {
    const response = await api.post('/payment/payment/wallet', {
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      orderInstruction:orderData.orderInstruction
    });
    return response.data;
  } catch (error) {
    console.error('Wallet payment error:', error);
    throw new Error(error.response?.data?.message || 'Failed to process wallet payment');
  }
};

const fetchWalletTransactions = async () => {
  try {
    const response = await api.get('/payment/wallet/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch wallet transactions');
  }
};

const AddMoneyinWallet = async (amount, userData) => {
  try {
    const res = await initializeRazorpay();
    if (!res) throw new Error('Razorpay SDK failed to load');

    // Step 1: Create order for wallet top-up
    const order = await api.post('/payment/wallet/add', { amount });
    const orderData = order.data;

    return new Promise((resolve, reject) => {
      const options = {
        key: 'rzp_test_1FGhUyAJx6vnYE',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EggLess Wallet Top-up',
        description: 'Add money to wallet',
        order_id: orderData.id,

        handler: async function (response) {
          try {
            // Step 2: Verify the payment
            const verifyRes = await api.post('/payment/wallet/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount
            });

            resolve({
              success: true,
              data: verifyRes.data
            });
          } catch (err) {
            console.error('Verification failed:', err);
            reject(new Error('Wallet verification failed'));
          }
        },

        prefill: {
          name: userData?.name || 'Test User',
          email: userData?.email || 'test@example.com',
          contact: userData?.phoneNumber || '9999999999',
        },

        theme: { color: '#272361' }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        reject(new Error(response.error.description || 'Payment failed'));
      });

      rzp.on('modal.closed', function () {
        reject(new Error('Payment cancelled by user'));
      });

      rzp.open();
    });
  } catch (error) {
    console.error('Error in AddMoneyinWallet:', error);
    throw error;
  }
};



// Get Payment Methods
const getPaymentMethods = () => {
  return [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Pay with Cards, UPI, Netbanking',
      icon: SiRazorpay,
      available: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: BsCash,
      available: true
    },
    {
      id: 'wallet',
      name: 'Wallet Balance',
      description: 'Pay using your wallet balance',
      icon: CiWallet,
      available: true
    }
  ];
};

// Get Payment Status
const getPaymentStatus = async (orderId) => {
  try {
    const response = await api.get(`/payment/status/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Get payment status error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get payment status');
  }
};

export {
  initializeRazorpay,
  createRazorpayOrder,
  verifyRazorpayPayment,
  handleRazorpayPayment,
  handleCODPayment,
  handleWalletPayment,
  getPaymentMethods,
  getPaymentStatus,
  fetchWalletTransactions,
  AddMoneyinWallet
}; 