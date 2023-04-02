import React from 'react';
import './ShippingInfo.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faFileAlt, faMapMarkedAlt, faExclamationTriangle, faTools, faMoneyBill, faCoins, faWallet } from '@fortawesome/free-solid-svg-icons';

library.add(faShippingFast);
library.add(faFileAlt);
library.add(faMapMarkedAlt);
library.add(faExclamationTriangle);
library.add(faTools);
library.add(faMoneyBill);
library.add(faCoins);
library.add(faWallet);

const ShippingInfo = () => {
  return (
    <div className='shipping-info'>
      <h1><FontAwesomeIcon icon={faShippingFast} /> Shipping and Delivery Information</h1>
      <p className='intro'>Thank you for shopping at eGROCERY.</p>
      <h2><FontAwesomeIcon icon={faFileAlt} /> Shipping options:</h2>

      <table className={'table-container'}>
        <thead>
          <tr>
            <th>Shipping Option</th>
            <th>Delivery Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard Shipping</td>
            <td>1-2 business days</td>
            <td>$3.00</td>
          </tr>
          <tr>
            <td>Express Shipping</td>
            <td>12 hours</td>
            <td>$7.00</td>
          </tr>
          <tr> 
            <td>International Shipping *</td>
            <td>5-11 business days</td>
            <td>$10.00 - $30.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><FontAwesomeIcon icon={faMoneyBill} /> * Prices for international shipping depend on the country and will be calculated at checkout.</td>
          </tr>
        </tfoot>
      </table>

      <h2><FontAwesomeIcon icon={faMapMarkedAlt}  /> Order Tracking</h2>
      <p>Once your order has been shipped, you will receive a tracking number via email.</p>

      <h2><FontAwesomeIcon icon={faTools} /> Delivery Issues</h2>
      <p>If you experience any issues with the delivery of your order, please contact us for assistance.</p>
    </div>
  );
};

export default ShippingInfo;
