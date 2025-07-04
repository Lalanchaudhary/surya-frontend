import { useState, useEffect, useRef } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import suryalogo from '.././assets/suryalogo.png';
import { useCart } from '../context/CartContext';
import { getAllCakes } from '../services/cakeServices';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allCakes, setAllCakes] = useState([]);
  const searchRef = useRef(null);
  const [location, setLocation] = useState('Patiala');
  const [fullLocation] = useState('Patiala, Punjab, India');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const locationRef = useRef(null);
  const { user } = useUser();

  // Fetch all cakes for search
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const cakes = await getAllCakes();
        setAllCakes(cakes);
      } catch (error) {
        console.error('Error fetching cakes for search:', error);
      }
    };
    fetchCakes();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    if (showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchResults]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    }
    if (locationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationDropdownOpen]);

  // Search functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      const filteredCakes = allCakes.filter(cake => {
        const searchTerm = query.toLowerCase();
        return (
          cake.name?.toLowerCase().includes(searchTerm) ||
          cake.description?.toLowerCase().includes(searchTerm) ||
          cake.flavor?.toLowerCase().includes(searchTerm) ||
          cake.category?.toLowerCase().includes(searchTerm) ||
          cake.tag?.toLowerCase().includes(searchTerm)
        );
      });
      setSearchResults(filteredCakes.slice(0, 6));
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/all-cakes', { state: { searchQuery } });
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (cake) => {
    if (cake && cake._id) {
      navigate(`/cake/${cake._id}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleViewAllResults = () => {
    navigate('/all-cakes', { state: { searchQuery } });
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <nav className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-6 py-3 md:py-4 shadow-sm border-b bg-white relative gap-y-2">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 mr-4 w-full md:w-auto justify-between">
        <img src={suryalogo} alt="Surya Logo" className="h-10 md:h-16 cursor-pointer" onClick={() => navigate('/')} />
      </div>
      {/* Search Bar */}
      <form className="flex-1 min-w-[180px] max-w-md mx-auto relative order-3 md:order-none w-full" onSubmit={handleSearch} autoComplete="off">
        <input
          type="text"
          placeholder="Search 5000+ flowers, cakes, gifts etc"
          className="w-full py-1.5 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onFocus={() => setShowSearchResults(searchQuery.trim() && searchResults.length > 0)}
          ref={searchRef}
        />
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-80 overflow-y-auto">
            {searchResults.map((cake) => (
              <div
                key={cake._id}
                className="flex items-center px-4 py-2 hover:bg-rose-50 cursor-pointer"
                onClick={() => handleSearchResultClick(cake)}
              >
                <img src={cake.image || cake.img || '/favicon.png'} alt={cake.name} className="w-10 h-10 object-cover rounded mr-3" />
                <span className="text-gray-800">{cake.name}</span>
              </div>
            ))}
            <button
              type="button"
              className="w-full text-center py-2 text-rose-500 hover:bg-rose-50 border-t border-gray-100 font-semibold"
              onClick={handleViewAllResults}
            >
              View all results
            </button>
          </div>
        )}
      </form>
      {/* Right: Icons and Location */}
      <div className="flex items-center space-x-2 md:space-x-6 text-sm text-gray-700 w-full md:w-auto justify-end order-2 md:order-none">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-red-100 to-blue-100 px-2 py-1 rounded-md">
          <div className="flex items-center">
            <img src="https://flagcdn.com/w40/in.png" alt="India" className="h-4 w-6 mr-1" />
            <span>IND</span>
          </div>
          <div className="flex items-center text-xs">
            <IoMdPin className="mr-1" />
            <span>{user?.addresses[0]?.city}, {user?.addresses[0]?.state}</span>
            <FiEdit2 className="ml-1 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xl relative">
          <FaUser className="cursor-pointer" onClick={() => navigate('/user-profile')} />
          <div className="relative">
            <FaShoppingCart className="cursor-pointer" onClick={() => navigate('/cart')} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{getCartCount()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
