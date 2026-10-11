import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Exercise from '../models/Exercise.js';
import { exerciseLibrary } from '../data/workouts.js';

dotenv.config();

async function syncMongoExercises() {
  await connectDB();
  console.log('Connected to MongoDB. Exercises to sync:', exerciseLibrary.length);

  let updated = 0;
  for (const ex of exerciseLibrary) {
    const res = await Exercise.updateOne(
      { id: ex.id },
      { 
        $set: { 
          imageUrl: ex.imageUrl,
          image2Url: ex.image2Url,
          gifUrl: ex.gifUrl || ex.imageUrl
        } 
      },
      { upsert: true }
    );
    if (res.modifiedCount > 0 || res.upsertedCount > 0) updated++;
  }

  console.log(`Successfully synced ${updated} exercises in MongoDB!`);
  process.exit(0);
}

syncMongoExercises().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
