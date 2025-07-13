import React from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';
import SubNavbar from './SubNavbar';
import HeroCarousel from './HeroCarousel';
import CakeGallery from './CakeGallery';
import TermsandConditions from './TermsandConditions';

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
      <HeroCarousel/>
      <CakeGallery/>
      <TermsandConditions/>
      {/* Dynamic Review Section */}
      {(() => {
        const reviews = [
          { text: "Absolutely delicious cakes! The eggless options are a blessing. Will order again!", author: "Priya S.", color: "rose", img: "https://randomuser.me/api/portraits/women/68.jpg" },
          { text: "Beautifully crafted and so fresh. My birthday was made special. Thank you Surya Cake!", author: "Rahul M.", color: "amber", img: "https://randomuser.me/api/portraits/men/32.jpg" },
          { text: "Prompt delivery and amazing taste. Highly recommend for all occasions!", author: "Sneha K.", color: "rose", img: "https://randomuser.me/api/portraits/women/65.jpg" },
          { text: "The best bakery in town! The cakes are always fresh and tasty.", author: "Amit J.", color: "amber", img: "https://randomuser.me/api/portraits/men/45.jpg" },
          { text: "Loved the custom design cake. It was the highlight of our party!", author: "Ritu P.", color: "rose", img: "https://randomuser.me/api/portraits/women/72.jpg" },
          { text: "Quick delivery and great service. The kids loved the cake!", author: "Karan S.", color: "amber", img: "https://randomuser.me/api/portraits/men/23.jpg" },
          { text: "Affordable prices and premium quality. Highly recommended!", author: "Meena D.", color: "rose", img: "https://randomuser.me/api/portraits/women/12.jpg" },
          { text: "The chocolate truffle cake was heavenly. Will order again soon!", author: "Suresh T.", color: "amber", img: "https://randomuser.me/api/portraits/men/56.jpg" },
          { text: "Thank you for making my anniversary special with your amazing cake!", author: "Anjali V.", color: "rose", img: "https://randomuser.me/api/portraits/women/34.jpg" },
          { text: "Best eggless cakes I've ever had. Soft, moist, and delicious!", author: "Deepak L.", color: "amber", img: "https://randomuser.me/api/portraits/men/78.jpg" },
        ];
        return (
          <section className="bg-white py-12 px-4 md:px-16">
            <h2 className="text-3xl font-bold text-center text-rose-400 mb-8">What Our Customers Say</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className={`bg-${review.color}-50 p-6 rounded-lg shadow text-center flex flex-col items-center`}
                >
                  <img src={review.img} alt={review.author} className={`w-16 h-16 rounded-full mb-4 object-cover border-2 border-${review.color}-200`} />
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                    ))}
                  </div>
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