import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/common/Footer';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getAll({ limit: 6 }).then(res => {
      setProducts(res.data.products);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await addToCart(productId, 1);
    if (!result.success) navigate('/login');
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">✨ Premium Shopping Experience</div>
        <h1 className="hero-title">SHOPHUB</h1>
        <p className="hero-subtitle">
          Where sophistication meets simplicity. Discover curated collections designed for the modern lifestyle.
        </p>
        <div className="hero-btns">
          <Link to="/products" className="btn-explore">Explore Collection →</Link>
          <Link to="/register" className="btn-join">Join Now</Link>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-sub">We're committed to delivering excellence in every aspect of your shopping experience.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>Enjoy free shipping on all orders over $100, delivered within service area.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Checkout</h3>
            <p>Your privacy matters. Shop with confidence using our fully encrypted payment system.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Return any item within 30 days for a full refund, no questions asked.</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="about-section">
        <h2 className="section-title">About Us</h2>
        <div className="about-divider"></div>
        <p className="section-sub">
          We're not just another e-commerce platform. We're a community dedicated to bringing you the finest products with an unrivalled shopping experience.
        </p>
        <div className="about-grid">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              Founded in 2018, ShopHub started from a simple idea: make online shopping feel personal. We believe that shopping should be an enjoyable and trustworthy experience, not just a transaction.
            </p>
            <p>
              Today, over 10,000 happy customers trust us, offering a carefully curated selection of premium products that blend quality, style, and functionality.
            </p>
            <h3>Our Core Values</h3>
            <div className="values-grid">
              <div className="value-item">
                <span className="value-icon">⭐</span>
                <div>
                  <strong>Quality First</strong>
                  <p>We never compromise on quality. Every product meets our high standards.</p>
                </div>
              </div>
              <div className="value-item">
                <span className="value-icon">❤️</span>
                <div>
                  <strong>Customer Obsessed</strong>
                  <p>Your satisfaction is our success. We go above and beyond for every customer.</p>
                </div>
              </div>
              <div className="value-item">
                <span className="value-icon">💡</span>
                <div>
                  <strong>Innovation</strong>
                  <p>We continuously embrace new technologies to improve your shopping experience.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-banner">
            <div className="excellence-badge">
              <div className="excellence-icon">🏆</div>
              <p>Excellence in Every Detail</p>
            </div>
          </div>
        </div>

        <div className="mission-banner">
          <div className="mission-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>To empower individuals through exceptional products and seamless experiences, creating a world where quality, style, and convenience converge effortlessly.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="products-header">
          <div>
            <h2 className="section-title-left">Featured Products</h2>
            <p className="section-sub-left">A product selection for you.</p>
          </div>
          <Link to="/products" className="view-all-btn">View All →</Link>
        </div>

        {loading ? (
          <div className="page-loading"><div className="spinner"></div></div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                <div className="product-img-wrap">
                  <img
                    src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
                    alt={product.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=Product'; }}
                  />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.description?.substring(0, 50)}...</p>
                  <div className="product-footer">
                    <div>
                      <div className="product-price">${product.price.toFixed(2)}</div>
                      <div className="product-shipping">🚚 Free Shipping</div>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(product._id, e)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-icon">→</div>
        <h2>Start Your Journey</h2>
        <p>Join our community and experience shopping reimagined with premium quality and exceptional service</p>
        <div className="cta-btns">
          <Link to="/products" className="btn-explore-dark">Browse Collection →</Link>
          <Link to="/register" className="btn-create-account">Create Account</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;