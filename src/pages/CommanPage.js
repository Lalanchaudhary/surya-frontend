import React, { useState, useEffect } from 'react';
import CakeGallery from '../components/CakeGallery';
import cake from '../assets/cake.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { getAllCakes } from '../services/cakeServices';

const CommanPage = () => {
    const { id } = useParams();
  const [activeSection, setActiveSection] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    rating: true,
    dietary: true,
    flavor: true,
    occasion: true
  });
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    dietary: [],
    flavor: [],
    occasion: []
  });
  const [allCakes, setAllCakes] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('Popularity');

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const data = await getAllCakes();
        const filterData = data.filter((e) => e.tag === id);
        setAllCakes(filterData);
        setCakes(filterData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cakes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = allCakes;

    // Price Range
    filtered = filtered.filter(
      cake => typeof cake.price === 'number' && cake.price >= filters.priceRange[0] && cake.price <= filters.priceRange[1]
    );

    // Rating
    if (filters.rating > 0) {
      filtered = filtered.filter(cake => typeof cake.rating === 'number' && cake.rating >= filters.rating);
    }

    // Dietary
    if (filters.dietary.length > 0) {
      filtered = filtered.filter(cake =>
        cake.dietary && Array.isArray(cake.dietary) && filters.dietary.every(diet => cake.dietary.includes(diet))
      );
    }

    // Flavor
    if (filters.flavor.length > 0) {
      filtered = filtered.filter(cake =>
        cake.flavor && Array.isArray(cake.flavor) && filters.flavor.some(flavor => cake.flavor.includes(flavor))
      );
    }

    // Occasion
    if (filters.occasion.length > 0) {
      filtered = filtered.filter(cake =>
        cake.occasion && Array.isArray(cake.occasion) && filters.occasion.some(occasion => cake.occasion.includes(occasion))
      );
    }

    // Sorting
    let sorted = [...filtered];
    switch (sortBy) {
      case 'Price: Low to High':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'Rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Popularity or default: sort by review count descending
        sorted.sort((a, b) => (b.reviews || b.reviewCount || 0) - (a.reviews || a.reviewCount || 0));
        break;
    }

    setCakes(sorted);
  }, [filters, allCakes, sortBy]);

  // Filter options
  const dietaryOptions = ['Eggless', 'Vegan', 'Gluten Free', 'Sugar Free'];
  const flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry', 'Butterscotch', 'Red Velvet', 'Fruit'];
  const occasionOptions = ['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Corporate'];

  // Sample cake data organized by category
  const cakeCategories = {
    chocolate: {
      title: "Chocolate Delights",
      description: "Rich, decadent chocolate cakes that will satisfy your sweet tooth",
      cakes: [
        { id: 1, name: 'Classic Chocolate Cake', price: 25, image: cake, rating: 4.5, reviewCount: 128 },
        { id: 2, name: 'Chocolate Truffle Cake', price: 30, image: cake, rating: 4.8, reviewCount: 95 },
        { id: 3, name: 'Chocolate Fudge Cake', price: 28, image: cake, rating: 4.3, reviewCount: 76 },
        { id: 4, name: 'Chocolate Fudge Cake', price: 28, image: cake, rating: 4.7, reviewCount: 112 },
      ]
    },
    vanilla: {
      title: "Vanilla Classics",
      description: "Timeless vanilla cakes with a modern twist",
      cakes: [
        { id: 4, name: 'Classic Vanilla Cake', price: 22, image: cake, rating: 4.6, reviewCount: 89 },
        { id: 5, name: 'Vanilla Bean Cake', price: 26, image: cake, rating: 4.4, reviewCount: 67 },
        { id: 6, name: 'Vanilla Cream Cake', price: 24, image: cake, rating: 4.2, reviewCount: 54 },
      ]
    },
    fruit: {
      title: "Fruit Favorites",
      description: "Fresh and fruity cakes bursting with natural flavors",
      cakes: [
        { id: 7, name: 'Strawberry Delight', price: 28, image: cake, rating: 4.9, reviewCount: 156 },
        { id: 8, name: 'Mixed Fruit Cake', price: 32, image: cake, rating: 4.7, reviewCount: 98 },
        { id: 9, name: 'Berry Blast Cake', price: 30, image: cake, rating: 4.5, reviewCount: 82 },
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'vanilla', name: 'Vanilla' },
    { id: 'fruit', name: 'Fruit' }
  ];

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const FilterSidebar = () => (
    <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setFilters({
            priceRange: [0, 2000],
            rating: 0,
            dietary: [],
            flavor: [],
            occasion: []
          })}
          className="text-sm text-rose-500 hover:text-rose-600"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleFilterSection('price')}
          className="w-full flex justify-between items-center py-3 text-left"
        >
          <h4 className="font-medium text-gray-700">Price Range</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              expandedFilters.price ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.price && (
          <div className="pb-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                className="w-20 px-2 py-1 border rounded text-sm"
                min="0"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-20 px-2 py-1 border rounded text-sm"
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleFilterSection('rating')}
          className="w-full flex justify-between items-center py-3 text-left"
        >
          <h4 className="font-medium text-gray-700">Minimum Rating</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              expandedFilters.rating ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.rating && (
          <div className="pb-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleFilterChange('rating', star)}
                  className={`p-1 rounded ${
                    filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dietary Preferences */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleFilterSection('dietary')}
          className="w-full flex justify-between items-center py-3 text-left"
        >
          <h4 className="font-medium text-gray-700">Dietary Preferences</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              expandedFilters.dietary ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.dietary && (
          <div className="pb-3 space-y-2">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.dietary.includes(option)}
                  onChange={() => handleCheckboxChange('dietary', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Flavors */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleFilterSection('flavor')}
          className="w-full flex justify-between items-center py-3 text-left"
        >
          <h4 className="font-medium text-gray-700">Flavors</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              expandedFilters.flavor ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.flavor && (
          <div className="pb-3 space-y-2">
            {flavorOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.flavor.includes(option)}
                  onChange={() => handleCheckboxChange('flavor', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Occasions */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleFilterSection('occasion')}
          className="w-full flex justify-between items-center py-3 text-left"
        >
          <h4 className="font-medium text-gray-700">Occasions</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              expandedFilters.occasion ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.occasion && (
          <div className="pb-3 space-y-2">
            {occasionOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.occasion.includes(option)}
                  onChange={() => handleCheckboxChange('occasion', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CakeCard = ({ cake }) => (
    <div 
      className="group bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/cake/${cake.id}`)}
    >
      <div className="w-full aspect-square relative overflow-hidden p-4 pb-0">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="w-full p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-rose-500 font-medium text-sm">₹{cake.price}</p>
          <div className='flex items-center gap-1'>
            <div className="hidden lg:flex">
              {renderStars(cake.rating)}
            </div>
            <div className='block lg:hidden'>
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">({cake.reviewCount})</span>
          </div>
        </div>
        <h3 className="font-medium text-sm text-gray-800 group-hover:text-rose-500 transition-colors duration-300 mb-2">
          {cake.name}
        </h3>
        <p className="hidden lg:block md:block text-xs text-gray-600 mb-3 line-clamp-2">
          {cake.description}
        </p>
        <div className="flex gap-2">
          <button 
            className="hidden lg:block flex-1 bg-rose-300 hover:bg-rose-400 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="hidden lg:block flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cake/${cake.id}`);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cakes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Breadcrumb */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Anniversary Cakes Online</h1>
          <div className="text-sm text-gray-500 mb-2">
            Home <span className="mx-1">&gt;</span> <span className="text-gray-700 font-medium">Anniversary Cakes</span>
          </div>
        </div>
        {/* Tab & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-t-lg px-6 py-2 font-semibold text-gray-900 border-b-2 border-rose-400 shadow-sm">
              Anniversary Cakes <span className="text-gray-500 font-normal">({cakes.length} items)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow-sm">
              <span className="font-medium text-gray-700 text-sm">Filter By Price</span>
              <select
                className="ml-2 border rounded px-2 py-1 text-sm"
                value={(() => {
                  if (filters.priceRange[0] === 0 && filters.priceRange[1] === 2000) return 'All Products';
                  if (filters.priceRange[0] === 0 && filters.priceRange[1] === 500) return 'Under ₹500';
                  if (filters.priceRange[0] === 500 && filters.priceRange[1] === 1000) return '₹500 - ₹1000';
                  if (filters.priceRange[0] === 1000 && filters.priceRange[1] === 2000) return 'Above ₹1000';
                  return 'All Products';
                })()}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'All Products') handleFilterChange('priceRange', [0, 2000]);
                  else if (val === 'Under ₹500') handleFilterChange('priceRange', [0, 500]);
                  else if (val === '₹500 - ₹1000') handleFilterChange('priceRange', [500, 1000]);
                  else if (val === 'Above ₹1000') handleFilterChange('priceRange', [1000, 2000]);
                }}
              >
                <option>All Products</option>
                <option>Under ₹500</option>
                <option>₹500 - ₹1000</option>
                <option>Above ₹1000</option>
              </select>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow-sm">
              <span className="font-medium text-gray-700 text-sm">Sort By</span>
              <select
                className="ml-2 border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>
        {/* Cake Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden relative group cursor-pointer"
              onClick={() => navigate(`/cake/${cake._id}`)}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/cake/${cake._id}`); }}
            >
              {/* Badge */}
              {cake.badge && cake.badge !== 'N/A' && (
                <span className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-bold shadow ${cake.badge === 'Best Seller' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
                  {cake.badge}
                </span>
              )}
              <img src={cake.image} alt={cake.name} className="w-full h-56 object-cover" />
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-rose-100 transition">
                <FaHeart className="text-rose-400" />
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">{cake.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">₹{cake.price}</span>
                  {cake.oldPrice && <span className="text-sm text-gray-400 line-through">₹{cake.oldPrice}</span>}
                  {cake.discount && <span className="text-xs text-green-700 font-semibold bg-green-100 rounded px-2 py-0.5">{cake.discount}% Off</span>}
                </div>
                <div className="text-xs text-gray-500 mb-1">Earliest Delivery: <span className="text-green-600 font-semibold">{cake.delivery}</span></div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">{cake.rating} <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></span>
                  <span className="text-xs text-gray-700">{cake.reviews} Reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommanPage;