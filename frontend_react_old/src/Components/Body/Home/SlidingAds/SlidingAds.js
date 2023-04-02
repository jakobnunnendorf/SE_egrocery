import React, { useState, useEffect } from 'react';

const SlidingAds = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const imageSlider = {
    justifyContent: 'center',
    width: '100%',
    height: '350px',
    position: 'relative', 
    marginBottom: '15px',

  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    objectFit: 'cover',
  };

  const leftArrow = {
    position: 'absolute',
    top: '50px',
    left: '32px',
    fontSize: '32px',
    color: 'black',
    zIndex: '1',
  };

  const rightArrow = {
    position: 'absolute',
    top: '50px',
    right: '32px',
    fontSize: '32px',
    color: 'black',
    zIndex: '1',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div style={imageSlider}>
      <div style={leftArrow} onClick={handlePreviousClick}>
        {/* Prev */}
      </div>
      <div style={rightArrow} onClick={handleNextClick}>
         {/* Next */}
      </div>
      <img src={images[currentImageIndex]} alt="sliding-ad" style={slideStyles} />
    </div>
  );
};

export default SlidingAds;
