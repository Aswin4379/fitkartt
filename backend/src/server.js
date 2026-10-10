import express from 'express';
// Trigger nodemon restart 2
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { verifyTransporter } from './utils/email.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import bodyCareRoutes from './routes/bodyCareRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FitKart API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.post('/api/log', (req, res) => { console.log('BROWSER CRASH:', req.body); res.json({}); });
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/bodycare', bodyCareRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

import { seedDatabase } from './seed/seedData.js';

app.listen(PORT, HOST, async () => {
  console.log(`[FitKart Server Running]: http://localhost:${PORT} and network accessible on 0.0.0.0:${PORT}`);
  
  // Auto-seed database on server start
  await seedDatabase().catch(err => console.error("Auto-seed failed:", err));
  
  await verifyTransporter();
});
