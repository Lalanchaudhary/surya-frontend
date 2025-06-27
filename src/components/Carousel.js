import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props) {
  const [settings] = useState({ 
    dots: true,
    infinite: true,
    arrows: false, // ← Disable the arrows
    slidesToShow: props.show || 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(props.show || 3, 2),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
  

  return (
    <>
    
    <div className="w-screen px-4 py-6">
      <div className="slider-container">
        <Slider {...settings}>
          {props.data.map((item, index) => (
            <div key={index} className="px-2">
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src={item.image} 
                  alt={item.alt || 'carousel image'} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ 
                    height: props.height || '300px',
                    width: props.width || '100%'
                  }}
                />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">{item.title} hello</h3>
                    {item.description && (
                      <p className="text-white/90 text-sm mt-1">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </>
  );
}

export default Carousel;
