import React from "react";

const TopBrands = ({ brands }) => (
  <section className="py-16 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">TOP BRANDS</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <img src={brand.logo_url} alt={brand.name} className="w-full h-12 object-contain mb-4"/>
            <h4 className="text-center font-semibold">{brand.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TopBrands;