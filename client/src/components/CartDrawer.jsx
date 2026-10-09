import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discountAmount,
    tax,
    total,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCouponCode(couponInput);
    setIsApplying(false);
    setCouponInput('');
  };

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* DRAWER CONTAINER */}
      <div 
        className="w-full max-w-md bg-[#FDFBF7] h-full border-l-3 border-black shadow-brutal-2xl flex flex-col justify-between overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="p-4 bg-neo-yellow border-b-3 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-display font-black text-lg tracking-tight uppercase">
              YOUR LOOT CART
            </h2>
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-bold">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 bg-black text-white hover:bg-neo-pink hover:text-white border-2 border-black transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FREE SHIPPING PROGRESS BAR */}
        <div className="bg-[#FAF6EC] px-4 py-2.5 border-b-2 border-black font-mono text-xs">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-1.5 text-black font-bold">
              <Sparkles className="w-4 h-4 text-neo-pink fill-neo-pink" />
              <span>UNLOCKED! YOU HAVE FREE SHIPPING!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>FREE SHIPPING METER:</span>
                <span className="text-neo-pink">${amountNeededForFreeShipping} away</span>
              </div>
              <div className="w-full bg-white border border-black h-2.5 overflow-hidden">
                <div
                  className="bg-neo-lime h-full border-r border-black transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
              <div className="w-16 h-16 border-2 border-black bg-neo-yellow shadow-brutal flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-display font-black text-xl mb-1">CART IS EMPTY</h3>
              <p className="font-mono text-xs text-neutral-600 mb-6 max-w-xs">
                Your loot stash is currently deserted. Grab some heavyweight brutalist apparel!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="neo-btn bg-black text-white text-xs px-5 py-2.5"
              >
                CONTINUE BROWSING
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="border-2 border-black bg-white p-3 shadow-brutal-sm flex gap-3 relative group"
              >
                {/* Thumb */}
                <div className="w-18 h-20 border border-black bg-neutral-100 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display font-black text-sm leading-tight line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-neo-pink transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="font-mono text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                      <span>SIZE: <strong className="text-black">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>COLOR: <strong className="text-black">{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-black bg-neutral-50">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold text-xs hover:bg-neutral-200"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-mono text-xs font-bold border-x border-black min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold text-xs hover:bg-neutral-200"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display font-black text-base text-black">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOTTOM CHECKOUT FOOTER */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t-3 border-black p-4 flex flex-col gap-3">
            
            {/* COUPON INPUT */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-neo-lime border-2 border-black px-3 py-2 font-mono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>CODE "{appliedCoupon.code}": -${discountAmount}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="underline hover:text-neo-pink text-[11px]"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="PROMO CODE (e.g. BRUTAL20)"
                  className="flex-1 bg-neutral-50 border-2 border-black px-3 py-1.5 font-mono text-xs uppercase shadow-brutal-sm focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isApplying}
                  className="neo-btn bg-black text-white text-xs px-3 py-1.5 font-mono"
                >
                  {isApplying ? '...' : 'APPLY'}
                </button>
              </form>
            )}

            {/* QUICK COUPON PREVIEW PILLS */}
            {!appliedCoupon && (
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className="text-neutral-500">TRY:</span>
                <button
                  type="button"
                  onClick={() => applyCouponCode('BRUTAL20')}
                  className="bg-neutral-100 hover:bg-neo-yellow border border-black px-1.5 py-0.5 font-bold cursor-pointer"
                >
                  BRUTAL20
                </button>
                <button
                  type="button"
                  onClick={() => applyCouponCode('FREESHIP')}
                  className="bg-neutral-100 hover:bg-neo-lime border border-black px-1.5 py-0.5 font-bold cursor-pointer"
                >
                  FREESHIP
                </button>
              </div>
            )}

            {/* PRICE SUMMARY */}
            <div className="font-mono text-xs flex flex-col gap-1.5 border-t border-neutral-300 pt-2">
              <div className="flex justify-between text-neutral-600">
                <span>SUBTOTAL:</span>
                <span className="font-bold text-black">${subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-neo-pink font-bold">
                  <span>DISCOUNT:</span>
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
                <span>TAX (8%):</span>
                <span className="font-bold text-black">${tax}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t-2 border-black font-display font-black text-xl">
                <span>TOTAL:</span>
                <span className="bg-neo-yellow px-2 py-0.5 border-2 border-black shadow-brutal-sm">
                  ${total}
                </span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full neo-btn bg-neo-yellow hover:bg-neo-pink hover:text-white py-3.5 text-sm font-black flex items-center justify-center gap-2 shadow-brutal"
            >
              <span>CHECKOUT NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
