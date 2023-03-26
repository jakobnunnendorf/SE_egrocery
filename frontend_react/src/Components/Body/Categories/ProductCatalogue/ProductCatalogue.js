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

  // const filteredProducts = products.filter((product) =>
  //   props.activeFilter.some((filter) => product.categories.includes(filter))
  // );

  return (
    <div style={containerStyles}>
      {products.map((product, index) => (
        <ProductContainer key={index} product={product} />
      ))}
    </div>
  );
}
