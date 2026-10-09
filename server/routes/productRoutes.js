import express from 'express';
import { StoreService } from '../services/storeService.js';

const router = express.Router();

// GET all products with filtering & sorting
router.get('/', async (req, res) => {
  try {
    const { search, category, sort, minPrice, maxPrice, inStock, tag } = req.query;
    const products = await StoreService.getProducts({
      search,
      category,
      sort,
      minPrice,
      maxPrice,
      inStock,
      tag
    });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await StoreService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await StoreService.getFeaturedProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single product by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const product = await StoreService.getProductByIdOrSlug(req.params.idOrSlug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST a review
router.post('/:idOrSlug/reviews', async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required' });
    }

    const updatedProduct = await StoreService.addReview(req.params.idOrSlug, {
      user,
      rating: Number(rating),
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review posted successfully!',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
