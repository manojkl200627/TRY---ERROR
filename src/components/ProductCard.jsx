import React, { useRef, useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log('Video play interrupted:', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
        videoRef.current.pause();
    }
  };

  return (
    <div className="product-card glass" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="media-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`product-image ${isHovered ? 'hidden-media' : 'visible-media'}`} 
        />
        <video 
          ref={videoRef}
          src={product.video} 
          muted 
          loop 
          playsInline
          className={`product-video ${isHovered ? 'visible-media' : 'hidden-media'}`}
        />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-to-cart-btn btn btn-primary" onClick={() => addToCart(product)}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
