import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, user } = useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user-login');
    }
  }, [user, navigate]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItemQuantity(productId, newQuantity);
  };

  const handleProceedToQuote = () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/quote-checkout');
  };

  if (!user) {
    return <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your cart</h2>
        <Link to="/user-login" className="bg-red-600 text-white px-6 py-3 rounded-lg">Login</Link>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H2m0 0h2m4 8a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <Link to="/products" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
                {cart.items.map((item) => (
                  <div key={item.product_id} className="flex items-center space-x-4 py-4 border-b">
                    <img 
                      src={item.product?.image_url} 
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product?.name}</h3>
                      <p className="text-gray-600">{item.product?.brand}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button 
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <button 
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-red-600 hover:text-red-700 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quote Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="border-t pt-2">
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">B2B Quote Process</h3>
                  <p className="text-sm text-blue-700">
                    Submit a detailed quote request with your business requirements. 
                    Our team will review and respond with customized pricing and terms.
                  </p>
                </div>
                
                <button
                  onClick={handleProceedToQuote}
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Request Quote'}
                </button>
                
                <Link 
                  to="/products" 
                  className="w-full mt-3 block text-center bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;