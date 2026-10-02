# FitKart 🥗💪

A premium, mobile-first fitness & nutrition delivery e-commerce frontend — inspired by Blinkit/Instamart, focused on gym supplements, healthy meals, and fitness lifestyle products.

Built with **React + React Router + Tailwind CSS + Framer Motion**, using **Context API** for cart/user state and **localStorage** for demo auth and persistence.

---

## ✨ Features

- Animated splash screen → login/signup/OTP/forgot-password flow (demo auth, Google login mock)
- Home feed: location + delivery ETA, search, offer carousel, flash deals, categories, trending, best sellers
- Reusable `ProductCard` with wishlist, ratings, calories/protein, quantity stepper
- Category browsing + sorting, live search
- Product details with nutrition info, ingredients, reviews, related products
- Cart with coupons (`FIRST20`, `FIT50`, `PROTEIN10`), free-delivery threshold, recommendations
- Full checkout: address (Home/Hostel/Work) → payment (UPI/Card/NetBanking/COD) → animated order success
- Live-updating order tracking timeline (Confirmed → Preparing → Packed → Out for Delivery → Delivered)
- Profile: orders, wishlist, addresses, fitness goal, FitCoins, Premium status
- **AI Diet Recommendation** — real BMR-based calorie & protein targets from age/weight/height/goal, with matched product suggestions
- Fitness Dashboard — weight trend chart, calorie/protein rings, water tracker, achievements
- Workouts — Beginner / Home / Gym / Chest / Leg / Full body, with a checkable exercise tracker
- FitCoins rewards system with redeemable perks
- FitKart Premium subscription page
- Community feed — transformation posts, likes, comments, challenges
- Admin dashboard (frontend-only) — product CRUD (add/remove), order list, mock sales analytics

Dark, glassmorphism-heavy green/black theme throughout, with Framer Motion transitions on splash, order success, order tracking, and card interactions.

---

## 🗂 Project Structure

```
src/
 ├── components/     # ProductCard, TopBar, BottomNav, AppLayout, PageHeader, OfferCarousel, ProtectedRoute
 ├── pages/          # All 20+ route-level pages
 ├── context/        # CartContext, UserContext (localStorage-backed)
 ├── data/           # products.js, workouts.js (sample catalogue)
 ├── hooks/          # useLocalStorage
 ├── utils/          # format.js (price/date helpers)
 ├── App.jsx         # Route definitions
 └── main.jsx        # Entry point (Router + Providers)
```

---

## 🚀 Setup

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# Vite will print a local URL, typically http://localhost:5173
```

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

> **Note:** This project was generated in an offline sandbox without npm registry access, so dependencies could not be pre-installed or the build pre-verified here. Run `npm install` locally — the code follows standard React 18 / React Router 6 / Tailwind 3 / Framer Motion 11 APIs, so it should build cleanly. If you hit a version-specific issue, check that your installed `react-router-dom` and `framer-motion` major versions match `package.json`.

---

## 🔑 Demo login

Signup creates a real "account" in `localStorage`. For a quick look without signing up, Login also accepts **any email + password** and creates a session on the fly (for showcase purposes only — replace with a real backend for production).

There's also a **"Continue with Google"** button that logs in as a mock premium user instantly.

---

## 🎨 Design tokens

Defined in `tailwind.config.js` under `theme.extend.colors.fit`:

| Token | Hex | Use |
|---|---|---|
| `fit-bg` | `#0A0F0C` | App background |
| `fit-surface` / `fit-surface2` | `#111813` / `#161F19` | Cards, inputs |
| `fit-primary` | `#39FF6A` | Primary actions, highlights |
| `fit-accent` | `#B6FF3C` | Secondary accents, ratings |
| `fit-text` / `fit-muted` | `#EAF5EE` / `#8CA398` | Text |

---

## 🔌 Wiring in a real backend

Everything currently reads/writes `localStorage` via `CartContext` and `UserContext`. To go to production:

1. Replace the `signup`/`login`/`loginWithGoogle` functions in `src/context/UserContext.jsx` with real API calls (and swap Google mock for real OAuth).
2. Replace `src/data/products.js` with API-fetched data (keep the same shape: `id, name, category, price, mrp, rating, reviews, calories, protein, image, unit, description, ingredients, tags`).
3. Wire `PaymentPage.jsx` to a real payment gateway (Razorpay/Stripe/etc.) instead of the simulated `setTimeout`.
4. Replace the mock order data in `AdminDashboard.jsx` with real order/analytics endpoints.

---

## 📦 Tech Stack

- React 18 + React Router DOM 6
- Tailwind CSS 3
- Framer Motion 11
- lucide-react (icons)
- Context API + localStorage (no external state library needed for this scope)
