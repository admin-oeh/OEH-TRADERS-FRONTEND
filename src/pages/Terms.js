import React from "react";

const Terms = () => (
  <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p>By accessing and using OEH TRADERS services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Product Usage</h2>
            <p>Tactical equipment sold through our platform is intended for legitimate military, law enforcement, and lawful civilian use only. Customers are responsible for compliance with all local, state, and federal regulations.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Age Verification</h2>
            <p>Certain products require age verification. Customers must be 18 years or older to purchase restricted items and may need to provide additional documentation.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Export Restrictions</h2>
            <p>Many tactical products are subject to export restrictions under ITAR and EAR regulations. International customers are responsible for import compliance.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p>OEH TRADERS shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.</p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default Terms;