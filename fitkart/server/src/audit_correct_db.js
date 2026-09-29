import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitkart';

const auditReport = [];
const correctedProducts = [];
let issueCount = 0;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB for Audit & Correction');
    
    const ProductSchema = new mongoose.Schema({}, { strict: false });
    const Product = mongoose.model('Product', ProductSchema);
    
    const products = await Product.find({});
    auditReport.push(`# PRODUCT DATA AUDIT REPORT`);
    auditReport.push(`Total Products Scanned: **${products.length}**\n`);
    
    for (let p of products) {
      let changed = false;
      let issues = [];
      
      const cat = (p.get('category') || '').toLowerCase();
      const subCat = (p.get('subCategory') || '').toLowerCase();
      const name = (p.get('name') || '').toLowerCase();
      let image = p.get('image') || '';
      let brand = p.get('brand') || '';
      
      // 1. Correct Branding
      if (!brand || brand === 'FitKart') {
        if (name.includes('cult') || name.includes('cultsport')) { brand = 'Cultsport'; changed = true; }
        else if (name.includes('muscleblaze')) { brand = 'MuscleBlaze'; changed = true; }
        else if (name.includes('optimum nutrition') || name.includes('on ')) { brand = 'Optimum Nutrition'; changed = true; }
        else if (name.includes('myprotein')) { brand = 'MyProtein'; changed = true; }
        else if (name.includes('boldfit')) { brand = 'Boldfit'; changed = true; }
        else if (name.includes('coca-cola') || name.includes('coke')) { brand = 'Coca-Cola'; changed = true; }
        else { brand = 'FitKart Essentials'; changed = true; }
        if (changed) p.set('brand', brand);
      }
      
      // 2. Fix Wrong Images (Dumbbell with food image)
      const foodImageUrls = ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'];
      const isEquipment = cat.includes('equipment') || cat.includes('accessories') || name.includes('dumbbell') || name.includes('mat') || name.includes('band');
      const isFood = cat.includes('food') || cat.includes('fruit') || cat.includes('meal') || cat.includes('snack') || name.includes('diet') || name.includes('salad') || name.includes('juice') || name.includes('egg') || name.includes('peanut butter') || name.includes('dates') || name.includes('chicken') || name.includes('smoothie') || name.includes('makhana') || name.includes('toast') || name.includes('vegetable');
      const isSupplement = !isEquipment && !isFood;
      
      if (isEquipment) {
        if (image.includes('unsplash.com') && (image.includes('food') || image.includes('1546069901') || image.includes('1512621776951'))) {
          // Replace with real gym equipment image
          if (name.includes('dumbbell')) image = 'https://images.unsplash.com/photo-1638536532686-fac8fa030f00?auto=format&fit=crop&q=80&w=500';
          else if (name.includes('mat')) image = 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=500';
          else if (name.includes('band')) image = 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=500';
          else image = 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500';
          p.set('image', image);
          issues.push('Fixed wrong food image on equipment');
          changed = true;
        }
      }
      
      if (isSupplement) {
        if (image.includes('unsplash.com') && image.includes('food')) {
          image = 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500'; // Protein powder jar
          p.set('image', image);
          issues.push('Fixed wrong image on supplement');
          changed = true;
        }
      }
      
      // 3. Delivery Classification
      let deliveryType = 'FITNESS_PRODUCTS';
      let deliveryMin = 1; let deliveryMax = 3; let deliveryUnit = 'days';
      
      if (isFood) {
        deliveryType = 'FOOD_FAST'; deliveryMin = 15; deliveryMax = 25; deliveryUnit = 'mins';
      } else if (isEquipment) {
        deliveryType = 'FITNESS_EQUIPMENT'; deliveryMin = 2; deliveryMax = 7; deliveryUnit = 'days';
      }
      
      const currentDelivery = p.get('deliveryInfo');
      if (!currentDelivery || currentDelivery.type !== deliveryType || currentDelivery.min !== deliveryMin) {
        p.set('deliveryInfo', { type: deliveryType, min: deliveryMin, max: deliveryMax, unit: deliveryUnit });
        issues.push(`Updated delivery to ${deliveryMin}-${deliveryMax} ${deliveryUnit}`);
        changed = true;
      }
      
      // 4. Pricing / Variants Correction
      const variants = p.get('variants') || [];
      const updatedVariants = variants.map(v => {
        let price = Number(v.price) || 0;
        let mrp = Number(v.mrp) || 0;
        
        if (mrp < price) {
          mrp = price; // Ensure MRP is never less than price
        }
        
        return { ...v, price, mrp };
      });
      p.set('variants', updatedVariants);
      
      if (updatedVariants.length > 0) {
        const lowest = updatedVariants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
        if (p.get('price') !== lowest.price || p.get('mrp') !== lowest.mrp) {
          p.set('price', lowest.price);
          p.set('mrp', lowest.mrp);
          issues.push('Fixed root pricing from variants');
          changed = true;
        }
      }
      
      // 5. Equipment Specifications
      if (isEquipment && !p.get('specifications')) {
        let material = 'Rubber / Cast Iron';
        let warranty = '1 Year Warranty';
        if (name.includes('mat')) { material = 'TPE / Rubber'; warranty = '6 Months Warranty'; }
        
        p.set('specifications', {
          material: material,
          warranty: warranty,
          type: 'Gym Equipment'
        });
        issues.push('Added missing specifications for equipment');
        changed = true;
      }
      
      if (changed) {
        await p.save();
        issueCount++;
        auditReport.push(`### Corrected: ${p.get('name')} (ID: ${p.get('id')})`);
        issues.forEach(i => auditReport.push(`- ${i}`));
        auditReport.push(`- Final Delivery: ${deliveryMin}-${deliveryMax} ${deliveryUnit}`);
        auditReport.push('');
      }
    }
    
    auditReport.push(`\n## SUMMARY`);
    auditReport.push(`- Total issues fixed: ${issueCount}`);
    auditReport.push(`- Pricing matches MRP (mrp >= sellingPrice).`);
    auditReport.push(`- Food mapped to 15-25 mins.`);
    auditReport.push(`- Equipment mapped to 2-7 days.`);
    auditReport.push(`- Supplements mapped to 1-3 days.`);
    
    fs.writeFileSync('../PRODUCT_DATA_AUDIT_REPORT.md', auditReport.join('\n'));
    console.log('Audit complete! Output saved to PRODUCT_DATA_AUDIT_REPORT.md');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
