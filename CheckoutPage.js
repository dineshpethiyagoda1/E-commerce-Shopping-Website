import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/common/Footer';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: user?.name || '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const items = cart?.items || [];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderItems = items.map(item => ({
        product: item.product._id || item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        category: item.product?.category || '',
      }));

      const res = await ordersAPI.create({
        orderItems,
        shippingAddress: form,
        paymentMethod: 'Cash on Delivery',
      });

      navigate(`/order-confirmed/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p className="checkout-sub">Complete your purchase</p>

        <div className="checkout-grid">
          <div className="checkout-form-wrap">
            <h2>Shipping Information</h2>
            {error && <div className="checkout-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.streetAddress}
                  onChange={e => setForm({ ...form, streetAddress: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.postalCode}
                    onChange={e => setForm({ ...form, postalCode: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.country}
                  onChange={e => setForm({ ...form, country: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="place-order-btn" disabled={loading || items.length === 0}>
                {loading ? 'Placing Order...' : 'Place Order →'}
              </button>
            </form>
          </div>

          <div className="order-summary-checkout">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item._id} className="checkout-item">
                  <img
                    src={item.image || 'https://via.placeholder.com/60?text=P'}
                    alt={item.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/60?text=P'; }}
                  />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;