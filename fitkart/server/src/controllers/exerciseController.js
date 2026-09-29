import Exercise from '../models/Exercise.js';

// @desc Get all exercises with category / target filter and search
// @route GET /api/exercises
export const getExercises = async (req, res) => {
  try {
    const { target, category, equipment, level, search } = req.query;
    const filter = {};

    if (target && target !== 'All') {
      filter.target = target;
    }

    if (category && category !== 'All') {
      filter.categories = category;
    }

    if (equipment && equipment !== 'All') {
      filter.equipment = equipment;
    }

    if (level && level !== 'All') {
      filter.level = level;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { target: { $regex: search, $options: 'i' } },
        { secondary: { $regex: search, $options: 'i' } },
        { equipment: { $regex: search, $options: 'i' } }
      ];
    }

    const exercises = await Exercise.find(filter).sort({ createdAt: 1 });
    res.json({
      success: true,
      count: exercises.length,
      exercises
    });
  } catch (error) {
    console.error('[Get Exercises Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single exercise by id or _id
// @route GET /api/exercises/:id
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    let exercise = await Exercise.findOne({ id });
    if (!exercise && id.match(/^[0-9a-fA-F]{24}$/)) {
      exercise = await Exercise.findById(id);
    }

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Exercise not found' });
    }

    res.json({
      success: true,
      exercise
    });
  } catch (error) {
    console.error('[Get Exercise By ID Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
