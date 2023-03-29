import React from 'react'
import Categories from './Categories/Categories'
import ProductCatalogue from './Categories/ProductCatalogue/ProductCatalogue'
export default function Body() {
    const styles={
        position: 'relative',
        top: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100vh',
    }
  return (
    <div style={styles}>
      <Categories/>
    </div>
  )
}
