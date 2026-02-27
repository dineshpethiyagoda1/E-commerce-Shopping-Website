import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import { PrivateRoute, AdminRoute } from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';

import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />

            {/* Private */}
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/order-confirmed/:id" element={<PrivateRoute><OrderConfirmedPage /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><OrderHistoryPage /></PrivateRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/products/add" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
            <Route path="/admin/products/edit/:id" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;