import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const CheckoutModal = ({ onOrderSuccess }) => {
  const {
    cartItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    tax,
    total,
    clearCart,
    setLastPlacedOrder
  } = useCart();

  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: 'Raven Blackwood',
    email: 'raven@antigravity.dev',
    street: '742 Evergreen Concrete Way',
    city: 'Neo Tokyo',
    postalCode: '10001',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('CARD'); // CARD, CRYPTO, CASH_ON_DELIVERY
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8888');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.street) {
      addToast('Please complete shipping details', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          product: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        })),
        shippingDetails: formData,
        paymentDetails: {
          method: paymentMethod,
          last4: cardNumber.slice(-4) || '8888',
          status: 'PAID'
        },
        subtotal,
        shippingFee,
        discountAmount,
        couponCode: appliedCoupon?.code || null,
        tax,
        total
      };

      const placedOrder = await api.createOrder(payload);

      // Trigger Confetti Party!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE600', '#FF4365', '#00F0FF', '#000000', '#B8FF00']
      });

      setLastPlacedOrder(placedOrder);
      clearCart();
      setIsCheckoutOpen(false);
      if (onOrderSuccess) onOrderSuccess(placedOrder);
      addToast('Order placed successfully! Tracking dispatched.', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to complete order', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      
      {/* MODAL WRAPPER */}
      <div 
        className="neo-card bg-white max-w-4xl w-full my-auto border-3 border-black shadow-brutal-2xl max-h-[92vh] flex flex-col overflow-hidden animate-bounce-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="bg-neo-yellow border-b-3 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-black" />
            <h2 className="font-display font-black text-xl tracking-tight uppercase">
              CHECKOUT // SECURE DISPATCH
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 bg-black text-white hover:bg-neo-pink border-2 border-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT (2 COLS) */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: SHIPPING & PAYMENT */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* STEP 1: SHIPPING */}
              <div className="neo-card bg-[#FAF8F3] p-4 sm:p-5 border-2 border-black">
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-mono font-bold text-xs">
                      1
                    </span>
                    <h3 className="font-display font-black text-base uppercase">
                      SHIPPING DESTINATION
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] bg-neo-lime border border-black px-1.5 py-0.5 font-bold">
                    GLOBAL CARRIER
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">FULL NAME:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="neo-input w-full text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">EMAIL FOR DISPATCH LOGS:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="neo-input w-full text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">STREET ADDRESS:</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="neo-input w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">CITY:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="neo-input w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">ZIP / POSTAL CODE:</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="neo-input w-full text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: PAYMENT METHOD */}
              <div className="neo-card bg-[#FAF8F3] p-4 sm:p-5 border-2 border-black">
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-mono font-bold text-xs">
                      2
                    </span>
                    <h3 className="font-display font-black text-base uppercase">
                      PAYMENT SELECTION
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" /> 256-BIT ENCRYPTED
                  </span>
                </div>

                {/* METHOD TOGGLE */}
                <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-xs font-bold">
                  {[
                    { id: 'CARD', label: 'CREDIT CARD' },
                    { id: 'CRYPTO', label: 'CRYPTO (SOL)' },
                    { id: 'CASH_ON_DELIVERY', label: 'CASH ON DEV' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`py-2 px-2 border-2 border-black text-center cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? 'bg-black text-white shadow-brutal-sm'
                          : 'bg-white text-black hover:bg-neutral-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* CARD FIELDS */}
                {paymentMethod === 'CARD' && (
                  <div className="bg-white border-2 border-black p-3.5 flex flex-col gap-3 font-mono text-xs shadow-brutal-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                      <span className="font-bold text-neutral-700">TEST VIRTUAL CARD PRESET:</span>
                      <CreditCard className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-0.5">CARD NUMBER</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full font-mono text-xs p-1.5 border border-black bg-neutral-50 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">EXP DATE</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full font-mono text-xs p-1.5 border border-black bg-neutral-50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full font-mono text-xs p-1.5 border border-black bg-neutral-50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'CRYPTO' && (
                  <div className="bg-neo-lime border-2 border-black p-3 font-mono text-xs">
                    <span className="block font-bold mb-1">⚡ INSTANT CRYPTO WALLET CONNECT:</span>
                    <span>Phantom / Solflare simulated integration active. Zero gas fee applied.</span>
                  </div>
                )}

                {paymentMethod === 'CASH_ON_DELIVERY' && (
                  <div className="bg-neo-cyan border-2 border-black p-3 font-mono text-xs">
                    <span className="block font-bold mb-1">📦 CASH UPON ARRIVAL:</span>
                    <span>Pay directly to courier upon package delivery and inspection.</span>
                  </div>
                )}

              </div>

            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div className="neo-card bg-white p-4 sm:p-5 border-2 border-black shadow-brutal flex flex-col gap-4">
                <h3 className="font-display font-black text-lg border-b-2 border-black pb-2">
                  ORDER SUMMARY ({cartItems.length} ITEMS)
                </h3>

                {/* ITEMS PREVIEW */}
                <div className="max-h-56 overflow-y-auto flex flex-col gap-2.5 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="flex items-center gap-2.5 font-mono text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover border border-black"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate">{item.name}</h4>
                        <div className="text-[10px] text-neutral-500">
                          {item.selectedSize} • Qty {item.quantity}
                        </div>
                      </div>
                      <span className="font-bold">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* BREAKDOWN */}
                <div className="border-t-2 border-black pt-3 flex flex-col gap-1.5 font-mono text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>SUBTOTAL:</span>
                    <span className="font-bold text-black">${subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-neo-pink font-bold">
                      <span>DISCOUNT ({appliedCoupon?.code}):</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>SHIPPING:</span>
                    <span className="font-bold text-black">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>TAX:</span>
                    <span className="font-bold text-black">${tax}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t-2 border-black font-display font-black text-2xl">
                    <span>TOTAL:</span>
                    <span className="bg-neo-yellow px-2 py-0.5 border-2 border-black shadow-brutal-sm">
                      ${total}
                    </span>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neo-btn bg-neo-yellow hover:bg-black hover:text-neo-yellow py-4 text-sm font-black flex items-center justify-center gap-2 shadow-brutal mt-2"
                >
                  <span>{isSubmitting ? 'PROCESSING DISPATCH...' : 'PAY & DISPATCH ORDER NOW'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
