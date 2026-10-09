import express from 'express';
import { StoreService } from '../services/storeService.js';
import { initialCoupons } from '../data/products.js';

const router = express.Router();

// POST validate coupon
router.post('/validate', async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    const result = await StoreService.validateCoupon(code, cartTotal);
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET active coupons hint for showcase
router.get('/active', (req, res) => {
  res.json({
    success: true,
    data: initialCoupons.map(c => ({
      code: c.code,
      discount: c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`,
      description: c.description,
      minOrder: c.minOrderValue
    }))
  });
});

export default router;
