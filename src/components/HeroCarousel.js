import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: 'https://assets.winni.in/sf-img/live/visuals/home/desktop/2025/6/1750743296657.jpg',
  },
  {
    image: 'https://assets.winni.in/sf-img/live/visuals/home/desktop/2025/3/1740983590442.jpg',
  },
  {
    image: 'https://assets.winni.in/sf-img/live/visuals/home/desktop/2025/3/1740983560968.jpg',
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
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <ul className="flex gap-2">{dots}</ul>
      </div>
    ),
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
              className="w-full h-[200px] sm:h-[260px] md:h-[420px] lg:h-[440px] object-cover object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
