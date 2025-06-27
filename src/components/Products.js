import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('category');

  // Sample cake data - replace with your actual data
  const cakes = [
    { id: 1, name: 'Chocolate Cake', category: 'chocolate', price: 25, image: cake },
    { id: 2, name: 'Vanilla Cake', category: 'vanilla', price: 20, image: cake },
    { id: 3, name: 'Strawberry Cake', category: 'fruit', price: 30, image: cake },
    { id: 4, name: 'Red Velvet Cake', category: 'chocolate', price: 35, image: cake },
  ];

  const categories = ['all', 'chocolate', 'vanilla', 'fruit'];
  const priceRanges = ['all', 'under-20', '20-30', 'above-30'];

  const filteredCakes = cakes.filter(cake => {
    const categoryMatch = selectedCategory === 'all' || cake.category === selectedCategory;
    const priceMatch = selectedPrice === 'all' || 
      (selectedPrice === 'under-20' && cake.price < 20) ||
      (selectedPrice === '20-30' && cake.price >= 20 && cake.price <= 30) ||
      (selectedPrice === 'above-30' && cake.price > 30);
    return categoryMatch && priceMatch;
  });

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden flex items-center justify-center gap-2 bg-white p-4 shadow-md mb-4"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
      </button>

      {/* Sidebar */}
      <div className={`
        bg-gradient-to-br from-rose-50 to-amber-50 fixed lg:static inset-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-64 bg-white p-6 shadow-lg
      `}>
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-semibold">Filter Cakes</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Category Filter Accordion */}
        <div className="border-b border-gray-200 bg-gradient-to-br from-rose-50 to-amber-50">
          <button
            onClick={() => toggleAccordion('category')}
            className="w-full flex items-center justify-between py-3 text-left"
          >
            <h3 className="font-medium">Category</h3>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                openAccordion === 'category' ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className={`space-y-2 overflow-hidden transition-all duration-200 ${
            openAccordion === 'category' ? 'max-h-48 pb-3' : 'max-h-0'
          }`}>
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter Accordion */}
        <div className="mt-4">
          <button
            onClick={() => toggleAccordion('price')}
            className="w-full flex items-center justify-between py-3 text-left"
          >
            <h3 className="font-medium">Price Range</h3>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                openAccordion === 'price' ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className={`space-y-2 overflow-hidden transition-all duration-200 ${
            openAccordion === 'price' ? 'max-h-48 pb-3' : 'max-h-0'
          }`}>
            {priceRanges.map(range => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={range}
                  checked={selectedPrice === range}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">{range.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Cake Grid */}
      <div className="flex-1 p-4 lg:p-8 bg-gradient-to-br from-rose-50 to-amber-50">
        <h2 className="text-2xl font-bold mb-6">Our Delicious Cakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredCakes.map(cake => (
            <div 
              key={cake.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/cake/${cake.id}`)}
            >
              <div className="relative aspect-square">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{cake.name}</h3>
                <p className="text-gray-600 mb-3">${cake.price}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="flex-1 border border-rose-300 text-rose-400 hover:bg-rose-50 px-4 py-2 rounded transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cake/${cake.id}`);
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 