import express from 'express';
import { generateDietPlan, quickEval, handleChat, getModels, estimateMacros } from '../controllers/aiController.js';

const router = express.Router();

router.post('/diet-plan', generateDietPlan);
router.post('/quick-eval', quickEval);
router.post('/estimate-macros', estimateMacros);
router.post('/chat', handleChat);
router.get('/models', getModels);

export default router;
