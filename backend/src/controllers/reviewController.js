import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { logAuditEvent } from '../utils/auditLogger.js';

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

// @desc Create or update a review (single review per user per product, duplicate safe)
// @route POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    if (!productId || rating === undefined || !comment) {
      return res.status(400).json({ message: 'Product ID, rating, and comment are required' });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const userId = req.user._id;
    const authorName = req.user.name || 'FitKart Athlete';
    const avatarUrl = req.user.avatar || '';

    // Check if user already reviewed this product to prevent duplicate spam
    let existingReview = await Review.findOne({ productId, user: userId });
    let review;

    if (existingReview) {
      existingReview.rating = numRating;
      existingReview.title = title || `${numRating}-Star Review`;
      existingReview.comment = comment.trim();
      existingReview.author = authorName;
      existingReview.avatar = avatarUrl;
      existingReview.date = new Date().toISOString().split('T')[0];
      review = await existingReview.save();
    } else {
      review = await Review.create({
        productId,
        user: userId,
        author: authorName,
        avatar: avatarUrl,
        rating: numRating,
        title: title || `${numRating}-Star Review`,
        comment: comment.trim(),
        verifiedPurchase: true,
        helpfulVotes: 0
      });
    }

    // Recompute product average rating & review count strictly from MongoDB
    const allReviews = await Review.find({ productId });
    const avgRating = allReviews.length > 0
      ? Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1))
      : numRating;

    await Product.findOneAndUpdate(
      { $or: [{ id: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }] },
      { rating: avgRating, reviewCount: allReviews.length }
    );

    await logAuditEvent({
      userId,
      userEmail: req.user.email,
      action: 'REVIEW_SUBMITTED',
      entityType: 'Review',
      entityId: review._id.toString(),
      metadata: { productId, rating: numRating, isUpdate: !!existingReview },
      req
    });

    res.status(existingReview ? 200 : 201).json(review);
  } catch (error) {
    console.error('[Create Review Error]:', error);
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

    const userId = req.user ? req.user._id.toString() : 'user_' + req.ip;
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
