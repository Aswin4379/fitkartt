import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  target: { type: String, required: true, index: true },
  categories: [{ type: String, index: true }],
  secondary: { type: String, default: '' },
  equipment: { type: String, default: 'Bodyweight' },
  level: { type: String, default: 'Beginner' },
  videoUrl: { type: String, default: '' },
  gifUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  image2Url: { type: String, default: '' },
  instructions: [{ type: String }],
  formTips: { type: String, default: '' },
  commonMistakes: { type: String, default: '' },
  defaultSets: { type: Number, default: 3 },
  defaultReps: { type: Number, default: 12 },
  defaultWeight: { type: Number, default: 0 }
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
