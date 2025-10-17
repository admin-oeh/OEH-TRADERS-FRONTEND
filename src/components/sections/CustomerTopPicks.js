import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import LoginRequiredPopup from "../LoginRequiredPopup";

const CustomerTopPicks = ({ products, onPreview, onAddToCart }) => {
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ CUSTOMER FAVORITES
          </div>
          <h2 className="text-4xl font-bold mb-4">CUSTOMER TOP PICKS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Highest rated equipment based on customer reviews and satisfaction
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handlePreview(product)}
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  ★ {product.rating}
                </div>
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                  Top Pick
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <button 
                    onClick={() => handlePreview(product)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    Quick Preview
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 
                  className="font-semibold mb-2 cursor-pointer hover:text-green-600 transition-colors line-clamp-2"
                  onClick={() => handlePreview(product)}
                >
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-gray-600 mb-1">Contact for Price</p>
                <p className="text-sm text-gray-600 mb-3">{product.review_count} verified reviews</p>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!product.in_stock}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handlePreview(product)}
                    className="px-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold text-sm"
                    title="Quick Preview"
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "The quality exceeds expectations. Our entire security team is now equipped with OEH gear."
            </p>
            <p className="text-sm text-gray-600 font-semibold">- Security Director, Major Corporation</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "Fast quote response and excellent customer service. Will definitely order again."
            </p>
            <p className="text-sm text-gray-600 font-semibold">- Law Enforcement Agency</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "Professional grade equipment at competitive prices. Highly recommended for tactical teams."
            </p>
            <p className="text-sm text-gray-600 font-semibold">- Military Training Unit</p>
          </div>
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

export default CustomerTopPicks;