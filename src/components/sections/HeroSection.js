import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BrandLogoSlideshow from "../BrandLogoSlideshow";

const HeroSection = ({ brands = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1714384716870-6d6322bf5a7f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx0YWN0aWNhbCUyMGdlYXJ8ZW58MHx8fHwxNzU3Mzc1OTk5fDA&ixlib=rb-4.1.0&q=85",
      title: "Professional Tactical Gear",
      subtitle: "Equipment trusted by military and law enforcement worldwide"
    },
    {
      image: "https://images.unsplash.com/photo-1705564667318-923901fb916a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx0YWN0aWNhbCUyMGdlYXJ8ZW58MHx8fHwxNzU3Mzc1OTk5fDA&ixlib=rb-4.1.0&q=85",
      title: "Combat Ready Apparel",
      subtitle: "Durable uniforms and tactical clothing for any mission"
    },
    {
      image: "https://images.unsplash.com/photo-1704278483976-9cca15325bc0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx0YWN0aWNhbCUyMGdlYXJ8ZW58MHx8fHwxNzU3Mzc1OTk5fDA&ixlib=rb-4.1.0&q=85",
      title: "Advanced Protection Systems",
      subtitle: "Body armor and protective equipment for maximum safety"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative flex items-center justify-center h-full text-center text-white">
              <div className="max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-red-500' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
      
      {/* Brand Logo Slideshow at bottom */}
      <BrandLogoSlideshow brands={brands} />
    </div>
  );
};

export default HeroSection;