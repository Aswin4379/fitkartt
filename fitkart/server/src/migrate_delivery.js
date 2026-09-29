import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitkart';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Schema definition matching current DB but using generic access
const ProductSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', ProductSchema);

const upgradeProducts = async () => {
  try {
    const products = await Product.find({});
    console.log(`Found ${products.length} products to upgrade.`);

    for (let product of products) {
      let deliveryType = 'FITNESS_PRODUCTS';
      let deliveryMin = 1;
      let deliveryMax = 3;
      let deliveryUnit = 'days';

      const cat = (product.get('category') || '').toLowerCase();
      const name = (product.get('name') || '').toLowerCase();

      // Classify
      if (
        cat.includes('food') || 
        cat.includes('fruit') || 
        cat.includes('meal') || 
        cat.includes('snack') ||
        name.includes('chicken') ||
        name.includes('egg') ||
        name.includes('diet') ||
        name.includes('juice') ||
        name.includes('salad') ||
        name.includes('peanut butter') ||
        name.includes('dates')
      ) {
        deliveryType = 'FOOD_FAST';
        deliveryMin = 15;
        deliveryMax = 25;
        deliveryUnit = 'mins';
      } else if (
        cat.includes('equipment') ||
        cat.includes('gym') ||
        cat.includes('accessory') ||
        name.includes('dumbbell') ||
        name.includes('mat') ||
        name.includes('band') ||
        name.includes('glove') ||
        name.includes('treadmill') ||
        name.includes('cycle')
      ) {
        deliveryType = 'FITNESS_EQUIPMENT';
        deliveryMin = 2;
        deliveryMax = 7;
        deliveryUnit = 'days';
      } else {
        // Supplements, Whey, Pre-workout etc.
        deliveryType = 'FITNESS_PRODUCTS';
        deliveryMin = 1;
        deliveryMax = 3;
        deliveryUnit = 'days';
      }

      // Update Delivery Info
      product.set('deliveryInfo', {
        type: deliveryType,
        min: deliveryMin,
        max: deliveryMax,
        unit: deliveryUnit
      });

      // Fix Variants (MRP & Pricing)
      const variants = product.get('variants') || [];
      const updatedVariants = variants.map(v => {
        let price = v.price || 0;
        let mrp = v.mrp || 0;
        
        if (!mrp || mrp < price) {
          // Fix MRP if it's broken
          mrp = price * 1.2; // 20% markup if missing
        }
        
        return {
          ...v,
          price: price,
          mrp: mrp
        };
      });
      product.set('variants', updatedVariants);

      // Extract min price/mrp to root for easier sorting if desired (optional)
      if (updatedVariants.length > 0) {
        const lowestPriceVariant = updatedVariants.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        product.set('price', lowestPriceVariant.price);
        product.set('mrp', lowestPriceVariant.mrp);
      }

      await product.save();
    }
    console.log('Successfully upgraded all products!');
    process.exit(0);
  } catch (err) {
    console.error('Error upgrading products:', err);
    process.exit(1);
  }
};

upgradeProducts();
