import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitkart';

import Product from './models/Product.js';

async function dumpWeightGain() {
  await mongoose.connect(MONGO_URI);
  const allProducts = await Product.find({}).lean();
  console.log('Total products in MongoDB:', allProducts.length);

  const wgProducts = allProducts.filter(p => 
    p.category === 'Weight Gain' || 
    p.category === 'weight-gain' || 
    (p.id && p.id.startsWith('wg-'))
  );

  console.log(`Found ${wgProducts.length} Weight Gain products:`);
  wgProducts.sort((a, b) => {
    const numA = parseInt((a.id || '').replace(/\D/g, '')) || 0;
    const numB = parseInt((b.id || '').replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  for (const p of wgProducts) {
    console.log(`ID: ${p.id} | Name: ${p.name} | Brand: ${p.brand} | Price: ₹${p.price} | MRP: ₹${p.originalPrice || p.mrp} | Category: ${p.category} | Image: ${p.image}`);
  }

  await mongoose.disconnect();
}

dumpWeightGain().catch(console.error);
