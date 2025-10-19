import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import TawkToIntegration from "./components/TawkToIntegration";

// Import all pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import UserLogin from "./pages/UserLogin";
import DealerLogin from "./pages/DealerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ShoppingCart from "./pages/ShoppingCart";
import QuoteCheckout from "./pages/QuoteCheckout";
import UserProfile from "./pages/UserProfile";
import ChatInterface from "./pages/ChatInterface";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <TawkToIntegration />
          <Navigation />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/dealer-login" element={<DealerLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/quote-checkout" element={<QuoteCheckout />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/chat" element={<ChatInterface />} />
            </Routes>
          </main>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;