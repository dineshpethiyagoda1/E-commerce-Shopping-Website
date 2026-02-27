import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/common/Footer';
import './CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div>
      <div className="cart-page">
        <h1>Your Product Cart</h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started.</p>
            <Link to="/products" className="btn-shop-now">Browse Products →</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img">
                    <img
                      src={item.image || 'https://via.placeholder.com/100?text=P'}
                      alt={item.name}
                      onError={e => { e.target.src = 'https://via.placeholder.com/100?text=P'; }}
                    />
                  </div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-details">
                    <div className="cart-col-label">PRICE</div>
                    <div className="cart-col-label">QUANTITY</div>
                    <div className="cart-col-label">TOTAL</div>
                  </div>
                  <div className="cart-item-controls">
                    <span className="cart-price">${item.price.toFixed(2)}</span>
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>ORDER SUMMARY</h3>
              <div className="summary-row">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>SHIPPING:</span>
                <span>{shipping === 0 ? '$0.00' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-total">
                <span>TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Proceed To Checkout →
              </button>
              <Link to="/products" className="continue-btn">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;