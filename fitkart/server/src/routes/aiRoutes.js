import express from 'express';
import { generateDietPlan, handleChat, getModels } from '../controllers/aiController.js';

const router = express.Router();

router.post('/diet-plan', generateDietPlan);
router.post('/chat', handleChat);
router.get('/models', getModels);

export default router;
