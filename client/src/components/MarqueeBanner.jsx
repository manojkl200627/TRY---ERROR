import React from 'react';

export const MarqueeBanner = () => {
  const messages = [
    "🔥 NEW DROP LIVE",
    "⚡ USE CODE 'BRUTAL20' FOR 20% OFF",
    "✦ FREE WORLDWIDE SHIPPING OVER $75",
    "✖ ZERO BORING APPAREL",
    "✹ 100% ETHICALLY CHAOTIC",
    "★ LIMITED RELEASES ONLY",
    "🔥 ACID WASH & RAW TITANIUM",
    "⚡ RADICAL NEO-BRUTALISM STREETWEAR"
  ];

  return (
    <div className="w-full overflow-hidden border-b-2 md:border-b-3 border-black bg-neo-yellow text-black select-none">
      <div className="flex whitespace-nowrap animate-marquee py-2.5 font-display font-black text-xs md:text-sm tracking-wider uppercase">
        {[...messages, ...messages].map((item, idx) => (
          <span key={idx} className="mx-6 flex items-center gap-3">
            <span>{item}</span>
            <span className="inline-block w-2 h-2 bg-black"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const SecondaryMarquee = () => {
  const quotes = [
    "ANTI-CORPORATE",
    "RAW TEXTURE",
    "MONOLITHIC FIT",
    "NO SOFT EDGES",
    "HIGH VOLTAGE",
    "DECONSTRUCTED",
    "OVERSIZED SILHOUETTE"
  ];

  return (
    <div className="w-full overflow-hidden border-y-2 md:border-y-3 border-black bg-black text-white select-none">
      <div className="flex whitespace-nowrap animate-marquee-reverse py-2 font-mono font-bold text-xs tracking-widest uppercase">
        {[...quotes, ...quotes, ...quotes].map((item, idx) => (
          <span key={idx} className="mx-8 flex items-center gap-4 text-neo-lime">
            <span>✦ {item}</span>
            <span className="text-white">///</span>
          </span>
        ))}
      </div>
    </div>
  );
};
