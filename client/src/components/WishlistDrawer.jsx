import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistDrawer = ({ onSelectProduct }) => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FDFBF7] h-full border-l-3 border-black shadow-brutal-2xl flex flex-col justify-between overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 bg-neo-pink text-white border-b-3 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <h2 className="font-display font-black text-lg tracking-tight uppercase">
              FAVORITES // VAULT
            </h2>
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-bold border border-black">
              {wishlistItems.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
              <div className="w-16 h-16 border-2 border-black bg-neo-pink/20 shadow-brutal flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-neo-pink" />
              </div>
              <h3 className="font-display font-black text-xl mb-1">NO SAVED DROPS</h3>
              <p className="font-mono text-xs text-neutral-600 mb-6 max-w-xs">
                Click the heart icon on any product to bookmark it here for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="neo-btn bg-black text-white text-xs px-5 py-2.5"
              >
                DISCOVER GEAR
              </button>
            </div>
          ) : (
            wishlistItems.map((prod) => (
              <div
                key={prod._id || prod.slug}
                className="border-2 border-black bg-white p-3 shadow-brutal-sm flex gap-3 relative"
              >
                <div
                  onClick={() => {
                    onSelectProduct(prod);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-24 border border-black bg-neutral-100 shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4
                        onClick={() => {
                          onSelectProduct(prod);
                          setIsWishlistOpen(false);
                        }}
                        className="font-display font-black text-sm leading-tight hover:text-neo-pink cursor-pointer line-clamp-1"
                      >
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className="text-neutral-400 hover:text-neo-pink p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-neutral-500 uppercase mt-0.5 block">
                      {prod.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                    <span className="font-display font-black text-base">${prod.price}</span>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="neo-btn-sm bg-neo-yellow text-xs font-black flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>MOVE TO CART</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {wishlistItems.length > 0 && (
          <div className="p-4 bg-white border-t-3 border-black">
            <button
              onClick={() => {
                wishlistItems.forEach((p) => addToCart(p, 1));
                setIsWishlistOpen(false);
              }}
              className="w-full neo-btn bg-black text-white hover:bg-neutral-800 py-3 text-xs font-black flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-neo-yellow" />
              <span>TRANSFER ALL TO CART</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
