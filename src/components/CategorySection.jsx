import React from 'react';
import './CategorySection.css';

const categoryData = [
  { name: 'Electronics', icon: '💻', color: 'rgba(59, 130, 246, 0.1)' },
  { name: 'Fashion', icon: '👗', color: 'rgba(236, 72, 153, 0.1)' },
  { name: 'Home', icon: '🛋️', color: 'rgba(16, 185, 129, 0.1)' },
  { name: 'Beauty', icon: '✨', color: 'rgba(245, 158, 11, 0.1)' },
];

export default function CategorySection() {
  return (
    <div className="category-section">
      <div className="category-header">
        <h2>Shop by Category</h2>
        <a href="#" className="view-all-link">View All Categories</a>
      </div>
      <div className="category-grid">
        {categoryData.map((cat, idx) => (
          <div key={idx} className="category-card glass" style={{backgroundColor: cat.color}}>
            <span className="category-icon">{cat.icon}</span>
            <h3 className="category-name">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
