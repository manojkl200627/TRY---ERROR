/**
 * ⚡ BACKEND API SERVICE
 * 
 * HOW THE CLIENT CONNECTS TO THE BACKEND:
 * 1. The client looks for `VITE_API_URL` defined in `client/.env`.
 * 2. In Vite, environment variables exposed to the browser MUST start with `VITE_`.
 * 3. We access it using `import.meta.env.VITE_API_URL`.
 * 4. If `VITE_API_URL` is set to 'http://localhost:5000/api', requests go directly to Express on port 5000.
 * 5. If undefined, it falls back to '/api' which Vite proxies to port 5000.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

if (import.meta.env.DEV) {
  console.log(`[BRUTAL.CO] Backend API target configured as: ${API_BASE}`);
}

export const api = {
  // Fetch all products with optional filters (category, search, sorting, stock)
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.inStock) params.append('inStock', 'true');
    if (filters.tag) params.append('tag', filters.tag);

    const queryString = params.toString();
    const endpoint = queryString ? `${API_BASE}/products?${queryString}` : `${API_BASE}/products`;

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
    const data = await res.json();
    return data.data || [];
  },

  // Fetch featured / spotlight products
  async getFeaturedProducts() {
    const res = await fetch(`${API_BASE}/products/featured`);
    if (!res.ok) throw new Error('Failed to fetch featured products');
    const data = await res.json();
    return data.data || [];
  },

  // Fetch single product by ID or slug
  async getProductByIdOrSlug(idOrSlug) {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    return data.data;
  },

  // Fetch distinct categories with count badges
  async getCategories() {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data || [];
  },

  // Validate promo / discount coupon
  async validateCoupon(code, cartTotal) {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartTotal })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid coupon');
    return data.data;
  },

  // Place order & initiate dispatch
  async createOrder(orderPayload) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to place order');
    return data.data;
  },

  // Look up order tracking radar
  async getOrderById(orderId) {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);
    if (!res.ok) throw new Error('Order not found');
    const data = await res.json();
    return data.data;
  },

  // Submit verified customer review
  async addReview(productId, reviewData) {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add review');
    return data.data;
  }
};
