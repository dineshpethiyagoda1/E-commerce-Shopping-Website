import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const SignUpPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreed) { setError('Please agree to terms & conditions'); return; }
    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <h1>Sign up</h1>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign up</Link>
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">Full Name</label>
          <div className="auth-input-wrap">
            <input
              type="text"
              className="auth-input"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

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

          <label className="auth-label">Create Password</label>
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

          <label className="auth-terms">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            I agree to terms &amp; conditions
          </label>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button className="social-auth-btn">
          <span className="social-icon google-icon">G</span>
          Sign up with Google
        </button>
        <button className="social-auth-btn">
          <span className="social-icon fb-icon">f</span>
          Sign up with Facebook
        </button>
      </div>

      <div className="auth-banner-side">
        <div className="auth-banner-logo">🛍️</div>
        <div className="auth-banner-brand">SHOPHUB</div>
        <div className="auth-banner-text">
          <h2>WELCOME TO SHOPHUB !</h2>
          <p>Create an account to start shopping, track orders, and enjoy a seamless experience.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;