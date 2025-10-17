import React, { useState, useEffect } from "react";

const BrandLogoSlideshow = ({ brands }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const visibleLogos = 6;
  const duplicatedBrands = [...brands, ...brands];
  
  useEffect(() => {
    if (brands.length === 0) return;
    
    const autoSlide = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= brands.length ? 0 : nextIndex;
      });
    }, 2000);
    
    return () => clearInterval(autoSlide);
  }, [brands.length]);
  
  if (!brands || brands.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute bottom-0 left-0 right-0 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-3">
          <p className="text-white text-sm font-semibold tracking-wider drop-shadow-lg">
            TRUSTED BY PROFESSIONALS WORLDWIDE
          </p>
        </div>
        
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleLogos)}%)`,
              width: `${(duplicatedBrands.length / visibleLogos) * 100}%`
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / duplicatedBrands.length}%` }}
              >
                <div className="bg-white bg-opacity-90 rounded-lg p-4 h-20 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105">
                  <img 
                    src={brand.logo_url} 
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center mt-3 space-x-1">
          {brands.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogoSlideshow;