import React, { useState, useEffect } from 'react';
import SlidingAds from './SlidingAds/SlidingAds';
import SampleProductsContainer from './SampleProductsContainer/SampleProductsContainer';
import './Home.css';

export default function Home(props) {
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(!fadeIn);
    }, 2000); // set the interval duration in milliseconds
    return () => clearInterval(interval);
  }, [fadeIn]);

  const imageLinks = [
    'https://cdn.dribbble.com/users/6046827/screenshots/15375566/media/6ac626ec63592e34c1b31d11fa1d8871.jpg',
    'https://smartorganic.com/wp-content/uploads/2021/01/10481_fb.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F10%2F22%2Fbrownies-2000.jpeg',
  ];


  return (
    <div styles={{ display: 'flex', flexDirection: 'column' }}>
      <div className="imageSlides">
        <SlidingAds images={imageLinks} />
      </div>
      <div className="some" style={{animation: `${fadeIn ? 'fadeIn' : ''} 3s ease-out`}}> Best Sellers </div>
      <div >
        <div className="sampleContainer">
          <SampleProductsContainer addItemToCart={props.addItemToCart}/>
        </div>
      </div>
      
    </div>
    
  );
}
