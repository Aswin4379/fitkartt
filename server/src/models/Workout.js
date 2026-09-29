import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  target: { type: String, default: '' },
  secondary: { type: String, default: '' },
  equipment: { type: String, default: 'None' },
  level: { type: String, default: 'Beginner' },
  videoUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  image2Url: { type: String, default: '' },
  instructions: [{ type: String }],
  formTips: { type: String, default: '' },
  commonMistakes: { type: String, default: '' },
  defaultSets: { type: Number, default: 3 },
  defaultReps: { type: Number, default: 12 },
  defaultWeight: { type: Number, default: 0 }
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  level: { type: String, default: 'All Levels' },
  duration: { type: Number, default: 30 },
  caloriesBurned: { type: Number, default: 200 },
  thumbnail: { type: String, default: '' },
  exercises: [exerciseSchema]
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
