import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ProductCard from "../ProductCard";
import LoginRequiredPopup from "../LoginRequiredPopup";

const TrendingGear = ({ products, onPreview, onAddToCart }) => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      setSelectedProductId(productId);
      setShowLoginPopup(true);
      return;
    }

    const result = await onAddToCart(productId, quantity);
    if (result && result.success) {
      setSuccessMessage(`Added ${quantity} item(s) to cart!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else if (result && result.error) {
      setSuccessMessage(result.error || 'Error adding product to cart');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
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
    <section className="py-16 bg-gray-100" id="trending-gear">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">TRENDING GEAR</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Most popular equipment trusted by professionals worldwide
          </p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/products')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            View All Products
          </button>
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

export default TrendingGear;