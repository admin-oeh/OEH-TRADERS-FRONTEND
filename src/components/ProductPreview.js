import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoginRequiredPopup from './LoginRequiredPopup';

const ProductPreview = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { user } = useApp();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const images = [product.image_url, ...(product.gallery_images || [])];
  
  const features = product.features || [
    'Professional Grade Materials',
    'Military Specifications',
    'Durable Construction',
    'Field Tested'
  ];

  const specifications = product.specifications || {
    'Material': 'High-Density Nylon',
    'Weight': 'Standard',
    'Color': 'Black',
    'Size': 'One Size Fits Most',
    'Warranty': 'Limited Lifetime'
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    
    onAddToCart(product.id, quantity);
    onClose();
  };

  const handleQuickQuote = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    
    onAddToCart(product.id, quantity);
    navigate('/quote-checkout');
  };

  const handleLogin = () => {
    localStorage.setItem('returnToProduct', product.id);
    navigate('/user-login');
  };

  const handleRegister = () => {
    localStorage.setItem('returnToProduct', product.id);
    navigate('/user-login');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)] overflow-hidden">
            {/* Left Column - Images */}
            <div className="lg:w-1/2 p-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-red-600' : 'border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Features */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-1/2 p-6 border-l overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({product.review_count} reviews)</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg font-semibold"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 ml-2">
                      {quantity} item{quantity !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg"
                  >
                    {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={handleQuickQuote}
                    disabled={!product.in_stock}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg"
                  >
                    Request Quote Now
                  </button>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-700">
                      Contact for Pricing
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Volume discounts available for bulk orders
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="border-b">
                    <nav className="flex space-x-8">
                      {['description', 'specifications', 'features'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                            activeTab === tab
                              ? 'border-red-500 text-red-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="mt-4">
                    {activeTab === 'description' && (
                      <div>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        {product.long_description && (
                          <p className="text-gray-700 leading-relaxed mt-2">
                            {product.long_description}
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === 'specifications' && (
                      <div className="space-y-2">
                        {Object.entries(specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b">
                            <span className="font-medium text-gray-700 capitalize">{key}:</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="space-y-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-start py-2">
                            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Use</h4>
                  <p className="text-sm text-gray-600">
                    This product is designed for professional tactical use. All items undergo 
                    rigorous quality control and meet industry standards for durability and performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginRequiredPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </>
  );
};

export default ProductPreview;