import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavbarDemo from './components/Navbar'
import './App.css'
import HeroSection from './components/HeroSection'
import AllCakes from './pages/AllCakes'
import CakeDetails from './pages/CakeDetails'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Products from './components/Products'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ScrollToTop from './ScrollToTop'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
import ShippingDelivery from './pages/ShippingDelivery'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import Orders from './components/admin/Orders'
import AdminProducts from './components/admin/Products'
import Users from './components/admin/Users'
import Analytics from './components/admin/Analytics'
import AdminLogin from './pages/AdminLogin'
import DeliveryBoys from './components/admin/DeliveryBoys'
import CreateUser from './components/admin/CreateUser'
import { useAuth } from './context/AdminContext'
import { getCurrentLocation } from './lib/getCurrentLocation';
import { reverseGeocode } from './lib/reverseGeocode';
import { useUser } from './context/UserContext'
import Home from './components/Home'
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}


// Public Route Component
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/user-profile" replace />
  }
  return children
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />
  }

  // Check if admin has the required role
  if (admin.role !== 'admin' && admin.role !== 'delivery_boy') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// App Content with useLocation
const App = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, syncLocationAddress} = useUser();
  const [locationSynced, setLocationSynced] = useState(false);
  useEffect(() => {
    const syncLocation = async () => {
      if (user && !locationSynced) {
        try {
          setLoading(true);
          const loc = await getCurrentLocation();
          const addr = await reverseGeocode(loc.latitude, loc.longitude);
          
          const newAddress = {
            type: 'Home',
            street: addr.street,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            location: {
              latitude: loc.latitude,
              longitude: loc.longitude
            },
            isDefault: user.addresses?.length === 0
          };

          await syncLocationAddress(newAddress);
          setLocationSynced(true); // Mark as synced
        } catch (err) {
          setError("Unable to fetch current location");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    syncLocation();
  }, [user, locationSynced, syncLocationAddress]);
  const adminPaths = [
    '/admin',
    '/admin/login',
    '/admin/orders',
    '/admin/products',
    '/admin/users',
    '/admin/analytics',
    '/admin/delivery-boys',
    '/admin/create-user'
  ]

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path))

  return (
    <>
      <ScrollToTop />
      <div className="bg-[#f4eee1] min-h-screen flex flex-col">
        {!isAdminRoute && <NavbarDemo />}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/delievery" element={<DeliveryBoys />} />
            <Route path="/all-cakes" element={<AllCakes />} />
            <Route path="/cake/:id" element={<CakeDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Profile />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Orders />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Analytics />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/delivery-boys"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <DeliveryBoys />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-user"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <CreateUser />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

export default App
