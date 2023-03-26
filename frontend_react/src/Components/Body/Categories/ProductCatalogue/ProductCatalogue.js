import React from 'react'
import ProductContainer from './ProductContainer/ProductContainer'
import products from './products'

export default function ProductCatalogue() {

  const containerStyles = {
    display: "flex", 
    border: "3px solid blue",
    position: "relative",
    height: "100%",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around"
  };

  const productContainers = [];

  for (let i = 0; i < products.length; i++) {
    productContainers.push(
        <ProductContainer product={products[i]} />
    );
  }

  return (
    <div style={containerStyles}>
      {productContainers}
    </div>
  );
}