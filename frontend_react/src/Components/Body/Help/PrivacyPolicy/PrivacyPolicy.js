import React from 'react';
import './PrivacyPolicy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


export default function PrivacyPolicy() {
  return (
    <div className='privacy-policy'>
		<h1><FontAwesomeIcon icon={faLock} /> Privacy</h1>

		<p>At eGROCERY, we believe in the importance of protecting your privacy. This policy outlines how we collect, use, and protect any information that we may collect from you while you are using our website, <a href="https://www.egrocery.com">https://www.egrocery.com</a>, or any other site that we own and operate. By using our website, you are accepting the practices described in this policy.</p>

		<h2>Information we collect</h2>

		<p>We may collect personal information such as your name, email address, and phone number when you register on our website, place an order, or subscribe to our newsletter. We may also collect non-personal information such as your browser type, IP address, and the pages you visit on our site.</p>

		<h2>How we use your information</h2>

		<p>We use the information we collect to process your orders, provide customer support, send you promotional emails, and improve our website and services. We may also use your information to comply with legal obligations or resolve disputes.</p>

		<h2>Sharing of information</h2>

		<p>We do not sell or rent your personal information to third parties. We may share your information with third-party service providers who help us process payments, deliver orders, or provide customer support. We may also share your information with law enforcement agencies or other government bodies if required by law.</p>

		<h2>Cookies</h2>

		<p>We use cookies to enhance your user experience and provide personalized content. You can choose to disable cookies in your browser settings, but this may affect the functionality of our website.</p>

		<h2><FontAwesomeIcon icon={faShieldAlt} /> Security</h2>

		<p>We take your security seriously. All payment information is encrypted using SSL (Secure Socket Layer) technology to ensure that your information is protected. Look for the padlock icon in your browser address bar to verify that you are on a secure page.We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

		<h2>Changes to this policy</h2>

		<p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes.</p>

	</div>
  );
}


