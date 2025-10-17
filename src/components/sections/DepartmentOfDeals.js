import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import LoginRequiredPopup from "../LoginRequiredPopup";

const DepartmentOfDeals = ({ deals, onPreview, onAddToCart }) => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      setSelectedProductId(productId);
      setShowLoginPopup(true);
      return;
    }

    const result = await onAddToCart(productId, quantity);
    if (result && result.success) {
      alert(`Added ${quantity} item(s) to cart!`);
    }
  };

  const handlePreview = (product) => {
    if (onPreview) {
      onPreview(product);
    }
  };

  const handleLogin = () => {
    if (selectedProductId) {
      localStorage.setItem('returnToProduct', selectedProductId);
    }
    navigate('/user-login');
  };

  const handleRegister = () => {
    if (selectedProductId) {
      localStorage.setItem('returnToProduct', selectedProductId);
    }
    navigate('/user-login');
  };

  return (
    <section className="py-16 bg-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-500 text-red-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🔥 SPECIAL OFFERS
          </div>
          <h2 className="text-4xl font-bold mb-4">DEPARTMENT OF DEALS</h2>
          <p className="text-xl text-red-200 max-w-2xl mx-auto">
            Exclusive offers and special pricing on premium tactical equipment
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((product) => (
            <div key={product.id} className="bg-black bg-opacity-50 rounded-xl overflow-hidden hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-1">
              <div 
                className="relative cursor-pointer"
                onClick={() => handlePreview(product)}
              >
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-red-900 px-3 py-1 rounded-full text-sm font-bold">
                  SPECIAL DEAL
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                    Quick Preview
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-2 cursor-pointer hover:text-yellow-400 transition-colors"
                  onClick={() => handlePreview(product)}
                >
                  {product.name}
                </h3>
                <p className="text-red-200 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-semibold text-yellow-400">Special Pricing Available</span>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!product.in_stock}
                    className="flex-1 bg-yellow-500 text-red-900 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button 
                    onClick={() => handlePreview(product)}
                    className="px-4 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    title="Quick Preview"
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <LoginRequiredPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </section>
  );
};

export default DepartmentOfDeals;