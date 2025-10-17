import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import LoginRequiredPopup from "../LoginRequiredPopup";

const NewArrivals = ({ products, onPreview, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useApp();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const itemsPerView = {
    mobile: 1,
    tablet: 2, 
    desktop: 3
  };
  
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, products.length - itemsToShow);
  
  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };
  
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

  const handleQuickQuote = async (productId, quantity = 1) => {
    if (!user) {
      setSelectedProductId(productId);
      setShowLoginPopup(true);
      return;
    }
    
    const result = await handleAddToCart(productId, quantity);
    if (result && result.success) {
      navigate('/quote-checkout');
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
  
  if (!products || products.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white" id="new-arrivals">
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
          <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            NEW ARRIVALS
          </div>
          <h2 className="text-4xl font-bold mb-4">Latest Tactical Gear</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our newest additions - cutting-edge equipment designed for today's professionals
          </p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-6"></div>
        </div>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                width: `${(products.length / itemsToShow) * 100}%`
              }}
            >
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="px-3"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <div className="bg-white text-black rounded-xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative flex-1">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-64 object-cover cursor-pointer"
                        onClick={() => handlePreview(product)}
                      />
                      
                      {/* Preview Button */}
                      <button
                        onClick={() => handlePreview(product)}
                        className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                        title="Quick Preview"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          NEW
                        </span>
                      </div>
                      
                      <div className="absolute top-14 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${
                          product.in_stock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {product.in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-4 flex-1">
                        <h3 
                          className="text-xl font-bold mb-2 cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
                          onClick={() => handlePreview(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium mb-2">{product.brand}</p>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm">({product.review_count})</span>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold text-gray-600">Contact for Price</span>
                            </div>
                          </div>
                        </div>
                        
                        {product.features && product.features.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold mb-2 text-gray-800">Key Features:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {product.features.slice(0, 2).map((feature, idx) => (
                                <li key={idx} className="flex items-center">
                                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleAddToCart(product.id)}
                            disabled={!product.in_stock}
                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handlePreview(product)}
                            className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                            title="Quick Preview"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleQuickQuote(product.id)}
                          disabled={!product.in_stock}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                        >
                          Request Instant Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {products.length > itemsToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-10 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-10 hover:scale-110"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Dots Indicator */}
          {products.length > itemsToShow && (
            <div className="flex justify-center mt-8 space-x-3">
              {[...Array(Math.ceil(products.length / itemsToShow))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === Math.floor(currentIndex / itemsToShow)
                      ? 'bg-red-500 scale-125' 
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>View All New Arrivals</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-red-400 mb-2">{products.length}</div>
            <div className="text-gray-300">New Products This Month</div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-red-400 mb-2">24-48h</div>
            <div className="text-gray-300">Average Quote Response</div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
            <div className="text-gray-300">Quality Verified</div>
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

export default NewArrivals;