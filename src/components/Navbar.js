import { useState, useEffect, useRef } from 'react';
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import suryalogo from '.././assets/suryalogo.png';
import { useCart } from '../context/CartContext';

const subMenuItems = [
  { label: 'CAKES', href: '/all-cakes' },
  { label: 'FLOWERS', href: '#' },
  { label: 'GIFTS', href: '#' },
  { label: 'CHOCOLATE', href: '#' },
  { label: 'BIRTHDAY', href: '#' },
  { label: 'COMBOS', href: '#', badge: 'New' },
  { label: 'ANNIVERSARY', href: '#' },
  { label: 'Occasion', href: '#' },
  { label: 'Customized Cakes', href: '#' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  return (
    <nav className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 shadow-sm border-b bg-white relative">
      {/* Left: Logo + Toggle (mobile) */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={suryalogo} alt="Surya Logo" className="h-10 md:h-16" onClick={() => navigate('/')}/>
        <button
          className="md:hidden ml-2 text-2xl text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Center Search (desktop only) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search 5000+ flowers, cakes, gifts etc"
          className="w-full py-1.5 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Right: Icons (desktop only) */}
      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-red-100 to-blue-100 px-2 py-1 rounded-md">
          <div className="flex items-center">
            <img src="https://flagcdn.com/w40/in.png" alt="India" className="h-4 w-6 mr-1" />
            <span>IND</span>
          </div>
          <div className="flex items-center text-xs">
            <IoMdPin className="mr-1" />
            <span>Deliver to 140601, Banur</span>
            <FiEdit2 className="ml-1 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xl relative">
          <FaUser className="cursor-pointer" onClick={() => navigate('/user-profile')} />
          <div className="relative">
            <FaShoppingCart className="cursor-pointer" onClick={() => navigate('/cart')} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{cartItems.length}</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" aria-hidden="true" />
          {/* Slide-in Menu */}
          <div
            ref={menuRef}
            className="fixed top-0 left-0 w-full max-w-full bg-white shadow-md z-50 flex flex-col px-4 py-4 md:hidden animate-fade-in transition-transform duration-300"
            style={{ minHeight: '100vh' }}
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-gray-700 focus:outline-none"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search 5000+ flowers, cakes, gifts etc"
                className="w-full py-2 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-100 to-blue-100 px-2 py-1 rounded-md mb-3">
              <div className="flex items-center">
                <img src="https://flagcdn.com/w40/in.png" alt="India" className="h-4 w-6 mr-1" />
                <span>IND</span>
              </div>
              <div className="flex items-center text-xs">
                <IoMdPin className="mr-1" />
                <span>Deliver to 140601, Banur</span>
                <FiEdit2 className="ml-1 text-gray-500" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6 text-xl mb-4">
              <FaUser className="cursor-pointer" onClick={() => navigate('/user-profile')} />
              <div className="relative">
                <FaShoppingCart className="cursor-pointer" />
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">1</span>
              </div>
            </div>

            {/* SubNavbar - Vertical Menu Items */}
            <div className="mt-2 flex flex-col space-y-3 text-sm">
              {subMenuItems.map((item) => (
                <div key={item.label} className="flex items-center">
                  <Link
                    to={item.href}
                    className="text-gray-800 font-medium hover:text-rose-500 px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-black">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
