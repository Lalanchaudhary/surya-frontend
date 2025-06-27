import { useState } from 'react';
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import suryalogo from '.././assets/suryalogo.png'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 shadow-sm border-b bg-white relative">
      {/* Left: Logo & Hamburger */}
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="flex items-center space-x-2">
          <img
            src={suryalogo}
            alt="Winni Logo"
            className="h-10 md:h-16"
          />
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 text-2xl text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Center: Search (hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search 5000+ flowers, cakes, gifts etc"
          className="w-full py-1.5 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Right: Info & Icons (hidden on mobile) */}
      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
        {/* Flag & Location */}
        <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 px-2 py-1 rounded-md">
          <div className="flex items-center">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India"
              className="h-4 w-6 mr-1"
            />
            <span>IND</span>
          </div>
          <div className="flex items-center text-xs">
            <IoMdPin className="mr-1" />
            <span>Deliver to 140601, Banur</span>
            <FiEdit2 className="ml-1 text-gray-500" />
          </div>
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4 text-xl relative">
          <FaUser className="cursor-pointer" />
          <div className="relative">
            <FaHeart className="cursor-pointer" />
            <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">0</span>
          </div>
          <div className="relative">
            <FaShoppingCart className="cursor-pointer" />
            <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">1</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu (dropdown/slide-in) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col px-4 py-4 md:hidden animate-fade-in">
          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search 5000+ flowers, cakes, gifts etc"
              className="w-full py-2 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
            />
          </div>
          {/* Flag & Location */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 px-2 py-1 rounded-md mb-3">
            <div className="flex items-center">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="h-4 w-6 mr-1"
              />
              <span>IND</span>
            </div>
            <div className="flex items-center text-xs">
              <IoMdPin className="mr-1" />
              <span>Deliver to 140601, Banur</span>
              <FiEdit2 className="ml-1 text-gray-500" />
            </div>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-6 text-xl mb-2">
            <FaUser className="cursor-pointer" />
            <div className="relative">
              <FaHeart className="cursor-pointer" />
              <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">0</span>
            </div>
            <div className="relative">
              <FaShoppingCart className="cursor-pointer" />
              <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">1</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
