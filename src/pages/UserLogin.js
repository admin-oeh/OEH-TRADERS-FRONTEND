import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "United States",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { loginUser, registerUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const result = await loginUser(formData.email, formData.password);
        if (result.success) {
          const returnTo = localStorage.getItem("returnTo") || "/";
          localStorage.removeItem("returnTo");
          navigate(returnTo);
        } else {
          setMessage(result.error);
        }
      } else {
        const result = await registerUser(formData);
        if (result.success) {
          const loginResult = await loginUser(formData.email, formData.password);
          if (loginResult.success) {
            const returnTo = localStorage.getItem("returnTo") || "/";
            localStorage.removeItem("returnTo");
            navigate(returnTo);
          } else {
            setMessage("Registration successful! Please login.");
            setIsLogin(true);
          }
        } else {
          setMessage(result.error);
        }
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isLogin ? "User Login" : "Create Account"}
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
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
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name (Optional)"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  name="zip_code"
                  placeholder="ZIP Code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-700"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/dealer-login" className="text-sm text-gray-600 hover:text-gray-800">
              Are you a dealer? Click here for dealer portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;