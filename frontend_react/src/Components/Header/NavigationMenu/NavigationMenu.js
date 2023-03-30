import React from 'react'

export default function NavigationMenu(props) {
  const styles={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    listStyle: 'none',
    width: '100%',
  }
  return (
    <ul style={styles}>
      <li><button onClick={() => props.setActiveBodyComponent("Home")}>Home</button></li>
      <li><button onClick={() => props.setActiveBodyComponent("Products")}>Products</button></li>
      <li><button onClick={() => props.setActiveBodyComponent("Promos")}>Promos</button></li>
      <li><button onClick={() => props.setActiveBodyComponent("Support")}>Support</button></li>
    <ul/>
    </ul>
  )
}
