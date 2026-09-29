import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc Get reviews for a product
// @route GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a review
// @route POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Product ID, rating, and comment are required' });
    }

    const review = await Review.create({
      productId,
      user: req.user ? req.user._id : null,
      author: req.user ? req.user.name : (req.body.author || 'FitKart User'),
      avatar: req.user ? (req.user.avatar || '') : '',
      rating: Number(rating),
      title: title || '',
      comment,
      verifiedPurchase: true,
      helpfulVotes: 0
    });

    // Update product average rating
    const allReviews = await Review.find({ productId });
    const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
    await Product.findOneAndUpdate(
      { id: productId },
      { rating: Number(avgRating), reviewCount: allReviews.length }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Vote helpful on review
// @route POST /api/reviews/:id/vote
export const voteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const userId = req.user ? req.user._id.toString() : 'anon_' + req.ip;
    if (review.votedUsers && review.votedUsers.includes(userId)) {
      return res.json({ message: 'Already voted', helpfulVotes: review.helpfulVotes });
    }

    review.helpfulVotes = (review.helpfulVotes || 0) + 1;
    if (!review.votedUsers) review.votedUsers = [];
    review.votedUsers.push(userId);
    await review.save();

    res.json({ helpfulVotes: review.helpfulVotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
