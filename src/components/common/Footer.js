import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">🛍️</span>
            <span className="footer-logo-text">SHOPHUB</span>
          </div>
          <p className="footer-desc">
            Modern shopping, simplified. Your destination for premium products and exceptional service.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn">f</a>
            <a href="#" className="social-btn">t</a>
            <a href="#" className="social-btn">in</a>
            <a href="#" className="social-btn">li</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/orders">Order History</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <a href="#">Help Center</a>
          <a href="#">Track Order</a>
          <a href="#">Returns &amp; Refunds</a>
          <a href="#">Shipping Info</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <span>📍</span>
            <span>123 Commerce Street<br />New York, NY 10001</span>
          </div>
          <div className="contact-item">
            <span>📞</span>
            <span>+1 (234) 567-890</span>
          </div>
          <div className="contact-item">
            <span>✉️</span>
            <span>support@shophub.com</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopHub. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;