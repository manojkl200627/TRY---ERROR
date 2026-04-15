import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Settings, CreditCard } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="glass text-center" style={{padding: '4rem', borderRadius: '24px'}}>
          <h2>You are not logged in</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{marginTop: '2rem'}}>Go to Login</button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-header glass">
        <img src={user.avatar} alt="Profile" className="profile-avatar-large" />
        <div className="profile-info">
          <h1 className="gradient-text">{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <button className="btn btn-outline logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section glass">
          <h3><Package size={20}/> Recent Orders</h3>
          <div className="empty-state">
            <p>You haven't placed any orders yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        </div>

        <div className="profile-section-grid">
          <div className="profile-section glass">
            <h3><CreditCard size={20}/> Payment Methods</h3>
            <p className="text-muted">No saved payment methods.</p>
          </div>
          <div className="profile-section glass">
            <h3><Settings size={20}/> Account Settings</h3>
            <p className="text-muted">Manage your details and preferences here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
