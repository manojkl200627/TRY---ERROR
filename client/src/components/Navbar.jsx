import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Compass, Package, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = ({ onSearch, searchQuery, onOpenOrderTracker, onNavigateSection }) => {
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7] border-b-2 md:border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateSection('hero')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-11 h-11 bg-neo-yellow border-2 md:border-[3px] border-black shadow-brutal flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Zap className="w-6 h-6 fill-black text-black" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tighter leading-none flex items-center gap-1">
                  BRUTAL<span className="text-neo-pink">.CO</span>
                </span>
                <span className="font-mono text-[10px] tracking-widest text-neutral-600 font-bold uppercase">
                  HEAVY_GOODS // 2026
                </span>
              </div>
            </button>

            {/* STATUS STAMP */}
            <span className="hidden xl:inline-flex bg-neo-lime text-black border-2 border-black font-mono font-bold text-[10px] px-2 py-0.5 shadow-brutal-sm -rotate-2">
              ● ONLINE STORE
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 font-display font-bold text-sm tracking-wide uppercase">
            <button
              onClick={() => onNavigateSection('catalog')}
              className="hover:text-neo-pink hover:underline decoration-2 underline-offset-4 cursor-pointer"
            >
              CATALOG
            </button>
            <button
              onClick={() => onNavigateSection('featured')}
              className="hover:text-neo-pink hover:underline decoration-2 underline-offset-4 cursor-pointer"
            >
              DROPS
            </button>
            <button
              onClick={() => onNavigateSection('about')}
              className="hover:text-neo-pink hover:underline decoration-2 underline-offset-4 cursor-pointer"
            >
              MANIFESTO
            </button>
            <button
              onClick={onOpenOrderTracker}
              className="flex items-center gap-1.5 bg-neutral-100 hover:bg-neo-cyan px-2.5 py-1 border-2 border-black font-mono text-xs shadow-brutal-sm transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>TRACK ORDER</span>
            </button>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (Mobile/Desktop) */}
            <div className="relative">
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="SEARCH GEAR..."
                    className="w-44 xl:w-56 bg-white border-2 border-black px-3 py-1.5 pl-8 font-mono text-xs uppercase shadow-brutal-sm focus:w-64 focus:outline-none focus:shadow-brutal transition-all"
                  />
                  <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => onSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold hover:text-neo-pink"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-2.5 bg-white border-2 border-black shadow-brutal-sm hover:bg-neutral-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* WISHLIST BUTTON */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 bg-white border-2 border-black shadow-brutal-sm hover:bg-neutral-100 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlistItems.length ? 'fill-neo-pink text-neo-pink' : 'text-black'
                }`}
              />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-neo-pink text-white font-mono font-bold text-xs w-5 h-5 border-2 border-black rounded-full flex items-center justify-center animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* CART BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="neo-btn bg-neo-yellow px-3 sm:px-4 py-2 text-xs sm:text-sm font-black flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">CART</span>
              <span className="bg-black text-white px-2 py-0.5 border border-black font-mono text-xs">
                {totalCount}
              </span>
            </button>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-white border-2 border-black shadow-brutal-sm"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH EXPANDED */}
        {searchOpen && (
          <div className="lg:hidden py-3 border-t-2 border-black">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="SEARCH REBEL APPAREL & GEAR..."
                className="w-full bg-white border-2 border-black px-3 py-2 pl-9 font-mono text-xs shadow-brutal-sm focus:outline-none"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
        )}

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-black flex flex-col gap-3 font-display font-black text-sm uppercase bg-[#FAF8F2] -mx-4 px-6 pb-6">
            <button
              onClick={() => {
                onNavigateSection('catalog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-300"
            >
              CATALOG & PRODUCTS
            </button>
            <button
              onClick={() => {
                onNavigateSection('featured');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-300"
            >
              FEATURED DROPS
            </button>
            <button
              onClick={() => {
                onNavigateSection('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-300"
            >
              MANIFESTO
            </button>
            <button
              onClick={() => {
                onOpenOrderTracker();
                setMobileMenuOpen(false);
              }}
              className="neo-btn bg-neo-cyan text-left justify-start py-2.5 mt-2"
            >
              <Package className="w-4 h-4" />
              TRACK YOUR ORDER
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
