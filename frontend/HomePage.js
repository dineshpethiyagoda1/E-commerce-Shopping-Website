import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">FUCHSIUS</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Products</li>
          <li>Cart</li>
          <li>Login</li>
        </ul>
      </nav>

      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to <span className="brand-text">FUCHSIUS</span></h1>
            <p>Elevate Your Style with Our Premium Collection</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">Product 1</div>
          <div className="product-card">Product 2</div>
          <div className="product-card">Product 3</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;