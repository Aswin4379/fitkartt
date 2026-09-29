import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  id: { type: String },
  size: { type: String, default: '' },
  flavor: { type: String, default: '' },
  unit: { type: String, default: '' },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  stock: { type: Number, default: 50 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true },
  name: { type: String, required: true, trim: true },
  brand: { type: String, default: 'FitKart' },
  category: { type: String, required: true, index: true },
  subCategory: { type: String, default: '' },
  image: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, default: '' },
  ingredients: { type: mongoose.Schema.Types.Mixed, default: '' },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 120 },
  inStock: { type: Boolean, default: true },
  tags: [{ type: String }],
  variants: [variantSchema],
  nutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    servingSize: { type: String, default: '100g' }
  },
  deliveryInfo: {
    type: { type: String, enum: ['FOOD_FAST', 'FITNESS_PRODUCTS', 'FITNESS_EQUIPMENT'], default: 'FITNESS_PRODUCTS' },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 3 },
    unit: { type: String, enum: ['mins', 'days'], default: 'days' }
  },
  price: { type: Number, default: 0 },
  mrp: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
