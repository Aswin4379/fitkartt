import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitkart';

import Product from './models/Product.js';

async function dumpAll52() {
  await mongoose.connect(MONGO_URI);
  const all = await Product.find({}).lean();
  
  const wg = all.filter(p => 
    p.category === 'Weight Gain' || 
    p.category === 'weight-gain' || 
    (p.id && (p.id.startsWith('wg-') || (p.id.startsWith('we-gen-') && parseInt(p.id.replace('we-gen-', '')) >= 138 && parseInt(p.id.replace('we-gen-', '')) <= 175)))
  );

  console.log(`Found exactly ${wg.length} Weight Gain products.`);

  // Sort: wg-1..wg-14 then we-gen-138..we-gen-175
  wg.sort((a, b) => {
    const isWgA = a.id.startsWith('wg-');
    const isWgB = b.id.startsWith('wg-');
    if (isWgA && !isWgB) return -1;
    if (!isWgA && isWgB) return 1;
    const numA = parseInt(a.id.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.id.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  fs.writeFileSync(path.resolve(__dirname, 'wg_current_52.json'), JSON.stringify(wg, null, 2));
  console.log('Written to wg_current_52.json');

  for (let i = 0; i < wg.length; i++) {
    const p = wg[i];
    console.log(`[${i + 1}/52] ${p.id}: "${p.name}" (Brand: ${p.brand}, Price: ₹${p.price}, MRP: ₹${p.originalPrice || p.mrp})`);
  }

  await mongoose.disconnect();
}

dumpAll52().catch(console.error);
