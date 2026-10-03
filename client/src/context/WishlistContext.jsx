import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('neobrutal_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('neobrutal_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => (item._id || item.slug) === (product._id || product.slug));
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => (item._id || item.slug) !== (product._id || product.slug)));
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist! ★`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId || item.slug === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
