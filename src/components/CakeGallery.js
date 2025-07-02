import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackDropSection from './BackDropSection';
import { getAllCakes } from '../services/cakeServices';
const CakeGallery = () => {
  const navigate = useNavigate();
  const trendingScrollRef = useRef(null);
  const surpriseScrollRef = useRef(null);
  const bestSellersScrollRef = useRef(null);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const data = await getAllCakes();
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        setCakes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cakes:', err);
        setError('Failed to fetch cakes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  // Filter cakes for different sections
  const trendingCakes = cakes.filter(cake => cake.label === 'Trending');
  const surpriseCakes = cakes.filter(cake => cake.tag === 'Combo');
  const bestSellers = cakes.filter(cake => cake.label === 'Best seller');
  const PhotoCake = cakes.filter(cake => cake.tag === 'Photo-cakes');
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

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const CakeCard = ({ cake }) => {
    const navigate = useNavigate();

    // Use price from sizes[0] if price is not present
    const mainPrice = cake.price || (cake.sizes && cake.sizes[0]?.price) || 0;
    // Calculate discount percent if original_price is present
    const discount = cake?.original_price && mainPrice
      ? Math.round(((cake.original_price - mainPrice) / cake.original_price) * 100)
      : null;
    // Use cake._id or fallback to cake.name as key
    const cakeKey = cake._id || cake.name;

    return (
      <div
        className="bg-white rounded-xl shadow group overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={() => navigate(`/cake/${cakeKey}`)}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={cake.image}
            alt={cake.name}
            title={cake.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {cake.label && (
            <span className="absolute top-2 left-2 bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              {cake.label}
            </span>
          )}
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <h3 className="font-medium text-base text-gray-900 mb-1 truncate">{cake.name}</h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-800">₹ {mainPrice}</span>
            {cake.original_price && (
              <span className="text-sm text-gray-400 line-through">₹ {cake.original_price}</span>
            )}
            {discount && (
              <span className="text-xs text-green-600 font-semibold bg-green-50 rounded px-1.5 py-0.5">
                {discount}% off
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            {cake.tag && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{cake.tag}</span>}

            <span className="bg-green-500 text-white font-semibold rounded px-2 py-0.5 flex items-center gap-1">
              {parseFloat(cake.rating)?.toFixed(1) || '4.5'}
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {cake.reviews && (
                <span className="ml-1 text-xs text-white/80">({cake.reviews})</span>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  };
  

  const CakeSection = ({ title, cakes, backdrop, scrollRef }) => (
    <div className={backdrop ? "mb-8 relative lg:p-6 md:p-2" : "mb-8"}>
      {backdrop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-red-100/80 to-rose-200/80 rounded-xl" />
          <svg className="absolute top-4 left-4 w-8 h-8 opacity-30" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 opacity-20" fill="#e098b0" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] relative z-10 text-right">{title}</h2>
        <div className="flex hidden lg:block md:block gap-2 z-10">
          <button
            onClick={() => scrollLeft(scrollRef)}
            className="p-2 mr-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollRight(scrollRef)}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className={backdrop ? "relative z-10" : ""}>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {cakes.map(cake => (
            <div key={cake.id} className="flex-none w-[280px] md:w-[320px] snap-start">
              <CakeCard cake={cake} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cakes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 p-3 lg:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-3 lg:p-6">
      <CakeSection 
        title="Our Trending Cakes" 
        cakes={trendingCakes} 
        scrollRef={trendingScrollRef} 
      />
      <CakeSection 
        title="Surprise Your Love" 
        cakes={surpriseCakes} 
        backdrop 
        scrollRef={surpriseScrollRef} 
      />
      <BackDropSection />
      <CakeSection 
        title="Our Best Sellers" 
        cakes={bestSellers} 
        scrollRef={bestSellersScrollRef} 
      />
            <CakeSection 
        title="Photo Cakes" 
        cakes={PhotoCake} 
        scrollRef={bestSellersScrollRef} 
      />
    </div>
  );
};

export default CakeGallery; 