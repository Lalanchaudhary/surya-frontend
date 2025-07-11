import React from 'react';
import backdrop from '../assets/backdrop.jpg'; // Use your image path here

const BackDropSection = () => {
  return (
    <div className="bg-[#fff5f2] py-10">
      {/* Decorative Banner */}
      <div className="max-w-5xl mx-auto border-[6px] border-yellow-700 rounded-[60px] bg-red-200 p-10 md:p-16 text-center shadow-md">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 font-serif tracking-wide">
          THE MAGICAL MOVE
        </h1>

        {/* Text */}
        <p className="text-lg md:text-xl text-gray-800 font-medium mb-4">
          You can use Rs. 150 wallet balance in your first Order
        </p>

        {/* Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default BackDropSection;
