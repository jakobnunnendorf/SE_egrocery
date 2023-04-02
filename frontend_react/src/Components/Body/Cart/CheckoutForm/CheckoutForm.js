import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import visaLogo from '../../Help/PaymentMethodsAndSecurity/payment-logos/visa.png';
import mastercardLogo from '../../Help/PaymentMethodsAndSecurity/payment-logos/mastercard.png'; 
import amexLogo from '../../Help/PaymentMethodsAndSecurity/payment-logos/amx.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // You would call your backend here to create a Checkout session.
  };

  return (
    <div className="form-container"> 
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3 className="heading-checkout"><FontAwesomeIcon icon={faLock} /> Secure Payment</h3>
      <div className='cards'>
          <img class="smallLogo" src={visaLogo} alt='visa' />
          <img class="smallLogo" src={mastercardLogo} alt='mastercard' />
          <img class="smallLogo" src={amexLogo} alt='amex' />
        </div>
      <div className="stripe-card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe} className="pay-button">
        Pay
      </button>
    </form>
    </div>
  );
};

export default CheckoutForm;
