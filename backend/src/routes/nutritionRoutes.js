import express from 'express';
import { searchExternalNutrition } from '../controllers/nutritionController.js';

const router = express.Router();

// GET /api/nutrition/search?query=...&limit=10
router.get('/search', searchExternalNutrition);

export default router;
