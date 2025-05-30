import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} MFA Secure App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;