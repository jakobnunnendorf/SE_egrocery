import React from 'react'
import Products from './Products/Products'
import Home from './Home/Home'
import Promos from './Promos/Promos'
import Help from './Help/Help'
import Cart from './Cart/Cart'

export default function Body(props) {
    const styles={
        border: "1px solid red",
        position: 'relative',
        top: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    }
    let renderComponent;
    switch(props.activeComponent) {
        case "Home":
            renderComponent = <Home/>
            break;
        case "Products":
            renderComponent = <Products/>
            break;
        case "Promos":
            renderComponent = <Promos/>
            break;
        case "Help":
            renderComponent = <Help/>
            break;
        case "Cart":
            renderComponent = <Cart/>
            break;
        default:
            renderComponent = <Products/>
            break;
    }
  return (
    <div style={styles}>
      {renderComponent}
    </div>
  )
}
