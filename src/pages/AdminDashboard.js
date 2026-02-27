import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import './AdminDashboard.css';

const statusClass = (s) => ({ Delivered: 'delivered', Pending: 'pending', Processing: 'processing' }[s] || 'pending');

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getStats().then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      <Link to="/" className="back-link">← Back to store</Link>
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{stats?.totalProducts || 0}</div>
          </div>
          <div className="stat-icon">📦</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{stats?.totalOrders || 0}</div>
          </div>
          <div className="stat-icon">🛒</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
          </div>
          <div className="stat-icon">💵</div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Customers</div>
            <div className="stat-value">{stats?.totalCustomers || 0}</div>
          </div>
          <div className="stat-icon">👥</div>
        </div>
      </div>

      <div className="admin-nav-cards">
        <div className="admin-nav-card">
          <div className="admin-nav-icon">📦</div>
          <h3>Product Management</h3>
          <p>Manage your product catalog, add new products or update existing ones.</p>
          <Link to="/admin/products" className="open-link">Open →</Link>
        </div>
        <div className="admin-nav-card">
          <div className="admin-nav-icon">🛒</div>
          <h3>Order Management</h3>
          <p>View and manage customer orders, update order status</p>
          <Link to="/admin/orders" className="open-link">Open →</Link>
        </div>
        <div className="admin-nav-card">
          <div className="admin-nav-icon">➕</div>
          <h3>Add New Product</h3>
          <p>Quickly add new product to your catalog</p>
          <Link to="/admin/products/add" className="open-link">Open →</Link>
        </div>
      </div>

      <h2 className="recent-title">Recent Orders</h2>
      <div className="recent-orders">
        {stats?.recentOrders?.map(order => (
          <div key={order._id} className="recent-order-card">
            <div>
              <div className="recent-order-id">Orders #{order._id?.slice(-6).toUpperCase()}</div>
              <div className="recent-order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="recent-order-right">
              <span className="recent-order-amount">${order.totalPrice?.toFixed(2)}</span>
              <span className={`status-badge status-${statusClass(order.status)}`}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;