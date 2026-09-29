import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Star,
  Flame,
  Dumbbell,
  Activity,
  Droplet,
  ShieldCheck,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import HeroBanner from '../components/HeroBanner.jsx'
import OfferCarousel from '../components/OfferCarousel.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { getBestDiscountVariant } from '../utils/productVariants.js'

export default function Home() {
  const { products, categories, getTrending, getBestSellers, getNewArrivals, getRecommended } = useProducts()

  const flashDeals = products
    .filter((p) => {
      const v = getBestDiscountVariant(p)
      return v.mrp - v.price >= 30
    })
    .slice(0, 8)

  const trending = getTrending()
  const bestSellers = getBestSellers()
  const newArrivals = getNewArrivals()
  const recommended = getRecommended(8)

  // Flash Sale countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 3, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const format2 = (n) => (n < 10 ? `0${n}` : n)

  return (
    <AppLayout showFooter>
      <HeroBanner />

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-12">
        
        {/* Active Offers Carousel */}
        <OfferCarousel />

        {/* AI Recommendation Teaser Banner */}
        <Link to="/ai-recommendation" className="block">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="card p-5 bg-gradient-to-r from-fit-primary/15 via-fit-surface to-fit-surface2 border-fit-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-fit-primary/20 border border-fit-primary/40 flex items-center justify-center shrink-0">
                <Sparkles size={24} className="text-fit-primary animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-new">NEW FEATURE</span>
                  <h3 className="text-base font-black text-fit-text">
                    Smart AI Diet &amp; Nutrition Planner
                  </h3>
                </div>
                <p className="text-xs text-fit-muted mt-0.5">
                  Calculate exact BMR, macro splits &amp; get personalized supplement stacks in 30 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-fit-primary bg-fit-primary/10 px-4 py-2 rounded-xl border border-fit-primary/30">
              <span>Calculate Macros</span>
              <ArrowRight size={14} />
            </div>
          </motion.div>
        </Link>

        {/* Browse by Fitness Goal / Featured Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="section-eyebrow">Target Your Goals</span>
              <h2 className="section-title">Shop by Fitness Category</h2>
            </div>
            <Link
              to="/category/all"
              className="text-xs text-fit-primary font-bold hover:underline flex items-center gap-1"
            >
              <span>View All ({products.length})</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl border border-fit-border bg-fit-surface2 hover:border-fit-primary transition-all duration-300 flex flex-col h-32 sm:h-36 p-3 justify-between shadow-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-sm shadow-sm">
                    {cat.icon}
                  </span>
                  <span className="text-[10px] text-fit-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Explore →
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight group-hover:text-fit-primary transition-colors">
                    {cat.name}
                  </h3>
                  {cat.subtitle && (
                    <p className="text-[10px] text-gray-200 line-clamp-1 mt-0.5 font-medium">
                      {cat.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Deals with Live Countdown */}
        <section className="card p-4 sm:p-5 bg-fit-surface border-fit-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-fit-border">
            <div>
              <span className="section-eyebrow flex items-center gap-1">
                <Flame size={12} className="text-orange-500" /> Limited Time Price Drops
              </span>
              <h2 className="section-title flex items-center gap-2">
                <Zap size={18} className="text-fit-accent fill-fit-accent" /> Flash Sale Deals
              </h2>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-fit-surface2 px-3 py-1.5 rounded-xl border border-fit-border self-start sm:self-auto">
              <Clock size={14} className="text-fit-primary animate-pulse" />
              <span className="text-xs text-fit-muted font-medium">Ends in:</span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-fit-primary">
                <span className="bg-fit-surface px-1.5 py-0.5 rounded border border-fit-border">
                  {format2(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-fit-surface px-1.5 py-0.5 rounded border border-fit-border">
                  {format2(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-fit-surface px-1.5 py-0.5 rounded border border-fit-border">
                  {format2(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {flashDeals.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>

        {/* Trending Workout & Diet Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="section-eyebrow">High Demand Now</span>
              <h2 className="section-title flex items-center gap-2">
                <TrendingUp size={18} className="text-fit-primary" /> Trending in Fitness
              </h2>
            </div>
            <Link to="/category/all" className="text-xs text-fit-primary font-bold hover:underline">
              See All
            </Link>
          </div>

          <div className="product-grid">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Workout Hub Teaser Strip */}
        <section className="rounded-2xl border border-fit-border bg-gradient-to-r from-fit-surface2 via-fit-surface to-fit-surface p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="badge-new">NEW WORKOUT PORTAL</span>
            <h2 className="text-xl sm:text-2xl font-black text-fit-text">
              Track Sets, Reps &amp; Rest with Live Timer
            </h2>
            <p className="text-xs sm:text-sm text-fit-muted leading-relaxed">
              Log your workout sessions, track personal records (PRs), and follow step-by-step exercise video guides.
            </p>
          </div>
          <Link
            to="/workouts"
            className="btn-primary text-xs sm:text-sm px-6 py-3 shrink-0 flex items-center gap-2"
          >
            <Dumbbell size={16} />
            <span>Launch Workouts</span>
          </Link>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="section-eyebrow">Fresh in Stock</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link to="/category/all" className="text-xs text-fit-primary font-bold hover:underline">
              View All
            </Link>
          </div>
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="section-eyebrow">Athlete Favorites</span>
              <h2 className="section-title flex items-center gap-1.5">
                <Award size={18} className="text-fit-accent" /> Best Sellers
              </h2>
            </div>
            <Link to="/category/all" className="text-xs text-fit-primary font-bold hover:underline">
              View All
            </Link>
          </div>
          <div className="product-grid">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Recommended for You */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="section-eyebrow">Curated for Your Progress</span>
              <h2 className="section-title flex items-center gap-1.5">
                <Star size={18} className="fill-fit-accent text-fit-accent" /> Recommended For You
              </h2>
            </div>
          </div>
          <div className="product-grid">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </main>
    </AppLayout>
  )
}
