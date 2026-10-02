import express from 'express';
import { getProductReviews, createReview, voteReview } from '../controllers/reviewController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/', optionalAuth, createReview);
router.post('/:id/vote', optionalAuth, voteReview);

export default router;
