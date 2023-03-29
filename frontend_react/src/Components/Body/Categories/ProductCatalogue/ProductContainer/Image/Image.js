import React, { useState } from 'react'

export default function Image({ imageURL }) {
  const [imageSrc, setImageSrc] = useState(imageURL);
  const defaultImage = "https://via.placeholder.com/270x450?text=Image+Not+Available"; // Replace this URL with your desired default image

  const styles = {
    width: "100%",
    height: "170px",
    marginTop: "0px",
    marginBottom: "0px",
    // boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
    objectFit: "cover",
    borderRadius: "1px"
  };

  const handleError = () => {
    setImageSrc(defaultImage);
  };

  return <img style={styles} src={imageSrc} alt="Product" onError={handleError} />;
}
