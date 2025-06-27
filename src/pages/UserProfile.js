import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyOrders from '../components/profile/MyOrders';
import AddressBook from '../components/profile/AddressBook';
import { getProfile ,logout , updateProfile} from '../services/userService';
import Loading from '../components/Loading';
import MyWallet from '../components/profile/MyWallet';

const ManageSavedUPI = () => {
  const upiAccounts = [
    {
      id: 1,
      name: 'Personal UPI',
      upiId: 'john.doe@upi',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Business UPI',
      upiId: 'business@upi',
      isDefault: false,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Saved UPI</h2>
        <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Add New UPI
        </button>
      </div>

      <div className="space-y-4">
        {upiAccounts.map((account) => (
          <div key={account.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  {account.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{account.upiId}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-[#e098b0]">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MyAccount Component
const MyAccount = () => {
  const accountInfo = {
    membershipLevel: 'Gold',
    memberSince: '2023-01-15',
    points: 2500,
    benefits: [
      'Free shipping on all orders',
      'Priority customer support',
      'Exclusive member discounts',
      'Early access to sales',
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Account</h2>

      {/* Membership Card */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-2">{accountInfo.membershipLevel} Member</h3>
            <p className="text-sm">Member since {accountInfo.memberSince}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{accountInfo.points}</p>
            <p className="text-sm">Points</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Benefits</h3>
        <ul className="space-y-2">
          {accountInfo.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Account Actions */}
      <div className="space-y-4">
        <button className="w-full px-4 py-2 border border-[#e098b0] text-[#e098b0] rounded-md hover:bg-[#e098b0] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          View Transaction History
        </button>
        <button className="w-full px-4 py-2 border border-[#e098b0] text-[#e098b0] rounded-md hover:bg-[#e098b0] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Download Account Statement
        </button>
      </div>
    </div>
  );
};

// AccountSettings Component
const AccountSettings = () => {
  const settings = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      options: [
        { id: 'email', label: 'Email Notifications', checked: true },
        { id: 'sms', label: 'SMS Notifications', checked: false },
        { id: 'push', label: 'Push Notifications', checked: true },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Control your privacy preferences',
      options: [
        { id: 'profile', label: 'Public Profile', checked: true },
        { id: 'activity', label: 'Show Activity Status', checked: true },
        { id: 'data', label: 'Data Collection', checked: false },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Manage your account security',
      options: [
        { id: '2fa', label: 'Two-Factor Authentication', checked: false },
        { id: 'login', label: 'Login Notifications', checked: true },
        { id: 'password', label: 'Change Password', checked: false },
      ],
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

      <div className="space-y-6">
        {settings.map((section) => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      className="rounded border-gray-300 text-[#e098b0] focus:ring-[#e098b0]"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                  {option.id === 'password' && (
                    <button className="text-[#e098b0] hover:text-[#d88aa2]">
                      Change
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Cancel
        </button>
        <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');
  const [userData, setUserData] = useState(getProfile());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getProfile(); // Wait for resolved data
        console.log(profile.name);
        setUserData(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { id: 1, title: 'My Profile', icon: '👤', component: 'profile' },
    { id: 2, title: 'My Orders', icon: '📦', component: 'orders' },
    { id: 3, title: 'My Wallet', icon: '💰', component: 'wallet' },
    { id: 4, title: 'Address Book', icon: '📚', component: 'address' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile({
      name:userData.name,
      email:userData.email,
      phoneNumber:userData.phoneNumber,
      profilePicture:""
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <MyOrders />;
      case 'wallet':
        return <MyWallet />;
      case 'address':
        return <AddressBook />;
      case 'upi':
        return <ManageSavedUPI />;
      case 'account':
        return <MyAccount />;
      case 'settings':
        return <AccountSettings />;
      case 'profile':
      default:
        return (
          loading?<Loading/>:
          <div className="bg-white shadow rounded-lg">
            {/* Profile Header */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-2xl font-bold leading-6 text-gray-900">Profile</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and preferences</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e098b0] hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                    >
                      Save Changes
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  {isEditing && (
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
                      Change Photo
                    </button>
                  )}
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phoneNumber}
                        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.phoneNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {isEditing ? (
                      <textarea
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.addresses[0].pincode}, {userData.addresses[0].city}, {userData.addresses[0].state}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Account</h2>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveComponent(item.component)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-[#e098b0] hover:text-white rounded-md transition-colors duration-200 ${
                        activeComponent === item.component ? 'bg-[#e098b0] text-white' : ''
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 