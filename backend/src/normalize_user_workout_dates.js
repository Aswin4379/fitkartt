import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitkart';

import User from './models/User.js';
import { getLocalDateString } from './utils/metabolicEngine.js';

async function normalizeUserWorkoutDates() {
  console.log('=== NORMALIZING WORKOUT DATES & CLEANING TODAY STATS IN MONGODB ===\n');
  await mongoose.connect(MONGO_URI);

  const todayStr = getLocalDateString(new Date());
  console.log(`Current Date: ${todayStr}`);

  const users = await User.find({});
  console.log(`Auditing ${users.length} users...`);

  for (const user of users) {
    let modified = false;
    const stats = user.fitnessStats || {};
    const workoutLogs = Array.isArray(stats.workoutLogs) ? stats.workoutLogs : [];

    // 1. Normalize dates in workoutLogs
    const cleanedLogs = [];
    const seen = new Set();

    for (const log of workoutLogs) {
      if (!log) continue;
      const normalizedDate = getLocalDateString(log.date || log.completedAt);
      if (!normalizedDate) continue;

      const logId = log.id || `wlog_${new Date(log.completedAt || log.date).getTime()}_${Math.random().toString(36).substring(2, 6)}`;
      const dedupKey = `${log.workoutName || log.routineName}_${normalizedDate}_${log.completedAt || ''}`;

      if (seen.has(dedupKey)) continue;
      seen.add(dedupKey);

      cleanedLogs.push({
        id: logId,
        date: normalizedDate,
        workoutName: log.workoutName || log.routineName || 'Workout Routine',
        routineName: log.routineName || log.workoutName || 'Workout Routine',
        duration: Number(log.duration || log.durationMinutes) || 15,
        durationMinutes: Number(log.durationMinutes || log.duration) || 15,
        calories: Number(log.calories || log.caloriesBurned) || 100,
        caloriesBurned: Number(log.caloriesBurned || log.calories) || 100,
        exercisesCount: Number(log.exercisesCount) || (Array.isArray(log.exerciseNames) ? log.exerciseNames.length : 1),
        exerciseNames: Array.isArray(log.exerciseNames) ? log.exerciseNames : [log.workoutName || 'Exercise'],
        completedAt: log.completedAt ? new Date(log.completedAt).toISOString() : new Date(normalizedDate).toISOString()
      });
      modified = true;
    }

    // 2. Calculate actual today workouts
    const todaysWorkouts = cleanedLogs.filter(l => l.date === todayStr);
    const todayMinutes = todaysWorkouts.reduce((sum, w) => sum + w.durationMinutes, 0);
    const todayCaloriesBurned = todaysWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    const todayCount = todaysWorkouts.length;

    // 3. Update user activity & workoutStats
    if (!user.fitnessStats) user.fitnessStats = {};
    user.fitnessStats.workoutLogs = cleanedLogs;

    const rawActivity = user.fitnessStats.activity || {};
    user.fitnessStats.activity = {
      ...rawActivity,
      todayMinutes,
      todayCaloriesBurned,
      workoutsCompletedToday: todayCount,
      lastUpdatedDate: todayStr,
      history: Array.isArray(rawActivity.history) ? rawActivity.history : []
    };

    user.fitnessStats.workoutStats = {
      completed: cleanedLogs.length,
      time: cleanedLogs.reduce((sum, w) => sum + w.durationMinutes, 0),
      calories: cleanedLogs.reduce((sum, w) => sum + w.caloriesBurned, 0),
      streak: user.fitnessStats.workoutStats?.streak || (todayCount > 0 ? 1 : 0),
      lastWorkoutDate: cleanedLogs.length > 0 ? cleanedLogs[0].date : ''
    };

    await user.save();
    console.log(`User: ${user.email} -> Total Historical Logs: ${cleanedLogs.length}, Today Workouts: ${todayCount} (mins: ${todayMinutes}, kcal: ${todayCaloriesBurned})`);
  }

  await mongoose.disconnect();
  console.log('\n=== MONGODB NORMALIZATION COMPLETE ===\n');
}

normalizeUserWorkoutDates().catch(console.error);
