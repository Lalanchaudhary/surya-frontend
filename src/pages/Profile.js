import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../Firebase';
import { checkPhoneNumber, register } from '../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }


      // Setup reCAPTCHA
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA verified');
          },
        });
      }

      const appVerifier = window.recaptchaVerifier;
      const fullPhone = formData.phoneNumber.startsWith('+')
        ? formData.phoneNumber
        : `+91${formData.phoneNumber}`;

      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      window.confirmationResult = confirmation;
      setIsOtpSent(true);
      toast.success(`Otp sent to ${fullPhone}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      
      // alert("OTP sent to " + fullPhone);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'Failed to send OTP. Try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (!formData.otp || formData.otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }
  
      // ✅ Step 1: Verify OTP
      const result = await window.confirmationResult.confirm(formData.otp);
      console.log("User signed in:", result.user);
  
      // ✅ Step 2: Check if user exists
      const data = await checkPhoneNumber(formData.phoneNumber);
  
      if (data.isExistingUser) {
        setIsExistingUser(true);
        navigate('/user-profile');
      } else {
        setIsOtpVerified(true);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!formData.email || !formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const data = await register({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });
              navigate('/user-profile');

      // User will be automatically redirected after successful registration
      // as the register service handles token and user storage
    } catch (err) {
      console.error('Error completing profile:', err);
      setError(err.message || 'Failed to complete profile. Please try again.');
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isOtpVerified ? 'Complete Your Profile' : isOtpSent ? 'Enter OTP' : 'Login with Phone Number'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isOtpVerified ? (
            <form className="space-y-6" onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
              {!isOtpSent ? (
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <div className="mt-1">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      maxLength="6"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e098b0] hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                >
                  {isOtpSent ? !loading?'Verify OTP':'Verifying...' : 'Send OTP'}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleCompleteProfile}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e098b0] hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                >
                  Complete Profile
                </button>
              </div>
            </form>
          )}

          {isOtpSent && !isOtpVerified && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setIsOtpSent(false);
                  setError('');
                  setFormData({ ...formData, otp: '' });
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
    </>
  );
};

export default Profile;
