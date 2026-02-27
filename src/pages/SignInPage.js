import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const SignInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <h1>Sign in</h1>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">E-mail</label>
          <div className="auth-input-wrap">
            <input
              type="email"
              className="auth-input"
              placeholder="your@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <label className="auth-label">Password</label>
          <div className="auth-input-wrap">
            <input
              type={showPw ? 'text' : 'password'}
              className="auth-input"
              placeholder="@#*%"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="button" className="eye-btn" onClick={() => setShowPw(!showPw)}>
              {showPw ? '🙈' : '👁'}
            </button>
          </div>

          <div className="auth-options">
            <label className="remember-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button className="social-auth-btn">
          <span className="social-icon google-icon">G</span>
          Continue with Google
        </button>
        <button className="social-auth-btn">
          <span className="social-icon fb-icon">f</span>
          Continue with Facebook
        </button>
      </div>

      <div className="auth-banner-side">
        <div className="auth-banner-logo">🛍️</div>
        <div className="auth-banner-brand">SHOPHUB</div>
        <div className="auth-banner-text">
          <h2>WELCOME BACK !</h2>
          <p>Sign in to manage your account, track orders, and enjoy a seamless shopping experience.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;