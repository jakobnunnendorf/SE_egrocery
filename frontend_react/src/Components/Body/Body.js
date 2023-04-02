import React from 'react'
import Products from './Products/Products'
import Home from './Home/Home'
import Promos from './Promos/Promos'
import Help from './Help/Help'
import Cart from './Cart/Cart'
import AccountPage from './AccountPage/AccountPage'

export default function Body(props) {
    const styles={
        frame: {
            position: 'relative',
            top: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            minHeight: '80vh',
        },
    }
    let renderComponent;
    switch(props.activeComponent) {
        case "Home":
            renderComponent = <Home addItemToCart={props.addItemToCart}/>
            break;
        case "Products":
            renderComponent = <Products addItemToCart={props.addItemToCart}/>
            break;
        case "Promos":
            renderComponent = <Promos/>
            break;
        case "Help":
            renderComponent = <Help/>
            break;
        case "Cart":
            renderComponent = <Cart
            cartProp={props.cartProp}
            removeItemFromCart={props.removeItemFromCart}
            addItemToCart={props.addItemToCart}/>
            break;
        case "Account":
            renderComponent = <AccountPage
            accountStatus={props.accountStatus}/>
            break;
        default:
            renderComponent = (
              <AccountPage accountStatus={props.accountStatus} />
            );
            break;
    }
  return (
    <div style={styles.frame}>
      {renderComponent}
    </div>
  )
}
