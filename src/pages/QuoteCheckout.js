import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { API } from "../utils/constants";

const QuoteCheckout = () => {
  const { cart, user } = useApp();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    designation: '',
    
    // Company Information
    company_name: user?.company_name || '',
    phone: user?.phone || '',
    email: user?.email || '',

    // Address Information
    address: user?.address || '',
    country: user?.country || '',
    city: user?.city || '',
    state: user?.state || '',
    zip_code: user?.zip_code || '',
    
    // Quote Information
    project_name: '',
    intended_use: '',
    delivery_date: '',
    delivery_address: '',
    billing_address: '',
    company_size: '',
    budget_range: '',
    additional_requirements: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user-login');
      return;
    }
    
    // Check if coming from a single product
    if (location.state?.productId) {
      fetchSingleProduct(location.state.productId);
    } else if (!cart.items || cart.items.length === 0) {
      navigate('/products');
    }
  }, [user, cart, navigate, location]);

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await axios.get(`${API}/products/${productId}`);
      setProducts([{ ...response.data, quantity: 1 }]);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userToken = localStorage.getItem('user_token');
      
      const items = products.length > 0 
        ? products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: 0,
            notes: `${product.name} - ${product.brand}`
          }))
        : cart.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: 0,
            notes: `${item.product?.name} - ${item.product?.brand}`
          }));

      const quoteData = {
        user_id: user.id,
        items: items,

        // Personal Information
        first_name: formData.first_name,
        last_name: formData.last_name,
        designation: formData.designation,
        company_name: formData.company_name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        project_name: formData.project_name,
        intended_use: formData.intended_use,
        delivery_date: formData.delivery_date ? new Date(formData.delivery_date).toISOString() : null,
        delivery_address: formData.delivery_address,
        billing_address: formData.billing_address,
        company_size: formData.company_size,
        budget_range: formData.budget_range,
        additional_requirements: formData.additional_requirements,
        total_amount: 0,
        status: 'pending'
      };

      await axios.post(`${API}/quotes`, quoteData, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      alert('Quote submitted successfully! We will review and contact you soon.');
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error submitting quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const displayItems = products.length > 0 ? products : cart.items;

  if (!user || displayItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Request Quote</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Designation/Title *</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., Security Manager, Procurement Officer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company/Organization Name *</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Size</label>
                    <select
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $1000">Under $1,000</option>
                      <option value="$1000-$5000">$1,000 - $5,000</option>
                      <option value="$5000-$15000">$5,000 - $15,000</option>
                      <option value="$15000-$50000">$15,000 - $50,000</option>
                      <option value="$50000+">$50,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Address Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Quote Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name *</label>
                    <input
                      type="text"
                      name="project_name"
                      value={formData.project_name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., Security Team Equipment Upgrade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Intended Use *</label>
                    <select
                      name="intended_use"
                      value={formData.intended_use}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select intended use</option>
                      <option value="law_enforcement">Law Enforcement</option>
                      <option value="military">Military/Defense</option>
                      <option value="security_services">Security Services</option>
                      <option value="training">Training/Education</option>
                      <option value="personal_protection">Personal Protection</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Required Delivery Date</label>
                    <input
                      type="date"
                      name="delivery_date"
                      value={formData.delivery_date}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Address</label>
                    <textarea
                      name="delivery_address"
                      value={formData.delivery_address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 border rounded-lg"
                      placeholder="Complete delivery address (if different from above)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Billing Address</label>
                    <textarea
                      name="billing_address"
                      value={formData.billing_address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 border rounded-lg"
                      placeholder="Billing address (if different from above)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Comments</label>
                    <textarea
                      name="additional_requirements"
                      value={formData.additional_requirements}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 border rounded-lg"
                      placeholder="Any additional requirements, specifications, or comments..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                  {loading ? 'Submitting Quote...' : 'Submit Quote Request'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="px-6 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                >
                  Back to Products
                </button>
              </div>
            </form>
          </div>

          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Quote Summary</h2>
              <div className="space-y-4">
                {displayItems.map((item) => (
                  <div key={item.product_id || item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || item.name}</p>
                      <p className="text-gray-600">Brand: {item.product?.brand || item.brand}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Quote Request</h3>
                    <p className="text-sm text-blue-700">
                      Pricing will be provided after review and approval by our team. 
                      You will receive detailed pricing via email or through your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCheckout;