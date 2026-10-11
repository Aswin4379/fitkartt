# FitKart Complete Database, Backend, Data-Persistence & Architecture Audit

**Project**: FitKart Full-Stack Fitness & E-Commerce Web Application  
**Audit Date**: October 11, 2026  
**Status**: COMPLETE & VERIFIED  
**Database**: MongoDB (`fitkart` at `127.0.0.1:27017`)  
**Backend**: Node.js v24.18.0 / Express.js / Mongoose v8.5.2  
**Frontend**: React 18 / Vite v5.4.21 / TailwindCSS  

---

## 1. Executive Summary

A comprehensive architectural and data persistence audit was conducted across every layer of the FitKart application. The audit verified whether MongoDB serves as the single source of truth, inspected all API endpoints and Express controllers, audited Mongoose schemas, and verified user isolation, duplicate prevention, and demo/test data sanitization.

### Core Non-Negotiables Assessment
| Requirement | Status | Verification Summary |
|---|---|---|
| **MongoDB as Single Source of Truth** | **VERIFIED** | All customer actions (orders, reviews, cart, wishlist, workouts, tracker, rewards, subscriptions) read and write to MongoDB collections. |
| **User Data Isolation** | **VERIFIED** | Authenticated user ID (`req.user._id` from validated JWT) is enforced on all private operations. Users cannot read, cancel, or tamper with another user's data. |
| **Server-Side Price Validation** | **VERIFIED** | Unit prices and order totals are calculated and validated against the MongoDB `Product` collection. Tampered or forged client prices are discarded. |
| **Duplicate Prevention** | **VERIFIED** | Compound unique index `{ productId: 1, user: 1 }` prevents review spam; order idempotency window prevents double checkout on rapid retries. |
| **Honest Error & Empty States** | **VERIFIED** | Removed silent catch blocks that fabricated fake success screens (e.g. `PaymentPage.jsx` fallback order creation). Empty lists render honest empty states. |
| **Activity Audit Logging** | **VERIFIED** | Implemented `AuditLog` collection and middleware utility to record all critical business actions with data minimization. |
| **Catalogue & Real User Preservation** | **VERIFIED** | 416 products, 134 exercises, 16 genuine user accounts, and 7 customer orders preserved intact. 14 synthetic test accounts and 6 test orders safely cleaned up after JSON backup. |

---

## 2. Complete Data-Source Map Across All Modules

### Module 1: Authentication & User Profile
- **Frontend Pages/Components**: `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/pages/Profile.jsx`, `src/pages/AccountSettings.jsx`, `src/context/UserContext.jsx`
- **API Endpoints**:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/google`
  - `GET /api/auth/me`
  - `PUT /api/auth/profile`
  - `POST /api/auth/send-otp`
  - `POST /api/auth/verify-otp`
  - `POST /api/auth/reset-password`
  - `GET /api/auth/activity-log`
- **Express Routes & Controllers**: `backend/src/routes/authRoutes.js`, `backend/src/controllers/authController.js`
- **Mongoose Model & Collection**: `User` (`users`), `Otp` (`otps`), `AuditLog` (`auditlogs`)
- **User ID Isolation**: Strictly bound to `req.user._id` via `protect` JWT middleware.
- **CRUD Operations**:
  - **Create**: User registration, OTP generation.
  - **Read**: `getMe` fetches verified bio-metrics and recalculates fresh metabolic goals on read.
  - **Update**: `updateProfile` updates name, phone, age, height, starting/current/target weight, activity level, goal.
  - **Delete**: Account deletion (admin or owner).
- **Source of Truth**: MongoDB `users` collection. (localStorage is used only as transient token and session cache).
- **Audit Findings & Fixes**:
  - *Vulnerability Fixed*: `updateProfile` previously accepted `fitCoins`, `isPremium`, and `subscription` from `req.body`, allowing users to forge currency. Stripped client-tampered financial fields from `updateProfile`. Added dedicated server-validated endpoints `POST /api/auth/redeem-reward` and `POST /api/auth/subscribe`.
  - *Added*: Integrated `AuditLog` event logging on `LOGIN_SUCCESS`, `PROFILE_UPDATED`, `TRACKER_UPDATED`.

---

### Module 2: Products & Catalogue
- **Frontend Pages/Components**: `src/pages/Home.jsx`, `src/pages/Store.jsx`, `src/pages/ProductDetail.jsx`, `src/context/ProductContext.jsx`, `src/components/ProductCard.jsx`
- **API Endpoints**:
  - `GET /api/products` (supports `category`, `search`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`)
  - `GET /api/products/:id`
  - `POST /api/admin/products` (Admin)
  - `PUT /api/admin/products/:id` (Admin)
  - `DELETE /api/admin/products/:id` (Admin)
- **Express Routes & Controllers**: `backend/src/routes/productRoutes.js`, `backend/src/controllers/productController.js`, `backend/src/controllers/adminController.js`
- **Mongoose Model & Collection**: `Product` (`products`) — 416 catalogue products.
- **Source of Truth**: MongoDB `products` collection.
- **Audit Findings & Fixes**:
  - *Vulnerability Fixed*: `adminRoutes.js` had `protect` and `adminOnly` imported but commented out or unmounted on `/products`, allowing public product deletion. Applied strict `router.use(protect, adminOnly)` to all admin catalogue operations.
  - *Persistence Confirmed*: Admin product updates immediately reflect across customer catalogue APIs.

---

### Module 3: Cart, Wishlist & Addresses
- **Frontend Pages/Components**: `src/pages/Cart.jsx`, `src/pages/Wishlist.jsx`, `src/pages/AddressSelection.jsx`, `src/context/CartContext.jsx`, `src/context/UserContext.jsx`
- **API Endpoints**:
  - `PUT /api/auth/profile` (`cart` payload synchronization)
  - `POST /api/auth/addresses`
  - `DELETE /api/auth/addresses/:id`
  - `POST /api/auth/wishlist/toggle`
- **Express Routes & Controllers**: `backend/src/routes/authRoutes.js`, `backend/src/controllers/authController.js`
- **Mongoose Model & Collection**: `User` (`users.cart`, `users.addresses`, `users.wishlist`)
- **User ID Isolation**: Fully isolated by `req.user._id`.
- **Source of Truth**: MongoDB `users` document.
- **Audit Findings & Fixes**:
  - *Persistence Verified*: Cart items, wishlist items, and delivery addresses survive logout/login and are accessible across devices via `/auth/me`.
  - *Cart Clearing on Checkout*: `createOrder` now atomically clears `user.cart: []` in MongoDB upon order placement, preventing stale items in cart after checkout.
  - *Added*: Integrated audit logging for `ADDRESS_ADDED` and `ADDRESS_DELETED`.

---

### Module 4: Checkout, Payments & Orders
- **Frontend Pages/Components**: `src/pages/Checkout.jsx`, `src/pages/PaymentPage.jsx`, `src/pages/OrderSuccess.jsx`, `src/pages/MyOrders.jsx`, `src/pages/OrderTracking.jsx`
- **API Endpoints**:
  - `POST /api/orders`
  - `GET /api/orders/my-orders`
  - `GET /api/orders/:id`
  - `PUT /api/orders/:id/cancel`
  - `GET /api/admin/orders`
  - `PUT /api/admin/orders/:id/status`
- **Express Routes & Controllers**: `backend/src/routes/orderRoutes.js`, `backend/src/controllers/orderController.js`, `backend/src/controllers/adminController.js`
- **Mongoose Model & Collection**: `Order` (`orders`)
- **User ID Isolation**:
  - `POST /api/orders` binds order to `req.user._id`.
  - `GET /api/orders/my-orders` queries `{ user: req.user._id }`.
  - `GET /api/orders/:id` forbids non-owner, non-admin access (403).
  - `PUT /api/orders/:id/cancel` requires `order.user.equals(req.user._id)` or admin role (403).
- **Source of Truth**: MongoDB `orders` collection.
- **Audit Findings & Fixes**:
  - *Critical Vulnerability Fixed (Price Forgery)*: Server now recalculates each item price from the MongoDB `Product` and `variants` subdocuments. Forged client totals are ignored; true server totals are calculated including verified coupon discounts and delivery fees.
  - *Critical Bug Fixed (Fake Success)*: In `PaymentPage.jsx`, removed the fallback `catch` block that generated local dummy orders and navigated to `/order-success` when API failed. Failed orders now display honest error alerts and preserve cart.
  - *Insecure Cancellation Fixed*: `PUT /api/orders/:id/cancel` now checks user ownership; unauthenticated or unauthorized users receive 403 Forbidden.
  - *Duplicate Prevention Added*: Checked recent orders by user within 15 seconds; returns existing confirmed order instead of creating duplicates.
  - *Empty State Fixed*: `MyOrders.jsx` handles 0 orders from MongoDB honestly without falling back to string arrays.

---

### Module 5: Reviews & Ratings
- **Frontend Pages/Components**: `src/components/ReviewSection.jsx`, `src/pages/ProductDetail.jsx`
- **API Endpoints**:
  - `GET /api/reviews/product/:productId`
  - `POST /api/reviews`
  - `POST /api/reviews/:id/vote`
- **Express Routes & Controllers**: `backend/src/routes/reviewRoutes.js`, `backend/src/controllers/reviewController.js`
- **Mongoose Model & Collection**: `Review` (`reviews`), `Product` (`products.rating`, `products.reviewCount`)
- **User ID Isolation**: Requires authentication (`protect`). Each review is bound to `req.user._id`.
- **Source of Truth**: MongoDB `reviews` collection.
- **Audit Findings & Fixes**:
  - *Vulnerability Fixed (Review Spam / Duplicates)*: Created compound unique index on `Review.js`: `{ productId: 1, user: 1 }`.
  - *Upsert Logic*: If user submits a second review for the same product, it updates the existing review in-place rather than inserting duplicate documents.
  - *Product Aggregation*: Average rating and review count are recalculated and updated in the `Product` document.
  - *Added*: Audit event logged on `REVIEW_SUBMITTED`.

---

### Module 6: Workouts, Routines & Sessions
- **Frontend Pages/Components**: `src/pages/Fitness.jsx`, `src/pages/Workouts.jsx`, `src/pages/WorkoutDetail.jsx`, `src/context/WorkoutContext.jsx`
- **API Endpoints**:
  - `GET /api/workouts`
  - `GET /api/workouts/:id`
  - `POST /api/workouts/sessions`
  - `GET /api/workouts/sessions`
  - `GET /api/workouts/sessions/active`
  - `POST /api/workouts/sessions/active`
  - `DELETE /api/workouts/sessions/active`
  - `POST /api/workouts/custom-routines`
  - `GET /api/workouts/custom-routines`
  - `DELETE /api/workouts/custom-routines/:id`
  - `GET /api/exercises`
- **Express Routes & Controllers**: `backend/src/routes/workoutRoutes.js`, `backend/src/controllers/workoutController.js`, `backend/src/routes/exerciseRoutes.js`
- **Mongoose Model & Collection**: `Workout` (`workouts`), `WorkoutSession` (`workoutsessions`), `CustomRoutine` (`customroutines`), `Exercise` (`exercises`), `User` (`users.fitnessStats`)
- **User ID Isolation**: User routines and workout sessions are filtered strictly by `user: req.user._id`.
- **Source of Truth**: MongoDB `workoutsessions`, `customroutines`, and `users.fitnessStats`.
- **Audit Findings & Fixes**:
  - *Divergence Bug Fixed*: `saveWorkoutSession` previously saved to `WorkoutSession` model but omitted updating `user.fitnessStats.workoutLogs` and `user.fitnessStats.activity.todayMinutes`. Updated `workoutController.js` to atomically push to `workoutLogs` and update daily minutes/calories, keeping profile and sessions in sync.
  - *Schema Validation Bug Fixed*: `WorkoutSession.js` required `exerciseId`. For freestyle sessions without pre-assigned IDs, validation failed with 500. Added fallback generation (`ex-${idx}-${Date.now()}`).
  - *Seed Data Drop Bug Fixed*: Removed `collection('exercises').drop()` on boot in `seedData.js`. Exercises are preserved.
  - *Added*: Audit event logged on `WORKOUT_COMPLETED`.

---

### Module 7: Fitness Tracker & Metabolic Engine
- **Frontend Pages/Components**: `src/pages/Dashboard.jsx`, `src/utils/metabolicEngine.js`
- **API Endpoints**:
  - `PUT /api/auth/profile` (`fitnessStats` with water, meals, weight history)
  - `GET /api/auth/me`
- **Express Routes & Controllers**: `backend/src/routes/authRoutes.js`, `backend/src/controllers/authController.js`
- **Mongoose Model & Collection**: `User` (`users.fitnessStats`)
- **Source of Truth**: MongoDB `users.fitnessStats`.
- **Date Isolation**:
  - Client sends current local date via `x-client-date` header.
  - `formatUserResponse` evaluates `todayMeals` and today's water against `effectiveDate`.
  - Historical water and meal logs are preserved in `history` and never overwritten on daily reset.

---

### Module 8: AI Workout, AI Diet Plan & BodyCare AI
- **Frontend Pages/Components**: `src/pages/AiRecommendation.jsx`, `src/pages/BodyCareAi.jsx`, `src/components/AiAssistant.jsx`
- **API Endpoints**:
  - `POST /api/ai/diet-plan`
  - `POST /api/ai/quick-eval`
  - `POST /api/ai/chat`
  - `POST /api/ai/estimate-macros`
  - `POST /api/bodycare/assess`
  - `POST /api/bodycare/followup`
  - `GET /api/bodycare/history`
  - `DELETE /api/bodycare/history/:id`
- **Express Routes & Controllers**: `backend/src/routes/aiRoutes.js`, `backend/src/controllers/aiController.js`, `backend/src/routes/bodyCareRoutes.js`, `backend/src/controllers/bodyCareController.js`
- **Mongoose Model & Collection**: `BodyCareAssessment` (`bodycareassessments`), `User` (`users.fitnessStats.fitnessPlan`)
- **Source of Truth**: Groq LLM API backend proxy + MongoDB for persistent user assessments.
- **Safety Rules**: Deterministic local rule engine catches red flags (cardiac, cauda equina, neuro, fractures, DVT) before passing to AI.
- **Error Handling**: On Groq API failures, returns 500/503 error without inventing hallucinated responses. No API keys exposed to frontend.

---

### Module 9: Rewards, Subscriptions & Admin Dashboard
- **Frontend Pages/Components**: `src/pages/Rewards.jsx`, `src/pages/Subscription.jsx`, `src/pages/AdminDashboard.jsx`
- **API Endpoints**:
  - `POST /api/auth/redeem-reward`
  - `POST /api/auth/subscribe`
  - `GET /api/admin/stats`
  - `GET /api/admin/orders`
  - `PUT /api/admin/orders/:id/status`
  - `GET /api/admin/audit-logs`
- **Express Routes & Controllers**: `backend/src/routes/authRoutes.js`, `backend/src/controllers/authController.js`, `backend/src/routes/adminRoutes.js`, `backend/src/controllers/adminController.js`
- **Mongoose Model & Collection**: `User` (`users.fitCoins`, `users.isPremium`, `users.subscription`), `AuditLog` (`auditlogs`)
- **Source of Truth**: MongoDB `users` and `auditlogs`.
- **Audit Findings & Fixes**:
  - *Server-Side Validation*: FitCoins balances and subscription tier are now validated and updated strictly on the backend.
  - *Admin Stats*: Computed from real MongoDB aggregate queries (`Order.countDocuments`, `User.countDocuments`, `Product.countDocuments`), zero hardcoded numbers.

---

## 3. Data Integrity & Persistence Architecture Summary

```
[ React Client ] 
       │
  (HTTPS / JWT Bearer Token + x-client-date)
       ▼
[ Express Router ] ───► [ Auth Middleware (protect / adminOnly) ]
       │                               │
       ▼                               ▼
[ Controllers ] ◄────────────── [ Ownership & Price Validation ]
       │
       ├───────────────────────► [ AuditLogger (AuditLog.create) ]
       ▼
[ Mongoose Models ]
       ▼
[ MongoDB Database (fitkart) ]
   ├── products              (416 items - Verified Catalog)
   ├── exercises             (134 items - Verified Library)
   ├── users                 (16 verified active athletes)
   ├── orders                (7 confirmed real customer orders)
   ├── reviews               (10 deduplicated real customer reviews)
   ├── workoutsessions       (13 confirmed user workout records)
   ├── customroutines        (2 user customized routines)
   ├── bodycareassessments   (12 user clinical assessments)
   └── auditlogs             (Live append-only business activity trail)
```
