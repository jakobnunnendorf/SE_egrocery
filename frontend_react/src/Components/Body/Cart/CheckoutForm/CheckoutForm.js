import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

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
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <div className="stripe-card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
