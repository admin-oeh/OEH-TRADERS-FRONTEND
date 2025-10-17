import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { API } from "../utils/constants";

const AdminDashboard = () => {
  const { admin, logout } = useApp();
  const [stats, setStats] = useState({});
  const [pendingDealers, setPendingDealers] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
    if (activeTab === 'chat') {
      fetchConversations();
    }
  }, [admin, navigate, activeTab]);

  const fetchDashboardData = async () => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${adminToken}` };

      const [statsRes, dealersRes, quotesRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/dealers/pending`, { headers }),
        axios.get(`${API}/admin/quotes`, { headers })
      ]);

      setStats(statsRes.data);
      setPendingDealers(dealersRes.data);
      setAllQuotes(quotesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.get(`${API}/admin/chat/conversations`, { headers });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchChatMessages = async (userId) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.get(`${API}/admin/chat/${userId}/messages`, { headers });
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendAdminMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const adminToken = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${adminToken}` };
      
      await axios.post(`${API}/admin/chat/send`, {
        user_id: selectedConversation.user_id,
        sender_type: 'admin',
        sender_name: `Admin (${admin.username})`,
        message: newMessage
      }, { headers });

      setNewMessage('');
      fetchChatMessages(selectedConversation.user_id);
      fetchConversations();
    } catch (error) {
      console.error('Error sending admin message:', error);
      alert('Error sending message');
    }
  };

  const sendQuoteEmail = async (quoteId, userEmail) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${adminToken}` };
      
      await axios.post(`${API}/admin/quotes/${quoteId}/send-email`, {}, { headers });
      alert(`Quote emailed successfully to ${userEmail}`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error sending quote email:', error);
      alert('Error sending quote email');
    }
  };

  const approveDealer = async (dealerId) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      await axios.put(`${API}/admin/dealers/${dealerId}/approve`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      alert('Dealer approved successfully!');
      fetchDashboardData();
    } catch (error) {
      alert('Error approving dealer');
    }
  };

  const rejectDealer = async (dealerId) => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      await axios.put(`${API}/admin/dealers/${dealerId}/reject`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      alert('Dealer rejected successfully!');
      fetchDashboardData();
    } catch (error) {
      alert('Error rejecting dealer');
    }
  };

  const updateQuoteStatus = async (quoteId, status, notes = '') => {
    try {
      const adminToken = localStorage.getItem('admin_token');
      await axios.put(`${API}/admin/quotes/${quoteId}/status?status=${status}&admin_notes=${encodeURIComponent(notes)}`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      alert('Quote status updated successfully!');
      fetchDashboardData();
    } catch (error) {
      alert('Error updating quote status');
    }
  };

  if (!admin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {admin.username}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'chat' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Chat Management
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.total_users || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Pending Dealers</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending_dealers || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Pending Quotes</h3>
                <p className="text-3xl font-bold text-orange-600">{stats.pending_quotes || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="text-3xl font-bold text-green-600">{stats.total_products || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Dealers */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Pending Dealer Approvals</h2>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="text-center">Loading...</div>
                  ) : pendingDealers.length === 0 ? (
                    <p className="text-gray-500">No pending dealer approvals</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingDealers.map((dealer) => (
                        <div key={dealer.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{dealer.company_name}</h3>
                              <p className="text-sm text-gray-600">{dealer.contact_name}</p>
                              <p className="text-sm text-gray-600">{dealer.email}</p>
                            </div>
                          </div>
                          <p className="text-sm mb-3">License: {dealer.license_number}</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => approveDealer(dealer.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectDealer(dealer.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Quotes */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Recent Quote Requests</h2>
              </div>

             <div className="p-6">
             {loading ? (
             <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : allQuotes.length === 0 ? (
             <p className="text-gray-500 text-center">No quote requests</p>
             ) : (
            <div className="space-y-5 max-h-[520px] overflow-y-auto">
        {allQuotes.slice(0, 5).map((quote) => (
          <div
            key={quote.id}
            className="border rounded-lg p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
              <div>
                <h3 className="font-semibold text-lg">{quote.project_name}</h3>
                <p className="text-sm text-gray-600">
                  {quote.user_name} - {quote.user_email}
                </p>
              </div>
              <span
                className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-medium ${
                  quote.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : quote.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {quote.status.toUpperCase()}
              </span>
            </div>

            {/* Total & Intended Use */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <p className="text-sm font-medium">
                Total: ${quote.total_amount ? quote.total_amount.toFixed(2) : '—'}
              </p>
              <p className="text-sm text-gray-600 mt-1 sm:mt-0">
                {quote.intended_use.replace('_', ' ').toUpperCase()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {quote.status === 'pending' && (
                <>
                  <button
                    onClick={() =>
                      updateQuoteStatus(quote.id, 'approved', 'Approved for processing')
                    }
                    className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      updateQuoteStatus(quote.id, 'declined', 'Unable to fulfill at this time')
                    }
                    className="bg-red-600 text-white px-4 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Decline
                  </button>
                </>
              )}
              {quote.status === 'approved' && (
                <>
                  <button
                    onClick={() => sendQuoteEmail(quote.id, quote.user_email)}
                    className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    📧 Email Quote
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    💬 Chat with User
                  </button>
                </>
              )}
            </div>

            {/* Requested Items Block with fixed height */}
            <div className="mt-2 border rounded-md p-2 bg-gray-50 shadow-inner overflow-y-auto h-20 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <h4 className="text-sm font-semibold mb-2">Requested Items</h4>
              {quote.items.map((item, idx) => {
                const [productName, brandName] = item.notes.includes(" - ")
                  ? item.notes.split(" - ")
                  : [item.notes, ""];
                const price = item.price != null ? Number(item.price).toFixed(2) : "—";

                return (
                  <div key={idx} className="flex justify-between text-sm mb-1">
                    <div>
                      <p className="font-medium">{productName}</p>
                      {brandName && <p className="text-gray-500 text-xs">{brandName}</p>}
                    </div>
                    <div className="text-right">
                      <p>Qty: {item.quantity}</p>
                      <p>${price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
 </div>
</div>
</>
)}
        {/* Chat Management Tab */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
            {/* Conversations List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">User Conversations</h2>
              </div>
              <div className="overflow-y-auto h-80">
                {conversations.length === 0 ? (
                  <p className="p-4 text-gray-500">No conversations yet</p>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.user_id}
                      onClick={() => {
                        setSelectedConversation(conv);
                        fetchChatMessages(conv.user_id);
                      }}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?.user_id === conv.user_id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm">{conv.user_name}</h3>
                          <p className="text-xs text-gray-600">{conv.company_name}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {conv.last_message.substring(0, 40)}...
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400">
                            {conv.message_count} msgs
                          </span>
                          <div className={`w-2 h-2 rounded-full mt-1 ${
                            conv.last_sender === 'user' ? 'bg-red-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">
                  {selectedConversation ? `Chat with ${selectedConversation.user_name}` : 'Select a conversation'}
                </h2>
              </div>
              
              {selectedConversation ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_type === 'admin'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_type === 'admin' ? 'text-red-100' : 'text-gray-500'
                          }`}>
                            {message.sender_name} - {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={sendAdminMessage} className="p-4 border-t">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border rounded-lg px-3 py-2 focus:border-red-500"
                      />
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;