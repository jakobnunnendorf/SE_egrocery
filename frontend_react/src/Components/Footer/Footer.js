import React from 'react';

import './Footer.css';

function Footer() {


  return (
    <div className="footer">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>© 2023 eGROCERY Singapore Pte Ltd</div>
        <div>
          <a href="https://www.egrocery.com/support">Support</a>
          <a href="https://www.egrocery.com/faq">FAQ</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
