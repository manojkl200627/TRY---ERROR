import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-empty animate-fade-in">
        <ShoppingBag size={80} opacity={0.2} color="var(--accent-color)" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any premium gear yet.</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <h1 className="cart-page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-list glass">
          {cartItems.map(item => (
            <div key={item.id} className="cart-page-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16}/></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16}/></button>
                </div>
                <button className="btn-icon remove-btn" onClick={() => removeFromCart(item.id)} title="Remove Item">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${(cartTotal * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span className="gradient-text">${(cartTotal * 1.08).toFixed(2)}</span>
          </div>
          <button className="btn btn-primary w-full" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
