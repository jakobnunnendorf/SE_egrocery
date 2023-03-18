import React from 'react'
import ProductContainer from './ProductContainer/ProductContainer'

export default function ProductCatalogue() {

  //sample data for products
  const products = [
    {
      price: 10,
      title:
        "Surf Excel Detergent Soap Bar Stain Eraser with Fragrance Surf Excel Detergent Soap Bar Stain Eraser",
      description: "A very good powder",
      image:
        "https://sg.jimpus.com/wp-content/uploads/2020/07/61ed7Ccc8L._SL1000_.jpg", 
      quantity: "0.75 kg | $1 per kg"
    },
    {
      price: 12,
      title: "ARIEL Laundry Powder Detergent 500G Aroma Original 3-Pack. ",
      description: "A very good powder",
      image: "https://m.media-amazon.com/images/I/615chcqv1vL.jpg", 
      quantity: "1 kg | $12 per kg"
    }
  ];

  const containerStyles = {
    display: "flex", 
    border: "1px solid blue",
    position: "relative",
    height: "100%",
    width: "100%"
  };

  return (
    <div style={containerStyles}>
      <div>
        {" "}
        <ProductContainer product={products[0]} />{" "}
      </div>
      <div>
        {" "}
        <ProductContainer product={products[1]} />{" "}
      </div>
    </div>
  );
}
