import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from './services/api';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';

import { Navbar } from './components/Navbar';
import { MarqueeBanner, SecondaryMarquee } from './components/MarqueeBanner';
import { Hero } from './components/Hero';
import { FeaturedDrops } from './components/FeaturedDrops';
import { ProductFilters } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { Manifesto } from './components/Manifesto';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { Sparkles, PackageSearch, RefreshCw, AlertTriangle } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  // Fetch initial categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catData = await api.getCategories();
        setCategories(catData);
      } catch (err) {
        console.warn('Categories fetch fallback:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch products with active filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: sortOption,
        inStock: inStockOnly
      });
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, sortOption, inStockOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (searchQuery) count++;
    if (sortOption !== 'featured') count++;
    if (inStockOnly) count++;
    return count;
  }, [selectedCategory, searchQuery, sortOption, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setInStockOnly(false);
  };

  const handleProductUpdated = (updatedProd) => {
    setSelectedProduct(updatedProd);
    setProducts((prev) =>
      prev.map((p) => ((p._id || p.slug) === (updatedProd._id || updatedProd.slug) ? updatedProd : p))
    );
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'catalog') {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'featured') {
      document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      document.getElementById('manifesto-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (order) => {
    setSuccessOrder(order);
  };

  const handleOpenTrackerForOrder = (orderId) => {
    setTrackingOrderId(orderId);
    setIsOrderTrackerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#121212] selection:bg-neo-yellow selection:text-black">
      
      {/* 1. TOP MARQUEE BANNER */}
      <MarqueeBanner />

      {/* 2. STICKY NAVBAR */}
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 3. HERO SHOWCASE SECTION */}
        <Hero
          onExploreClick={() => scrollToSection('catalog')}
          onSelectProduct={setSelectedProduct}
          featuredHeroProduct={products[0]}
        />

        {/* 4. REVERSE MARQUEE DIVIDER */}
        <SecondaryMarquee />

        {/* 5. FEATURED / LIMITED VAULT DROPS */}
        {products.length > 0 && (
          <FeaturedDrops
            products={products}
            onSelectProduct={setSelectedProduct}
            onExploreAll={() => scrollToSection('catalog')}
          />
        )}

        {/* 6. MAIN PRODUCT CATALOG & FILTER SECTION */}
        <section id="catalog-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span className="neo-badge bg-neo-yellow text-black font-black text-xs">
                FULL VAULT INVENTORY
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                100% DISPATCH READY
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">
              ALL CURRENT RELEASES
            </h2>
          </div>

          {/* FILTERS & CONTROLS */}
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            activeFilterCount={activeFilterCount}
            onResetFilters={handleResetFilters}
            totalResults={products.length}
          />

          {/* PRODUCTS GRID / STATES */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="neo-card bg-white p-4 h-96 flex flex-col justify-between animate-pulse"
                >
                  <div className="w-full h-56 bg-neutral-200 border-2 border-black"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-3/4 h-5 bg-neutral-200"></div>
                    <div className="w-1/2 h-4 bg-neutral-200"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="w-16 h-6 bg-neutral-200"></div>
                    <div className="w-20 h-8 bg-neutral-200 border border-black"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="neo-card bg-neo-pink text-white p-8 border-3 border-black text-center flex flex-col items-center gap-4">
              <AlertTriangle className="w-10 h-10" />
              <h3 className="font-display font-black text-2xl uppercase">FAILED TO LOAD CATALOG</h3>
              <p className="font-mono text-xs max-w-md">{error}</p>
              <button
                onClick={fetchProducts}
                className="neo-btn bg-white text-black text-xs px-5 py-2.5 font-bold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETRY SYNDICATE API</span>
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="neo-card bg-white p-12 border-3 border-black text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-neo-yellow border-2 border-black flex items-center justify-center shadow-brutal">
                <PackageSearch className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-display font-black text-2xl uppercase">NO MATCHING DROPS FOUND</h3>
              <p className="font-mono text-xs text-neutral-600 max-w-sm">
                No items match your active search and filter criteria. Reset filters to see full inventory.
              </p>
              <button
                onClick={handleResetFilters}
                className="neo-btn bg-black text-white text-xs px-6 py-3 font-bold"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>
          )}

        </section>

        {/* 7. MANIFESTO SECTION */}
        <Manifesto />

      </main>

      {/* 8. FOOTER */}
      <Footer onNavigateSection={scrollToSection} />

      {/* MODALS & DRAWERS */}
      <CartDrawer />
      <WishlistDrawer onSelectProduct={setSelectedProduct} />
      
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}

      <CheckoutModal onOrderSuccess={handleOrderSuccess} />

      {successOrder && (
        <OrderSuccessModal
          order={successOrder}
          onClose={() => setSuccessOrder(null)}
          onTrackOrder={handleOpenTrackerForOrder}
        />
      )}

      {isOrderTrackerOpen && (
        <OrderTrackerModal
          initialOrderId={trackingOrderId}
          onClose={() => {
            setIsOrderTrackerOpen(false);
            setTrackingOrderId('');
          }}
        />
      )}

      {/* GLOBAL TOAST NOTIFICATIONS */}
      <ToastContainer />

    </div>
  );
}
