import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitkart';

// Import User model and metabolic utilities
import User from './models/User.js';
import { getLocalDateString } from './utils/metabolicEngine.js';

async function runWorkoutDateTrackingTests() {
  console.log('=== STARTING WORKOUT DAILY DATE-BASED TRACKING TESTS ===\n');
  
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB:', MONGO_URI);

  const testEmail = `test_athlete_${Date.now()}@fitkart.test`;
  
  const today = new Date();
  const todayStr = getLocalDateString(today);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterday);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = getLocalDateString(tomorrow);

  console.log(`Dates: Yesterday=${yesterdayStr}, Today=${todayStr}, Tomorrow=${tomorrowStr}`);

  // 1. Create a test user with a workout completed YESTERDAY
  const yesterdayLog = {
    id: `wlog_yesterday_${Date.now()}`,
    date: yesterdayStr,
    workoutName: 'Chest & Triceps Push Power',
    routineName: 'Chest & Triceps Push Power',
    duration: 35,
    durationMinutes: 35,
    calories: 280,
    caloriesBurned: 280,
    exercisesCount: 5,
    exerciseNames: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Push-ups', 'Tricep Rope Pushdown', 'Dips'],
    completedAt: new Date(yesterday.getTime() + 14 * 3600 * 1000).toISOString()
  };

  const user = await User.create({
    name: 'Test Date Athlete',
    email: testEmail,
    password: 'password123',
    role: 'user',
    fitnessStats: {
      startingWeight: 75,
      currentWeight: 72,
      targetWeight: 68,
      activity: {
        todayMinutes: 35,
        todayCaloriesBurned: 280,
        workoutsCompletedToday: 1,
        lastUpdatedDate: yesterdayStr,
        history: [{ date: yesterdayStr, minutes: 35, calories: 280, count: 1 }]
      },
      workoutStats: {
        completed: 1,
        time: 35,
        calories: 280,
        streak: 1,
        lastWorkoutDate: yesterdayStr
      },
      workoutLogs: [yesterdayLog]
    }
  });

  console.log(`[PASS] Created test user: ${user.email} with 1 workout on ${yesterdayStr}`);

  // Test 2: Fetch user profile with clientDate = todayStr
  // Dynamic format test imitating authController
  const { calculateMetabolicMetrics } = await import('./utils/metabolicEngine.js');
  
  // Helper simulating authController formatUserResponse
  function formatUserResponseTest(u, effectiveDate) {
    const stats = u.fitnessStats?.toObject ? u.fitnessStats.toObject() : (u.fitnessStats || {});
    const rawWorkoutLogs = Array.isArray(stats.workoutLogs) ? stats.workoutLogs : [];
    const seen = new Set();
    const workoutLogs = rawWorkoutLogs.filter((log) => {
      if (!log) return false;
      const key = log.id || `${log.workoutName || log.routineName}_${log.completedAt || log.date}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const todaysWorkouts = workoutLogs.filter(log => {
      if (!log) return false;
      const logDate = log.date || (log.completedAt ? getLocalDateString(new Date(log.completedAt)) : null);
      return logDate === effectiveDate || getLocalDateString(logDate) === effectiveDate;
    });
    const todaysWorkoutMinutes = todaysWorkouts.reduce((sum, w) => sum + (Number(w.durationMinutes || w.duration) || 0), 0);
    const todaysCaloriesBurned = todaysWorkouts.reduce((sum, w) => sum + (Number(w.caloriesBurned || w.calories) || Math.round((Number(w.durationMinutes || w.duration) || 30) * 7.5)), 0);
    const todaysCompletedCount = todaysWorkouts.length;

    const rawActivity = stats.activity || {};
    let todayMinutes = 0;
    let todayBurned = 0;
    let todayWorkoutsCount = 0;

    if (rawActivity.lastUpdatedDate === effectiveDate) {
      todayMinutes = Math.max(Number(rawActivity.todayMinutes) || 0, todaysWorkoutMinutes);
      todayBurned = Math.max(Number(rawActivity.todayCaloriesBurned) || 0, todaysCaloriesBurned);
      todayWorkoutsCount = Math.max(Number(rawActivity.workoutsCompletedToday) || 0, todaysCompletedCount);
    } else {
      todayMinutes = todaysWorkoutMinutes;
      todayBurned = todaysCaloriesBurned;
      todayWorkoutsCount = todaysCompletedCount;
    }

    return {
      id: u._id.toString(),
      fitnessStats: {
        activity: {
          todayMinutes,
          todayCaloriesBurned: todayBurned,
          workoutsCompletedToday: todayWorkoutsCount,
          lastUpdatedDate: effectiveDate
        },
        workoutStats: {
          todayCompleted: todaysCompletedCount,
          todayTime: todaysWorkoutMinutes,
          todayCalories: todaysCaloriesBurned,
          completed: stats.workoutStats?.completed || workoutLogs.length,
          time: stats.workoutStats?.time || 35,
          calories: stats.workoutStats?.calories || 280
        },
        workoutLogs,
        todaysWorkouts
      }
    };
  }

  // Evaluate today's state
  const todayResponse = formatUserResponseTest(user, todayStr);
  console.log('\n--- Evaluating TODAY ($' + todayStr + ') BEFORE any workouts today ---');
  console.log('Today Workouts Count:', todayResponse.fitnessStats.workoutStats.todayCompleted);
  console.log('Today Minutes:', todayResponse.fitnessStats.activity.todayMinutes);
  console.log('Today Calories:', todayResponse.fitnessStats.activity.todayCaloriesBurned);
  console.log('All-Time Workout Logs Count:', todayResponse.fitnessStats.workoutLogs.length);
  console.log('Yesterday Workouts preserved in logs:', todayResponse.fitnessStats.workoutLogs[0].workoutName);

  if (todayResponse.fitnessStats.workoutStats.todayCompleted === 0 &&
      todayResponse.fitnessStats.activity.todayMinutes === 0 &&
      todayResponse.fitnessStats.workoutLogs.length === 1 &&
      todayResponse.fitnessStats.workoutLogs[0].date === yesterdayStr) {
    console.log('[PASS] Today starts cleanly at 0 while yesterday history is preserved!');
  } else {
    throw new Error('FAILED: Today did not start at 0 or yesterday history lost');
  }

  // Test 3: Complete a workout TODAY
  const todayLog = {
    id: `wlog_today_${Date.now()}`,
    date: todayStr,
    workoutName: 'Pull Power & Back Shred',
    routineName: 'Pull Power & Back Shred',
    duration: 40,
    durationMinutes: 40,
    calories: 320,
    caloriesBurned: 320,
    exercisesCount: 6,
    exerciseNames: ['Pull-ups', 'Barbell Deadlift', 'Bent Over Row', 'Lat Pulldown', 'Bicep Curl', 'Hammer Curl'],
    completedAt: new Date().toISOString()
  };

  // Add workout today to user and save to MongoDB
  user.fitnessStats.workoutLogs.unshift(todayLog);
  user.fitnessStats.workoutStats.completed += 1;
  user.fitnessStats.workoutStats.time += 40;
  user.fitnessStats.workoutStats.calories += 320;
  user.fitnessStats.workoutStats.streak = 2;
  user.fitnessStats.workoutStats.lastWorkoutDate = todayStr;
  user.fitnessStats.activity.todayMinutes = 40;
  user.fitnessStats.activity.todayCaloriesBurned = 320;
  user.fitnessStats.activity.workoutsCompletedToday = 1;
  user.fitnessStats.activity.lastUpdatedDate = todayStr;

  await user.save();
  console.log('\n[PASS] Saved Today workout to MongoDB.');

  // Refetch user from MongoDB
  const updatedUserFromDb = await User.findById(user._id);
  const updatedTodayResponse = formatUserResponseTest(updatedUserFromDb, todayStr);

  console.log('\n--- Evaluating TODAY ($' + todayStr + ') AFTER completing today workout ---');
  console.log('Today Workouts Count:', updatedTodayResponse.fitnessStats.workoutStats.todayCompleted);
  console.log('Today Minutes:', updatedTodayResponse.fitnessStats.activity.todayMinutes);
  console.log('Today Calories:', updatedTodayResponse.fitnessStats.activity.todayCaloriesBurned);
  console.log('All-Time Workout Logs Count:', updatedTodayResponse.fitnessStats.workoutLogs.length);

  if (updatedTodayResponse.fitnessStats.workoutStats.todayCompleted === 1 &&
      updatedTodayResponse.fitnessStats.activity.todayMinutes === 40 &&
      updatedTodayResponse.fitnessStats.workoutLogs.length === 2) {
    console.log('[PASS] Today shows 1 workout (40m, 320kcal) and all-time history shows 2 workouts!');
  } else {
    throw new Error('FAILED: Today stats or total history incorrect');
  }

  // Test 4: Simulate Tomorrow transition ($tomorrowStr)
  const tomorrowResponse = formatUserResponseTest(updatedUserFromDb, tomorrowStr);

  console.log('\n--- Evaluating TOMORROW ($' + tomorrowStr + ') date transition ---');
  console.log('Tomorrow Today Workouts Count:', tomorrowResponse.fitnessStats.workoutStats.todayCompleted);
  console.log('Tomorrow Today Minutes:', tomorrowResponse.fitnessStats.activity.todayMinutes);
  console.log('Tomorrow Today Calories:', tomorrowResponse.fitnessStats.activity.todayCaloriesBurned);
  console.log('All-Time Workout Logs Count on Tomorrow:', tomorrowResponse.fitnessStats.workoutLogs.length);

  if (tomorrowResponse.fitnessStats.workoutStats.todayCompleted === 0 &&
      tomorrowResponse.fitnessStats.activity.todayMinutes === 0 &&
      tomorrowResponse.fitnessStats.workoutLogs.length === 2) {
    console.log('[PASS] Tomorrow automatically resets today counters to 0 while keeping both historical workouts!');
  } else {
    throw new Error('FAILED: Tomorrow transition did not reset daily counters or lost history');
  }

  // Clean up test user
  await User.deleteOne({ _id: user._id });
  console.log('\n[CLEANUP] Deleted test user from MongoDB.');
  
  await mongoose.disconnect();
  console.log('\n=== ALL WORKOUT DAILY DATE-BASED TRACKING TESTS PASSED 100% ===\n');
}

runWorkoutDateTrackingTests().catch((err) => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
