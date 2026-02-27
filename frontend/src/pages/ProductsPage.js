import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/common/Footer';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    productsAPI.getAll({ search, category, limit: 50 }).then(res => {
      setProducts(res.data.products);
      setTotal(res.data.total);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [search, category]);

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await addToCart(productId, 1);
    if (!result.success) navigate('/login');
  };

  return (
    <div>
      <div className="products-page">
        <div className="products-page-header">
          <h1>Products</h1>
          <p>Explore our curated collection</p>
        </div>

        <div className="products-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <span className="filter-icon">▼</span>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="results-count">{total} products found</p>

        {loading ? (
          <div className="page-loading"><div className="spinner"></div></div>
        ) : (
          <div className="products-grid-page">
            {products.map(product => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-card-page">
                <div className="product-img-page">
                  <img
                    src={product.image || 'https://via.placeholder.com/400x300?text=Product'}
                    alt={product.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=Product'; }}
                  />
                </div>
                <div className="product-body">
                  <span className="product-cat-tag">{product.category?.toUpperCase()}</span>
                  <h3>{product.name}</h3>
                  <p className="product-desc-short">{product.description?.substring(0, 60)}...</p>
                  <div className="product-price-row">
                    <span className="product-price-big">${product.price.toFixed(2)}</span>
                    <button
                      className="add-cart-btn"
                      onClick={(e) => handleAddToCart(product._id, e)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                  <p className="fast-ship">🚚 Fast Shipping</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="no-products">
            <p>No products found matching your search.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
