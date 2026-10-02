import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitkart';

import Product from './models/Product.js';

async function listAll52WeightGain() {
  await mongoose.connect(MONGO_URI);
  const allProducts = await Product.find({}).lean();

  const wgProducts = allProducts.filter(p => 
    p.category === 'Weight Gain' || 
    p.category === 'weight-gain' || 
    (p.id && (p.id.startsWith('wg-') || (p.id.startsWith('we-gen-') && parseInt(p.id.replace('we-gen-', '')) >= 138 && parseInt(p.id.replace('we-gen-', '')) <= 175)))
  );

  console.log(`Found ${wgProducts.length} Weight Gain products.`);
  
  // Sort by ID
  wgProducts.sort((a, b) => {
    return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
  });

  console.log(JSON.stringify(wgProducts.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    originalPrice: p.originalPrice || p.mrp,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    category: p.category,
    image: p.image
  })), null, 2));

  await mongoose.disconnect();
}

listAll52WeightGain().catch(console.error);
