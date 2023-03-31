import React from 'react'
import cartbutton_icon from './cart_darkgreen.png';

export default function OpenCart(props) {
    const styles = {
        iconStyleA: {
          height: "12px",
          marginLeft: "6px",
          marginRight: "6px"
        },
        iconStyleB: {
          height: "24px",
          marginLeft: "6px",
          marginRight: "6px"
        },
        iconStyleC: {
          height: "24px",
          marginLeft: "0px",
          marginRight: "6px"
        },
      };
  return (
    <div className="header__cart">
          <button className="header__cartButton" onClick={()=>props.setActiveBodyComponent("Cart")}>
          <img
              style={styles.iconStyleC}
              src={cartbutton_icon} // to be replaced with the correct icon
              alt=""
            />
            <span className="header__cartTextCapital">C</span>
            <span className="header__cartText">art</span>
            {props.nOfCartItems} items
          </button>
        </div>
  )
}
