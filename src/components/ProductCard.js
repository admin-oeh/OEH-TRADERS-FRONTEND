import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart, onPreview }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const handleAddToCart = () => {
    if (showQuantitySelector) {
      onAddToCart(product.id, quantity);
      setShowQuantitySelector(false);
      setQuantity(1);
    } else {
      setShowQuantitySelector(true);
    }
  };

  const handleQuickAdd = () => {
    onAddToCart(product.id, 1);
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image with Preview Button */}
      <div className="relative group">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-64 object-cover cursor-pointer"
          onClick={handlePreview}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handlePreview}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            Quick Preview
          </button>
        </div>
        {!product.in_stock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          className="text-xl font-semibold mb-2 cursor-pointer hover:text-red-600 transition-colors"
          onClick={handlePreview}
        >
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-600">Contact for Price</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        {showQuantitySelector ? (
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 flex items-center space-x-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Add {quantity}
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleQuickAdd}
              className="px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              title="Quick Add 1"
            >
              +
            </button>
            <button 
              onClick={handlePreview}
              className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              title="Quick Preview"
            >
              👁
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;