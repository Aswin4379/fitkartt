// LocalStorage-backed review store for offline / user-added reviews.
// Reviews are keyed by product id (not variant id) since ratings apply to
// the product as a whole, though each review records which variant was purchased.

const STORAGE_KEY = 'fitkart_reviews'

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // storage unavailable, ignore
  }
}

// Returns only real user-added reviews stored locally for a product
export function getReviewsForProduct(product) {
  if (!product || !product.id) return []
  const store = readStore()
  return store[product.id] || []
}

export function addReview(product, { name, rating, text, variantLabel }) {
  if (!product || !product.id) return null
  const store = readStore()
  const review = {
    id: `${product.id}-user-${Date.now()}`,
    productId: product.id,
    name: name || 'Anonymous',
    rating,
    text,
    date: new Date().toISOString(),
    verified: true,
    variantLabel: variantLabel || null,
    helpful: 0,
    seed: false,
  }
  const existing = store[product.id] || []
  const updated = { ...store, [product.id]: [review, ...existing] }
  writeStore(updated)
  return review
}

export function markHelpful(product, reviewId) {
  if (!product || !product.id) return
  const store = readStore()
  const userReviews = store[product.id] || []
  const userIdx = userReviews.findIndex((r) => r.id === reviewId)
  if (userIdx !== -1) {
    const updated = [...userReviews]
    updated[userIdx] = { ...updated[userIdx], helpful: (updated[userIdx].helpful || 0) + 1 }
    writeStore({ ...store, [product.id]: updated })
  }
}

export function getRatingBreakdown(reviews) {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  if (!Array.isArray(reviews)) return [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, pct: 0 }))
  
  reviews.forEach((r) => {
    const star = Math.round(r.rating)
    if (breakdown[star] !== undefined) breakdown[star]++
  })
  const total = reviews.length
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: breakdown[star],
    pct: total > 0 ? Math.round((breakdown[star] / total) * 100) : 0,
  }))
}

export function getAverageRating(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) return 0
  const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0)
  return Math.round((sum / reviews.length) * 10) / 10
}