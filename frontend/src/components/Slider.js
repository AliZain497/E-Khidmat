import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: Custom arrow components
// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-40 hover:bg-opacity-70 p-3 rounded-full cursor-pointer transition-all"
  >
    <FaArrowRight className="text-2xl" />
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-40 hover:bg-opacity-70 p-3 rounded-full cursor-pointer transition-all"
  >
    <FaArrowLeft className="text-2xl" />
  </div>
);

const DynamicSlider = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // 👈 This makes animation repeat on scroll
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sliders') // 👈 Replace with your deployed URL in production
      .then(res => setImages(res.data))
      .catch(err => console.error('Failed to fetch slider images', err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "relative rounded-md shadow-lg overflow-hidden"
  };

  return (
    <section className="relative bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.imageUrl} // ✅ This will now load the actual image
                  alt={img.altText || `Slide ${index + 1}`}
                  className="w-full h-[300px] sm:h-[500px] object-cover"
                />
              </div>
            ))}

          </Slider>
        ) : (
          <p className="text-center py-10 text-gray-400">Loading slider images...</p>
        )}
      </div>
    </section>
  );
};

export default DynamicSlider;
