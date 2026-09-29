import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitkart';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB for Smart Discount AI Simulation');
    
    const ProductSchema = new mongoose.Schema({}, { strict: false });
    const Product = mongoose.model('Product', ProductSchema);
    
    const products = await Product.find({});
    let updatedCount = 0;
    
    for (let p of products) {
      const cat = (p.get('category') || '').toLowerCase();
      const name = (p.get('name') || '').toLowerCase();
      
      const variants = p.get('variants') || [];
      const updatedVariants = variants.map((v, index) => {
        const price = Number(v.price) || 0;
        let mrp = Number(v.mrp) || price;
        
        // Smart realistic commercial discount logic
        let discountTier = 0; // percentage
        
        const isFood = cat.includes('food') || cat.includes('fruit') || cat.includes('meal') || cat.includes('snack') || name.includes('diet') || name.includes('salad');
        const isEquipment = cat.includes('equipment') || cat.includes('accessories') || name.includes('dumbbell') || name.includes('mat') || name.includes('band');
        const isApparel = cat.includes('apparel') || cat.includes('clothing') || name.includes('t-shirt') || name.includes('shorts');
        
        // Use a consistent pseudo-random seed based on product name and variant index
        const seed = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) + index;
        
        if (isFood) {
          // Food has very low margins (5% to 15%)
          const tiers = [0, 5, 10, 12, 15];
          discountTier = tiers[seed % tiers.length];
        } else if (isApparel) {
          // Apparel has huge markups (40% to 70%)
          const tiers = [40, 50, 55, 60, 70];
          discountTier = tiers[seed % tiers.length];
        } else if (isEquipment) {
          // Equipment has high markups (30% to 55%)
          const tiers = [25, 30, 35, 40, 45, 50, 55];
          discountTier = tiers[seed % tiers.length];
        } else {
          // Supplements have mid-to-high markups (15% to 40%)
          const tiers = [15, 20, 25, 30, 33, 40];
          discountTier = tiers[seed % tiers.length];
        }
        
        // Some premium brands rarely discount
        if (name.includes('optimum nutrition') || name.includes('myprotein')) {
          const premiumTiers = [0, 5, 10];
          discountTier = premiumTiers[seed % premiumTiers.length];
        }

        // Apply discount math (MRP = Price / (1 - Discount))
        if (discountTier === 0) {
          mrp = price;
        } else {
          mrp = Math.round(price / (1 - (discountTier / 100)));
          
          // Make MRP look like a realistic Indian price ending in 99 or 0 (e.g. 1499 instead of 1473)
          if (mrp > 100) {
             const remainder = mrp % 100;
             if (remainder > 50) {
                 mrp = Math.ceil(mrp / 100) * 100 - 1; // Ends in 99
             } else {
                 mrp = Math.floor(mrp / 10) * 10; // Ends in 0
             }
          }
        }
        
        // Edge case safety
        if (mrp < price) mrp = price;

        return { ...v, price, mrp };
      });
      
      p.set('variants', updatedVariants);
      
      // Update root price/mrp based on lowest price variant
      if (updatedVariants.length > 0) {
        const lowest = updatedVariants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
        p.set('price', lowest.price);
        p.set('mrp', lowest.mrp);
      }
      
      await p.save();
      updatedCount++;
    }
    
    console.log(`Smart discount logic applied to ${updatedCount} products!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
