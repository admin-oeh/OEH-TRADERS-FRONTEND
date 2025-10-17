import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { API } from "../utils/constants";

const ChatInterface = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user-login');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const userToken = localStorage.getItem('user_token');
      const response = await axios.get(`${API}/chat/${user.id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = {
      id: Date.now(),
      sender_type: 'user',
      sender_name: `${user.first_name} ${user.last_name}`,
      message: newMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const userToken = localStorage.getItem('user_token');
      await axios.post(`${API}/chat/send`, {
        user_id: user.id,
        sender_type: 'user',
        sender_name: `${user.first_name} ${user.last_name}`,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      alert('Failed to send message');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow h-96 flex flex-col">
          {/* Chat Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Chat with Support</h2>
            <p className="text-red-100">We're here to help with your tactical gear needs</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender_type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.sender_name}</p>
                    <p>{message.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Chat Info */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Support Information</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Our support team typically responds within 2-4 hours during business hours</li>
            <li>• For urgent matters, please call: 1-800-TACTICAL</li>
            <li>• Business hours: Monday-Friday 8AM-6PM EST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;