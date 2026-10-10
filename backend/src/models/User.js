import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  line: { type: String, required: true },
  landmark: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  pincode: { type: String, required: true },
  type: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
  instructions: { type: String, default: '' },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  goal: { type: String, default: 'Fitness Maintenance' },
  age: { type: Number, default: 24 },
  gender: { type: String, default: 'male' },
  height: { type: Number, default: 175 },
  activityLevel: { type: String, default: 'moderate' },
  startingWeight: { type: Number, default: 75 },
  currentWeight: { type: Number, default: 70 },
  targetWeight: { type: Number, default: 65 },
  fitCoins: { type: Number, default: 150 },
  isPremium: { type: Boolean, default: false },
  subscription: {
    active: { type: Boolean, default: false },
    plan: { type: String, default: null },
    expiresAt: { type: Date, default: null },
    startedAt: { type: Date, default: null }
  },
  cart: [{
    key: { type: String },
    productId: { type: String },
    variantId: { type: String },
    name: { type: String },
    image: { type: String },
    category: { type: String },
    size: { type: String },
    flavor: { type: String },
    unit: { type: String },
    price: { type: Number },
    mrp: { type: Number },
    qty: { type: Number, default: 1 }
  }],
  addresses: [addressSchema],
  wishlist: [{ type: String }],
  orders: [{ type: String }],
  fitnessStats: {
    weightHistory: [{
      weight: { type: Number, required: true },
      date: { type: String, default: () => new Date().toISOString().split('T')[0] },
      note: { type: String, default: '' }
    }],
    currentWeight: { type: Number, default: 70 },
    targetWeight: { type: Number, default: 65 },
    startingWeight: { type: Number, default: 75 },
    water: {
      glasses: { type: Number, default: 0 },
      maxGlasses: { type: Number, default: 8 },
      lastUpdatedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
      history: [{
        date: { type: String },
        glasses: { type: Number }
      }]
    },
    nutrition: {
      calorieGoal: { type: Number, default: 2200 },
      caloriesConsumed: { type: Number, default: 0 },
      proteinGoal: { type: Number, default: 130 },
      proteinConsumed: { type: Number, default: 0 },
      carbsConsumed: { type: Number, default: 0 },
      fatConsumed: { type: Number, default: 0 },
      lastUpdatedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
      meals: [{
        id: { type: String },
        name: { type: String },
        calories: { type: Number },
        protein: { type: Number },
        carbs: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        time: { type: String },
        date: { type: String }
      }]
    },
    activity: {
      todayMinutes: { type: Number, default: 0 },
      todayCaloriesBurned: { type: Number, default: 0 },
      workoutsCompletedToday: { type: Number, default: 0 },
      lastUpdatedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
      history: [{
        date: { type: String },
        minutes: { type: Number, default: 0 },
        calories: { type: Number, default: 0 },
        workoutsCount: { type: Number, default: 0 }
      }]
    },
    streak: {
      current: { type: Number, default: 0 },
      best: { type: Number, default: 0 },
      lastActiveDate: { type: String, default: '' },
      history: [{
        date: { type: String },
        completed: { type: Boolean, default: false }
      }]
    },
    workoutStats: {
      completed: { type: Number, default: 0 },
      time: { type: Number, default: 0 },
      calories: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      lastWorkoutDate: { type: String, default: '' }
    },
    workoutLogs: [{
      id: { type: String },
      date: { type: String },
      workoutName: { type: String },
      duration: { type: Number },
      calories: { type: Number },
      exercisesCount: { type: Number },
      exerciseNames: [{ type: String }],
      setsCompleted: { type: Number },
      completedAt: { type: Date, default: Date.now }
    }],
    workoutPRs: { type: mongoose.Schema.Types.Mixed, default: {} },
    workoutAchievements: [{ type: String }],
    achievements: [{ type: String }],
    customWorkout: { type: mongoose.Schema.Types.Mixed, default: null },
    recentActivities: [{
      id: { type: String },
      type: { type: String },
      title: { type: String },
      value: { type: String },
      timestamp: { type: Date, default: Date.now }
    }],
    muscleRecovery: {
      chest: { type: Number, default: 100 },
      back: { type: Number, default: 100 },
      shoulders: { type: Number, default: 100 },
      biceps: { type: Number, default: 100 },
      triceps: { type: Number, default: 100 },
      forearms: { type: Number, default: 100 },
      abs: { type: Number, default: 100 },
      glutes: { type: Number, default: 100 },
      quads: { type: Number, default: 100 },
      hamstrings: { type: Number, default: 100 },
      calves: { type: Number, default: 100 },
      lastUpdated: { type: Date, default: Date.now }
    },
    fitnessPlan: {
      onboarded: { type: Boolean, default: false },
      goal: { type: String },
      targetAreas: [{ type: String }],
      level: { type: String, default: 'Beginner' },
      equipment: [{ type: String }],
      daysPerWeek: { type: Number, default: 3 },
      duration: { type: Number, default: 45 },
      split: { type: String, default: 'Full Body' },
      planGeneratedAt: { type: Date },
      schedule: [{
        day: { type: Number },
        focus: { type: String },
        estimatedDuration: { type: Number },
        exercises: [{
          exerciseId: { type: String },
          name: { type: String },
          type: { type: String, enum: ['warm-up', 'activation', 'main', 'cooldown'], default: 'main' },
          sets: { type: Number },
          reps: { type: mongoose.Schema.Types.Mixed }, // String or Number
          recommendedWeight: { type: String },
          restTime: { type: Number, default: 60 },
          targetMuscles: [{ type: String }],
          difficulty: { type: String },
          equipment: { type: String },
          reason: { type: String },
          gifUrl: { type: String },
          videoUrl: { type: String },
          instructions: [{ type: String }],
          secondary: { type: String },
          formTips: { type: String },
          commonMistakes: { type: String }
        }],
        isCompleted: { type: Boolean, default: false },
        completedAt: { type: Date }
      }]
    },
    activeWorkoutSession: { type: mongoose.Schema.Types.Mixed, default: null }
  }
}, { timestamps: true, minimize: false });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
