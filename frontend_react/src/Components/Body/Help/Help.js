import React from 'react';
import FAQ from './FAQ/FAQ';
import './Help.css';

export default function Help() {
  return (
    <div className="help">
      <h1 className="help__title">Help Center</h1>

      <div className="help__section">
        <FAQ />
      </div>

      <div className="help__section">
        <h2>Contact Us</h2>
        <div className="help__contact-form">
          {/* Add your Contact Form component here */}
        </div>
        <div className="help__contact-info">
          {/* Add your Contact Information here */}
        </div>
      </div>

      <div className="help__section">
        <h2>Privacy Policy & User Data</h2>
        {/* Add your Privacy Policy and User Data content here */}
      </div>

      <div className="help__section">
        <h2>Return and Refund Policy</h2>
        {/* Add your Return and Refund Policy content here */}
      </div>

      <div className="help__section">
        <h2>Shipping and Delivery Information</h2>
        {/* Add your Shipping and Delivery Information content here */}
      </div>

      <div className="help__section">
        <h2>Payment Methods and Security</h2>
        {/* Add your Payment Methods and Security content here */}
      </div>

    </div>
  );
}
