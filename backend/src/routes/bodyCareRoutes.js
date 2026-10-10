import express from 'express';
import {
  assessBodyCare,
  bodyCareFollowUp,
  getSavedAssessments,
  deleteAssessment
} from '../controllers/bodyCareController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/assess', optionalAuth, assessBodyCare);
router.post('/chat', optionalAuth, bodyCareFollowUp);
router.get('/history', protect, getSavedAssessments);
router.delete('/history/:id', protect, deleteAssessment);

export default router;
