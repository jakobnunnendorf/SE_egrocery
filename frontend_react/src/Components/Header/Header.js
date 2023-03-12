import React from 'react'

// Import all the components
import NavigationMenu from './NavigationMenu/NavigationMenu'
import Logo from './Logo/Logo'
import SearchBar from './SearchBar/SearchBar'
import Cart from './Cart/Cart'
import Account from './Account/Account'

export default function Header() {
  const styles = {
      frame:{
        backgroundColor: "#557D71",
        position: "fixed",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        width: "100%",
        height: "12vh",
        fontWeight: "bold",
      },
      headerThird:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid black",
        width: "33%",
        height: "100%",
      }
  }
  return (
    <div style={styles.frame}>
      <div style={styles.headerThird}>
        <Logo/>
        <NavigationMenu/>
      </div>
      <div style={styles.headerThird}>
        <SearchBar/>
      </div>
      <div style={styles.headerThird}>
        <Cart/>
        <Account/>
      </div>
    </div>
  )
}
