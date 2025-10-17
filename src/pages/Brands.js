import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../utils/constants";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API}/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Brands</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map(brand => (
            <div key={brand.id} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <img src={brand.logo_url} alt={brand.name} className="w-32 h-16 object-contain mx-auto mb-4"/>
              <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
              <p className="text-gray-600">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;