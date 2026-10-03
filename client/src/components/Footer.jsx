import React, { useState } from 'react';
import { Zap, Send, Github, Twitter, Instagram, ArrowUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = ({ onNavigateSection }) => {
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast('Subscribed! Check your inbox for 15% VIP drop pass.', 'success');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t-3 border-black select-none">
      
      {/* NEWSLETTER PRE-FOOTER */}
      <div className="bg-neo-yellow text-black border-b-3 border-black py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <span className="neo-badge bg-black text-white text-xs mb-2">
              EXCLUSIVE DROP ALERTS
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              JOIN THE UNDERGROUND SYNDICATE
            </h3>
            <p className="font-mono text-xs text-neutral-800 mt-1">
              Be the first to snag numbered drops before they hit the general catalog. No spam. Only voltage.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL..."
              required
              className="bg-white border-2 border-black px-4 py-2.5 font-mono text-xs uppercase shadow-brutal-sm focus:outline-none min-w-64"
            />
            <button
              type="submit"
              className="neo-btn bg-black text-white hover:bg-neutral-800 px-5 py-2.5 text-xs font-black shadow-brutal-sm flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-neo-yellow" />
              <span>DISPATCH</span>
            </button>
          </form>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* BRAND COL */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-neo-yellow border-2 border-white shadow-brutal-yellow flex items-center justify-center">
                <Zap className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                BRUTAL<span className="text-neo-pink">.CO</span>
              </span>
            </div>

            <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
              We design heavy, uncompromising apparel and tactile retro tech. 
              Zero pastel gradients. Zero rounded corporate minimalism. 
              Pure structural brutality.
            </p>

            <div className="barcode-strip invert opacity-80 mt-2"></div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 flex flex-col gap-3 font-mono text-xs">
            <span className="font-display font-black text-sm text-neo-lime uppercase tracking-wider">
              NAVIGATION
            </span>
            <button
              onClick={() => onNavigateSection('catalog')}
              className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              All Drops
            </button>
            <button
              onClick={() => onNavigateSection('featured')}
              className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Limited Vault
            </button>
            <button
              onClick={() => onNavigateSection('about')}
              className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Our Manifesto
            </button>
          </div>

          {/* CATEGORIES */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="font-display font-black text-sm text-neo-cyan uppercase tracking-wider">
              HARDWARE & APPAREL
            </span>
            <span className="text-neutral-400">Streetwear & Heavy Hoodies</span>
            <span className="text-neutral-400">Tactical Cargo & Pants</span>
            <span className="text-neutral-400">Mechanical Keyboards & Audio</span>
            <span className="text-neutral-400">Architectural Concrete & Prints</span>
          </div>

          {/* TECH STACK & ACTION */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-display font-black text-sm text-neo-yellow uppercase tracking-wider">
              FULL-STACK
            </span>
            <div className="flex flex-col gap-1.5 font-mono text-[11px] text-neutral-400">
              <span className="bg-neutral-900 border border-neutral-700 px-2 py-1">⚡ React 18</span>
              <span className="bg-neutral-900 border border-neutral-700 px-2 py-1">⚡ Node & Express</span>
              <span className="bg-neutral-900 border border-neutral-700 px-2 py-1">⚡ Mongoose ODM</span>
              <span className="bg-neutral-900 border border-neutral-700 px-2 py-1">⚡ Neo-Brutalism</span>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-2 neo-btn-sm bg-white text-black font-mono font-bold flex items-center justify-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>BACK TO TOP</span>
            </button>
          </div>

        </div>

        {/* BOTTOM SUB-FOOTER */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            © 2026 BRUTAL.CO • BUILT WITH REACT, MONGOOSE, EXPRESS & NODE.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white cursor-pointer">TERMS OF CHAOS</span>
            <span className="hover:text-white cursor-pointer">RETURNS & DISPATCH</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
