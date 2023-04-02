import React, { useState } from "react";
import "./Cart.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_live_51Ms3VvDmRvnpQ6e6h0qFd928Zf6STt5VmgfUNBGg5Q3x5ZPfl9JZ5Gv9TadDXZtNSgpO8oCInSsbszxRiAeC4P2S00QXy3THcP"
);

export default function Cart(props) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const totalPrice = props.cartProp.reduce(
    (accumulator, item) => accumulator + item.productInfo.price * item.quantity,
    0
  );

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
            onClick={() => setCheckoutModalOpen(true)}
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