import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initialProducts, initialCoupons } from '../data/products.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

export let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neobrutal_shop';

  try {
    console.log(`[MongoDB] Connecting to ${mongoURI}...`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500 // Quick timeout if no local mongo daemon
    });

    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);

    // Auto-seed if empty
    await seedMongoDatabase();
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Connection failed: ${error.message}`);
    console.log(`[NeoStore] Switching to In-Memory Zero-Setup Engine (100% features enabled, no Mongo daemon needed)`);
    isMongoConnected = false;
    return false;
  }
};

export const seedMongoDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[Seed] Seeding initial products to MongoDB...');
      await Product.insertMany(initialProducts);
      console.log(`[Seed] Seeded ${initialProducts.length} products!`);
    }

    const couponCount = await Coupon.countDocuments();
    if (couponCount === 0) {
      console.log('[Seed] Seeding coupons to MongoDB...');
      await Coupon.insertMany(initialCoupons);
      console.log(`[Seed] Seeded ${initialCoupons.length} coupons!`);
    }
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  }
};
