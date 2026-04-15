import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { cartTotal, cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="checkout-container success-container animate-fade-in">
        <CheckCircle size={80} color="var(--accent-color)" />
        <h1 className="gradient-text">Payment Successful!</h1>
        <p>Thank you for your order. Your premium gear is on the way.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: '2rem'}}>
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container animate-fade-in">
      <h1 className="checkout-title">Secure Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form glass">
          <h3>Payment Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name on Card</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary checkout-submit-btn"
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="checkout-summary glass">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
