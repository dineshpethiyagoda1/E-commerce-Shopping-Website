import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/common/Footer';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getById(id).then(res => {
      setProduct(res.data);
      setLoading(false);
    }).catch(() => { setLoading(false); navigate('/products'); });
  }, [id, navigate]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    const result = await addToCart(product._id, quantity);
    setAddingToCart(false);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      navigate('/login');
    }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;
  if (!product) return null;

  return (
    <div>
      <div className="product-detail-page">
        <Link to="/products" className="back-link">← Back to Products</Link>

        <div className="product-detail-grid">
          <div className="product-detail-img">
            <img
              src={product.image || 'https://via.placeholder.com/600x500?text=Product'}
              alt={product.name}
              onError={e => { e.target.src = 'https://via.placeholder.com/600x500?text=Product'; }}
            />
          </div>
          <div className="product-detail-info">
            <span className="detail-category">{product.category?.toUpperCase()}</span>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-price-row">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              <span className="detail-orig">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <div className="detail-section-label">DESCRIPTION</div>
            <p className="detail-desc">{product.description}</p>

            <div className="detail-meta">
              <div className="detail-meta-card">
                <span className="meta-icon">📦</span>
                <div>
                  <div className="meta-label">Availability</div>
                  <div className="meta-value">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </div>
                </div>
              </div>
              <div className="detail-meta-card">
                <span className="meta-icon">🏷️</span>
                <div>
                  <div className="meta-label">SKU</div>
                  <div className="meta-value">prod_{id?.slice(-4)}</div>
                </div>
              </div>
            </div>

            <div className="detail-section-label">QUANTITY</div>
            <div className="quantity-row">
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >−</button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              >+</button>
            </div>

            <button
              className={`add-to-cart-detail-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
            >
              {added ? '✓ Added to Cart!' : addingToCart ? 'Adding...' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
