import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import './OrderConfirmedPage.css';

const OrderConfirmedPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="order-confirmed-page">
        <div className="confirmed-icon">✓</div>
        <h1>Order Confirmed</h1>
        <p className="confirmed-sub">Thank you for your purchase</p>
        <p className="confirmed-id">
          Order ID: <strong>{id?.slice(-8).toUpperCase()}</strong>
        </p>
        <div className="confirmed-btns">
          <Link to="/orders" className="view-orders-btn">View My Orders →</Link>
          <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmedPage;