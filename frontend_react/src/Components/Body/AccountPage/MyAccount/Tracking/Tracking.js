import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTruck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Tracking.css';

export default function Tracking({ status }) {

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return 'We are currently packing items you ordered. Please wait while we process your order.';
      case 'shipped':
        return 'Your order has been shipped and is on its way';
      case 'delivered':
        return 'Your order has been delivered';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'orange';
      case 'shipped':
        return 'lightgreen';
      case 'delivered':
        return 'green';
      default:
        return 'black';
    }
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <FontAwesomeIcon icon={faSpinner} spin />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} />;
      case 'delivered':
        return <FontAwesomeIcon icon={faCheckCircle} />;
      default:
        return '';
    }
  };

  return (
    <div>
       <h2>{getStatusIcon()} {capitalizeFirstLetter(status)}</h2>
      <p>{getStatusMessage()}</p>
      <div className='containerImg'> 
        <img src="https://thumbs.dreamstime.com/b/delivery-parcel-sign-box-line-icon-packing-boxes-symbol-colorful-outline-concept-blue-orange-thin-line-packing-boxes-icon-159151741.jpg" alt="packing" className="statusImg1" /> 
        <img src="https://cdn-icons-png.flaticon.com/512/1559/1559859.png" alt="shipped" className="statusImg2"/> 
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPKGNjt07OvAzXu0gcLlkOjJb7tMN13jmuEBxy2LDQQajCyAb0x7WtZdpa-MTkGOw4KFg&usqp=CAU" alt="delievered" className="statusImg3" /> 
      </div>
      <div className='containerCircles'>
        <div className='circle1' style={{ backgroundColor: status === 'processing' ? getStatusColor() : 'transparent' }}>  </div>
        <div className='circle2' style={{ backgroundColor: status === 'shipped' ? getStatusColor() : 'transparent' }}> </div>
        <div className='circle3' style={{ backgroundColor: status === 'delivered' ? getStatusColor() : 'transparent' }}> </div>
      </div>
    </div>
  );
}
