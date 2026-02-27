import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Admin navbar
  if (isAdmin && location.pathname.startsWith('/admin')) {
    return (
      <nav className="navbar navbar-admin">
        <div className="navbar-brand">
          <Link to="/admin">
            <span className="brand-icon">⊞</span>
            <span className="brand-text">SHOPHUB</span>
          </Link>
        </div>
        <div className="navbar-right">
          <span className="admin-badge">Admin</span>
          <span className="nav-username">{user?.name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            <span>⎋</span> Logout
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-text">SHOPHUB</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
        {user && <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link>}
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-btn">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        {user ? (
          <>
            <span className="nav-username">{user.name}</span>
            {isAdmin && <Link to="/admin" className="admin-link">Admin</Link>}
            <button className="btn-logout" onClick={handleLogout}>
              <span>⎋</span> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login">
              <span>👤</span> Login
            </Link>
            <Link to="/register" className="btn-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
