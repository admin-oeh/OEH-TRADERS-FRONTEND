// src/hooks/useApp.js
import { useToast } from './use-toast';
import { ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

export const useApp = () => {
  const { toast } = useToast();

  // Success toast helper
  const showSuccess = (message) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    });
  };

  // Error toast helper
  const showError = (message) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.AUTH.USER_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save the access token from backend
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));

        showSuccess("Login successful! Welcome back.");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Login failed";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Login error:", err);
      showError("Unable to connect to server. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(ENDPOINTS.AUTH.USER_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        showSuccess("Registration successful! You can now login.");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Registration failed";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Registration error:", err);
      showError("Unable to connect to server. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const loginDealer = async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.AUTH.DEALER_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.DEALER_DATA, JSON.stringify(data.dealer));

        showSuccess("Dealer login successful!");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Dealer login failed";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Dealer login error:", err);
      showError("Unable to connect to server. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const registerDealer = async (dealerData) => {
    try {
      const response = await fetch(ENDPOINTS.AUTH.DEALER_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dealerData),
      });

      const data = await response.json();
      if (response.ok) {
        showSuccess("Dealer registration submitted! Awaiting approval.");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Dealer registration failed";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Dealer registration error:", err);
      showError("Unable to connect to server. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const loginAdmin = async (username, password) => {
    try {
      const response = await fetch(ENDPOINTS.AUTH.ADMIN_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.ADMIN_DATA, JSON.stringify(data.admin));

        showSuccess("Admin login successful!");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Admin login failed";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Admin login error:", err);
      showError("Unable to connect to server. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  // Product functions
  const getProducts = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${ENDPOINTS.PRODUCTS.LIST}?${queryParams}`);
      
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      console.error("Get products error:", err);
      showError("Failed to load products. Please try again.");
      return { success: false, error: "Failed to fetch products" };
    }
  };

  const getProduct = async (productId) => {
    try {
      const response = await fetch(ENDPOINTS.PRODUCTS.BY_ID(productId));
      
      if (!response.ok) throw new Error('Failed to fetch product');
      
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      console.error("Get product error:", err);
      showError("Failed to load product details.");
      return { success: false, error: "Failed to fetch product" };
    }
  };

  // Cart functions
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        showError("Please login to add items to cart");
        return { success: false, error: "Authentication required" };
      }

      const response = await fetch(ENDPOINTS.CART.ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      const data = await response.json();
      if (response.ok) {
        showSuccess("Item added to cart successfully!");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Failed to add to cart";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      showError("Failed to add item to cart. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const getCart = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        return { success: false, error: "Authentication required" };
      }

      const response = await fetch(ENDPOINTS.CART.GET, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Failed to fetch cart";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Get cart error:", err);
      showError("Failed to load cart. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        showError("Please login to manage cart");
        return { success: false, error: "Authentication required" };
      }

      const response = await fetch(ENDPOINTS.CART.REMOVE_ITEM(productId), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        showSuccess("Item removed from cart");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Failed to remove item";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
      showError("Failed to remove item from cart.");
      return { success: false, error: "Server error" };
    }
  };

  // Quote functions
  const createQuote = async (quoteData) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        showError("Please login to create a quote");
        return { success: false, error: "Authentication required" };
      }

      const response = await fetch(ENDPOINTS.QUOTES.CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(quoteData),
      });

      const data = await response.json();
      if (response.ok) {
        showSuccess("Quote submitted successfully! We'll contact you soon.");
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Failed to create quote";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Create quote error:", err);
      showError("Failed to submit quote. Please try again.");
      return { success: false, error: "Server error" };
    }
  };

  const getUserQuotes = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        return { success: false, error: "Authentication required" };
      }

      const response = await fetch(ENDPOINTS.QUOTES.LIST, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true, data };
      } else {
        const errorMessage = data.detail || "Failed to fetch quotes";
        showError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Get quotes error:", err);
      showError("Failed to load quotes.");
      return { success: false, error: "Server error" };
    }
  };

  // Utility functions
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.DEALER_DATA);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_DATA);
    localStorage.removeItem(STORAGE_KEYS.CART_DATA);
    
    showSuccess("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const dealer = localStorage.getItem(STORAGE_KEYS.DEALER_DATA);
    const admin = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);
    
    if (user) return { type: 'user', data: JSON.parse(user) };
    if (dealer) return { type: 'dealer', data: JSON.parse(dealer) };
    if (admin) return { type: 'admin', data: JSON.parse(admin) };
    
    return null;
  };

  return {
    // Authentication
    loginUser,
    registerUser,
    loginDealer,
    registerDealer,
    loginAdmin,
    logout,
    isAuthenticated,
    getCurrentUser,
    
    // Products
    getProducts,
    getProduct,
    
    // Cart
    addToCart,
    getCart,
    removeFromCart,
    
    // Quotes
    createQuote,
    getUserQuotes,
    
    // Toast functions (exposed if needed elsewhere)
    showSuccess,
    showError,
  };
};