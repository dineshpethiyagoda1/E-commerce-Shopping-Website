import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    productsAPI.getAll({ search, limit: 100 }).then(res => {
      setProducts(res.data.products);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await productsAPI.delete(id);
    fetchProducts();
  };

  return (
    <div className="admin-page">
      <Link to="/admin" className="back-link">← Back to Dashboard</Link>
      <h1>Product Management</h1>

      <div className="admin-toolbar">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/products/add" className="add-product-btn">+ Add Product</Link>
      </div>

      {loading ? (
        <div className="page-loading"><div className="spinner"></div></div>
      ) : (
        <div className="products-table-wrap">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td className="product-cell">
                    <img
                      src={product.image || 'https://via.placeholder.com/60?text=P'}
                      alt={product.name}
                      onError={e => { e.target.src = 'https://via.placeholder.com/60?text=P'; }}
                    />
                    <div>
                      <div className="product-cell-name">{product.name}</div>
                      <div className="product-cell-desc">{product.description?.substring(0, 40)}...</div>
                    </div>
                  </td>
                  <td><span className="cat-tag">{product.category?.toUpperCase()}</span></td>
                  <td className="price-cell">${product.price?.toFixed(2)}</td>
                  <td className="stock-cell">{product.stock}</td>
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product._id, product.name)}>
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;