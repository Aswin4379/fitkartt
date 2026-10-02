import Workout from '../models/Workout.js';
import WorkoutSession from '../models/WorkoutSession.js';
import CustomRoutine from '../models/CustomRoutine.js';

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

// @desc Save a workout session
// @route POST /api/workouts/sessions
export const saveWorkoutSession = async (req, res) => {
  try {
    const session = new WorkoutSession({
      user: req.user._id,
      ...req.body
    });
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get workout sessions for current user
// @route GET /api/workouts/sessions
export const getWorkoutSessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ user: req.user._id }).sort({ startTime: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Save custom routine
// @route POST /api/workouts/custom-routines
export const saveCustomRoutine = async (req, res) => {
  try {
    const routine = new CustomRoutine({
      user: req.user._id,
      ...req.body
    });
    const savedRoutine = await routine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get custom routines
// @route GET /api/workouts/custom-routines
export const getCustomRoutines = async (req, res) => {
  try {
    const routines = await CustomRoutine.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete custom routine
// @route DELETE /api/workouts/custom-routines/:id
export const deleteCustomRoutine = async (req, res) => {
  try {
    const routine = await CustomRoutine.findOne({ _id: req.params.id, user: req.user._id });
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    await routine.deleteOne();
    res.json({ message: 'Routine removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
