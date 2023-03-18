import React from 'react'

import Image from './Image/Image'
import Price from './Price/Price'
import Title from './Title/Title'
import AddToCart from './AddToCart/AddToCart'
import QuantityInfo from './QuantityInfo/QuantityInfo'


export default function ProductContainer({ product }) {

  const styles = {
    container: {
      position: "relative",
      width: "270px",
      height: "450px",
      margin: "20px 20px 0 10px",
    },
    subContainer: {
      position: "relative",
      border: "1px solid #e1e4e8",
      borderTop: "0.5px solid #e1e4e8",
      margin: "0 0 0 0",
    }
  };
  return (
    <>
      <div style={styles.container}>
        <Image imageURL={product.image} />
        <div style={styles.subContainer}>
          <Price price={product.price} />
          <Title title={product.title} />
          <QuantityInfo quantity={product.quantity} />
          <AddToCart />
        </div>
      </div>
    </>
  );
}