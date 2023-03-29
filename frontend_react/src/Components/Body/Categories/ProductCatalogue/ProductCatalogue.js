import React from 'react';
import ProductContainer from './ProductContainer/ProductContainer';
import products from './products';

export default function ProductCatalogue(props) {
  function parsePriceRange(range) {
    if (range.includes('>')) {
      const lowerBound = parseFloat(range.replace('>', '').replace('$', '').trim());
      return [lowerBound, Infinity];
    } else {
      const [lowerBound, upperBound] = range.split('-').map(price => parseFloat(price.replace('$', '').trim()));
      return [lowerBound, upperBound];
    }
  }
  const productfilters = [];
props.activeFilters.forEach(filter => {
  filter.includes('$') ? productfilters.push(parsePriceRange(filter)) : productfilters.push(filter);
});
const containerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  border: '1px solid blue',
  position: 'relative',
  height: '100%',
  width: '80vw',
  left: '10vw',
};

const filteredProducts = products.filter(product => {
  const categoryFilters = productfilters.filter(filter => typeof filter === 'string');
  const priceFilters = productfilters.filter(filter => Array.isArray(filter));

  const categoryMatch =
    categoryFilters.length === 0 || categoryFilters.some(filter => product.categories.includes(filter));
  const priceMatch =
    priceFilters.length === 0 || priceFilters.some(([lowerBound, upperBound]) => product.price >= lowerBound && product.price <= upperBound);

  return categoryMatch && priceMatch;
});

console.log(filteredProducts);


  return (
    <div style={containerStyles}>
      {filteredProducts.map((product, index) => (
        <ProductContainer key={index} product={product} />
      ))}
    </div>
  );
}
