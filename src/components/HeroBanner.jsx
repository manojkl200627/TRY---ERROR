import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Pick 3 high-end items for the massive hero banner
  const featuredProducts = products.filter(p => p.price > 300).slice(0, 3);

  useEffect(() => {
    if(featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  if (featuredProducts.length === 0) return null;

  const current = featuredProducts[currentIndex];

  return (
    <div className="hero-banner-container">
      {featuredProducts.map((product, index) => (
        <div 
          key={product.id} 
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={product.image} alt={product.name} className="hero-bg-img" />
          <div className="hero-content">
            <span className="hero-badge">Featured Product</span>
            <h1 className="hero-title">{product.name}</h1>
            <p className="hero-desc">{product.description}</p>
            <div className="hero-action">
              <span className="hero-price">${product.price.toFixed(2)}</span>
              <button className="btn btn-primary hero-btn" onClick={() => navigate('/cart')}>
                Shop Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="hero-indicators">
        {featuredProducts.map((_, index) => (
          <button 
            key={index} 
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
