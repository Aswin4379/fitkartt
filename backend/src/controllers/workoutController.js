import Workout from '../models/Workout.js';

// @desc Get all workouts
// @route GET /api/workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get workout by ID
// @route GET /api/workouts/:id
export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    let workout = await Workout.findOne({ id });
    if (!workout && id.match(/^[0-9a-fA-F]{24}$/)) {
      workout = await Workout.findById(id);
    }
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
