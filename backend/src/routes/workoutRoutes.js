import express from 'express';
import { getWorkouts, getWorkoutById, saveWorkoutSession, getWorkoutSessions, saveCustomRoutine, getCustomRoutines, deleteCustomRoutine } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getWorkouts);
router.post('/sessions', protect, saveWorkoutSession);
router.get('/sessions', protect, getWorkoutSessions);
router.post('/custom-routines', protect, saveCustomRoutine);
router.get('/custom-routines', protect, getCustomRoutines);
router.delete('/custom-routines/:id', protect, deleteCustomRoutine);
router.get('/:id', getWorkoutById); // Ensure specific routes come after static ones like /sessions

export default router;
