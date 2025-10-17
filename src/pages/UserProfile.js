import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { API } from "../utils/constants";

const UserProfile = () => {
  const { user, logout } = useApp();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/user-login");
      return;
    }
    fetchQuotes();
  }, [user, navigate]);

  const fetchQuotes = async () => {
    try {
      const userToken = localStorage.getItem("user_token");
      const response = await axios.get(`${API}/quotes`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setQuotes(response.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Company
                  </label>
                  <p className="text-gray-900">
                    {user.company_name || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {user.phone || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900">
                    {user.address
                      ? `${user.address}, ${user.city}, ${user.state} ${user.zip_code}`
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Link
                  to="/chat"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 block text-center"
                >
                  💬 Chat with Support
                </Link>
                <button
                  onClick={logout}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Quote History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Quote Requests</h2>

              {loading ? (
                <div className="text-center py-8">Loading quotes...</div>
              ) : quotes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No quotes submitted yet</p>
                  <Link
                    to="/products"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border rounded-xl p-6 relative bg-white shadow-sm"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-m uppercase font-semibold text-gray-800">
                            {quote.project_name}
                          </h3>
                          <p className="text-xs uppercase text-gray-500 mt-1">
                            Submitted:{" "}
                            <span className="font-medium text-gray-700">
                              {new Date(quote.created_at).toLocaleDateString()}
                            </span>
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            quote.status
                          )}`}
                        >
                          {quote.status.charAt(0).toUpperCase() +
                            quote.status.slice(1)}
                        </span>
                      </div>

                      {/* Basic info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs uppercase text-gray-500 tracking-wide">
                            Intended Use
                          </p>
                          <p className="text-m font-semibold text-gray-800">
                            {quote.intended_use
                              ?.replace("_", " ")
                              .toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                          Products Requested
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {quote.items.map((item, idx) => {
                            const productLabel =
                              item.notes || "No Product Name";

                            return (
                              <div
                                key={idx}
                                className="bg-gray-50 p-3 rounded-xl flex flex-col shadow-sm"
                              >
                                <span className="font-medium text-sm text-gray-800">
                                  {productLabel}
                                </span>
                                <span className="text-gray-600 text-xs mt-1">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            );
                          })}

                          <div className="bg-yellow-50 p-3 rounded-xl flex items-center justify-center text-center shadow-sm">
                            {quote.status === "approved" &&
                            quote.total_amount ? (
                              <p className="text-green-600 font-semibold text-sm">
                                Total Amount: ${quote.total_amount.toFixed(2)}
                              </p>
                            ) : (
                              <p className="text-gray-500 font-medium text-sm">
                                Pending Admin Approval
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Admin Notes */}
                      {quote.admin_notes && (
                        <div className="bg-blue-50 p-3 rounded-xl mb-4 shadow-sm">
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            Admin Notes:
                          </p>
                          <p className="text-blue-700 text-sm">
                            {quote.admin_notes}
                          </p>
                        </div>
                      )}

                      {/* Discuss Order button bottom-right */}
                      {quote.status === "approved" && (
                        <div className="flex justify-end">
                          <Link
                            to="/chat"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            Discuss Order
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;