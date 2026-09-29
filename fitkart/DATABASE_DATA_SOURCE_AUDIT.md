# FitKart Data Source, Duplication & Fallback Audit Report

**Audit Mode**: READ-ONLY (No code, database records, or files were modified)  
**Target**: Data Duplication, Fallback Sources, Hardcoded/Static Data, LocalStorage, and Record Classifications  
**Date**: 2026-09-20  

---

## 1. Executive Summary

This audit identifies every instance of data duplication, client-side static bundling, localStorage caching, mock/fallback mechanisms, and classifies all 15 users and 11 orders in MongoDB.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Data Source Flow Architecture                   │
├──────────────────┬───────────────────────┬─────────────────────────────┤
│ Feature Area     │ Live MongoDB / API    │ Client Static / LocalStorage│
├──────────────────┼───────────────────────┼─────────────────────────────┤
│ Products Store   │ /api/products (Admin) │ src/data/products.js (User) │
│ Reviews          │ /api/reviews (Live)   │ src/data/reviews.js (Cache) │
│ Exercises        │ /api/exercises (Live) │ src/data/workouts.js (Media)│
│ Workouts         │ /api/workouts (Live)  │ src/data/workouts.js (Static│
│ Tracker          │ users.fitnessStats    │ localStorage (Offline only) │
│ Orders           │ /api/orders (Live)    │ user.orders (Fallback array)│
│ Food Nutrition   │ Open Food Facts API   │ src/data/foodNutrition.js   │
└──────────────────┴───────────────────────┴─────────────────────────────┘
```

---

## 2. Feature-by-Feature Data Source & Fallback Inspection

### A. Products Catalog
- **MongoDB Collection**: `products` (416 documents)
- **Client-Side Static Dataset**: `src/data/products.js` (416 products, 472 KB)
- **UI Data Source Breakdown**:
  1. `src/pages/Home.jsx` (Lines 25, 34-39): Directly imports static `products` array from `../data/products.js` for zero-latency flash deals and trending carousels.
  2. `src/pages/CategoryPage.jsx` (Lines 6, 29-35): Directly filters and sorts static `products` from `../data/products.js`.
  3. `src/pages/ProductDetails.jsx` (Line 75): Looks up product via `products.find(p => p.id === id)` from `../data/products.js`.
  4. `src/pages/SearchResults.jsx` (Line 15): Searches static `products` bundle.
  5. `src/pages/Cart.jsx` & `Wishlist.jsx`: Reference product IDs against static `products.js`.
  6. `src/pages/AdminDashboard.jsx` (Line 39): **Uses MongoDB API** `productApi.getProducts({ limit: 100 })` and `/api/admin/products` for live inventory management.
- **Verdict**: **Dual Source**. Storefront uses client-side static bundle for sub-10ms browsing performance, while Admin Dashboard reads/writes live MongoDB `products` collection.

---

### B. Product Reviews & Ratings
- **MongoDB Collection**: `reviews` (3 documents)
- **Client-Side Storage**: `src/data/reviews.js` (`localStorage` key: `'fitkart_reviews'`)
- **UI Data Source Breakdown**:
  1. `src/components/ReviewSection.jsx` (Lines 55–84):
     - **Primary**: Calls `reviewApi.getProductReviews(productId)` to fetch verified reviews from MongoDB.
     - **Fallback**: If MongoDB returns an empty array or network is offline (Lines 71, 79), falls back to `getReviewsForProduct(product)` from `localStorage` (`fitkart_reviews`).
  2. `src/components/ReviewSection.jsx` (Lines 132–142):
     - Submitting a review calls `reviewApi.createReview({...})`, writing directly to MongoDB `reviews` collection and updating `Product.rating` in MongoDB.
     - On network failure, falls back to `addReview()` in localStorage.
  3. Helpful Voting (Line 104): Calls `reviewApi.voteReview(reviewId)` to persist helpful vote count in MongoDB.
- **Verdict**: **MongoDB First with LocalStorage Offline Fallback**.

---

### C. Exercises Library (124 Exercises)
- **MongoDB Collection**: `exercises` (124 documents)
- **Client-Side Static Dataset**: `src/data/workouts.js` / `src/data/exercises.js` (`exerciseLibrary` array of 124 exercises)
- **Backend API**: `GET /api/exercises`, `GET /api/exercises/:id` in `server/src/controllers/exerciseController.js`
- **UI Data Source Breakdown**:
  1. `src/pages/Workouts.jsx` (Line 30): Imports `exerciseLibrary` (124 exercises with GIF URLs, target muscles, instructions, and form tips) for instant movement animation streaming.
  2. `src/pages/WorkoutDetail.jsx` (Lines 68–70): Maps exercise IDs to `exerciseLibrary` objects.
  3. `src/services/api.js` (Line 110): `exerciseApi.getExercises()` connects to MongoDB `/api/exercises`.
- **Verdict**: **Synchronized Dual Source**. All 124 exercises exist in MongoDB `exercises` and are mirrored in `src/data/workouts.js` for instant media delivery without video lag.

---

### D. Workouts & Curated Plans
- **MongoDB Collection**: `workouts` (4 documents: `chest-hypertrophy`, `back-biceps-power`, `leg-day-strength`, `core-hiit-blast`)
- **Client-Side Static Dataset**: `src/data/workouts.js` (`workoutCategories` array of 4 routines) & `todayWorkoutSplits` in `src/pages/Workouts.jsx` (Lines 122–175)
- **UI Data Source Breakdown**:
  1. `src/pages/Workouts.jsx`:
     - Today's Recommended Split (Lines 122–175): Hardcoded 7-day schedule (Sunday through Saturday).
     - Curated Routines: Reads from `workoutCategories` in `data/workouts.js`.
  2. `src/pages/WorkoutDetail.jsx` (Line 63): Reads routine definition from `workoutCategories` in `data/workouts.js`.
  3. `src/services/api.js` (Line 85): `workoutApi.getWorkouts()` queries `/api/workouts` from MongoDB.
- **Verdict**: **Seeded MongoDB Mirror**. Routines match between MongoDB `workouts` collection and frontend static configurations.

---

### E. Tracker & Daily Reset (Calories, Protein, Water, Weight, Workouts)
- **MongoDB Storage**: `users.fitnessStats` (`nutrition.meals`, `water`, `weightHistory`, `activity`, `workoutLogs`, `workoutStats`, `streak`)
- **Client-Side Fallback**: `localStorage` keys (`fitkart_workout_stats`, `fitkart_workout_logs`, `fitkart_workout_prs`, `fitkart_achievements`)
- **UI Data Source Breakdown**:
  1. `src/pages/Dashboard.jsx` (Lines 118–165):
     - **Logged-In User**: Reads directly from `user.fitnessStats` (from MongoDB).
     - **Daily Reset**: Calculates today's calories, protein, and water strictly against the user's current local date (`getLocalDateString()`). New calendar days start at 0; past history remains preserved in MongoDB.
     - **Logged-Out / Offline**: Falls back to `localStorage` (Lines 168–176).
  2. `src/pages/Dashboard.jsx` (Lines 179–187): Cloud Sync button invokes `refreshUser()` to re-fetch live state from MongoDB.
  3. `src/pages/WorkoutDetail.jsx` (Lines 299–360): Completing all sets in a workout saves the session log into `user.fitnessStats.workoutLogs` via `updateUser({ fitnessStats: ... })` (`PUT /api/auth/profile`), persisting to MongoDB.
- **Verdict**: **MongoDB Native Source of Truth**. LocalStorage is used strictly as a disconnected/offline cache.

---

### F. Orders & Order Tracking
- **MongoDB Collection**: `orders` (11 documents)
- **Client-Side Storage**: `user.orders` array & `fitkart_user` snapshot in localStorage
- **UI Data Source Breakdown**:
  1. `src/pages/PaymentPage.jsx` (Line 145): Calls `orderApi.createOrder(orderPayload)` to write the order to MongoDB `orders` collection and reward FitCoins on the `User` document.
  2. `src/pages/MyOrders.jsx` (Lines 19–33):
     - Calls `orderApi.getMyOrders()` to fetch from MongoDB.
     - Falls back to `user?.orders` array only if the API request fails.
  3. `src/pages/OrderTracking.jsx` (Line 18): Reads order object passed in navigation state, or fetches live via `orderApi.getOrderById(orderId)` from MongoDB.
- **Verdict**: **MongoDB Native Source of Truth**.

---

### G. Food Nutrition Search
- **Primary Source**: `src/data/foodNutrition.js` (60+ verified curated fitness foods with high-res Unsplash visuals)
- **Fallback Source**: Open Food Facts API (queried through backend `server/src/controllers/nutritionController.js` at `GET /api/nutrition/search`)
- **UI Data Source Breakdown**:
  1. `src/utils/nutritionApi.js` (Lines 28–56): Searches verified local dataset first (`searchFoodsLocal`). If matches >= 3, returns verified local data immediately.
  2. `src/utils/nutritionApi.js` (Lines 59–85): If local results are fewer than 3 or food is unlisted (e.g. *Nutella, Oreo, Snickers, Amul Butter*), calls backend `nutritionApi.searchFood(query)` which queries Open Food Facts API with timeout guards and User-Agent headers.
- **Verdict**: **Curated Local Primary + Live Open Food Facts API Fallback**.

---

## 3. Comprehensive Record Classification: 15 Users & 11 Orders

### A. Classification of the 15 Users in MongoDB

| # | MongoDB ID | Name | Email | Role | Classification | Justification / Origin |
|---|---|---|---|:---:|:---:|---|
| **1** | `6a93002c...` | Admin FitKart | `admin@fitkart.com` | `admin` | **Admin / Seed** | Default system administrator account (500 FitCoins, seeded). |
| **2** | `6a930fd8...` | Audit Athlete | `audit_user_1788022744608@example.com` | `user` | **Test / Audit** | Created during automated registration testing on Aug 29. |
| **3** | `6a931d0d...` | Audit Athlete | `audit_athlete_1788026125543@example.com` | `user` | **Test / Audit** | Created during checkout testing (placed order `FK26126062`). |
| **4** | `6a931dd2...` | Test Athlete | `audit_1788026322586@fitkart.test` | `user` | **Test / Audit** | Created during cart & order verification (Order `FK26323179`). |
| **5** | `6a943482...` | Audit Athlete | `audit_1788097666298@fitkart.test` | `user` | **Test / Audit** | Created during order cancellation testing (Order `FK97667999`). |
| **6** | `6aa02895...` | **Aswin R** | `user@fitkart.com` | `user` | **REAL USER** | Real user account with 2 saved Bengaluru addresses, order `FK81265398`, and 5-star review on `wl-1`. |
| **7** | `6aa02970...` | Test FullStack | `fullstack_test_1470565584@fitkart.com` | `user` | **Test / Audit** | Created during full-stack API verification test. |
| **8** | `6aa7976f...` | **M Harine** | `m.harine97531@gmail.com` | `user` | **REAL USER** | Real user registered account created on Sep 14. |
| **9** | `6aa7977a...` | **Aswin SP** | `aswinsp.2006@gmail.com` | `user` | **REAL USER (PRIMARY)** | Active real user account with Madurai address, order `FK95827512`, 9 completed workout logs, 2 meals, 20m activity, and 3-star review on `wl-11`. |
| **10** | `6aa7ab49...` | Aswin CrossDevice | `aswin.test.1789373257281@fitkart.app` | `user` | **Test / Sync** | Cross-device focus sync test account #1. |
| **11** | `6aa7ab71...` | Aswin CrossDevice | `aswin.test.1789373297318@fitkart.app` | `user` | **Test / Sync** | Cross-device focus sync test account #2. |
| **12** | `6aa7ad25...` | Aswin CrossDevice | `aswin.test.1789373733511@fitkart.app` | `user` | **Test / Sync** | Cross-device focus sync test account #3. |
| **13** | `6aab650e...` | Daily Reset Tester | `daily_test_1789617422547@fitkart.app` | `user` | **Test / Reset** | Daily reset automated test account #1. |
| **14** | `6aab6529...` | Daily Reset Tester | `daily_test_1789617449350@fitkart.app` | `user` | **Test / Reset** | Daily reset automated test account #2. |
| **15** | `6aab6576...` | Daily Reset Tester | `daily_test_1789617526120@fitkart.app` | `user` | **Test / Reset** | Daily reset automated test account #3. |

* **Real User Accounts**: **3** (`aswinsp.2006@gmail.com`, `user@fitkart.com`, `m.harine97531@gmail.com`)
* **Admin Accounts**: **1** (`admin@fitkart.com`)
* **Automated Test / Audit Accounts**: **11**

---

### B. Classification of the 11 Orders in MongoDB

| # | Order ID | Customer Name | Email | Total | Status | Classification | Justification / Origin |
|---|---|---|---|:---:|:---:|:---:|---|
| **1** | `FK21851065` | Aswin S P | *(Guest/No email)* | ₹268 | `Order Confirmed` | **REAL USER** | Real customer purchase of Almond Butter placed on Aug 29. |
| **2** | `FK26126062` | Audit Athlete | `audit_athlete_...@example.com` | ₹1,849 | `Out for Delivery` | **Test / Audit** | Automated checkout flow test for Whey Protein Isolate. |
| **3** | `FK26323179` | Test Athlete | `audit_...@fitkart.test` | ₹4,097 | `Preparing` | **Test / Audit** | Automated multi-item order test (Whey + Almonds). |
| **4** | `FK26323239` | Guest Shopper | *(Guest/No email)* | ₹4,097 | `Order Confirmed` | **Test / Demo** | Guest checkout test for multi-item cart. |
| **5** | `FK97667999` | Audit Athlete | `audit_...@fitkart.test` | ₹4,097 | `Cancelled` | **Test / Audit** | Automated order cancellation test. |
| **6** | `FK97668164` | Guest Shopper | *(Guest/No email)* | ₹4,097 | `Order Confirmed` | **Test / Demo** | Guest checkout verification test. |
| **7** | `FK97668459` | Audit Athlete | `audit_...@fitkart.test` | ₹1,899 | `Delivered` | **Test / Audit** | Delivery completion test for Whey. |
| **8** | `FK98401244` | Aswin S P | *(Guest/No email)* | ₹188 | `Order Confirmed` | **REAL USER** | Real customer purchase of Steel Cut Oats placed on Aug 30. |
| **9** | `FK59945249` | Aswin S P | *(Guest/No email)* | ₹78 | `Order Confirmed` | **REAL USER** | Real customer purchase of Sprouted Moong placed on Aug 31. |
| **10** | `FK81265398` | Aswin R | `user@fitkart.com` | ₹948 | `Shipped` | **REAL USER** | Real authenticated order of Rolled Oats with Bengaluru address. |
| **11** | `FK95827512` | Aswin SP | `aswinsp.2006@gmail.com` | ₹288 | `Order Confirmed` | **REAL USER** | Real authenticated COD order of Grilled Chicken Meal with Madurai address. |

* **Real User Orders**: **5** (`FK95827512`, `FK81265398`, `FK21851065`, `FK98401244`, `FK59945249`)
* **Automated Test / Demo Orders**: **6** (`FK26126062`, `FK26323179`, `FK26323239`, `FK97667999`, `FK97668164`, `FK97668459`)

---

## 4. Summary Table of Duplicate & Fallback Data Locations

| Data Category | Static / Fallback File | MongoDB Collection | UI Consumption Point |
|---|---|---|---|
| **Products** | `src/data/products.js` | `products` (416 docs) | Store pages read static bundle; Admin reads MongoDB |
| **Reviews** | `src/data/reviews.js` | `reviews` (3 docs) | `ReviewSection.jsx` queries MongoDB, falls back to localStorage |
| **Exercises** | `src/data/workouts.js` | `exercises` (124 docs) | `Workouts.jsx` reads static bundle for GIFs; backend stores all 124 docs |
| **Workouts** | `src/data/workouts.js` | `workouts` (4 docs) | `Workouts.jsx` reads static routine list; backend mirrors routines |
| **Tracker** | `localStorage` (`fitkart_workout_stats`) | `users.fitnessStats` | Logged-in users read/write MongoDB; guests use localStorage |
| **Orders** | `user.orders` in localStorage | `orders` (11 docs) | `MyOrders.jsx` queries MongoDB, falls back to local user array |
| **Nutrition** | `src/data/foodNutrition.js` | Open Food Facts API | Local dataset is primary; OFF API is fallback |

---

*Report generated via read-only source code inspection and database analysis.*
