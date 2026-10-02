import mongoose from 'mongoose';
import User from '../server/src/models/User.js';

async function inspectUsers() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fitkart');
  const users = await User.find({});
  console.log('TOTAL USERS IN MONGODB:', users.length);
  users.forEach((u, i) => {
    console.log(`\nUser #${i + 1}:`);
    console.log('  ID:', u._id);
    console.log('  Name:', u.name);
    console.log('  Email:', u.email);
    console.log('  StartingWeight:', u.startingWeight);
    console.log('  CurrentWeight:', u.currentWeight);
    console.log('  TargetWeight:', u.targetWeight);
    console.log('  Goal:', u.goal);
    console.log('  Age:', u.age);
    console.log('  Height:', u.height);
    console.log('  ActivityLevel:', u.activityLevel);
    console.log('  FitnessStats:', {
      startingWeight: u.fitnessStats?.startingWeight,
      currentWeight: u.fitnessStats?.currentWeight,
      targetWeight: u.fitnessStats?.targetWeight,
      weightHistory: u.fitnessStats?.weightHistory,
      water: u.fitnessStats?.water,
      nutrition: u.fitnessStats?.nutrition
    });
  });
  process.exit(0);
}

inspectUsers();
