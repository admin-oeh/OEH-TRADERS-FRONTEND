import React from "react";

const Privacy = () => (
  <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p>We collect information you provide directly, such as account details, purchase history, and communication preferences. We also collect technical information about your device and usage patterns.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>Your information is used to process orders, provide customer support, comply with legal requirements, and improve our services. We may also use it for security purposes and fraud prevention.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <p>We do not sell or rent your personal information. We may share information with service providers, law enforcement when required by law, and business partners for legitimate business purposes.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information. Contact us at privacy@oehtraders.com for assistance with privacy-related requests.</p>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default Privacy;