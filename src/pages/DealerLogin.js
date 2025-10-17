import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const DealerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company_name: '',
    contact_name: '',
    phone: '',
    address: '',
    license_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { loginDealer, registerDealer } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const result = await loginDealer(formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setMessage(result.error);
        }
      } else {
        const result = await registerDealer(formData);
        if (result.success) {
          setMessage('Registration successful! Please wait for approval.');
          setIsLogin(true);
        } else {
          setMessage(result.error);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Dealer Login' : 'Dealer Registration'}
          </h2>
          
          {message && (
            <div className={`mb-4 p-3 rounded ${
              message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
                
                <input
                  type="text"
                  name="contact_name"
                  placeholder="Contact Name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
                
                <textarea
                  name="address"
                  placeholder="Business Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                />
                
                <input
                  type="text"
                  name="license_number"
                  placeholder="License Number"
                  value={formData.license_number}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-700"
            >
              {isLogin ? 'Need to register?' : 'Already have an account?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerLogin;