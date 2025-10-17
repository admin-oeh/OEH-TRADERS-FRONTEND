import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { API } from "../utils/constants";
import ProductCard from "../components/ProductCard";
import ProductPreview from "../components/ProductPreview";
import PriceRangeSlider from "../components/PriceRangeSlider";
import LoginRequiredPopup from "../components/LoginRequiredPopup";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    search: '',
    inStock: ''
  });
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const { addToCart, user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          const paramKey = key === 'inStock' ? 'in_stock' : key;
          params.append(paramKey, filters[key]);
        }
      });
      
      const response = await axios.get(`${API}/products?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        axios.get(`${API}/categories/with-counts`),
        axios.get(`${API}/brands/with-counts`)
      ]);
      
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      setSelectedProductId(productId);
      setShowLoginPopup(true);
      return;
    }

    const result = await addToCart(productId, quantity);
    if (result.success) {
      alert(`Added ${quantity} item(s) to cart!`);
    } else {
      alert(result.error || 'Error adding product to cart');
    }
  };

  const handlePreview = (product) => {
    setPreviewProduct(product);
  };

  const handleClosePreview = () => {
    setPreviewProduct(null);
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Tactical Products</h1>
        <p className="text-gray-600 mb-8">Professional equipment for military, law enforcement, and security personnel</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Advanced Side Filter */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b pb-2">Advanced Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search Products</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Search tactical gear..."
                />
              </div>
              
              {/* Category Filter with Counts */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Categories</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={filters.category === ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="mr-3 text-red-600 focus:ring-red-500"
                    />
                    <span className="flex-1">All Categories</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{products.length}</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={cat.name}
                          checked={filters.category === cat.name}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-3 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </div>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{cat.product_count}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Brand Filter with Counts */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Brands</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      value=""
                      checked={filters.brand === ''}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="mr-3 text-red-600 focus:ring-red-500"
                    />
                    <span className="flex-1">All Brands</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{products.length}</span>
                  </label>
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          value={brand.name}
                          checked={filters.brand === brand.name}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="mr-3 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm">{brand.name}</span>
                      </div>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{brand.product_count}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Stock Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Stock Status</label>
                <div className="space-y-2">
                  <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value=""
                      checked={filters.inStock === ''}
                      onChange={(e) => handleFilterChange('inStock', '')}
                      className="mr-3 text-red-600 focus:ring-red-500"
                    />
                    <span>All Products</span>
                  </label>
                  <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value="true"
                      checked={filters.inStock === 'true'}
                      onChange={(e) => handleFilterChange('inStock', 'true')}
                      className="mr-3 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </label>
                  <label className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value="false"
                      checked={filters.inStock === 'false'}
                      onChange={(e) => handleFilterChange('inStock', 'false')}
                      className="mr-3 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </label>
                </div>
              </div>
              
              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({ category: '', brand: '', search: '', inStock: '' });
                }}
                className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">{products.length}</span> products found
              </p>
              <div className="flex items-center gap-4">
                <select className="border rounded-lg px-4 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500">
                  <option>Sort by: Featured</option>
                  <option>Rating: High to Low</option>
                  <option>Newest First</option>
                  <option>Name: A to Z</option>
                </select>
                <div className="text-sm text-gray-500">
                  💡 Click on any product for detailed preview
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Loading tactical gear...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            )}

            {products.length === 0 && !loading && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => setFilters({ category: '', brand: '', search: '', inStock: '' })}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Product Preview Modal */}
      {previewProduct && (
        <ProductPreview
          product={previewProduct}
          isOpen={!!previewProduct}
          onClose={handleClosePreview}
          onAddToCart={handleAddToCart}
        />
      )}
      
      <LoginRequiredPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Products;