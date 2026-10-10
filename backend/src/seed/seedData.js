import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Workout from '../models/Workout.js';
import Exercise from '../models/Exercise.js';

import { products } from '../data/products.js';
import { exerciseLibrary } from '../data/workouts.js';

dotenv.config();

const sampleWorkouts = [
  {
    id: 'chest-hypertrophy',
    title: 'Chest & Triceps Hypertrophy',
    category: 'Strength',
    level: 'Intermediate',
    duration: 45,
    caloriesBurned: 350,
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    exercises: exerciseLibrary.filter(e => e.target === 'Chest').slice(0, 4)
  },
  {
    id: 'back-biceps-power',
    title: 'Back & Biceps Power Builder',
    category: 'Strength',
    level: 'Advanced',
    duration: 50,
    caloriesBurned: 400,
    thumbnail: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80',
    exercises: exerciseLibrary.filter(e => e.target === 'Back').slice(0, 4)
  },
  {
    id: 'leg-day-strength',
    title: 'Lower Body Strength & Power',
    category: 'Strength',
    level: 'Intermediate',
    duration: 40,
    caloriesBurned: 450,
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80',
    exercises: exerciseLibrary.filter(e => e.target === 'Legs').slice(0, 4)
  },
  {
    id: 'core-hiit-blast',
    title: 'Core & Cardio HIIT Blast',
    category: 'HIIT',
    level: 'All Levels',
    duration: 25,
    caloriesBurned: 300,
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    exercises: exerciseLibrary.filter(e => e.target === 'Core' || e.target === 'Full Body').slice(0, 4)
  }
];

export const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[Seeding]: Populating products, workouts, and exercises collections...');

    const validExercises = exerciseLibrary.filter(Boolean);
    console.log(`[Seeding]: Inserting ${validExercises.length} exercises into MongoDB...`);
    try {
      await mongoose.connection.collection('exercises').drop();
    } catch (e) {}

    const exerciseDocs = validExercises.map((e) => ({
      id: e.id,
      name: e.name,
      target: e.target,
      categories: e.categories || [e.target],
      secondary: e.secondary || '',
      equipment: e.equipment || 'Bodyweight',
      level: e.level || 'Beginner',
      videoUrl: e.videoUrl || '',
      gifUrl: e.gifUrl || '',
      imageUrl: e.imageUrl || '',
      image2Url: e.image2Url || '',
      instructions: e.instructions || [],
      formTips: e.formTips || '',
      commonMistakes: e.commonMistakes || '',
      defaultSets: e.defaultSets || 3,
      defaultReps: e.defaultReps || 12,
      defaultWeight: e.defaultWeight || 0
    }));
    await Exercise.insertMany(exerciseDocs);
    console.log(`[Seeding]: ✓ Successfully stored ${exerciseDocs.length} exercises in MongoDB.`);

    // 2. Seed products if needed
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      console.log(`[Seeding]: Inserting ${products.length} products...`);
      const productDocs = products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand || 'FitKart',
        category: p.category,
        subCategory: p.subCategory || '',
        image: p.image,
        images: p.images || [p.image],
        description: p.description || '',
        ingredients: p.ingredients || '',
        rating: p.rating || 4.5,
        reviewCount: p.reviewCount || 0,
        inStock: p.inStock !== false,
        tags: p.tags || [],
        variants: (p.variants || []).map((v) => ({
          id: v.id,
          size: v.size || '',
          flavor: v.flavor || '',
          unit: v.unit || '',
          price: v.price || 499,
          mrp: v.mrp || 699,
          calories: v.calories || 0,
          protein: v.protein || 0,
          stock: v.stock || 50
        })),
        nutrition: p.nutrition || { calories: 0, protein: 0, carbs: 0, fats: 0 }
      }));
      await Product.insertMany(productDocs);
      console.log(`[Seeding]: ✓ Successfully stored ${productDocs.length} products in MongoDB.`);
    } else {
      console.log(`[Seeding]: Products already present (${existingProducts} items). Preserved.`);
    }

    // 3. Seed workouts if needed
    const existingWorkouts = await Workout.countDocuments();
    if (existingWorkouts === 0) {
      console.log(`[Seeding]: Inserting ${sampleWorkouts.length} workout routines...`);
      await Workout.insertMany(sampleWorkouts);
      console.log(`[Seeding]: ✓ Successfully stored ${sampleWorkouts.length} workout routines in MongoDB.`);
    } else {
      console.log(`[Seeding]: Workouts already present (${existingWorkouts} routines). Preserved.`);
    }

    // 4. Ensure default admin exists
    const adminEmail = 'admin@fitkart.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      console.log('[Seeding]: Creating default Admin user (admin@fitkart.com / admin123)...');
      admin = await User.create({
        name: 'FitKart Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        fitCoins: 500,
        isPremium: true
      });
      console.log('[Seeding]: ✓ Default admin created.');
    }

    console.log('[Seeding Completed Successfully! All collections populated.]');
  } catch (error) {
    console.error('[Seeding Error]:', error);
  }
};

// Auto-run if executed directly via node
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
