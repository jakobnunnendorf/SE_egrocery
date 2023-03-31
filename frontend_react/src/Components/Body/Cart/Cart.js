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
          {props.cartProp.map((item) => (
            <tr key={item.productInfo._id}>
              <td>
                <img
                  src={item.productInfo.images}
                  alt={item.productInfo.name}
                  className="product-image"
                />
              </td>
              <td>{item.productInfo.name}</td>
              <td>{item.quantity}</td>
              <td>{item.productInfo.price.toFixed(2)}</td>
              <td>{(item.productInfo.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">
        <strong>Total: </strong>${totalPrice.toFixed(2)}
      </div>
      <button className="btn btn-primary checkout-btn">Checkout</button>
    </div>
  );
}
