import React, { useState, useEffect } from 'react';

export default function Image({ imageURL }) {
  const [imageSrc, setImageSrc] = useState(imageURL);
  const defaultImage = 'https://via.placeholder.com/270x450?text=Image+Not+Available';

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
