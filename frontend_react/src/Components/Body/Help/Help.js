import React from 'react';
import FAQ from './FAQ/FAQ';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import ShippingInfo from './ShippingInfo/ShippingInfo';
import ReturnRefund from './ReturnRefund/ReturnRefund';
import PaymentMethodsAndSecurity from './PaymentMethodsAndSecurity/PaymentMethodsAndSecurity';
import ContactUs from './ContactUs/ContactUs';
import { faPhone, faEnvelope, faMobileAlt,faFax, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Help.css';

export default function Help() {
  return (
    <div className="help">
      <img src= "https://dominionpayroll.com/wp-content/uploads/HelpCenter.png" alt="Help Center" className="help__image" />
      <div className="help__section">
        <FAQ />
      </div>

      <div className="help__section">
        <h2><FontAwesomeIcon icon={faFax} /> Contact Us</h2>
        <div className="help__contact-form">
          <ContactUs />
        </div>
        <div className="help__contact-info">
          <p>
            <span className="phone"> <FontAwesomeIcon icon={faPhone} /> +65 95045938 </span>
            <a href="mailto:eGROCERY@gmail.com" className="email"> <FontAwesomeIcon icon={faEnvelope} /> eGrocery@gmail.com </a>
          </p>
        </div>
      </div>

      <div className="help__section">
        <PaymentMethodsAndSecurity />
      </div>

      <div className="help__section">
        <ShippingInfo />
      </div>

      <div className="help__section">
        <ReturnRefund />
      </div>


      <div className="help__section">
        <PrivacyPolicy />
      </div>

    </div>
  );
}
