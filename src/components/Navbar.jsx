import React from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span style={{color: 'var(--text-primary)'}}>instant</span>
          <span className="gradient-text">Zaa</span>
        </Link>
        
        <div className="nav-actions">
          {user ? (
            <div className="user-profile" onClick={() => navigate('/profile')} style={{cursor: 'pointer'}} title="View Profile">
              <img src={user.avatar} alt="Avatar" className="user-avatar" />
              <span className="user-name">{user.name}</span>
            </div>
          ) : (
            <button className="btn btn-outline login-btn" onClick={() => navigate('/login')}>
              <User size={18} /> Login
            </button>
          )}

          <button className="cart-toggle-btn" onClick={() => navigate('/cart')}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
