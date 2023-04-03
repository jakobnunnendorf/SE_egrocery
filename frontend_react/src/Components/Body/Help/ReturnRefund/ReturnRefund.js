import React from 'react';
import './ReturnRefund.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube,faFile, faShippingFast, faExclamationTriangle, faTags, faUndo } from '@fortawesome/free-solid-svg-icons';

library.add(faCube);
library.add(faFile);
library.add(faShippingFast);
library.add(faExclamationTriangle);
library.add(faTags);
library.add(faUndo);

const ReturnRefundPolicy = () => {
  return (
    <div className='return-refund-policy'>
      <h1><FontAwesomeIcon icon="undo" /> Return and Refund Policy</h1>
      <p className='intro'>Thank you for shopping at eGROCERY.</p>
      <p className='intro'>Please read this policy carefully. This is the Return and Refund Policy of eGROCERY.</p>

      <h2><FontAwesomeIcon icon="file" /> Digital Products</h2>
      <p>We do not issue refunds for digital products once the order is confirmed and the product is sent. We recommend contacting us for assistance if you experience any issues receiving or downloading our products.</p>

      <h2><FontAwesomeIcon icon="cube" /> Physical products</h2>
      <p>If you are not entirely satisfied with your purchase, we're here to help.</p>
      <p>You have 14 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging. Your item needs to have the receipt or proof of purchase.</p>
      <p>Please contact us before you return the product.</p>

      <h2><FontAwesomeIcon icon="shipping-fast" /> Shipping charges</h2>
      <p>You are responsible for paying the costs of shipping and for the risk of loss of or damage to the product during shipping, both to and from eGROCERY.</p>

      <h2><FontAwesomeIcon icon="exclamation-triangle" /> Damaged items</h2>
      <p>If you received a damaged product, please notify us immediately for assistance.</p>

      <h2><FontAwesomeIcon icon="tags" /> Sale items</h2>
      <p>Items bought on sale items cannot be refunded.</p>
    </div>
  );
};

export default ReturnRefundPolicy;
