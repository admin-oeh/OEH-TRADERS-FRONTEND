import React from "react";

const Contact = () => (
  <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">1-800-TACTICAL (1-800-822-8422)</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">info@oehtraders.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">
                123 Tactical Way<br/>
                Defense City, DC 20001<br/>
                United States
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 8:00 AM - 6:00 PM EST<br/>
                Saturday: 9:00 AM - 4:00 PM EST<br/>
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send Message</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 border rounded-lg"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 border rounded-lg"
            />
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full p-3 border rounded-lg"
            />
            <textarea 
              placeholder="Your Message" 
              rows="5"
              className="w-full p-3 border rounded-lg"
            />
            <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;