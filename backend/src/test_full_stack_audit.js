import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Product from './models/Product.js';
import AuditLog from './models/AuditLog.js';
import WorkoutSession from './models/WorkoutSession.js';

dotenv.config({ path: '.env' });

const BASE_URL = 'http://localhost:5000/api';

async function runTestSuite() {
  await connectDB();
  console.log('=== RUNNING FULL-STACK PERSISTENCE & DATABASE VERIFICATION SUITE ===\n');

  const timestamp = Date.now();
  const userAEmail = `audit_athlete_a_${timestamp}@fitkart.test`;
  const userBEmail = `audit_athlete_b_${timestamp}@fitkart.test`;
  const userPassword = 'Password@123';

  let tokenA = '';
  let userAId = '';
  let tokenB = '';
  let userBId = '';

  const testResults = [];

  function recordResult(testName, passed, details = '') {
    testResults.push({ testName, passed, details });
    const mark = passed ? '✓ PASS' : '✗ FAIL';
    console.log(`${mark}: ${testName}${details ? ` (${details})` : ''}`);
  }

  try {
    // ----------------------------------------------------
    // TEST 1: User Registration & Persistence to MongoDB
    // ----------------------------------------------------
    const regResA = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Audit Athlete A',
        email: userAEmail,
        password: userPassword,
        goal: 'Weight Loss',
        currentWeight: 80,
        targetWeight: 72
      })
    });
    const regDataA = await regResA.json();
    tokenA = regDataA.token;
    userAId = regDataA.user?._id || regDataA.user?.id;

    const dbUserA = await User.findById(userAId);
    recordResult(
      'User A Registration persists to MongoDB',
      !!dbUserA && dbUserA.email === userAEmail && dbUserA.currentWeight === 80,
      `User ID: ${userAId}`
    );

    // Register User B
    const regResB = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Audit Athlete B',
        email: userBEmail,
        password: userPassword,
        goal: 'Muscle Gain',
        currentWeight: 65,
        targetWeight: 75
      })
    });
    const regDataB = await regResB.json();
    tokenB = regDataB.token;
    userBId = regDataB.user?._id || regDataB.user?.id;

    // ----------------------------------------------------
    // TEST 2: Profile Update Persists and Reflects on Reload
    // ----------------------------------------------------
    const updateRes = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        name: 'Audit Athlete A - Updated',
        phone: '9876543210',
        currentWeight: 78
      })
    });
    const updateData = await updateRes.json();
    
    // Fetch directly from MongoDB
    const refreshedDbUserA = await User.findById(userAId);
    recordResult(
      'Profile Update persists in MongoDB and matches after refresh',
      refreshedDbUserA.name === 'Audit Athlete A - Updated' &&
      refreshedDbUserA.phone === '9876543210' &&
      refreshedDbUserA.currentWeight === 78,
      `Name: ${refreshedDbUserA.name}, Weight: ${refreshedDbUserA.currentWeight}kg`
    );

    // ----------------------------------------------------
    // TEST 3: User Cart Sync & Persistence Across Devices
    // ----------------------------------------------------
    const sampleCart = [
      { key: 'wl-1_v1', productId: 'wl-1', variantId: 'v1', name: 'Optimum Nutrition Gold Standard 100% Whey', price: 3499, qty: 2 }
    ];
    await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({ cart: sampleCart })
    });

    // Check with /auth/me call as new device session
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const meData = await meRes.json();
    recordResult(
      'Cart persists in MongoDB and returns on new device session',
      Array.isArray(meData.user?.cart) && meData.user.cart.length === 1 && meData.user.cart[0].qty === 2,
      `Cart count: ${meData.user?.cart?.length}`
    );

    // ----------------------------------------------------
    // TEST 4: Server-side Price Validation on Order Creation
    // ----------------------------------------------------
    // Fetch a real product from MongoDB to test real pricing
    const testProduct = await Product.findOne({ id: 'wl-1' });
    const realPrice = testProduct ? testProduct.price : 3499;

    // Send forged tampered total of ₹10 from client
    const forgedOrderPayload = {
      items: [
        {
          productId: 'wl-1',
          name: 'Optimum Nutrition Gold Standard 100% Whey',
          price: 10, // Forged client price!
          quantity: 1
        }
      ],
      subtotal: 10, // Forged client subtotal!
      total: 10, // Forged client total!
      paymentMethod: 'upi',
      deliveryAddress: { line: '123 Test St', city: 'Coimbatore', pincode: '641001' }
    };

    const orderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify(forgedOrderPayload)
    });
    const orderData = await orderRes.json();
    const createdOrder = orderData.order;

    // Verify in MongoDB that the server overrode the forged price with the real product price!
    const dbOrder = await Order.findOne({ orderId: createdOrder.orderId });
    const isPriceValidated = dbOrder && dbOrder.total >= realPrice;
    recordResult(
      'Server-side price validation prevents client price forgery',
      isPriceValidated,
      `Client claimed ₹10, Server saved ₹${dbOrder?.total} based on MongoDB catalog`
    );

    // Verify cart was automatically cleared in MongoDB after checkout
    const postOrderUserA = await User.findById(userAId);
    recordResult(
      'Cart automatically cleared in MongoDB upon successful order creation',
      Array.isArray(postOrderUserA.cart) && postOrderUserA.cart.length === 0,
      `User cart length: ${postOrderUserA.cart?.length}`
    );

    // ----------------------------------------------------
    // TEST 5: Duplicate Order Prevention on Rapid Retry
    // ----------------------------------------------------
    const duplicateOrderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        items: [{ productId: 'wl-1', quantity: 1 }],
        paymentMethod: 'upi'
      })
    });
    const duplicateOrderData = await duplicateOrderRes.json();
    recordResult(
      'Duplicate order submission prevented on rapid retry',
      duplicateOrderData.duplicatePrevented === true || duplicateOrderData.order?.orderId === createdOrder.orderId,
      `Returned order: ${duplicateOrderData.order?.orderId}`
    );

    // ----------------------------------------------------
    // TEST 6: User Isolation: User B Cannot Cancel User A's Order
    // ----------------------------------------------------
    const unauthorizedCancelRes = await fetch(`${BASE_URL}/orders/${createdOrder.orderId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}` // User B attempting to cancel User A's order!
      }
    });
    recordResult(
      'User B cannot cancel User A order (Strict Ownership Isolation)',
      unauthorizedCancelRes.status === 403,
      `HTTP Status: ${unauthorizedCancelRes.status}`
    );

    // User A can cancel their own order
    const authorizedCancelRes = await fetch(`${BASE_URL}/orders/${createdOrder.orderId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      }
    });
    const cancelData = await authorizedCancelRes.json();
    const cancelledDbOrder = await Order.findOne({ orderId: createdOrder.orderId });
    recordResult(
      'User A can cancel own order and state persists to MongoDB',
      authorizedCancelRes.status === 200 && cancelledDbOrder.status === 'Cancelled',
      `Order status: ${cancelledDbOrder?.status}`
    );

    // ----------------------------------------------------
    // TEST 7: Review Creation and Duplicate Prevention
    // ----------------------------------------------------
    // Review 1
    const reviewRes1 = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        productId: 'wl-1',
        rating: 5,
        title: 'Outstanding protein',
        comment: 'Great taste and mixability.'
      })
    });
    const rev1 = await reviewRes1.json();

    // User A reviews the same product again with updated rating
    const reviewRes2 = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        productId: 'wl-1',
        rating: 4,
        title: 'Good protein',
        comment: 'Updated review: mixability is fine.'
      })
    });
    const rev2 = await reviewRes2.json();

    // Verify count in MongoDB for this (productId, user)
    const dbReviewsForUser = await Review.find({ productId: 'wl-1', user: userAId });
    recordResult(
      'Review deduplication enforces 1 review per user and updates in-place',
      dbReviewsForUser.length === 1 && dbReviewsForUser[0].rating === 4 && dbReviewsForUser[0].comment.includes('Updated review'),
      `Reviews in DB for user: ${dbReviewsForUser.length}, Rating: ${dbReviewsForUser[0]?.rating}`
    );

    // ----------------------------------------------------
    // TEST 8: Server-side FitCoins Reward Redemption
    // ----------------------------------------------------
    // User starts with default 150 FitCoins
    const redeemRes = await fetch(`${BASE_URL}/auth/redeem-reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({ rewardId: 1 }) // Option 1 costs 100 coins
    });
    const redeemData = await redeemRes.json();

    const dbUserAfterRedeem = await User.findById(userAId);
    recordResult(
      'FitCoins reward redemption deducted atomically on server',
      redeemData.success === true && dbUserAfterRedeem.fitCoins < 150,
      `Remaining FitCoins in MongoDB: ${dbUserAfterRedeem.fitCoins}`
    );

    // Rejection on insufficient coins: Option 4 costs 500 coins
    const overRedeemRes = await fetch(`${BASE_URL}/auth/redeem-reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({ rewardId: 4 })
    });
    recordResult(
      'Redemption rejected by server when coins are insufficient',
      overRedeemRes.status === 400,
      `HTTP Status: ${overRedeemRes.status}`
    );

    // ----------------------------------------------------
    // TEST 9: Workout Session Persistence & Stats Synchronization
    // ----------------------------------------------------
    const sessionRes = await fetch(`${BASE_URL}/workouts/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        name: 'Chest & Triceps Hypertrophy',
        durationSeconds: 2400, // 40 mins
        caloriesBurned: 280,
        exercises: [
          {
            name: 'Barbell Bench Press',
            sets: [
              { reps: 10, weight: 60, isCompleted: true },
              { reps: 8, weight: 70, isCompleted: true }
            ]
          }
        ]
      })
    });
    const sessionData = await sessionRes.json();

    // Verify session in WorkoutSession collection AND synchronization in User fitnessStats
    const dbSession = await WorkoutSession.findById(sessionData._id);
    const dbUserWithWorkouts = await User.findById(userAId);
    const hasWorkoutLog = dbUserWithWorkouts.fitnessStats.workoutLogs?.some(l => l.workoutName === 'Chest & Triceps Hypertrophy');
    const todayMinutesUpdated = dbUserWithWorkouts.fitnessStats.activity?.todayMinutes >= 40;

    recordResult(
      'Workout session persists to MongoDB and synchronizes with User fitnessStats logs and activity',
      !!dbSession && hasWorkoutLog && todayMinutesUpdated,
      `Session ID: ${sessionData._id}, WorkoutLogs: ${dbUserWithWorkouts.fitnessStats.workoutLogs?.length}, TodayMinutes: ${dbUserWithWorkouts.fitnessStats.activity?.todayMinutes}`
    );

    // ----------------------------------------------------
    // TEST 10: Secure User Activity Audit Log
    // ----------------------------------------------------
    const auditLogsRes = await fetch(`${BASE_URL}/auth/activity-log`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const auditLogs = await auditLogsRes.json();

    const loggedActions = Array.isArray(auditLogs) ? auditLogs.map(l => l.action) : [];
    const hasOrderCreated = loggedActions.includes('ORDER_CREATED');
    const hasOrderCancelled = loggedActions.includes('ORDER_CANCELLED');
    const hasReviewSubmitted = loggedActions.includes('REVIEW_SUBMITTED');
    const hasRewardRedeemed = loggedActions.includes('REWARD_REDEEMED');
    const hasWorkoutCompleted = loggedActions.includes('WORKOUT_COMPLETED');

    const auditPass = hasOrderCreated && hasOrderCancelled && hasReviewSubmitted && hasRewardRedeemed && hasWorkoutCompleted;
    recordResult(
      'AuditLog records all critical business events in MongoDB',
      auditPass,
      `Captured events: ${loggedActions.join(', ')}`
    );

  } catch (err) {
    console.error('Test suite error:', err);
    recordResult('Execution error', false, err.message);
  } finally {
    // ----------------------------------------------------
    // CLEANUP OF TEST-ONLY RECORDS
    // ----------------------------------------------------
    console.log('\nCleaning up verification suite test records...');
    if (userAId) {
      await User.deleteOne({ _id: userAId });
      await Order.deleteMany({ user: userAId });
      await Review.deleteMany({ user: userAId });
      await WorkoutSession.deleteMany({ user: userAId });
      await AuditLog.deleteMany({ user: userAId });
    }
    if (userBId) {
      await User.deleteOne({ _id: userBId });
      await Order.deleteMany({ user: userBId });
      await Review.deleteMany({ user: userBId });
      await WorkoutSession.deleteMany({ user: userBId });
      await AuditLog.deleteMany({ user: userBId });
    }
    console.log('✓ Cleaned up isolated test records.');
  }

  // Summary
  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;
  console.log(`\n========================================`);
  console.log(`TEST SUITE COMPLETED: ${passedCount}/${totalCount} TESTS PASSED`);
  console.log(`========================================\n`);

  process.exit(passedCount === totalCount ? 0 : 1);
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
