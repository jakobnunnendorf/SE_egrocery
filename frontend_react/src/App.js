import './App.css'; // for the styling of the app frame

// import the components rendered in the app frame
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';

// we use useState to set the active component in the body for navigation purposes
import { useState } from 'react';

// the app frame component in which all of the components are going to be hosted
function App() {
  // set the active component in the body
  const [activeBodyComponent, setActiveBodyComponent] = useState('home'); // by default the home page component is active
  const [cartProp, setCartProp] = useState([]); // by default the cart is empty
  const [accountStatus, setAccountStatus] = useState(false); // by default the user is not logged in
  const nOfCartItems = cartProp.reduce((accumulator, item) => accumulator + item.quantity, 0);

  function addItemToCart(product) {
    const itemIndex = cartProp.findIndex(item => item.productInfo === product);

    if (itemIndex !== -1) {
      const updatedCart = [...cartProp];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + 1,
      };
      setCartProp(updatedCart);
    } else {
      setCartProp([...cartProp, { productInfo: product, quantity: 1 }]);
    }
  }

  function removeItemFromCart(product) {
    const itemIndex = cartProp.findIndex(item => item.productInfo === product);

    if (itemIndex !== -1) {
      const updatedCart = [...cartProp];
      const currentItem = updatedCart[itemIndex];

      if (currentItem.quantity > 1) {
        updatedCart[itemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        };
      } else {
        updatedCart.splice(itemIndex, 1);
      }

      setCartProp(updatedCart);
    }
  }

  return (
    // rendering section
    <div className="App">
      <Header
        setActiveBodyComponent={setActiveBodyComponent}
        nOfCartItems={nOfCartItems}
        accountStatus={accountStatus}
      ></Header>
      <Body
        activeComponent={activeBodyComponent}
        cartProp={cartProp}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
      ></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
