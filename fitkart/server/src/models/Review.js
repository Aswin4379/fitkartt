import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  author: { type: String, required: true },
  avatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, default: '' },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  helpfulVotes: { type: Number, default: 0 },
  votedUsers: [{ type: String }],
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
