import React from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import SubNavbar from './SubNavbar';
import HeroCarousel from './HeroCarousel';
import CakeGallery from './CakeGallery';

const Home = () => {
  const navigate = useNavigate();

  const trendingCakes = [
    { id: 1, name: 'Chocolate Cake', price: 25, image: cake },
    { id: 2, name: 'Vanilla Cake', price: 20, image: cake },
    { id: 3, name: 'Strawberry Cake', price: 30, image: cake },
    { id: 4, name: 'Red Velvet Cake', price: 35, image: cake },
  ];

  const surpriseCakes = [
    { id: 5, name: 'Birthday Surprise', price: 40, image: cake },
    { id: 6, name: 'Anniversary Special', price: 45, image: cake },
    { id: 7, name: 'Wedding Cake', price: 50, image: cake },
    { id: 8, name: 'Custom Design', price: 55, image: cake },
  ];

  const bestSellers = [
    { id: 9, name: 'Classic Chocolate', price: 28, image: cake },
    { id: 10, name: 'Carrot Cake', price: 32, image: cake },
    { id: 11, name: 'Cheesecake', price: 38, image: cake },
    { id: 12, name: 'Black Forest', price: 42, image: cake },
  ];

  const CakeCard = ({ cake }) => (
    <div 
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
  );

  const CakeSection = ({ title, cakes, description }) => (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cakes.map(cake => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <SubNavbar />
      <HeroCarousel/>
      <CakeGallery/>
      {/* Dynamic Review Section */}
      {(() => {
        const reviews = [
          { text: "Absolutely delicious cakes! The eggless options are a blessing. Will order again!", author: "Priya S.", color: "rose" },
          { text: "Beautifully crafted and so fresh. My birthday was made special. Thank you Surya Cake!", author: "Rahul M.", color: "amber" },
          { text: "Prompt delivery and amazing taste. Highly recommend for all occasions!", author: "Sneha K.", color: "rose" },
          { text: "The best bakery in town! The cakes are always fresh and tasty.", author: "Amit J.", color: "amber" },
          { text: "Loved the custom design cake. It was the highlight of our party!", author: "Ritu P.", color: "rose" },
          { text: "Quick delivery and great service. The kids loved the cake!", author: "Karan S.", color: "amber" },
          { text: "Affordable prices and premium quality. Highly recommended!", author: "Meena D.", color: "rose" },
          { text: "The chocolate truffle cake was heavenly. Will order again soon!", author: "Suresh T.", color: "amber" },
          { text: "Thank you for making my anniversary special with your amazing cake!", author: "Anjali V.", color: "rose" },
          { text: "Best eggless cakes I've ever had. Soft, moist, and delicious!", author: "Deepak L.", color: "amber" },
        ];
        return (
          <section className="bg-white py-12 px-4 md:px-16">
            <h2 className="text-3xl font-bold text-center text-rose-400 mb-8">What Our Customers Say</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className={`bg-${review.color}-50 p-6 rounded-lg shadow text-center`}
                >
                  <p className="text-lg text-gray-700 mb-4">“{review.text}”</p>
                  <div className={`font-semibold text-${review.color === 'rose' ? 'rose-500' : 'amber-600'}`}>- {review.author}</div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
};

export default Home; 