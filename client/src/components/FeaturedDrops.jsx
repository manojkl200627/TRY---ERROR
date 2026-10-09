import React from 'react';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const FeaturedDrops = ({ products, onSelectProduct, onExploreAll }) => {
  const featured = products.filter((p) => p.isFeatured || p.isNewDrop).slice(0, 4);

  return (
    <section id="featured-section" className="py-16 bg-[#FFFDF9] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="neo-badge bg-neo-lime text-black font-black text-xs">
                <Flame className="w-3.5 h-3.5 fill-black" />
                VAULT SELECTS
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                HIGHLY SOUGHT RELEASES
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
              LIMITED VAULT DROPS
            </h2>
          </div>

          <button
            onClick={onExploreAll}
            className="self-start md:self-auto neo-btn bg-white hover:bg-neo-yellow text-xs px-4 py-2.5 font-bold flex items-center gap-2"
          >
            <span>VIEW ALL 12 PIECES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((prod) => (
            <ProductCard
              key={prod._id || prod.slug}
              product={prod}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
