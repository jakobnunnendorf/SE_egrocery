import React, { useState, useEffect } from 'react';

export default function Image({ imageURL }) {
  const [imageSrc, setImageSrc] = useState(imageURL);
  const defaultImage = 'https://m.media-amazon.com/images/I/71J-c9GJs0L._AC_UF894,1000_QL80_.jpg';

  const styles = {
    width: '100%',
    height: '170px',
    marginTop: '30px',
    marginBottom: '0px',
    objectFit: 'cover',
    borderRadius: '1px',
  };

  const handleError = () => {
    setImageSrc(defaultImage);
  };

  // Update imageSrc whenever imageURL prop changes
  useEffect(() => {
    setImageSrc(imageURL);
  }, [imageURL]);

  return <img style={styles} src={imageSrc} alt="Product" onError={handleError} />;
}
