import express from 'express';
import { getProductReviews, createReview, voteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);
router.post('/:id/vote', protect, voteReview);

export default router;
