import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if(email) {
      login(email);
      navigate('/profile');
    }
  };

  return (
    <div className="login-page animate-fade-in">
      <div className="login-card glass">
        <h2 className="gradient-text login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your instantZaa account</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full login-submit-btn">
            Sign In
          </button>
        </form>
        <p className="login-footer">Don't have an account? <a>Sign up</a></p>
      </div>
    </div>
  );
}
