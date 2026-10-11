import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Product from './models/Product.js';
import Exercise from './models/Exercise.js';
import WorkoutSession from './models/WorkoutSession.js';
import CustomRoutine from './models/CustomRoutine.js';

dotenv.config({ path: '.env' });

async function safeCleanup() {
  await connectDB();
  const db = mongoose.connection.db;

  console.log('=== STARTING SAFE DEMO/TEST DATA AUDIT & CLEANUP ===');

  // 1. Initial collection counts
  const beforeCounts = {
    users: await User.countDocuments(),
    orders: await Order.countDocuments(),
    reviews: await Review.countDocuments(),
    products: await Product.countDocuments(),
    exercises: await Exercise.countDocuments(),
    workoutSessions: await WorkoutSession.countDocuments(),
    customRoutines: await CustomRoutine.countDocuments()
  };
  console.log('Collection counts before cleanup:', beforeCounts);

  // 2. Identify test users using strict criteria
  const allUsers = await User.find({}).lean();
  const testUsers = [];
  const realUsers = [];

  const testEmailPatterns = [
    /^audit_/i,
    /^fullstack_test_/i,
    /^aswin\.test\./i,
    /^daily_test_/i,
    /^test_sync@fitkart\.app$/i,
    /^test@example\.com$/i
  ];

  for (const u of allUsers) {
    const email = u.email || '';
    const isTest = testEmailPatterns.some(p => p.test(email)) || !u.email || u._id.toString() === '65f0a0e9b921111111111111';
    if (isTest) {
      testUsers.push(u);
    } else {
      realUsers.push(u);
    }
  }

  console.log(`Classified users: ${realUsers.length} REAL, ${testUsers.length} TEST/DEMO.`);
  console.log('REAL USERS to PRESERVE:');
  realUsers.forEach(u => console.log(`  ✓ ${u._id} | ${u.email} | ${u.name}`));

  console.log('TEST USERS to BACKUP & REMOVE:');
  testUsers.forEach(u => console.log(`  ✗ ${u._id} | ${u.email} | ${u.name}`));

  const testUserIds = testUsers.map(u => u._id);
  const testUserEmails = testUsers.map(u => u.email).filter(Boolean);

  // 3. Identify test orders
  const allOrders = await Order.find({}).lean();
  const testOrders = [];
  const realOrders = [];

  const testOrderIdList = ['FK26126062', 'FK26323179', 'FK26323239', 'FK97667999', 'FK97668164', 'FK97668459'];

  for (const o of allOrders) {
    const orderUserId = o.user ? o.user.toString() : null;
    const isTestUser = orderUserId && testUserIds.some(id => id.toString() === orderUserId);
    const isTestEmail = o.customerEmail && testUserEmails.includes(o.customerEmail);
    const isKnownTestOrder = testOrderIdList.includes(o.orderId);

    if (isTestUser || isTestEmail || isKnownTestOrder) {
      testOrders.push(o);
    } else {
      realOrders.push(o);
    }
  }

  console.log(`Classified orders: ${realOrders.length} REAL, ${testOrders.length} TEST/DEMO.`);
  console.log('REAL ORDERS to PRESERVE:');
  realOrders.forEach(o => console.log(`  ✓ ${o._id} | ${o.orderId} | ${o.customerName} | ₹${o.total} | ${o.status}`));

  console.log('TEST ORDERS to BACKUP & REMOVE:');
  testOrders.forEach(o => console.log(`  ✗ ${o._id} | ${o.orderId} | ${o.customerName} | ₹${o.total} | ${o.status}`));

  // 4. Identify duplicate reviews to clean up (preserve the latest review per user per product)
  const allReviews = await Review.find({}).sort({ createdAt: -1 }).lean();
  const preservedReviews = [];
  const duplicateReviewsToRemove = [];
  const seenUserProductKeys = new Set();

  for (const r of allReviews) {
    const userKey = r.user ? r.user.toString() : (r.author || 'anon');
    const key = `${r.productId}_${userKey}`;

    if (!r.user && !r.author) {
      // orphaned empty review
      duplicateReviewsToRemove.push(r);
    } else if (seenUserProductKeys.has(key)) {
      duplicateReviewsToRemove.push(r);
    } else {
      seenUserProductKeys.add(key);
      preservedReviews.push(r);
    }
  }

  console.log(`Classified reviews: ${preservedReviews.length} PRESERVED, ${duplicateReviewsToRemove.length} DUPLICATE/ORPHANED TO REMOVE.`);
  duplicateReviewsToRemove.forEach(r => console.log(`  ✗ Duplicate: ${r._id} | Product: ${r.productId} | Rating: ${r.rating} | "${r.comment}"`));

  // 5. Create backup before deletion
  const backupDir = path.resolve('backend/backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = Date.now();
  const backupFilePath = path.join(backupDir, `test_data_backup_before_cleanup_${timestamp}.json`);
  const backupData = {
    createdAt: new Date().toISOString(),
    beforeCounts,
    testUsers,
    testOrders,
    duplicateReviewsToRemove
  };

  fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), 'utf-8');
  console.log(`\n✓ PRE-CLEANUP BACKUP SAFELY SAVED TO: ${backupFilePath}`);

  // 6. Perform the verified deletions
  console.log('\nExecuting safe deletions...');
  
  if (testUserIds.length > 0) {
    const userDelResult = await User.deleteMany({ _id: { $in: testUserIds } });
    console.log(`Deleted ${userDelResult.deletedCount} test user documents.`);
  }

  if (testOrders.length > 0) {
    const testOrderIds = testOrders.map(o => o._id);
    const orderDelResult = await Order.deleteMany({ _id: { $in: testOrderIds } });
    console.log(`Deleted ${orderDelResult.deletedCount} test order documents.`);
  }

  if (duplicateReviewsToRemove.length > 0) {
    const reviewIdsToRemove = duplicateReviewsToRemove.map(r => r._id);
    const reviewDelResult = await Review.deleteMany({ _id: { $in: reviewIdsToRemove } });
    console.log(`Deleted ${reviewDelResult.deletedCount} duplicate/orphaned review documents.`);
  }

  // 7. Ensure compound unique index is created on reviews
  try {
    await db.collection('reviews').createIndex({ productId: 1, user: 1 }, { unique: true });
    console.log('✓ Created unique index on reviews: { productId: 1, user: 1 }');
  } catch (idxErr) {
    console.log('Index note:', idxErr.message);
  }

  // 8. Re-count collections
  const afterCounts = {
    users: await User.countDocuments(),
    orders: await Order.countDocuments(),
    reviews: await Review.countDocuments(),
    products: await Product.countDocuments(),
    exercises: await Exercise.countDocuments(),
    workoutSessions: await WorkoutSession.countDocuments(),
    customRoutines: await CustomRoutine.countDocuments()
  };

  console.log('\n=== CLEANUP COMPLETED SUCCESSFULLY ===');
  console.log('Counts Before:', beforeCounts);
  console.log('Counts After: ', afterCounts);

  const report = {
    timestamp: new Date().toISOString(),
    backupFile: backupFilePath,
    beforeCounts,
    afterCounts,
    deletedTestUsersCount: testUsers.length,
    preservedRealUsersCount: realUsers.length,
    deletedOrdersCount: testOrders.length,
    preservedOrdersCount: realOrders.length,
    deletedDuplicateReviewsCount: duplicateReviewsToRemove.length,
    preservedReviewsCount: preservedReviews.length,
    realUsersList: realUsers.map(u => ({ id: u._id, email: u.email, name: u.name })),
    realOrdersList: realOrders.map(o => ({ id: o._id, orderId: o.orderId, customerName: o.customerName, total: o.total }))
  };

  fs.writeFileSync(path.join(backupDir, 'cleanup_summary.json'), JSON.stringify(report, null, 2), 'utf-8');

  process.exit(0);
}

safeCleanup().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
