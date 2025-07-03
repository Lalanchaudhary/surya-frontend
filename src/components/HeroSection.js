import React from "react";
import cake from '../assets/cake.jpg'
import HeroCake from '../assets/HeroCake.jpg'
import CakeGallery from './CakeGallery';
import BackDropSection from "./BackDropSection";
import Carousel from "./Carousel";
import SubNavbar from './SubNavbar';

const HeroSection = () => {
  let Heroimages = [
    {
      image: "https://bkmedia.bakingo.com/paytm-mango_cake_desktop.jpg",
    },
    {
      image: "https://bkmedia.bakingo.com/birthday_cake_desktop-WB.jpg",
    },
    {
      image: "https://bkmedia.bakingo.com/anniversary-banner-desktop_3.jpg",
    },
    {
      image: "https://bkmedia.bakingo.com/regular-cake-desktop_12.jpg"
    }
  ]
  return (
    <>
      <SubNavbar />
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-rose-50 to-amber-50 p-8 md:p-16 min-h-screen">
        
        {/* Left Content */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delightfully <span className="text-rose-400">Eggless</span>,<br />
            Perfectly Crafted Cakes
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Experience the joy of exquisite eggless cakes, baked with the finest ingredients and a dash of love. Find your perfect slice for any occasion.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-rose-300 hover:bg-rose-400 text-white font-semibold px-6 py-3 rounded shadow transition">
              Explore Our Cakes
            </button>
            <button className="bg-amber-100 hover:bg-amber-200 text-gray-800 font-medium px-6 py-3 rounded shadow transition">
              Get Inspired
            </button>
          </div>
        </div>

        {/* Right Image Placeholder */}
        <div className="w-full md:w-[800px] max-w-[800px]">
          <div className="aspect-[4/3] bg-gray-300 rounded-xl flex items-center justify-center text-4xl text-gray-500 shadow-lg">
            <img src={cake} alt="cake" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>
      <Carousel data={Heroimages} height="534" width="534" show={3} />
      <CakeGallery />
      {/* Dummy Review Section */}
      <section className="bg-white py-12 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center text-rose-400 mb-8">What Our Customers Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-rose-50 p-6 rounded-lg shadow text-center flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya S." className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-rose-200" />
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4">“Absolutely delicious cakes! The eggless options are a blessing. Will order again!”</p>
            <div className="font-semibold text-rose-500">- Priya S.</div>
          </div>
          {/* Review 2 */}
          <div className="bg-amber-50 p-6 rounded-lg shadow text-center flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rahul M." className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-amber-200" />
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4">“Beautifully crafted and so fresh. My birthday was made special. Thank you Surya Cake!”</p>
            <div className="font-semibold text-amber-600">- Rahul M.</div>
          </div>
          {/* Review 3 */}
          <div className="bg-rose-50 p-6 rounded-lg shadow text-center flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Sneha K." className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-rose-200" />
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4">“Prompt delivery and amazing taste. Highly recommend for all occasions!”</p>
            <div className="font-semibold text-rose-500">- Sneha K.</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
