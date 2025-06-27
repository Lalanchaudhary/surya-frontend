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
    </>
  );
};

export default HeroSection;
