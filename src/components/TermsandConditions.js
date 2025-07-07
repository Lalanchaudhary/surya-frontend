import React from 'react';

const TermsandConditions = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-rose-600">Terms & Conditions</h1>

      <div className="space-y-6">
        <p>Welcome to <strong>Suryacake.in</strong>! By using our website and placing an order, you agree to the following terms and conditions. Please read them carefully.</p>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. General Information</h2>
          <p>Suryacake.in is an online bakery store offering cakes, flowers, and gift items for delivery across select regions. We reserve the right to update or modify these terms at any time without prior notice.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Order Placement & Processing</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Place orders at least 4–6 hours in advance for same-day delivery (based on availability).</li>
            <li>Changes or cancellations allowed within 15 minutes of order placement.</li>
            <li>Delivery time slots are estimates and may vary due to external factors.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Product Information</h2>
          <p>All cakes are handcrafted. Slight variations in design, color, or decoration may occur. Images shown are for representation purposes only. Always check for allergens before ordering.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Delivery Policy</h2>
          <p>Delivery is limited to serviceable pin codes. We are not liable for failed deliveries due to incorrect address, recipient unavailability, or contact issues.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Refunds & Replacements</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Refunds/replacements are only offered in case of damage, wrong delivery, or non-delivery.</li>
            <li>Report issues within 4 hours with photo proof.</li>
            <li>No refunds for incorrect info or refusal to accept order.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Payment & Pricing</h2>
          <p>All prices are inclusive of applicable taxes. Payments are accepted via Razorpay, UPI, Cards, and Net Banking. We reserve the right to cancel an order in case of pricing errors.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Privacy & Data Protection</h2>
          <p>Your personal data is kept confidential and used only for order processing and communication. We never share your data with third parties without your consent.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Copyright</h2>
          <p>All content including logos, product images, and design is owned by Suryacake.in. Unauthorized use is strictly prohibited.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            📞 +91 7503500400 | +91 8750400509 <br />
            📧 Email: support@suryacake.in <br />
            🌐 Website: <a href="https://www.suryacake.in" className="text-rose-600 hover:underline">www.suryacake.in</a>
          </p>
        </div>

        <p className="text-sm italic text-gray-600">
          *Terms and conditions apply to all orders. By continuing to use this website, you acknowledge and agree to these terms.*
        </p>
      </div>
    </section>
  );
};

export default TermsandConditions;
