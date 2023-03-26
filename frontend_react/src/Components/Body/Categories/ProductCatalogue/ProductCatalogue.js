import React from 'react'
import ProductContainer from './ProductContainer/ProductContainer'
import products from './products'

export default function ProductCatalogue(props) {

  const containerStyles = {
    display: "grid", 
    gridTemplateColumns: "repeat(4, 1fr)",
    border: "1px solid blue",
    position: "relative",
    height: "100%",
    width: "80vw",
    left: "10vw",
  };

  const filteredProducts = []
  if (props.activeFilters.length > 0) {
    products.forEach((product) => {
      if (props.activeFilters.includes(product.categories[0])) {
        filteredProducts.push(product)
      }
    })
  }
  else {
    filteredProducts.push(...products)
  }
console.log(filteredProducts)
  return (
    <div style={containerStyles}>
      {filteredProducts.map((product, index) => (
        <ProductContainer key={index} product={product} />
      ))}
    </div>
  );
}
