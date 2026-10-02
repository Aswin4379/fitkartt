import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, default: 0 },
  rpe: { type: Number, min: 0, max: 10 },
  isCompleted: { type: Boolean, default: false }
}, { _id: true });

const exerciseRecordSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  target: { type: String },
  sets: [setSchema]
}, { _id: true });

const workoutSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  routineId: { type: String }, // Optional: reference to a pre-made or custom routine
  name: { type: String, required: true },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date },
  durationSeconds: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  exercises: [exerciseRecordSchema],
  muscleGroups: [{ type: String }], // e.g., 'Chest', 'Triceps'
  notes: { type: String, default: '' }
}, { timestamps: true });

const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);
export default WorkoutSession;
