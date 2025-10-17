import React from "react";

const About = () => (
  <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">About OEH TRADERS</h1>
      
      {/* Company Overview */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              OEH TRADERS is your premier destination for professional tactical equipment, serving military personnel, 
              law enforcement officers, and civilian customers worldwide. With over a decade of experience, we understand 
              the critical importance of reliable, high-quality gear in demanding situations.
            </p>
            <p className="text-lg mb-6">
              Our team consists of former military and law enforcement professionals who personally test and validate 
              every product we offer. We maintain strict quality standards and work directly with leading manufacturers 
              to ensure you receive authentic, battle-tested equipment.
            </p>
            <p className="text-lg">
              From body armor and tactical apparel to advanced optics and training equipment, we provide comprehensive 
              solutions for all your tactical needs. Trust OEH TRADERS for mission-critical equipment that performs 
              when it matters most.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1705564667318-923901fb916a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx0YWN0aWNhbCUyMGdlYXJ8ZW58MHx8fHwxNzU3Mzc1OTk5fDA&ixlib=rb-4.1.0&q=85" 
              alt="Tactical team"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
          <p>Every product undergoes rigorous testing by our team of tactical professionals before approval.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Authentic Equipment</h3>
          <p>We source directly from authorized manufacturers to guarantee authenticity and warranty coverage.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Expert Support</h3>
          <p>Our customer service team includes active and former military/law enforcement personnel.</p>
        </div>
      </div>

      {/* Company Policies */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Policies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Dealer Program</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Exclusive dealer pricing on bulk orders</li>
              <li>• Priority access to new product releases</li>
              <li>• Dedicated account management</li>
              <li>• Extended payment terms for qualified dealers</li>
              <li>• Marketing support and product training</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quality Guarantee</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 30-day return policy on all items</li>
              <li>• Manufacturer warranty on all products</li>
              <li>• Free exchanges for defective items</li>
              <li>• Expert product consultation</li>
              <li>• Satisfaction guarantee or money back</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Compliance Standards</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• ITAR compliance for export regulations</li>
              <li>• Age verification for restricted items</li>
              <li>• FFL compliance for regulated products</li>
              <li>• Industry certifications maintained</li>
              <li>• Regular compliance audits</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Shipping & Security</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Secure packaging for all shipments</li>
              <li>• Discreet shipping options available</li>
              <li>• Tracking provided for all orders</li>
              <li>• Insurance on high-value items</li>
              <li>• Same-day processing for most orders</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Certifications */}
      <div className="bg-black text-white rounded-lg p-8 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Certifications & Partnerships</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">GSA Approved</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">ITAR Registered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">ISO 9001</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">FFL Licensed</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;