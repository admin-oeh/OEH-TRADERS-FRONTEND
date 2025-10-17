import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import { useApp } from "../context/AppContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dealer, user, admin, cart, logout } = useApp();
  const navigate = useNavigate();
  
  // Calculate total items in cart
  const totalCartItems = cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
  
  return (
    <nav className="bg-black text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1662052955098-042b46e60c2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjb21wYW55JTIwbG9nb3xlbnwwfHx8Ymx1ZXwxNzU4MDEwODYzfDA&ixlib=rb-4.1.0&q=85" 
                alt="OEH TRADERS Logo" 
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-2xl font-bold text-red-500">OEH TRADERS</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-red-400 transition-colors">Products</Link>
              <Link to="/categories" className="hover:text-red-400 transition-colors">Categories</Link>
              <Link to="/brands" className="hover:text-red-400 transition-colors">Brands</Link>
              <Link to="/about" className="hover:text-red-400 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
            </div>
          </div>
          
          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            {/* Admin Panel Access */}
            {admin ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-red-400 bg-red-600 px-3 py-1 rounded">
                  <span>👑 Admin: {admin.username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              !user && !dealer && (
                <Link to="/admin/login" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              )
            )}

            {/* Cart */}
            <button 
              onClick={() => user ? navigate('/cart') : navigate('/user-login')}
              className="relative hover:text-red-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H2m0 0h2m4 8a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
            
            {/* User Authentication */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-red-400">
                  <UserIcon className="w-6 h-6" />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/quotes" className="block px-4 py-2 hover:bg-gray-100">My Quotes</Link>
                  <Link to="/chat" className="block px-4 py-2 hover:bg-gray-100">Messages</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              !admin && (
                <Link to="/user-login" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
                  Login
                </Link>
              )
            )}
            
            {/* Dealer Login - separate */}
            {dealer ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-red-400 text-sm">
                  <span>Dealer: {dealer.contact_name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dealer-profile" className="block px-4 py-2 hover:bg-gray-100">Dealer Profile</Link>
                  <Link to="/dealer-orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              !admin && (
                <Link to="/dealer-login" className="text-sm hover:text-red-400 transition-colors">
                  Dealer Portal
                </Link>
              )
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-400"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
              <Link to="/" className="block hover:text-red-400 transition-colors py-2">Home</Link>
              <Link to="/products" className="block hover:text-red-400 transition-colors py-2">Products</Link>
              <Link to="/categories" className="block hover:text-red-400 transition-colors py-2">Categories</Link>
              <Link to="/brands" className="block hover:text-red-400 transition-colors py-2">Brands</Link>
              <Link to="/about" className="block hover:text-red-400 transition-colors py-2">About</Link>
              <Link to="/contact" className="block hover:text-red-400 transition-colors py-2">Contact</Link>
              {!user && !admin && (
                <Link to="/user-login" className="block hover:text-red-400 transition-colors py-2">Login</Link>
              )}
              {!admin && (
                <Link to="/admin/login" className="block hover:text-red-400 transition-colors py-2">Admin</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;