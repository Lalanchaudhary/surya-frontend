import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { getAllAdmins } from '../services/adminService';
import { getDistanceFromLatLonInKm } from '../lib/utils';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useUser();
  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateShipping = async () => {
      try {
        if (user && user.addresses) {
          const { admins } = await getAllAdmins();
          const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
          const userLocation = defaultAddress.location;

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
            }
          }
        }
      } catch (error) {
        console.error("Failed to calculate shipping cost:", error);
        setShippingCost(0); // Default to 0 if calculation fails
      } finally {
        setLoading(false);
      }
    };

    calculateShipping();
  }, [user]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" >
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <img src='https://assets.winni.in/groot/2023/09/06/empty-cart/desktop/main-image-without-button-new.png' className='h-80' onClick={() => navigate('/all-cakes')}/>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
                {cartItems.map(item => (
                  <div key={item.id} className="p-3 sm:p-6 border-b border-green-100 last:border-b-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate text-green-800">{item.name}</h3>
                        <p className="text-sm sm:text-base text-green-600">Size: {item.selectedSize ? item.selectedSize.name || item.selectedSize.size : 'N/A'}</p>
                        <p className="text-green-600 font-semibold text-sm sm:text-base">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center border border-green-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 sm:px-3 py-1 text-green-600 hover:bg-green-50 text-sm sm:text-base transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 sm:px-3 py-1 text-sm sm:text-base text-green-800 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 sm:px-3 py-1 text-green-600 hover:bg-green-50 text-sm sm:text-base transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-green-400 hover:text-red-500 transition-colors p-1"
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4 sm:top-8 border border-green-100">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-800">Order Summary</h2>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between text-green-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 sm:pt-3 mt-2 sm:mt-3">
                    <div className="flex justify-between font-semibold text-base sm:text-lg text-green-800">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition mt-4 sm:mt-6 text-sm sm:text-base shadow-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate('/all-cakes')}
                  className="w-full border border-green-500 text-green-600 hover:bg-green-50 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition mt-2 sm:mt-3 text-sm sm:text-base"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 