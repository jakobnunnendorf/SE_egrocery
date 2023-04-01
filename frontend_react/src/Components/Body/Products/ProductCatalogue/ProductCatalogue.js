import React from 'react';
import ProductContainer from './ProductContainer/ProductContainer';

export default function ProductCatalogue(props) {
const containerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  height: '100%',
  width: '80vw',

  // position: 'relative',
  // left: '20vw',
};

  return (
    <div style={containerStyles}>
      {/* {props.matchingProducts.map((product, index) => (
        <ProductContainer
        key={index} 
        product={product}
        addItemToCart={props.addItemToCart}/>
      ))} */}
    </div>
  );
}
