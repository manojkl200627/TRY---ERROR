import React from 'react';
import { Star, Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product._id || product.slug);

  const getBadgeBg = (color) => {
    switch (color) {
      case 'pink':
        return 'bg-neo-pink text-white';
      case 'cyan':
        return 'bg-neo-cyan text-black';
      case 'lime':
        return 'bg-neo-lime text-black';
      case 'orange':
        return 'bg-neo-orange text-white';
      case 'yellow':
      default:
        return 'bg-neo-yellow text-black';
    }
  };

  return (
    <div className="neo-card flex flex-col justify-between group overflow-hidden bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-xl transition-all duration-200">
      
      {/* CARD TOP MEDIA */}
      <div className="relative border-b-2 border-black bg-neutral-100 overflow-hidden">
        
        {/* BADGE */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`neo-badge ${getBadgeBg(
                product.badgeColor
              )} shadow-brutal-sm font-black text-[10px] tracking-wider`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white border-2 border-black shadow-brutal-sm hover:bg-neutral-100 hover:scale-110 active:scale-95 transition-all"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? 'fill-neo-pink text-neo-pink' : 'text-black'
            }`}
          />
        </button>

        {/* IMAGE */}
        <div
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer overflow-hidden relative"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* QUICK VIEW OVERLAY HOVER */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="neo-btn bg-white text-xs px-3 py-1.5 font-mono font-bold flex items-center gap-1.5 shadow-brutal pointer-events-auto">
              <Eye className="w-3.5 h-3.5" /> QUICK VIEW
            </span>
          </div>
        </div>

        {/* STOCK STATUS / DISCOUNT RIBBON */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 pointer-events-none">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-black text-neo-lime border border-black font-mono font-black text-[10px] px-2 py-0.5 shadow-brutal-sm">
              SAVE ${product.originalPrice - product.price}
            </span>
          )}
          {product.stock <= 8 && (
            <span className="bg-neo-pink text-white border border-black font-mono font-bold text-[10px] px-2 py-0.5 shadow-brutal-sm">
              ONLY {product.stock} LEFT
            </span>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* CATEGORY & RATING */}
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500 mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-black">
              <Star className="w-3.5 h-3.5 fill-neo-yellow text-black" />
              <span>{product.rating}</span>
              <span className="text-neutral-400">({product.numReviews})</span>
            </div>
          </div>

          {/* TITLE */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-display font-black text-lg leading-tight hover:text-neo-pink cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* TAGLINE / DESCRIPTION */}
          <p className="font-mono text-xs text-neutral-600 mt-1 line-clamp-2">
            {product.tagline || product.description}
          </p>

          {/* COLOR SWATCHES IF ANY */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="font-mono text-[10px] text-neutral-400">COLORS:</span>
              {product.colors.map((c, i) => (
                <div
                  key={i}
                  title={c.name}
                  className="w-3.5 h-3.5 rounded-full border border-black"
                  style={{ backgroundColor: c.hex }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM PRICE & CART ACTIONS */}
        <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
          
          {/* PRICE DISPLAY */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl text-black">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-mono text-xs text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={() => addToCart(product, 1)}
            className="neo-btn bg-neo-yellow hover:bg-black hover:text-neo-yellow px-3 py-2 text-xs font-black shadow-brutal-sm flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>

        </div>

      </div>
    </div>
  );
};
