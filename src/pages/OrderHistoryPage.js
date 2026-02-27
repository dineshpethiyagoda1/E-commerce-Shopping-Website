import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../utils/api';
import Footer from '../components/common/Footer';
import './OrderHistoryPage.css';

const statusClass = (status) => {
  const map = { Delivered: 'delivered', Pending: 'pending', Processing: 'processing', Shipped: 'shipped', Cancelled: 'cancelled' };
  return map[status] || 'pending';
};

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="modal-close" onClick={onClose}>X</button>
        </div>
        <div className="modal-meta">
          <div className="meta-row"><span>Order ID</span><span>#{order._id?.slice(-6).toUpperCase()}</span></div>
          <div className="meta-row"><span>Date</span><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
          <div className="meta-row"><span>Amount</span><span>${order.totalPrice?.toFixed(2)}</span></div>
          <div className="meta-row"><span>Status</span>
            <span className={`status-badge status-${statusClass(order.status)}`}>{order.status}</span>
          </div>
        </div>
        <h3 className="modal-section-title">Ordered Items</h3>
        <hr />
        <div className="modal-items">
          {order.orderItems?.map((item, i) => (
            <div key={i} className="modal-item">
              <img src={item.image || 'https://via.placeholder.com/60?text=P'} alt={item.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/60?text=P'; }} />
              <div className="modal-item-info">
                <strong>{item.name}</strong>
                <span className="modal-item-cat">{item.category}</span>
                <span className="modal-item-qty">{item.quantity} x ${item.price?.toFixed(2)}</span>
              </div>
              <span className="modal-item-total">${(item.price * item.quantity)?.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="modal-grand-total">
          <span>Total</span>
          <span>${order.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    ordersAPI.getMy().then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="order-history-page">
        <h1>Order History</h1>
        <div className="orders-table-wrap">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p className="no-orders">You haven't placed any orders yet.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id?.slice(-6).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalPrice?.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${statusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="view-details-btn" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default OrderHistoryPage;