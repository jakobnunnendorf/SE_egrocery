import React from 'react'

export default function Price(props) {
const priceStr = "$" + props.price.toString();
  const styles = {
    // border: "1px solid red",
    fontSize: "19px",
    fontFamily: "sans-serif",
    fontWeight: "550",
    color: "#444C4F",
    height: "27px",
    width: "100px",
    position: "relative", 
    textAlign: "left", 
    marginLeft: "10px", 
    marginTop: "10px"
  };
  return (
    <div>
      <p style={styles}>{priceStr}</p>
    </div>
  );
}

