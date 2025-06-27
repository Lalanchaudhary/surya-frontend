import React from 'react';
import backdrop from '../assets/backdrop.jpg'; // Use your image path here

const BackDropSection = () => {
  return (
    <section className="bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-semibold text-yellow-800 mb-2">
          Food of The Gods, Freshly Baked!
        </h2>
        <div className="w-12 h-1 mx-auto bg-cyan-400 mb-4 rounded"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Since 2004, we've been serving our guests the best quality treats,
          traditionally made and presented with care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center max-w-7xl mx-auto">
        {/* Left Side Texts */}
        <div className="space-y-10 text-center md:text-right">
          <div>
            <h3 className="text-yellow-800 font-bold text-lg">AUTHENTIC RECIPES</h3>
            <p className="text-gray-600">
              Our products are based on traditional home-style recipes using fresh ingredients.
            </p>
          </div>
          <div>
            <h3 className="text-yellow-800 font-bold text-lg">BAKED WITH LOVE</h3>
            <p className="text-gray-600">
              Our passion for baking is poured into every recipe, serving smiles on a plate everyday.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img src={backdrop} alt="Bakery illustration" className="w-full max-w-xs md:max-w-sm" />
        </div>

        {/* Right Side Texts */}
        <div className="space-y-10 text-center md:text-left">
          <div>
            <h3 className="text-yellow-800 font-bold text-lg">COMMITTED TO QUALITY</h3>
            <p className="text-gray-600">
              From our ingredients to our kitchen operations & guest services, we always prioritize quality.
            </p>
          </div>
          <div>
            <h3 className="text-yellow-800 font-bold text-lg">HONESTLY PRICED</h3>
            <p className="text-gray-600">
              We constantly strive to offer the best products at the right prices.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 border border-yellow-500 text-yellow-700 rounded-full hover:bg-yellow-100 transition">
          KNOW MORE
        </button>
      </div>
    </section>
  );
};

export default BackDropSection;
