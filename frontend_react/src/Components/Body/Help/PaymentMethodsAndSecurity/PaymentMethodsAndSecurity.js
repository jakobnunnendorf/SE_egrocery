import React from 'react';
import './PaymentMethodsAndSecurity.css';
import visaLogo from './payment-logos/visa.png';
import mastercardLogo from './payment-logos/mastercard.png';
import amexLogo from './payment-logos/amx.png';
import paypalLogo from './payment-logos/paypal.png';
import paylahLogo from './payment-logos/paylah.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


library.add(faCoins);
library.add(faShieldAlt);


const PaymentMethodsAndSecurity = () => {
  return (
   <div className='payment-methods-security'>
      <h2><FontAwesomeIcon icon={faCoins} /> Payment Methods </h2>
    <div className='payment-methods'>
      <div className='cardsDescription'>
        <div className='cards'>
          <img class="smallLogo" src={visaLogo} alt='visa' />
          <img class="smallLogo" src={mastercardLogo} alt='mastercard' />
          <img class="smallLogo" src={amexLogo} alt='amex' />
        </div>
        <div className='description'>eGROCERY offers a range of payment options for your convenience, including Visa, Mastercard, and American Express. With these popular debit and credit cards, you can easily and securely make your purchases with us. Plus, you may even be eligible for exclusive discount offers when you use your card to shop with us. Our website uses SSL encryption, two-factor authentication, PCI compliance, and secure passwords to protect your transactions and personal information. Shop with confidence knowing that your safety is our top priority.</div>
      </div>
      <div className='payPalDescription'>
        <div className='payPal'>
        <img class="bigLogo" src={paypalLogo} alt='paypal' />
        </div>
        <div className='description'> PayPal is a secure and convenient way to make online payments. It allows you to link your bank account or credit card, and make purchases without having to share your financial information with merchants. With PayPal, you can easily pay for your eGROCERY orders without the hassle of entering your payment information every time you shop.</div>
      </div>
      <div className='payLahDescription'>
        <div className='payLah'>
        <img class="bigLogo" src={paylahLogo} alt='paylah' />
        </div>
        <div className='description'> Paylah is a secure mobile wallet app by DBS Bank for making easy and secure payments using your phone. With features like QR code scanning, bill payments, and top-up services, it's a hassle-free way to manage your finances on the go. Paylah uses encryption technology and two-factor authentication to protect user information, and is backed by DBS Bank's strict security measures.</div>
        </div>
    </div>
    <div className='security'>
      <h2> <FontAwesomeIcon icon={faShieldAlt} /> Secure Transactions</h2>
      <p className='securityDescription'>In addition to our own security measures, we also partner with trusted payment process providers to ensure that your transactions are safe and secure. These providers adhere to strict security standards, including PCI compliance, to protect your sensitive financial information. With SSL encryption and two-factor authentication, you can trust that your personal data is kept safe during every step of the payment process. At eGROCERY, we understand that your peace of mind is important, and we strive to provide a secure and worry-free shopping experience.</p>
    </div>
</div>
  );
};

export default PaymentMethodsAndSecurity;

