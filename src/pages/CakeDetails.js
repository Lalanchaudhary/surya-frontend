import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import { useCart } from '../context/CartContext';
import { getCakeById, addReview } from '../services/cakeServices';
import { toast } from 'react-toastify';

const CakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cakeData, setCakeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);
  // New state for review form and modal
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    name: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  // --- Placeholder Data for Offers, Badges, and Upgrades ---
  const offers = [
    'Get upto 100 cashback on UPI payment through Paytm, minimum order value ₹599 *T&C',
    'Get upto 15% cashback on payments via Mobikwik UPI etc., minimum order value ₹799 *T&C',
    'Use Coupon Code: WINNI10 to get 10% off',
  ];
  const badges = [
    { icon: '🛡️', title: '100% Purchase Protection', desc: 'Secure Payments' },
    { icon: '🎂', title: 'Serving Excellence', desc: '100% Satisfaction!' },
    { icon: '⏰', title: 'Timely Delivery', desc: 'Slots Available' },
  ];
  const upgrades = [
    { name: 'Black Forest Diamond Cake', price: 749, image: cake },
    { name: 'Milky Mousse Blackforest Cake', price: 849, image: cake },
    { name: 'Together Forever Black Forest Cake', price: 999, image: cake },
    { name: 'Black Forest Cake With Yellow Roses', price: 1249, image: cake },
    { name: 'Classic Red Velvet Cake Box', price: 1299, image: cake },
  ];
  // --- End Placeholder Data ---

  // New state for egg/eggless and pincode
  const [eggType, setEggType] = useState('Eggless');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Fetch cake data if not available from location state
  useEffect(() => {
    const fetchCakeData = async () => {
      if (!location.state?.cake) {
        try {
          setLoading(true);
          const data = await getCakeById(id);
          setCakeData(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching cake:', err);
          setError('Failed to fetch cake details. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCakeData();
  }, [id, location.state]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  // Dynamic related cakes suggestion
  const allCakes = [
    { id: 1, name: 'Classic Chocolate Cake', price: 25, image: cake, description: 'A rich and moist chocolate cake made with premium cocoa.', category: 'Chocolate', tag: 'Best Seller' },
    { id: 2, name: 'Vanilla Dream Cake', price: 23, image: cake, description: 'Light and fluffy vanilla cake with buttercream frosting', category: 'Vanilla', tag: 'Trending' },
    { id: 3, name: 'Red Velvet Delight', price: 28, image: cake, description: 'Classic red velvet with cream cheese frosting', category: 'Red Velvet', tag: 'Best Seller' },
    { id: 4, name: 'Carrot Cake Special', price: 26, image: cake, description: 'Moist carrot cake with walnuts and cream cheese frosting', category: 'Carrot', tag: 'Trending' },
    { id: 5, name: 'Butterscotch Bliss', price: 27, image: cake, description: 'Butterscotch cake with caramel drizzle', category: 'Butterscotch', tag: 'Combo' },
    { id: 6, name: 'Pineapple Paradise', price: 24, image: cake, description: 'Fresh pineapple cake with whipped cream', category: 'Pineapple', tag: 'Combo' },
    { id: 7, name: 'Black Forest Classic', price: 29, image: cake, description: 'Classic black forest with cherries', category: 'Chocolate', tag: 'Best Seller' },
    { id: 8, name: 'Strawberry Swirl', price: 26, image: cake, description: 'Strawberry cake with real fruit', category: 'Strawberry', tag: 'Trending' },
    { id: 9, name: 'Coffee Craze', price: 30, image: cake, description: 'Coffee-infused cake for caffeine lovers', category: 'Coffee', tag: 'Best Seller' },
    { id: 10, name: 'Mango Magic', price: 28, image: cake, description: 'Seasonal mango cake', category: 'Mango', tag: 'Combo' },
  ];

  // Filter related cakes by category or tag, excluding the current cake
  const relatedCakes = cakeData
    ? allCakes.filter(
        c =>
          c.id !== cakeData._id &&
          (c.category === cakeData.category || c.tag === cakeData.tag)
      ).slice(0, 8)
    : allCakes.slice(0, 8);

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!cakeData) return;
    
    const selectedSizeData = cakeData.sizes.find(size => size.size === selectedSize);
    if (!selectedSizeData) {
      toast.error('Please select a size');
      return;
    }

    const cartItem = {
      id: cakeData._id,
      name: cakeData.name,
      image: cakeData.image,
      price: selectedSizeData.price,
      selectedSize: selectedSizeData,
      quantity: quantity,
      totalPrice: selectedSizeData.price * quantity
    };
    
    addToCart(cartItem);
    const token = localStorage.getItem("token");
    if(token){
      toast.success('Added to cart successfully!');
    } else {
      toast.error('Please login to add items to cart');
    }
  };

  // Update size selection handler
  const handleSizeSelection = (sizeId) => {
    setSelectedSize(sizeId);
    setQuantity(1); // Reset quantity when size changes
  };

  // Updated review submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment || !newReview.name) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewData = {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment
      };

      console.log('====================================');
      console.log("cake id",id);
      console.log('====================================');
      const updatedCake = await addReview(id, reviewData);
      setCakeData(updatedCake);
      
      // Reset form and close modal
      setNewReview({
        rating: 0,
        comment: '',
        name: ''
      });
      setIsReviewModalOpen(false);
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again later.');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Pincode check handler (mock)
  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setPincodeStatus('Available');
    } else {
      setPincodeStatus('Invalid');
    }
  };

  // Helper to get selected size object
  const selectedSizeObj = cakeData?.sizes?.find(s => s.size === selectedSize) || cakeData?.sizes?.[0];
  // Update selectedSize when cakeData changes
  useEffect(() => {
    if (cakeData?.sizes?.length) {
      setSelectedSize(cakeData.sizes[0].size);
    }
  }, [cakeData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cake details...</p>
        </div>
      </div>
    );
  }

  if (error || !cakeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Cake not found'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Cakes
        </button>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8 p-6">
          {/* Left: Cake Image */}
          <div className="flex-1 flex flex-col items-center justify-start">
            <img
              src={cakeData.image}
              alt={cakeData.name}
              className="w-full max-w-md object-cover rounded-lg border"
            />
            {/* Trust Badges */}
            <div className="flex gap-4 mt-6 w-full justify-center">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center bg-gray-50 p-3 rounded shadow-sm min-w-[120px]">
                  <span className="text-3xl mb-1">{badge.icon}</span>
                  <span className="font-semibold text-xs text-gray-700 text-center">{badge.title}</span>
                  <span className="text-[11px] text-gray-500 text-center">{badge.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-green-800 mb-1">{cakeData.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">₹ {selectedSizeObj?.price || cakeData.price}</span>
              <span className="text-xs text-gray-500">(Inclusive of all taxes)</span>
            </div>
            {/* Weight/Size Selection */}
            <div className="flex gap-2 flex-wrap mb-2">
              {cakeData.sizes?.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setSelectedSize(size.size)}
                  className={`px-4 py-2 rounded border text-sm font-medium transition-all ${selectedSize === size.size ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-gray-300 hover:border-green-400'}`}
                >
                  {size.size}
                </button>
              ))}
            </div>
            {/* Egg/Eggless Toggle */}
            <div className="flex gap-4 items-center mb-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="eggtype" value="Eggless" checked={eggType === 'Eggless'} onChange={() => setEggType('Eggless')} />
                <span className="text-sm">Eggless</span>
              </label>
            </div>
            {/* Pincode Check */}
            <div className="flex gap-2 items-center mb-2">
              <input
                type="text"
                value={pincode}
                onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0,6))}
                placeholder="Enter pincode to check delivery"
                className="border px-3 py-2 rounded text-sm w-48"
              />
              <button onClick={handlePincodeCheck} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold">Check</button>
              {pincodeStatus && (
                <span className={`text-sm ml-2 ${pincodeStatus === 'Available' ? 'text-green-600' : 'text-red-500'}`}>{pincodeStatus}</span>
              )}
            </div>
            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 items-center mb-2">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => handleQuantityChange(quantity - 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                <input type="number" value={quantity} onChange={e => handleQuantityChange(parseInt(e.target.value))} className="w-12 text-center border-x py-2" min="1" />
                <button onClick={() => handleQuantityChange(quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
              </div>
              <button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition flex-1">ADD TO CART</button>
            </div>
            <div className="text-xs text-gray-500 mb-2">14:23:41 hours left for today delivery</div>
            {/* Offers */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-2">
              <div className="font-semibold text-yellow-800 mb-1">Available offers</div>
              <ul className="list-disc list-inside text-sm text-yellow-900">
                <li>Get upto ₹100 in wallet in first order</li>
              <li>refers this site with your friend for get reward</li>
              </ul>
            </div>
            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-500 text-white font-semibold rounded px-2 py-0.5 flex items-center gap-1">
                {parseFloat(cakeData.rating)?.toFixed(1) || '4.5'}
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </span>
              <span className="text-gray-700 text-sm">{cakeData.reviews || 0} Reviews</span>
            </div>
          </div>
        </div>

        {/* Pick an Upgrade Section */}
        <div className="mt-8">
          <div className="font-semibold text-lg mb-2 text-gray-800">Pick an upgrade</div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {upgrades.map((upg, idx) => (
              <div key={idx} className="min-w-[160px] bg-white rounded-lg shadow p-2 flex flex-col items-center">
                <img src={upg.image} alt={upg.name} className="w-24 h-24 object-cover rounded mb-2" />
                <div className="text-sm font-medium text-gray-800 text-center mb-1">{upg.name}</div>
                <div className="text-green-700 font-semibold">₹{upg.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="font-bold text-lg mb-3 text-gray-800">Product Description</div>
          <div className="mb-2">
            <div className="font-semibold text-gray-700 mb-1">Product Details:</div>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {cakeData.product_details?.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Write a Review
            </button>
          </div>
          {/* Show a placeholder since reviews is a number, not an array */}
          <div className="text-gray-500 text-sm">No individual reviews to display. ({cakeData.reviews || 0} total reviews)</div>
        </div>

        {/* Related Cakes Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {relatedCakes.map((cake) => (
              <div
                key={cake.id}
                className="flex-none w-[280px] md:w-[320px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer snap-start"
                onClick={() => navigate(`/cake/${cake.id}`)}
              >
                <div className="aspect-square">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{cake.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{cake.description}</p>
                  <p className="text-rose-500 font-semibold">${cake.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={submittingReview}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || newReview.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                    rows="4"
                    placeholder="Share your experience with this cake..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    disabled={submittingReview}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
                    disabled={submittingReview}
                  >
                    {submittingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeDetails; 