import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../utils/constants";

// Import sections
import HeroSection from "../components/sections/HeroSection";
import NewArrivals from "../components/sections/NewArrivals";
import TrendingGear from "../components/sections/TrendingGear";
import DepartmentOfDeals from "../components/sections/DepartmentOfDeals";
import CustomerTopPicks from "../components/sections/CustomerTopPicks";
import PopularCategories from "../components/sections/PopularCategories";
import TopBrands from "../components/sections/TopBrands";
import TacticalExperts from "../components/sections/TacticalExperts";
import ProductPreview from "../components/ProductPreview";
import { useApp } from "../context/AppContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [deals, setDeals] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState(null);
  
  const { addToCart, user } = useApp();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Initialize sample data first
        await axios.post(`${API}/initialize-data`);
        
        // Then fetch all data
        const [productsRes, categoriesRes, brandsRes, dealsRes, newArrivalsRes] = await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/categories`),
          axios.get(`${API}/brands`),
          axios.get(`${API}/products/deals`),
          axios.get(`${API}/products/new-arrivals`)
        ]);
        
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
        setDeals(dealsRes.data);
        setNewArrivals(newArrivalsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handlePreview = (product) => {
    setPreviewProduct(product);
  };

  const handleClosePreview = () => {
    setPreviewProduct(null);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      // This will be handled by the LoginRequiredPopup in individual components
      return { success: false, error: 'User not logged in' };
    }

    // Don't show alert here - let the individual components handle success/error messages
    const result = await addToCart(productId, quantity);
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mb-4"></div>
          <div className="text-2xl text-gray-600">Loading OEH TRADERS...</div>
          <p className="text-gray-500 mt-2">Preparing your tactical gear experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <HeroSection brands={brands} />
      
      <NewArrivals 
        products={newArrivals} 
        onPreview={handlePreview}
        onAddToCart={handleAddToCart}
      />
      
      <TrendingGear 
        products={products} 
        onPreview={handlePreview}
        onAddToCart={handleAddToCart}
      />
      
      <DepartmentOfDeals 
        deals={deals} 
        onPreview={handlePreview}
        onAddToCart={handleAddToCart}
      />
      
      <CustomerTopPicks 
        products={products} 
        onPreview={handlePreview}
        onAddToCart={handleAddToCart}
      />
      
      <PopularCategories categories={categories} />
      <TopBrands brands={brands} />
      <TacticalExperts />

      {/* Global Product Preview Modal */}
      {previewProduct && (
        <ProductPreview
          product={previewProduct}
          isOpen={!!previewProduct}
          onClose={handleClosePreview}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Quick Stats Bar */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">{products.length}+</div>
              <div className="text-sm text-gray-300">Tactical Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">{brands.length}+</div>
              <div className="text-sm text-gray-300">Trusted Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
              <div className="text-sm text-gray-300">Expert Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
              <div className="text-sm text-gray-300">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Equip Your Team?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Join thousands of military, law enforcement, and security professionals 
            who trust OEH TRADERS for their mission-critical equipment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse All Products
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;