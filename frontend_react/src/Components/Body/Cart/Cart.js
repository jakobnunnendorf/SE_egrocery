import React, { useState } from "react";
import "./Cart.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import emailjs from '@emailjs/browser';

const stripePromise = loadStripe(
  "pk_live_51Ms3VvDmRvnpQ6e6h0qFd928Zf6STt5VmgfUNBGg5Q3x5ZPfl9JZ5Gv9TadDXZtNSgpO8oCInSsbszxRiAeC4P2S00QXy3THcP"
);

export default function Cart(props) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const totalPrice = props.cartProp.reduce(
    (accumulator, item) => accumulator + item.productInfo.price * item.quantity,
    0
  );

  const cartProp = props.cartProp; // Replace with the actual cartProp prop from your component


  const items_list = cartProp.map((item, index) => {
    return `Item ${index + 1}: {{${item.productInfo.name}}} - Quantity: {{${item.quantity}}}`;
  }).join('\n');
  
  const total_amount = cartProp.reduce((accumulator, item) => {
    return accumulator + item.productInfo.price * item.quantity;
  }, 0);
  
  const emailParams = {
    customer_name: '{{John Doe}}', // Replace with the customer's name
    order_number: '{{123456}}', // Replace with the order number
    order_date: '{{2023-03-20}}', // Replace with the order date
    items_list: items_list,
    total_amount: `{{$${total_amount.toFixed(2)}}}`,
    shipping_address: '{{123 Main St, New York, NY 10001, USA}}', // Replace with the shipping address
    billing_address: '{{123 Main St, New York, NY 10001, USA}}', // Replace with the billing address
    shipping_time: '{{3-5 business days}}', // Replace with the estimated shipping time
  };
  

function sendEmail() {

  emailjs
    .send(
      "service_raio2fy",
      "template_kodpvyf",
      emailParams,
      "tKEmu2eMAB7uAjgYz"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}

function handleCheckout() {
  setCheckoutModalOpen(true);
  sendEmail();
}

  return (
    <div className="cart-container">
      {!checkoutModalOpen && (
        <>
          <h2 className="cart-title">Your Cart</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {props.cartProp.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.productInfo.images}
                      alt={item.productInfo.name}
                      className="cart-image"
                    />
                  </td>
                  <td>{item.productInfo.name}</td>
                  <td>
                    <div className="td-quantity">
                      <button
                        onClick={() =>
                          props.removeItemFromCart(item.productInfo)
                        }
                        className="cart-button"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => props.addItemToCart(item.productInfo)}
                        className="cart-button"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.productInfo.price.toFixed(2)}</td>
                  <td>
                    ${(item.productInfo.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
          <button
            className="checkout-button" 
            onClick={() => handleCheckout()}  disabled={totalPrice <= 0}
          >
            Checkout
          </button>
        </>
      )}

      {checkoutModalOpen && (
        <div className="checkout-modal">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <button
  className="cancel-button"
  onClick={() => setCheckoutModalOpen(false)}
>
  Cancel
</button>

        </div>
      )}
    </div>
  );
}