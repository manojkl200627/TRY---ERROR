import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, X } from 'lucide-react';

export const ProductFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortOption,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  activeFilterCount,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="flex flex-col gap-5 mb-8">
      
      {/* CATEGORY CHIPS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('All')}
          className={`neo-badge px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-black text-white shadow-brutal -translate-y-0.5'
              : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          <span>ALL DROPS</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`neo-badge px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-neo-yellow text-black shadow-brutal -translate-y-0.5 border-black'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 border border-black ${isSelected ? 'bg-black text-white' : 'bg-neutral-200 text-black'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* FILTER & SORT TOOLBAR */}
      <div className="neo-card bg-[#F4F0EA] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* LEFT: RESULTS COUNT & STOCK FILTER */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs font-bold bg-white border-2 border-black px-3 py-1.5 shadow-brutal-sm">
            SHOWING <span className="font-black text-neo-pink">{totalResults}</span> REBEL ITEMS
          </div>

          <label className="flex items-center gap-2 font-mono text-xs font-bold cursor-pointer bg-white border-2 border-black px-3 py-1.5 shadow-brutal-sm hover:bg-neutral-50 select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="accent-black w-4 h-4 cursor-pointer"
            />
            <span>IN STOCK ONLY</span>
          </label>
        </div>

        {/* RIGHT: SORT DROPDOWN & RESET */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-neutral-600 hidden md:inline">
              SORT BY:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-white border-2 border-black px-3 py-1.5 font-mono text-xs font-bold shadow-brutal-sm focus:outline-none cursor-pointer pr-8"
              >
                <option value="featured">DROP: NEWEST FIRST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">RATING: HIGHEST</option>
                <option value="popular">MOST REVIEWS</option>
              </select>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="neo-btn-sm bg-neo-pink text-white flex items-center gap-1 font-mono font-bold"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
