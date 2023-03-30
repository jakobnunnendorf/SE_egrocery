import React from 'react';
import ProductContainer from './ProductContainer/ProductContainer';
import product_data from './test_data';

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
      {product_data.map((product, index) => (
        <ProductContainer key={index} product={product} />
      ))}
    </div>
  );
}
