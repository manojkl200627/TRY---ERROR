import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import { products } from '../data/products';
import { Search, Camera } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageSearch = () => {
    setIsSearchingImage(true);
    setTimeout(() => {
      setSearchTerm('Premium');
      setIsSearchingImage(false);
    }, 1500);
  };

  return (
    <main className="home-container animate-fade-in">
      <HeroBanner />
      
      <div className="search-section">
        <div className="search-container glass">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search our massive catalog of premium gear..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-icon image-search-btn" onClick={handleImageSearch} title="Search by Image">
            <Camera size={20} className={isSearchingImage ? 'animate-pulse' : ''} />
          </button>
        </div>
      </div>

      {!searchTerm && <CategorySection />}
      
      <div className="products-header">
        <h2>{searchTerm ? 'Search Results' : 'All Products'}</h2>
      </div>

      <section className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h2>No products found for "{searchTerm}"</h2>
            <p>Try adjusting your search or use the camera icon to search by image.</p>
          </div>
        )}
      </section>
    </main>
  );
}
