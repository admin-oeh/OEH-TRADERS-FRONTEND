import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL, API } from "../utils/constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dealer, setDealer] = useState(null);
  const [user, setUser] = useState(null); 
  const [admin, setAdmin] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    // Check for stored tokens
    const dealerToken = localStorage.getItem('dealer_token');
    const userToken = localStorage.getItem('user_token');
    const adminToken = localStorage.getItem('admin_token');
    
    if (dealerToken) {
      fetchDealerProfile(dealerToken);
    }
    if (userToken) {
      fetchUserProfile(userToken);
    }
    if (adminToken) {
      fetchAdminProfile(adminToken);
    }
    
    // Load cart only if user is logged in
    if (userToken) {
      fetchCart();
    }
  }, []);

  const fetchDealerProfile = async (token) => {
    try {
      const response = await axios.get(`${API}/dealers/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDealer(response.data);
    } catch (error) {
      localStorage.removeItem('dealer_token');
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('user_token');
    }
  };

  const fetchAdminProfile = async (token) => {
    try {
      const response = await axios.get(`${API}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmin(response.data);
    } catch (error) {
      localStorage.removeItem('admin_token');
    }
  };

  const fetchCart = async () => {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      setCart({ items: [], total: 0 });
      return;
    }

    try {
      const response = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [], total: 0 });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      return { success: false, error: 'Please login to add items to cart' };
    }

    try {
      await axios.post(`${API}/cart/add`, {
        product_id: productId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.response?.data?.detail || 'Error adding to cart' };
    }
  };

  const removeFromCart = async (productId) => {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) return;

    try {
      await axios.delete(`${API}/cart/item/${productId}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) return;

    try {
      await axios.put(`${API}/cart/item/${productId}`, {
        quantity
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const loginDealer = async (email, password) => {
    try {
      const response = await axios.post(`${API}/dealers/login`, { email, password });
      const { access_token, dealer: dealerData } = response.data;
      localStorage.setItem('dealer_token', access_token);
      setDealer(dealerData);
      return { success: true, dealer: dealerData };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API}/users/login`, { email, password });
      const { access_token, user: userData } = response.data;
      localStorage.setItem('user_token', access_token);
      setUser(userData);
      fetchCart(); // Load cart after user login
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const registerDealer = async (dealerData) => {
    try {
      await axios.post(`${API}/dealers/register`, dealerData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const registerUser = async (userData) => {
    try {
      await axios.post(`${API}/users/register`, userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const loginAdmin = async (username, password) => {
    try {
      const response = await axios.post(`${API}/admin/login`, { username, password });
      const { access_token, admin: adminData } = response.data;
      localStorage.setItem('admin_token', access_token);
      setAdmin(adminData);
      return { success: true, admin: adminData };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('dealer_token');
    localStorage.removeItem('user_token');
    localStorage.removeItem('admin_token');
    setDealer(null);
    setUser(null);
    setAdmin(null);
    setCart({ items: [], total: 0 });
  };

  return (
    <AppContext.Provider value={{
      dealer, user, admin, cart, sessionId, 
      loginDealer, loginUser, loginAdmin, registerDealer, registerUser, logout, 
      addToCart, removeFromCart, updateCartItemQuantity, fetchCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};