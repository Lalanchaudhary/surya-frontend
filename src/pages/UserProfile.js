import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyOrders from '../components/profile/MyOrders';
import AddressBook from '../components/profile/AddressBook';
import { getProfile, logout, updateProfile } from '../services/userService';
import Loading from '../components/Loading';
import MyWallet from '../components/profile/MyWallet';

const TABS = [
  { id: 'address', label: 'My Addresses' },
  { id: 'wallet', label: 'My Wallet' },
  { id: 'orders', label: 'My Orders' },
  { id: 'wishlist', label: 'My Wishlist' },
  { id: 'account', label: 'My Account' },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('address');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getProfile();
        setUserData(profile);
      } catch (error) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Helper for initials fallback
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  // Main content for each tab
  const renderTabContent = () => {
    if (loading) return <Loading />;
    switch (activeTab) {
      case 'address':
        return <AddressBook />;
      case 'wallet':
        return <MyWallet />;
      case 'orders':
        return <MyOrders />;
      case 'wishlist':
        return (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#7B3F00]">My Wishlist</h2>
            <p className="text-gray-500">You haven't added any items to your wishlist yet.</p>
          </div>
        );
      case 'account':
        return (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#7B3F00]">My Account</h2>
            <p className="text-gray-500">Account details and settings coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7f2] flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex flex-col items-center" style={{ background: '#434381' }}>
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center relative pt-8 pb-6">
          {/* Camera icon top left */}
          <button className="absolute left-4 top-4 text-white/80 hover:text-white" title="Change cover photo">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6M7 7h.01M21 21H3V3h18v18z" /></svg>
          </button>
          {/* Profile picture */}
          <div className="relative z-10 -mb-12">
            {userData?.profilePicture ? (
              <img src={userData.profilePicture} alt={userData.name} className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg" />
            ) : (
              <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-bold text-[#434381] shadow-lg">
                {getInitials(userData?.name)}
              </div>
            )}
          </div>
          {/* Name and stats */}
          <div className="mt-14 text-center">
            <h1 className="text-3xl font-bold text-white">{userData?.name || 'User Name'}</h1>
          </div>
          {/* Dots menu top right */}
          <button className="absolute right-4 top-4 text-white/80 hover:text-white" title="More options">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
          </button>
        </div>
        {/* Tabs */}
        <div className="w-full max-w-3xl mx-auto flex border-b border-[#e5e7eb] mt-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-base font-medium transition-colors duration-200 focus:outline-none ${
                activeTab === tab.id
                  ? 'text-[#7B3F00] border-b-4 border-[#7B3F00] bg-white' // brown active
                  : 'text-white hover:text-[#7B3F00] bg-transparent'
              }`}
              style={{ letterSpacing: '0.01em' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto flex-1 px-4 py-10">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserProfile; 