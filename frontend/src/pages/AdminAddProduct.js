import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '', image: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await productsAPI.create(form);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <Link to="/admin/products" className="back-link">← Back to Product Management</Link>
      <h1>Add New Product</h1>

      <div className="product-form-wrap">
        <h2>Product Details</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" className="form-input" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input form-textarea" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} required rows={4} />
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" min="0" className="form-input" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input type="number" min="0" className="form-input" value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" className="form-input" placeholder="e.g., Electronics, Accessories, etc."
              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="url" className="form-input" placeholder="https://example.com/image.jpg (optional)"
              value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <small className="form-hint">Leave blank to use a default image</small>
          </div>
          <div className="form-btns">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : '+ Add Product'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
