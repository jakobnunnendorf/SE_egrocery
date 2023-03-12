import React from 'react'

export default function NavigationMenu() {
  const styles={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    listStyle: 'none',
    width: '100%',
  }
  return (
    <ul style={styles}>
      <li><button>Home</button></li>
      <li>Categories</li>
      <li>Promos</li>
      <li>Support</li>
    <ul/>
    </ul>
  )
}
