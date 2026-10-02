import { useState, useMemo, useEffect } from 'react'
import { Star, ThumbsUp, ShieldCheck, ChevronDown } from 'lucide-react'
import {
  getReviewsForProduct,
  getAverageRating,
  getRatingBreakdown,
  addReview,
  markHelpful,
} from '../data/reviews.js'
import { reviewApi } from '../services/api.js'

const SORT_OPTIONS = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'helpful', label: 'Most Helpful' },
  { id: 'high', label: 'Highest Rated' },
  { id: 'low', label: 'Lowest Rated' },
]

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? 'fill-fit-accent text-fit-accent'
              : 'text-fit-border'
          }
        />
      ))}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ReviewSection({ product, selectedVariantLabel, onStatsChange }) {
  const [reviews, setReviews] = useState([])
  const [filterStar, setFilterStar] = useState(null)
  const [sort, setSort] = useState('recent')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 5, text: '' })
  const [helpfulClicked, setHelpfulClicked] = useState([])

  const productId = product?.id || product?._id

  useEffect(() => {
    let isMounted = true
    if (productId) {
      reviewApi.getProductReviews(productId)
        .then((res) => {
          if (isMounted) {
            if (Array.isArray(res) && res.length > 0) {
              const normalized = res.map((r) => ({
                id: r._id || r.id,
                name: r.author || r.name,
                rating: r.rating,
                text: r.comment || r.text,
                date: r.date || r.createdAt,
                verified: r.verifiedPurchase !== false,
                helpful: r.helpfulVotes || r.helpful || 0,
                variantLabel: r.variantLabel || ''
              }))
              setReviews(normalized)
            } else {
              const localReviews = getReviewsForProduct(product)
              setReviews(localReviews)
            }
          }
        })
        .catch(() => {
          if (isMounted) {
            const localReviews = getReviewsForProduct(product)
            setReviews(localReviews)
          }
        })
    }
    return () => { isMounted = false }
  }, [productId, product])

  const avgRating = getAverageRating(reviews)
  const breakdown = getRatingBreakdown(reviews)

  useEffect(() => {
    if (onStatsChange) {
      onStatsChange({ rating: avgRating, count: reviews.length })
    }
  }, [avgRating, reviews.length]) // Intentional omission of onStatsChange to prevent loops if parent recreates it without useCallback

  const filtered = useMemo(() => {
    let list = filterStar ? reviews.filter((r) => Math.round(r.rating) === filterStar) : [...reviews]
    if (sort === 'recent') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sort === 'helpful') list.sort((a, b) => b.helpful - a.helpful)
    if (sort === 'high') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'low') list.sort((a, b) => a.rating - b.rating)
    return list
  }, [reviews, filterStar, sort])

  const handleHelpful = async (reviewId) => {
    if (helpfulClicked.includes(reviewId)) return
    setHelpfulClicked((prev) => [...prev, reviewId])
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r)))

    try {
      await reviewApi.voteReview(reviewId)
    } catch {
      markHelpful(product, reviewId)
    }
  }

  const submitReview = async (e) => {
    e.preventDefault()
    if (!form.text.trim()) return

    const authorName = form.name.trim() || 'Anonymous'
    const newReview = {
      id: `rev-${Date.now()}`,
      name: authorName,
      rating: form.rating,
      text: form.text.trim(),
      comment: form.text.trim(),
      date: new Date().toISOString(),
      verified: true,
      helpful: 0,
      variantLabel: selectedVariantLabel || '',
    }

    setReviews((prev) => [newReview, ...prev])
    setForm({ name: '', rating: 5, text: '' })
    setShowForm(false)

    try {
      await reviewApi.createReview({
        productId,
        author: authorName,
        rating: form.rating,
        title: `${form.rating}-Star Review`,
        comment: form.text.trim()
      })
    } catch {
      addReview(product, {
        name: authorName,
        rating: form.rating,
        text: form.text.trim(),
        variantLabel: selectedVariantLabel,
      })
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="section-title">Ratings &amp; Reviews</h2>

      {/* Average + breakdown */}
      <div className="card p-4 flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col items-center justify-center sm:w-32 flex-shrink-0">
          <span className="text-3xl font-bold">{avgRating || product.rating}</span>
          <StarRow rating={avgRating || product.rating} size={16} />
          <span className="text-xs text-fit-muted mt-1">{reviews.length} reviews</span>
        </div>
        <div className="flex-1 space-y-1.5">
          {breakdown.map(({ star, count, pct }) => (
            <button
              key={star}
              onClick={() => setFilterStar(filterStar === star ? null : star)}
              className="flex items-center gap-2 w-full text-left"
            >
              <span className="text-[11px] text-fit-muted w-8">{star} star</span>
              <div className="flex-1 h-1.5 bg-fit-surface2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${filterStar === star ? 'bg-fit-primary' : 'bg-fit-accent'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] text-fit-muted w-8 text-right">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters + sort */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterStar(null)}
            className={`chip text-xs py-1.5 ${filterStar === null ? 'chip-active' : ''}`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setFilterStar(filterStar === star ? null : star)}
              className={`chip text-xs py-1.5 flex items-center gap-1 ${filterStar === star ? 'chip-active' : ''}`}
            >
              {star} <Star size={10} className="fill-current" />
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field text-xs py-1.5 pl-3 pr-8 appearance-none"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
        </div>
      </div>

      {/* Write a review CTA / form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn-outline w-full text-sm">
          Write a Review
        </button>
      ) : (
        <form onSubmit={submitReview} className="card p-4 space-y-3">
          <div>
            <p className="text-xs text-fit-muted mb-1.5">Your rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                  <Star size={22} className={n <= form.rating ? 'fill-fit-accent text-fit-accent' : 'text-fit-border'} />
                </button>
              ))}
            </div>
          </div>
          <input
            placeholder="Your name (optional)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field text-sm"
          />
          <textarea
            required
            placeholder="Share your experience with this product..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            rows={3}
            className="input-field text-sm resize-none"
          />
          {selectedVariantLabel && (
            <p className="text-[11px] text-fit-muted">Reviewing: {selectedVariantLabel}</p>
          )}
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1 text-sm">Submit Review</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm px-4">Cancel</button>
          </div>
        </form>
      )}

      {/* Review list */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-8 card border-dashed">
            <p className="text-sm font-medium text-fit-text">No reviews yet</p>
            <p className="text-xs text-fit-muted mt-1">Be the first to share your experience with this product!</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-sm text-fit-muted py-6">No reviews match this filter.</p>
        ) : null}
        {filtered.map((r) => (
          <div key={r.id} className="card p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{r.name}</span>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-fit-primary font-medium">
                      <ShieldCheck size={11} /> Verified Purchase
                    </span>
                  )}
                </div>
                <StarRow rating={r.rating} size={12} />
              </div>
              <span className="text-[11px] text-fit-muted flex-shrink-0">{formatDate(r.date)}</span>
            </div>

            {r.variantLabel && (
              <p className="text-[11px] text-fit-muted mb-2">Variant purchased: {r.variantLabel}</p>
            )}

            <p className="text-sm text-fit-text leading-relaxed mb-3">{r.text}</p>

            <button
              onClick={() => handleHelpful(r.id)}
              disabled={helpfulClicked.includes(r.id)}
              className={`flex items-center gap-1.5 text-xs ${
                helpfulClicked.includes(r.id) ? 'text-fit-primary' : 'text-fit-muted'
              }`}
            >
              <ThumbsUp size={13} className={helpfulClicked.includes(r.id) ? 'fill-fit-primary' : ''} />
              Helpful ({r.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
