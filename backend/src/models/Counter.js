import mongoose from 'mongoose';
import Order from './Order.js';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 }
}, { versionKey: false });

const Counter = mongoose.model('Counter', counterSchema);

/**
 * Generates the next sequential order ID (e.g. FK-1001, FK-1002, FK-1003...)
 * Uses atomic MongoDB findOneAndUpdate to guarantee concurrency safety without duplicates or gaps.
 */
export async function getNextOrderId() {
  // If counter doesn't exist yet, initialize it
  const existingCounter = await Counter.findById('orderId');
  if (!existingCounter) {
    // Check if there are any existing sequential orders in the database
    let startingSeq = 1000;
    try {
      const existingOrders = await Order.find({ orderId: /^FK-?\d+$/ }, { orderId: 1 }).lean();
      for (const o of existingOrders) {
        const numMatch = o.orderId.match(/\d+$/);
        if (numMatch) {
          const num = parseInt(numMatch[0], 10);
          // Only take sequential numbers in normal range (< 100,000)
          if (num >= 1000 && num < 100000 && num > startingSeq) {
            startingSeq = num;
          }
        }
      }
    } catch (err) {
      console.warn('[Counter initialization warning]:', err.message);
    }

    await Counter.findByIdAndUpdate(
      'orderId',
      { $setOnInsert: { seq: startingSeq } },
      { upsert: true, new: true }
    );
  }

  // Atomically increment sequence by 1
  const counter = await Counter.findByIdAndUpdate(
    'orderId',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `FK-${counter.seq}`;
}

export default Counter;
