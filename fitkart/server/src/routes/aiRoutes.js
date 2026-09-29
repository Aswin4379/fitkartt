import express from 'express';
import { generateDietPlan, handleChat } from '../controllers/aiController.js';

const router = express.Router();

router.post('/diet-plan', generateDietPlan);
router.post('/chat', handleChat);

export default router;
