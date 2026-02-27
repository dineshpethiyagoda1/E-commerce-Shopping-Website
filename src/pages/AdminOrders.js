import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import './AdminOrders.css';

const STATUS_OPTIONS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusClass = (s) => ({ Delivered: 'delivered', Pending: 'pending', Processing: 'processing', Shipped: 'shipped', Cancelled: 'cancelled' }[s] || 'pending');

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  const fetchOrders = () => {
    setLoading(true);
    ordersAPI.getAll({ status: filter }).then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const handleStatusChange = async (orderId, newStatus) => {
    await ordersAPI.updateStatus(orderId, newStatus);
    fetchOrders();
  };

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="admin-page">
      <Link to="/admin" className="back-link">← Back to Dashboard</Link>
      <h1>Order Management</h1>

      <div className="filter-row">
        <div className="status-filter">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Orders' : s}</option>)}
          </select>
          <span className="filter-arrow">▼</span>
        </div>
      </div>

      {loading ? (
        <div className="page-loading"><div className="spinner"></div></div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-admin-card">
              <div className="order-admin-header">
                <div>
                  <div className="order-admin-id">Order #{order._id?.slice(-6).toUpperCase()}</div>
                  <div className="order-admin-date">{new Date(order.createdAt).toLocaleString()}</div>
                  <div className="order-admin-customer">Customer ID: {order.user?._id?.slice(-12) || 'N/A'}</div>
                </div>
                <div className="order-admin-right">
                  <span className="order-admin-amount">${order.totalPrice?.toFixed(2)}</span>
                  <select
                    className={`status-select status-select-${statusClass(order.status)}`}
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
                  >
                    {STATUS_OPTIONS.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <button className="toggle-details-btn" onClick={() => toggleExpand(order._id)}>
                {expanded[order._id] ? 'Hide Details' : `View Details`} ({order.orderItems?.length} items) {expanded[order._id] ? '▲' : '▼'}
              </button>

              {expanded[order._id] && (
                <div className="order-expanded">
                  <h4>Order Items</h4>
                  <div className="order-items-list">
                    {order.orderItems?.map((item, i) => (
                      <div key={i} className="order-item-row">
                        <img src={item.image || 'https://via.placeholder.com/50?text=P'} alt={item.name}
                          onError={e => { e.target.src = 'https://via.placeholder.com/50?text=P'; }} />
                        <div className="order-item-info">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-price">${item.price?.toFixed(2)} × {item.quantity}</span>
                        </div>
                        <span className="order-item-total">${(item.price * item.quantity)?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  {order.shippingAddress && (
                    <div className="shipping-info">
                      <h4>Shipping Address</h4>
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.streetAddress}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {orders.length === 0 && <p className="no-orders">No orders found.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;