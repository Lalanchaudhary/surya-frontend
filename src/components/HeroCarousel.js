import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import carousel1 from '../assets/carousel1.jpg'
import carousel2 from '../assets/carousel2.jpg'
import carousel3 from '../assets/carousel3.jpg'
const slides = [
  {
    image: carousel1,
  },
  {
    image: carousel2,
  },
  {
    image: carousel3,
  },
];

function NextArrow({ onClick }) {
  return (
    <button
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md sm:p-1"
      onClick={onClick}
      aria-label="Next slide"
      style={{ outline: 'none', border: 'none' }}
    >
      <FaChevronRight className="text-2xl text-gray-700 sm:text-xl" />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md sm:p-1"
      onClick={onClick}
      aria-label="Previous slide"
      style={{ outline: 'none', border: 'none' }}
    >
      <FaChevronLeft className="text-2xl text-gray-700 sm:text-xl" />
    </button>
  );
}

const HeroCarousel = ({ data = slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: i => (
      <button className="w-2 h-2 sm:w-2 sm:h-2 rounded-full bg-black/30 hover:bg-black/60 focus:outline-none" />
    ),
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md shadow">
      <Slider {...settings}>
        {data.map((slide, idx) => (
          <div key={idx} className="relative">
            <img
              src={slide.image}
              alt={`slide-${idx}`}
              className="w-full h-[100px] sm:h-[100px] md:h-[320px] lg:h-[340px] object-cover object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
