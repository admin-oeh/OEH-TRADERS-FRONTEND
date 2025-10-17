import React from "react";

const PriceRangeSlider = ({ minPrice, maxPrice, value, onChange }) => {
  return (
    <div className="px-3 py-2">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="slider-thumb-1 absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="slider-thumb-2 absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;