import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitkart';

import User from './models/User.js';

async function inspectUsers() {
  await mongoose.connect(MONGO_URI);
  const users = await User.find({});
  console.log(`Found ${users.length} users in MongoDB.`);
  for (const u of users) {
    console.log(`\nUser: ${u.email} (${u.name})`);
    console.log('activity:', JSON.stringify(u.fitnessStats?.activity));
    console.log('workoutStats:', JSON.stringify(u.fitnessStats?.workoutStats));
    console.log('workoutLogs count:', u.fitnessStats?.workoutLogs?.length || 0);
    if (u.fitnessStats?.workoutLogs?.length > 0) {
      console.log('workoutLogs:', JSON.stringify(u.fitnessStats.workoutLogs, null, 2));
    }
  }
  await mongoose.disconnect();
}

inspectUsers();
