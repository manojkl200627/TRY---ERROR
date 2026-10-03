import React from 'react';
import { ArrowDown, Flame, ShieldAlert, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Hero = ({ onExploreClick, onSelectProduct, featuredHeroProduct }) => {
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyCoupon = () => {
    navigator.clipboard?.writeText('BRUTAL20');
    setCopied(true);
    addToast('Coupon "BRUTAL20" copied to clipboard! (20% OFF)', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden neo-grid-bg border-b-2 md:border-b-[3px] border-black py-12 lg:py-20">
      
      {/* BACKGROUND FLOATING ACCENTS */}
      <div className="absolute top-6 right-10 -rotate-12 pointer-events-none hidden lg:block opacity-70">
        <div className="w-16 h-16 border-2 border-black bg-neo-pink shadow-brutal"></div>
      </div>
      <div className="absolute bottom-10 left-8 rotate-45 pointer-events-none hidden lg:block opacity-60">
        <div className="w-12 h-12 border-2 border-black bg-neo-cyan shadow-brutal"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: HERO HEADLINE & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* BADGES ROW */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="neo-badge bg-neo-pink text-white -rotate-2">
                <Flame className="w-3.5 h-3.5" />
                DROP_04 // OCT 2026
              </span>
              <span className="neo-badge bg-neo-yellow text-black rotate-1">
                ⚡ RAW CONCRETE AESTHETICS
              </span>
              <span className="neo-badge bg-white text-black hidden sm:inline-flex">
                NO SOFT EDGES
              </span>
            </div>

            {/* TITLE */}
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tight uppercase">
              ANTI-BORING <br />
              <span className="bg-neo-yellow px-2 border-2 md:border-3 border-black shadow-brutal inline-block -rotate-1 mt-1">
                APPAREL & GEAR
              </span>
              <br />
              FOR REBELS.
            </h1>

            {/* SUBTITLE */}
            <p className="font-mono text-sm sm:text-base text-neutral-800 max-w-xl leading-relaxed">
              Engineered with extreme silhouettes, heavyweight loopback cotton, 
              raw industrial hardware, and high-voltage graphics. Built for architects, 
              cyberpunks, and design daredevils.
            </p>

            {/* INTERACTIVE COUPON STICKER */}
            <div 
              onClick={copyCoupon}
              className="group self-start cursor-pointer border-2 md:border-3 border-dashed border-black bg-neo-lime hover:bg-[#a6ed00] p-3 shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg flex items-center gap-3 select-none"
            >
              <div className="p-1.5 bg-black text-white">
                {copied ? <Check className="w-4 h-4 text-neo-lime" /> : <Copy className="w-4 h-4" />}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold tracking-wider text-black">
                  PROMO CODE FLASH DROP (CLICK TO COPY)
                </span>
                <span className="font-display font-black text-sm tracking-tight text-black">
                  CODE: <span className="bg-black text-neo-yellow px-1.5 py-0.5 ml-1">BRUTAL20</span> (20% OFF)
                </span>
              </div>
            </div>

            {/* CTA ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="neo-btn bg-neo-yellow px-6 py-4 text-sm sm:text-base font-black flex items-center gap-3"
              >
                <span>EXPLORE CATALOG</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('manifesto-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="neo-btn bg-white px-5 py-4 text-sm sm:text-base font-bold hover:bg-neutral-100"
              >
                OUR MANIFESTO
              </button>
            </div>

            {/* TRUST SPECS */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t-2 border-black max-w-lg font-mono text-xs">
              <div className="border border-black bg-white p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-base font-display">520 GSM</span>
                <span className="text-[10px] text-neutral-600">HEAVYWEAR</span>
              </div>
              <div className="border border-black bg-white p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-base font-display">100%</span>
                <span className="text-[10px] text-neutral-600">FAILSAFE ORIGIN</span>
              </div>
              <div className="border border-black bg-white p-2 text-center shadow-brutal-sm">
                <span className="block font-black text-base font-display">FREE</span>
                <span className="text-[10px] text-neutral-600">POST OVER $75</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HERO PRODUCT FEATURE CARD */}
          <div className="lg:col-span-5 relative">
            
            {/* FLOATING CORNER STICKER */}
            <div className="absolute -top-5 -right-4 z-20 rotate-12">
              <div className="bg-neo-pink text-white font-mono font-black text-xs px-3 py-1.5 border-2 border-black shadow-brutal animate-wiggle">
                ★ 100% AUTHENTIC
              </div>
            </div>

            {/* HERO HERO CARD */}
            <div className="neo-card bg-white p-4 sm:p-5 relative">
              
              {/* CARD TOP BAR */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                </div>
                <div className="barcode-strip"></div>
                <span className="font-mono text-[10px] font-bold bg-black text-white px-1.5 py-0.5">
                  FEATURED_ITEM
                </span>
              </div>

              {/* IMAGE WRAPPER */}
              <div className="relative border-2 border-black bg-neutral-100 overflow-hidden group">
                <img
                  src={
                    featuredHeroProduct?.images?.[0] ||
                    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt="Featured Hero Drop"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* FLOATING TAG ON IMAGE */}
                <div className="absolute bottom-3 left-3 bg-black text-neo-yellow border-2 border-black px-2.5 py-1 font-mono text-xs font-bold shadow-brutal-sm">
                  ⚡ INSTANT DISPATCH
                </div>

                <div className="absolute top-3 left-3 bg-neo-yellow text-black border-2 border-black px-2.5 py-1 font-display font-black text-xs shadow-brutal-sm rotate-2">
                  LIMITED 50 UNITS
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
                      {featuredHeroProduct?.category || 'STREETWEAR'}
                    </span>
                    <h3 className="font-display font-black text-xl leading-tight">
                      {featuredHeroProduct?.name || 'Acid Matrix Heavyweight Hoodie'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-black text-2xl bg-neo-yellow border-2 border-black px-2 py-0.5 shadow-brutal-sm inline-block">
                      ${featuredHeroProduct?.price || 88}
                    </span>
                  </div>
                </div>

                <p className="font-mono text-xs text-neutral-600 line-clamp-2">
                  {featuredHeroProduct?.tagline || '520 GSM ultra-dense loopback cotton with screenprinted hazard graphics.'}
                </p>

                {/* ACTION BUTTON */}
                <button
                  onClick={() => featuredHeroProduct && onSelectProduct(featuredHeroProduct)}
                  className="mt-2 w-full neo-btn bg-black text-white py-3 hover:bg-neutral-800 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-neo-yellow" />
                  <span>VIEW DETAILS & BUY NOW</span>
                </button>
              </div>

            </div>

            {/* FLOATING BOTTOM BANNER */}
            <div className="mt-3 bg-neo-cyan border-2 border-black p-2 font-mono text-xs font-bold shadow-brutal flex items-center justify-between">
              <span>★ 4.9/5 REVIEWS BY DAREDEVILS</span>
              <span className="underline cursor-pointer" onClick={onExploreClick}>BROWSE ALL 12 →</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
