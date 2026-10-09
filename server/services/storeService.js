import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Coupon from '../models/Coupon.js';
import { initialProducts, initialCoupons } from '../data/products.js';
import { isMongoConnected } from '../config/db.js';
import crypto from 'crypto';

// In-Memory store fallback
let memoryProducts = initialProducts.map((p, index) => ({
  _id: `prod_${(index + 1).toString().padStart(4, '0')}`,
  ...p,
  discountPercentage: p.originalPrice && p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
  createdAt: new Date().toISOString()
}));

let memoryCoupons = [...initialCoupons];
let memoryOrders = [];

export const StoreService = {
  // PRODUCTS
  async getProducts({ search, category, sort, minPrice, maxPrice, inStock, tag }) {
    if (isMongoConnected) {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      if (category && category !== 'All') {
        query.category = category;
      }
      if (tag) {
        query.tags = { $in: [tag] };
      }
      if (inStock === 'true' || inStock === true) {
        query.stock = { $gt: 0 };
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price-low') sortOption = { price: 1 };
      if (sort === 'price-high') sortOption = { price: -1 };
      if (sort === 'rating') sortOption = { rating: -1 };
      if (sort === 'popular') sortOption = { numReviews: -1 };

      return await Product.find(query).sort(sortOption);
    }

    // In-memory fallback
    let results = [...memoryProducts];

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(s)))
      );
    }

    if (category && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      results = results.filter(p => p.tags && p.tags.includes(tag));
    }

    if (inStock === 'true' || inStock === true) {
      results = results.filter(p => p.stock > 0);
    }

    if (minPrice) {
      results = results.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      results = results.filter(p => p.price <= Number(maxPrice));
    }

    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popular') {
      results.sort((a, b) => b.numReviews - a.numReviews);
    } else {
      results.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
    }

    return results;
  },

  async getProductByIdOrSlug(idOrSlug) {
    if (isMongoConnected) {
      if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        const byId = await Product.findById(idOrSlug);
        if (byId) return byId;
      }
      return await Product.findOne({ slug: idOrSlug });
    }

    return memoryProducts.find(p => p._id === idOrSlug || p.slug === idOrSlug) || null;
  },

  async getFeaturedProducts() {
    if (isMongoConnected) {
      return await Product.find({ isFeatured: true }).limit(8);
    }
    return memoryProducts.filter(p => p.isFeatured).slice(0, 8);
  },

  async getCategories() {
    if (isMongoConnected) {
      const categories = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      return categories.map(c => ({ name: c._id, count: c.count }));
    }

    const counts = {};
    memoryProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  },

  async addReview(productId, { user, rating, comment }) {
    if (isMongoConnected) {
      const product = await Product.findById(productId);
      if (!product) throw new Error('Product not found');

      const review = {
        user: user || 'Anonymous Rebel',
        rating: Number(rating),
        comment,
        createdAt: new Date()
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        Number((product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1));

      await product.save();
      return product;
    }

    const product = memoryProducts.find(p => p._id === productId || p.slug === productId);
    if (!product) throw new Error('Product not found');

    const review = {
      user: user || 'Anonymous Rebel',
      rating: Number(rating),
      comment,
      verifiedPurchase: true,
      createdAt: new Date()
    };

    if (!product.reviews) product.reviews = [];
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      Number((product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1));

    return product;
  },

  // COUPONS
  async validateCoupon(code, cartTotal = 0) {
    const cleanCode = (code || '').trim().toUpperCase();

    let coupon = null;
    if (isMongoConnected) {
      coupon = await Coupon.findOne({ code: cleanCode, isActive: true });
    } else {
      coupon = memoryCoupons.find(c => c.code === cleanCode && c.isActive);
    }

    if (!coupon) {
      return { valid: false, message: 'Invalid or expired coupon code!' };
    }

    if (cartTotal < coupon.minOrderValue) {
      return {
        valid: false,
        message: `Order minimum of $${coupon.minOrderValue} required for this coupon!`
      };
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = Math.round((cartTotal * coupon.discountValue) / 100);
    } else {
      discount = Math.min(coupon.discountValue, cartTotal);
    }

    return {
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discount,
      message: `Coupon "${coupon.code}" applied! You save $${discount}.`
    };
  },

  // ORDERS
  async createOrder(orderPayload) {
    const trackingNumber = 'BRUTAL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderId = 'ORD-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 900 + 100);

    // Stock deduction
    for (const item of orderPayload.items) {
      const prodId = item.productId || item.product || item._id;
      if (isMongoConnected) {
        if (prodId.match(/^[0-9a-fA-F]{24}$/)) {
          await Product.findByIdAndUpdate(prodId, { $inc: { stock: -item.quantity } });
        }
      } else {
        const p = memoryProducts.find(p => p._id === prodId || p.slug === prodId);
        if (p && p.stock >= item.quantity) {
          p.stock -= item.quantity;
        }
      }
    }

    const orderData = {
      orderId,
      items: orderPayload.items,
      shippingDetails: orderPayload.shippingDetails,
      paymentDetails: orderPayload.paymentDetails || {
        method: 'CARD',
        last4: '8888',
        status: 'PAID'
      },
      subtotal: orderPayload.subtotal,
      shippingFee: orderPayload.shippingFee || 0,
      discountAmount: orderPayload.discountAmount || 0,
      couponCode: orderPayload.couponCode || null,
      tax: orderPayload.tax || 0,
      total: orderPayload.total,
      orderStatus: 'CONFIRMED',
      trackingNumber,
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const order = new Order(orderData);
      return await order.save();
    }

    memoryOrders.unshift(orderData);
    return orderData;
  },

  async getOrderById(orderId) {
    if (isMongoConnected) {
      return await Order.findOne({ orderId });
    }
    return memoryOrders.find(o => o.orderId === orderId) || null;
  },

  async getAllOrders() {
    if (isMongoConnected) {
      return await Order.find().sort({ createdAt: -1 });
    }
    return memoryOrders;
  }
};
