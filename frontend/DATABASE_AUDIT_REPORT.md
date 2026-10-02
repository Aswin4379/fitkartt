# FitKart Database & Backend Audit Report

**Audit Mode**: Comprehensive Verification & Synchronization  
**Database**: `fitkart` on `mongodb://127.0.0.1:27017`  
**Backend**: Express / Node.js on `http://localhost:5000` (Mongoose 8.5.2)  
**Date of Audit**: 2026-09-20  

---

## 1. Environment & Connection Configuration

| File | Parameter | Configured Value | Status |
|---|---|---|:---:|
| `server/.env` | `PORT` | `5000` | PASS |
| `server/.env` | `MONGODB_URI` | `mongodb://127.0.0.1:27017/fitkart` | PASS |
| `server/.env` | `JWT_SECRET` | `fitkart_super_secret_jwt_key_2026_fitkart` | PASS |
| `server/.env` | `NODE_ENV` | `development` | PASS |
| `server/src/config/db.js` | Connection Method | `mongoose.connect(process.env.MONGODB_URI)` | PASS |

---

## 2. Collections Overview & Document Counts (Live MongoDB)

| Collection Name | Mongoose Model | Document Count | Indexes | Real vs Seed Status |
|---|---|:---:|:---:|---|
| **`exercises`** | `Exercise.js` | **124** | 3 (`_id`, `id_1` unique, `target_1`) | **Populated & Active**: All 124 exercises across 10 categories stored with GIF movement URLs, equipment, difficulty, instructions, and form tips. |
| **`products`** | `Product.js` | **416** | 3 (`_id`, `id_1` sparse, `category_1`) | **Seeded & Active**: 416 products across 8 categories with full variant, pricing, stock, and macro data. |
| **`users`** | `User.js` | **15** | 2 (`_id`, `email_1` unique) | **Real & Active**: Stores registered accounts, password hashes, profile metrics, addresses, cart items, and tracker history. |
| **`orders`** | `Order.js` | **11** | 2 (`_id`, `orderId_1` unique) | **Real & Active**: Customer and test orders with line items, delivery addresses, payment methods, and live tracking timelines. |
| **`reviews`** | `Review.js` | **3** | 2 (`_id`, `productId_1`) | **Real & Active**: Verified user reviews with star ratings, comments, and helpful vote tracking. |
| **`workouts`** | `Workout.js` | **4** | 2 (`_id`, `id_1` unique) | **Seeded & Active**: 4 workout routines with exercise sequences, duration, and calorie estimates. |

---

## 3. Detailed Collection Inspections & Sample Records

### A. `exercises` Collection (124 Documents)
- **Schema**: `id`, `name`, `target`, `categories`, `secondary`, `equipment`, `level`, `videoUrl`, `gifUrl`, `imageUrl`, `image2Url`, `instructions`, `formTips`, `commonMistakes`, `defaultSets`, `defaultReps`, `defaultWeight`.
- **API Endpoint**: `GET /api/exercises`, `GET /api/exercises/:id`
- **Sample Records**:
  1. `bench-press`: *Barbell Bench Press* | Target: `Chest` | Equipment: `Barbell` | Level: `Intermediate`
  2. `deadlift`: *Barbell Deadlift* | Target: `Back` | Equipment: `Barbell` | Level: `Advanced`
  3. `barbell-back-squat`: *Barbell Back Squat* | Target: `Legs` | Equipment: `Barbell` | Level: `Intermediate`
  4. `plank`: *Forearm Plank Hold* | Target: `Abs & Core` | Equipment: `Bodyweight` | Level: `Beginner`

---

### B. `users` Collection (15 Documents)
- **Schema**: `name`, `email`, `password` (bcrypt hash), `phone`, `role`, `goal`, `age`, `gender`, `height`, `activityLevel`, `startingWeight`, `currentWeight`, `targetWeight`, `fitCoins`, `isPremium`, `subscription`, `cart`, `addresses`, `wishlist`, `orders`, `fitnessStats`.
- **Sample Records**:
  1. **User `aswinsp.2006@gmail.com`**:
     - Weights: Start `75kg` / Current `70kg` / Target `65kg` | Height: `175cm` | Age: `24`
     - Saved Addresses: `1` | Cart Items: `1` | Orders: `1` (`FK95827512`)
     - Fitness Stats: `20 mins activity`, `153 kcal burned`, `9 completed workout logs`, `Streak: 1`
  2. **Admin `admin@fitkart.com`**:
     - Role: `admin` | FitCoins: `500` | isPremium: `true`

---

### C. `products` Collection (416 Documents)
- **8 Categories (52 products each)**: `diet-meals`, `fitness-maintenance`, `fruits`, `healthy-snacks`, `protein-supplements`, `weight-gain`, `weight-loss`, `workout-products`.
- **Sample Record (`wl-1`)**: `Rolled Oats` | Brand: `FitKart` | 4 Variants | Rating: `4.5` | In Stock: `true`.

---

### D. `orders` Collection (11 Documents)
- **Sample Orders**:
  1. `FK95827512`: *Grilled Chicken Meal* (₹288) | Payment: COD | Status: `Order Confirmed`
  2. `FK81265398`: *Rolled Oats* (₹948) | Payment: UPI | Status: `Shipped`

---

### E. `reviews` Collection (3 Documents)
- Verified reviews on products `wl-1`, `wg-2`, `wl-11` with ratings, comments, and helpful vote tracking.

---

### F. `workouts` Collection (4 Documents)
- Curated template routines: `chest-hypertrophy`, `back-biceps-power`, `leg-day-strength`, `core-hiit-blast`.

---

## 4. Summary Matrix: Real Data vs Mock / Static Fallbacks

| Feature | Primary Database Storage | Client / LocalStorage Role | Status |
|---|---|---|:---:|
| **124 Exercise Library** | **MongoDB (`exercises` - 124 docs)** | Client fallback cache | **PASS** |
| **Workout Routines** | **MongoDB (`workouts` - 4 docs)** | Client fallback cache | **PASS** |
| **User Completed Workouts** | **MongoDB (`users.fitnessStats.workoutLogs`)** | In-memory session state | **PASS** |
| **User Accounts & Auth** | **MongoDB (`users` - 15 docs)** | JWT token & snapshot cache | **PASS** |
| **User Profile & Bio-Metrics**| **MongoDB (`users`)** | Live metabolic engine | **PASS** |
| **Shipping Addresses** | **MongoDB (`users.addresses`)** | Selected checkout address | **PASS** |
| **Shopping Cart** | **MongoDB (`users.cart`)** | `fitkart_cart` guest sync | **PASS** |
| **Orders & Tracking** | **MongoDB (`orders` - 11 docs)** | Live API queries | **PASS** |
| **Product Reviews** | **MongoDB (`reviews` - 3 docs)** | Static review fallback | **PASS** |
| **Products Catalog** | **MongoDB (`products` - 416 docs)** | Static products bundle | **PASS** |
| **Daily Tracker & Reset** | **MongoDB (`users.fitnessStats`)** | Daily calendar reset | **PASS** |
| **Food Nutrition Search** | **Open Food Facts API (`/api/nutrition/search`)**| Curated local dataset | **PASS** |

---

*Report updated with full 124-exercise database synchronization and verified backend APIs.*
