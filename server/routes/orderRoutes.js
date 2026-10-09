import express from 'express';
import { StoreService } from '../services/storeService.js';

const router = express.Router();

// POST create order
router.post('/', async (req, res) => {
  try {
    const { items, shippingDetails, paymentDetails, subtotal, shippingFee, discountAmount, couponCode, tax, total } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items are required' });
    }

    if (!shippingDetails || !shippingDetails.fullName || !shippingDetails.email || !shippingDetails.street) {
      return res.status(400).json({ success: false, message: 'Shipping details are incomplete' });
    }

    const order = await StoreService.createOrder({
      items,
      shippingDetails,
      paymentDetails,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode,
      tax,
      total
    });

    res.status(201).json({
      success: true,
      message: 'Order created and processed!',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await StoreService.getOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await StoreService.getAllOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
