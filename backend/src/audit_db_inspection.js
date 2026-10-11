import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({ path: '.env' });

async function auditDB() {
  await connectDB();
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  
  console.log('=== MONGODB COLLECTIONS OVERVIEW ===');
  console.log(`Found ${collections.length} collections:`);

  const summary = {};

  for (const col of collections) {
    const name = col.name;
    const count = await db.collection(name).countDocuments();
    summary[name] = count;
    console.log(`- ${name}: ${count} documents`);
  }

  console.log('\n=== USERS BREAKDOWN ===');
  const users = await db.collection('users').find({}).toArray();
  users.forEach((u, i) => {
    console.log(`${i + 1}. ID: ${u._id}, Email: ${u.email}, Name: ${u.name}, Role: ${u.role}, isPremium: ${u.isPremium}, FitCoins: ${u.fitCoins}`);
    if (u.cart) console.log(`   Cart items: ${u.cart.length}`);
    if (u.wishlist) console.log(`   Wishlist items: ${u.wishlist.length}`);
    if (u.addresses) console.log(`   Addresses: ${u.addresses.length}`);
    if (u.fitnessStats) {
      console.log(`   FitnessStats: workoutLogs=${u.fitnessStats.workoutLogs?.length || 0}, streak=${u.fitnessStats.workoutStats?.streak || 0}`);
    }
    if (u.dailyTracker) {
      console.log(`   DailyTracker keys: ${Object.keys(u.dailyTracker).length}`);
    }
  });

  console.log('\n=== ORDERS BREAKDOWN ===');
  const orders = await db.collection('orders').find({}).toArray();
  console.log(`Total orders: ${orders.length}`);
  orders.forEach((o, i) => {
    console.log(`${i + 1}. Order ID: ${o._id}, User: ${o.user || o.userId}, Total: ₹${o.totalAmount || o.totalPrice}, Status: ${o.orderStatus || o.status}, Payment: ${o.paymentStatus || o.isPaid}, Date: ${o.createdAt}`);
  });

  console.log('\n=== REVIEWS BREAKDOWN ===');
  const reviews = await db.collection('reviews').find({}).toArray();
  console.log(`Total reviews: ${reviews.length}`);
  reviews.forEach((r, i) => {
    console.log(`${i + 1}. Review ID: ${r._id}, Product: ${r.product || r.productId}, User: ${r.user || r.userName}, Rating: ${r.rating}`);
  });

  console.log('\n=== CUSTOM ROUTINES & WORKOUT SESSIONS ===');
  if (summary['customroutines']) {
    const cr = await db.collection('customroutines').find({}).toArray();
    console.log(`Custom Routines: ${cr.length}`);
  }
  if (summary['workoutsessions']) {
    const ws = await db.collection('workoutsessions').find({}).toArray();
    console.log(`Workout Sessions: ${ws.length}`);
  }
  if (summary['bodycareassessments']) {
    const bca = await db.collection('bodycareassessments').find({}).toArray();
    console.log(`BodyCare Assessments: ${bca.length}`);
  }

  process.exit(0);
}

auditDB().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
