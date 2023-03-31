import React from 'react';
import './Cart.css';

export default function Cart(props) {
  const totalPrice = props.cartProp.reduce(
    (accumulator, item) => accumulator + item.productInfo.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
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
                <img src={item.productInfo.images} alt={item.productInfo.name} className="cart-image" />
              </td>
              <td>{item.productInfo.name}</td>
              <td>
                <div className="td-quantity">
                <button onClick={() => props.removeItemFromCart(item.productInfo)} className="cart-button">-</button>
                {item.quantity}
                <button onClick={() => props.addItemToCart(item.productInfo)} className="cart-button">+</button>
                </div>
              </td>
              <td>${item.productInfo.price.toFixed(2)}</td>
              <td>${(item.productInfo.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button className="checkout-button">Checkout</button> {/* Add the checkout button */}
    </div>
  );
}
