import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Send, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export const ProductDetailModal = ({ product, onClose, onProductUpdated }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isFavorited = isInWishlist(product._id || product.slug);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      addToast('Please write your review comment!', 'error');
      return;
    }

    try {
      setIsSubmittingReview(true);
      const updated = await api.addReview(product._id || product.slug, {
        user: reviewerName.trim() || 'Anonymous Daredevil',
        rating: reviewRating,
        comment: reviewComment.trim()
      });

      addToast('Review posted successfully! ★', 'success');
      setReviewComment('');
      setReviewerName('');
      setShowReviewForm(false);
      if (onProductUpdated) onProductUpdated(updated);
    } catch (err) {
      addToast(err.message || 'Failed to submit review', 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      
      {/* MODAL WRAPPER */}
      <div 
        className="neo-card bg-white max-w-4xl w-full my-auto border-3 border-black shadow-brutal-2xl max-h-[92vh] flex flex-col overflow-hidden animate-bounce-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER BAR */}
        <div className="bg-neo-yellow border-b-3 border-black p-3.5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-black text-white px-2 py-0.5">
              ITEM_SPEC // {product.slug}
            </span>
            <span className="font-mono text-xs hidden sm:inline text-black font-bold">
              STOCK: {product.stock > 0 ? `${product.stock} AVAILABLE` : 'SOLD OUT'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-black text-white hover:bg-neo-pink hover:text-white border-2 border-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* LEFT: GALLERY */}
            <div className="md:col-span-6 flex flex-col gap-3">
              {/* Main Image */}
              <div className="border-3 border-black bg-neutral-100 overflow-hidden relative shadow-brutal">
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 neo-badge bg-neo-pink text-white font-black">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`w-20 h-20 border-2 border-black overflow-hidden shadow-brutal-sm cursor-pointer transition-all ${
                        selectedImg === idx ? 'ring-3 ring-black scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* GUARANTEE PERKS */}
              <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-[11px] font-bold text-center">
                <div className="border-2 border-black p-2 bg-neutral-50 shadow-brutal-sm flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-black" />
                  <span>FAST TRACK</span>
                </div>
                <div className="border-2 border-black p-2 bg-neutral-50 shadow-brutal-sm flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>LIFETIME WEAR</span>
                </div>
                <div className="border-2 border-black p-2 bg-neutral-50 shadow-brutal-sm flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-black" />
                  <span>EASY EXCHANGES</span>
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS & ACTIONS */}
            <div className="md:col-span-6 flex flex-col gap-4">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-500 uppercase">
                    {product.category}
                  </span>
                  
                  {/* Rating display */}
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-neutral-100 border border-black px-2 py-0.5">
                    <Star className="w-3.5 h-3.5 fill-neo-yellow text-black" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500">({product.numReviews} REVIEWS)</span>
                  </div>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight mt-1">
                  {product.name}
                </h2>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-display font-black text-3xl bg-neo-yellow px-2.5 py-0.5 border-2 border-black shadow-brutal">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-base line-through text-neutral-400">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="font-mono text-xs font-bold bg-neo-lime text-black border border-black px-2 py-0.5">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="border-t-2 border-b-2 border-black py-3 font-mono text-xs text-neutral-700 leading-relaxed">
                {product.description}
              </div>

              {/* SIZES */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-mono text-xs font-bold">
                    <span>SELECT SIZE:</span>
                    <span className="text-neutral-500">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`neo-badge py-1.5 px-3 text-xs font-mono font-bold cursor-pointer transition-all ${
                          selectedSize === s
                            ? 'bg-black text-white shadow-brutal scale-105'
                            : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COLORS */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-mono text-xs font-bold">
                    <span>COLOR:</span>
                    <span className="text-neutral-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 border-black transition-all flex items-center justify-center cursor-pointer ${
                          selectedColor === c.name ? 'ring-3 ring-black scale-110 shadow-brutal-sm' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <div className="w-2 h-2 rounded-full bg-white border border-black"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITY & ACTIONS */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3">
                  
                  {/* Stepper */}
                  <div className="flex items-center border-2 border-black bg-white shadow-brutal-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 font-display font-black text-base hover:bg-neutral-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-mono font-bold text-sm border-x-2 border-black min-w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                      className="px-3 py-2 font-display font-black text-base hover:bg-neutral-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 neo-btn bg-neo-yellow hover:bg-black hover:text-neo-yellow py-3 text-sm font-black disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{product.stock === 0 ? 'SOLD OUT' : `ADD TO CART • $${product.price * quantity}`}</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-3 bg-white border-2 border-black shadow-brutal hover:bg-neutral-50 active:shadow-none"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-neo-pink text-neo-pink' : 'text-black'}`} />
                  </button>

                </div>
              </div>

              {/* TECHNICAL SPECS */}
              {product.specs && product.specs.length > 0 && (
                <div className="mt-2 bg-[#F7F4EE] border-2 border-black p-3 font-mono text-xs">
                  <span className="block font-black mb-2 text-black tracking-wider uppercase">
                    SPECIFICATIONS:
                  </span>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                    {product.specs.map((sp, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase">{sp.label}</span>
                        <span className="font-bold text-neutral-800">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* CUSTOMER REVIEWS & ADD REVIEW SECTION */}
          <div className="border-t-3 border-black pt-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-black text-xl flex items-center gap-2">
                  <span>CUSTOMER DISPATCHES</span>
                  <span className="bg-neo-yellow border-2 border-black text-xs font-mono px-2 py-0.5">
                    {product.reviews?.length || 0} VERIFIED
                  </span>
                </h3>
                <p className="font-mono text-xs text-neutral-500">
                  Unfiltered opinions from real collectors & rebels.
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="neo-btn-sm bg-neo-cyan text-black font-mono font-bold"
              >
                {showReviewForm ? 'CANCEL REVIEW' : '+ WRITE A REVIEW'}
              </button>
            </div>

            {/* REVIEW FORM */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="neo-card bg-[#FBF9F5] p-4 border-2 border-black flex flex-col gap-3"
              >
                <div className="font-mono text-xs font-bold text-black uppercase">
                  SUBMIT YOUR DISPATCH REVIEW:
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-neutral-600 mb-1">
                      YOUR NAME / CALLSIGN:
                    </label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Alex M."
                      className="neo-input text-xs py-1.5 w-48"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold text-neutral-600 mb-1">
                      RATING:
                    </label>
                    <div className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= reviewRating
                                ? 'fill-neo-yellow text-black'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="font-mono text-xs font-bold ml-1.5">{reviewRating}/5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-neutral-600 mb-1">
                    YOUR HONEST FEEDBACK:
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about the weight, materials, fit or functionality..."
                    className="neo-input text-xs w-full"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="neo-btn bg-black text-white hover:bg-neutral-800 text-xs py-2 self-start flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingReview ? 'POSTING...' : 'PUBLISH DISPATCH'}</span>
                </button>
              </form>
            )}

            {/* REVIEWS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-black p-3.5 bg-white shadow-brutal-sm flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating
                                  ? 'fill-neo-yellow text-black'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500">
                          {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-neutral-800 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200 font-mono text-[11px]">
                      <span className="font-bold">{rev.user}</span>
                      <span className="text-neo-pink font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> VERIFIED REBEL
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-6 border-2 border-dashed border-black text-center font-mono text-xs text-neutral-500">
                  No dispatches yet. Be the first daredevil to leave a review!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
