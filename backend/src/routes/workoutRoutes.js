import express from 'express';
import { getWorkouts, getWorkoutById, saveWorkoutSession, getWorkoutSessions, saveCustomRoutine, getCustomRoutines, deleteCustomRoutine, generateAIPlan, getActiveSession, saveActiveSession, clearActiveSession } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getWorkouts);
router.post('/generate-plan', protect, generateAIPlan);
router.post('/sessions', protect, saveWorkoutSession);
router.get('/sessions', protect, getWorkoutSessions);
router.get('/sessions/active', protect, getActiveSession);
router.post('/sessions/active', protect, saveActiveSession);
router.delete('/sessions/active', protect, clearActiveSession);
router.post('/custom-routines', protect, saveCustomRoutine);
router.get('/custom-routines', protect, getCustomRoutines);
router.delete('/custom-routines/:id', protect, deleteCustomRoutine);
router.get('/:id', getWorkoutById); // Ensure specific routes come after static ones like /sessions

export default router;
