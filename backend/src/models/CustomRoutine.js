import mongoose from 'mongoose';

const routineExerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  target: { type: String },
  defaultSets: { type: Number, default: 3 },
  defaultReps: { type: Number, default: 12 },
  defaultWeight: { type: Number, default: 0 },
  restTimeSeconds: { type: Number, default: 60 },
  order: { type: Number, default: 0 }
}, { _id: true });

const customRoutineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  category: { type: String, default: 'Custom' },
  level: { type: String, default: 'All Levels' },
  exercises: [routineExerciseSchema]
}, { timestamps: true });

const CustomRoutine = mongoose.model('CustomRoutine', customRoutineSchema);
export default CustomRoutine;
