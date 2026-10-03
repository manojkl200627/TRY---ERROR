import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, isMongoConnected } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middleware
// Configure CORS to allow communication from React frontend (defined in .env)
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  })
);

app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);

// Health check & status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    app: 'BRUTAL.CO Neo-Brutalist E-Commerce API',
    mongoConnected: isMongoConnected,
    mode: isMongoConnected ? 'Mongoose MongoDB Connected' : 'High-Performance In-Memory Engine',
    clientOrigin: CLIENT_URL,
    timestamp: new Date().toISOString()
  });
});

// Production: serve static frontend
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientDist, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`⚡ BRUTAL.CO NEO-BRUTALIST BACKEND IS LIVE`);
    console.log(`⚡ PORT: ${PORT}`);
    console.log(`⚡ ALLOWED CLIENT: ${CLIENT_URL}`);
    console.log(`⚡ API URL: http://localhost:${PORT}/api`);
    console.log(`⚡ HEALTH:  http://localhost:${PORT}/api/health`);
    console.log(`======================================================\n`);
  });
};

startServer();
