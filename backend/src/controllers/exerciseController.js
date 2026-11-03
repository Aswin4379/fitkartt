import Exercise from '../models/Exercise.js';
import { exerciseLibrary } from '../data/workouts.js';

const exerciseLibraryMap = new Map(exerciseLibrary.map(e => [e.id, e]));
const exerciseLibraryNameMap = new Map(exerciseLibrary.map(e => [e.name?.toLowerCase().trim(), e]));

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
    const safeExercises = exercises.map(ex => {
      const doc = ex.toObject ? ex.toObject() : { ...ex };
      const fallback = exerciseLibraryMap.get(doc.id) || exerciseLibraryNameMap.get(doc.name?.toLowerCase().trim());
      return {
        ...doc,
        imageUrl: doc.imageUrl || doc.gifUrl || fallback?.imageUrl || fallback?.gifUrl || '',
        gifUrl: doc.gifUrl || doc.imageUrl || fallback?.gifUrl || fallback?.imageUrl || '',
        image2Url: doc.image2Url || fallback?.image2Url || '',
        videoUrl: doc.videoUrl || fallback?.videoUrl || ''
      };
    });
    res.json({
      success: true,
      count: safeExercises.length,
      exercises: safeExercises
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
