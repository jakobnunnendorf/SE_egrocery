import React from 'react'

export default function Image({imageURL}) {
  const styles = {
    width: "100%",
    height: "170px",
    marginTop: "0px",
    marginBottom: "0px",
    // boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
    objectFit: "cover", 
    borderRadius: "1px"
  };
  return <img style={styles} src={imageURL} alt="Product" />;
}