import React from 'react'

import Image from './Image/Image'
import Price from './Price/Price'
import Title from './Title/Title'
import AddToCart from './AddToCart/AddToCart'
import QuantityInfo from './QuantityInfo/QuantityInfo'


export default function ProductContainer({ product, addItemToCart }) {

  const styles = {
    container: {
      border: "1px solid #e1e4e8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      width: "270px",
      height: "450px",
      margin: "20px 20px 0 0",
      borderRadius: "10px",
    },
    subContainer: {
      position: "relative",
      borderTop: "1px solid #e1e4e8",
      margin: "0 0 0 0",
    }
  };
  return (
    <>
      <div style={styles.container}>
        <Image imageURL={product.images} />
        <div style={styles.subContainer}>
          <Price price={product.price} />
          <Title title={product.name} />
          <QuantityInfo quantity={product.quantity} />
          <AddToCart
          product={product}
          addItemToCart={addItemToCart}/>
        </div>
      </div>
    </>
  );
}