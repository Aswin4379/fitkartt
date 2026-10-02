import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, default: '' },
  price: { type: Number, required: true },
  mrp: { type: Number, default: 0 },
  quantity: { type: Number, required: true, default: 1 },
  size: { type: String, default: '' },
  flavor: { type: String, default: '' },
  unit: { type: String, default: '' },
  selectedVariant: {
    id: { type: String },
    size: { type: String },
    flavor: { type: String },
    unit: { type: String },
    mrp: { type: Number }
  },
  deliveryInfo: {
    type: { type: String },
    min: { type: Number },
    max: { type: Number },
    unit: { type: String }
  }
}, { _id: false });

const orderTimelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  time: { type: Date, default: Date.now },
  description: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, default: 'FitKart Customer' },
  customerEmail: { type: String, default: '' },
  customerPhone: { type: String, default: '' },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  coupon: { type: String, default: null },
  paymentMethod: { type: String, default: 'upi' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'paid' },
  status: {
    type: String,
    enum: ['Order Placed', 'Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Confirmed'
  },
  deliveryAddress: {
    name: { type: String },
    phone: { type: String },
    line: { type: String },
    landmark: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    type: { type: String }
  },
  deliveryEstimate: {
    min: { type: Number },
    max: { type: Number },
    unit: { type: String }
  },
  timeline: [orderTimelineSchema],
  placedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
