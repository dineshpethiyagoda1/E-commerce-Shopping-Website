import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import './AdminAddProduct.css';

const AdminEditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getById(id).then(res => {
      const p = res.data;
      setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock, category: p.category, image: p.image || '' });
      setLoading(false);
    }).catch(() => navigate('/admin/products'));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await productsAPI.update(id, form);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      setSaving(false);
    }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      <Link to="/admin/products" className="back-link">← Back to Product Management</Link>
      <h1>Edit Product</h1>

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
            <input type="text" className="form-input" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="url" className="form-input" value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })} />
            {form.image && (
              <div className="image-preview">
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Image Preview</p>
                <img src={form.image} alt="preview"
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div className="form-btns">
            <button type="submit" className="submit-btn" disabled={saving}>
              {saving ? 'Updating...' : 'Update Product'}
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

export default AdminEditProduct;
