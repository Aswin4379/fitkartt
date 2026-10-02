import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Flame, Dumbbell, Wheat, Droplet, Leaf, ChevronRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { searchFoods, getFoodDetails } from '../utils/nutritionApi.js'
import { getFoodImage, getCategoryFallbackImage, PLACEHOLDER_IMAGE } from '../utils/foodImageMap.js'

const POPULAR_FOODS = [
  'Egg',
  'Chicken',
  'Rice',
  'Oats',
  'Paneer',
  'Banana',
  'Almonds',
  'Milk',
  'Greek Yogurt',
  'Sweet Potato',
  'Apple',
  'Whey Protein'
]

const DEBOUNCE_MS = 250
const MIN_QUERY_LENGTH = 1

export default function FoodNutritionSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [servingMode, setServingMode] = useState('serving') // 'serving' | '100g'
  const [searching, setSearching] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const debounceRef = useRef(null)

  // Debounced live search as the user types
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const trimmed = query.trim()
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([])
      if (!selected) {
        setSearched(false)
      }
      return
    }

    debounceRef.current = setTimeout(() => {
      runSearch(trimmed)
    }, DEBOUNCE_MS)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const runSearch = async (text, autoSelectFirst = false) => {
    setSearching(true)
    setError(null)
    try {
      const foods = await searchFoods(text)
      setResults(foods)
      setSearched(true)
      if (autoSelectFirst && foods.length > 0) {
        await selectResult(foods[0])
      }
    } catch (err) {
      setError(err.message || 'Something went wrong while searching. Please try again.')
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const selectResult = async (item) => {
    setLoadingDetails(true)
    setError(null)
    setServingMode('serving')
    try {
      const details = await getFoodDetails(item.fdcId || item.id)
      setSelected(details)
    } catch (err) {
      setError(err.message || 'Could not load nutrition details for this food. Please try again.')
    } finally {
      setLoadingDetails(false)
    }
  }

  const handlePopularClick = (name) => {
    setQuery(name)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    runSearch(name, true)
  }

  // Clean nutrient formatting - guaranteed never to output "Not available"
  const formatStat = (value, unit) => {
    if (value === null || value === undefined || isNaN(value)) return `0${unit}`
    const num = Number(value)
    if (num > 0 && num < 0.1) return `< 0.1${unit}`
    return `${Math.round(num * 10) / 10}${unit}`
  }

  const handleImageError = (e, category) => {
    const fallback = getCategoryFallbackImage(category)
    if (e.currentTarget.src !== fallback && e.currentTarget.src !== PLACEHOLDER_IMAGE) {
      e.currentTarget.onerror = null
      e.currentTarget.src = fallback
    } else {
      e.currentTarget.src = PLACEHOLDER_IMAGE
    }
  }

  // Compute stats based on current servingMode ('serving' vs '100g')
  const currentData = selected
    ? servingMode === '100g' && selected.per100g
      ? { ...selected, ...selected.per100g, servingLabel: '100g Serving' }
      : { ...selected, servingLabel: selected.servingSize || 'Standard Serving' }
    : null

  const primaryStats = currentData
    ? [
        { label: 'Calories', value: formatStat(currentData.calories, ' kcal'), icon: Flame, color: 'text-orange-400' },
        { label: 'Protein', value: formatStat(currentData.protein, 'g'), icon: Dumbbell, color: 'text-fit-primary' },
        { label: 'Carbs', value: formatStat(currentData.carbs, 'g'), icon: Wheat, color: 'text-yellow-400' },
        { label: 'Healthy Fat', value: formatStat(currentData.fat, 'g'), icon: Droplet, color: 'text-blue-400' },
      ]
    : []

  const secondaryStats = currentData
    ? [
        { label: 'Fiber', value: formatStat(currentData.fiber, 'g'), highlight: currentData.fiber >= 3 },
        { label: 'Sat. Fat', value: formatStat(currentData.saturatedFat, 'g') },
        { label: 'Sugar', value: formatStat(currentData.sugar, 'g') },
        { label: 'Sodium', value: formatStat(currentData.sodium, 'mg') },
        { label: 'Potassium', value: formatStat(currentData.potassium, 'mg') },
        { label: 'Calcium', value: formatStat(currentData.calcium, 'mg') },
        { label: 'Iron', value: formatStat(currentData.iron, 'mg') },
        { label: 'Cholesterol', value: formatStat(currentData.cholesterol, 'mg') },
      ]
    : []

  const showResultsList = results.length > 0 && !selected && !searching
  const showNoMatch = searched && !searching && !error && results.length === 0 && !selected

  return (
    <div className="space-y-4">
      <div>
        <span className="section-eyebrow">Precision Nutrition</span>
        <h2 className="section-title">Food Nutrition Search</h2>
        <p className="text-xs text-fit-muted mt-1">
          Search verified calories, macros &amp; micronutrients across 60+ staple fitness foods &amp; USDA database.
        </p>
      </div>

      {/* Search input bar */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fit-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (selected) setSelected(null)
          }}
          placeholder="Search foods (e.g., Egg, Chicken, Rice, Oats, Paneer, Banana, Almonds, Milk)..."
          className="input-field pl-10 pr-10 text-sm"
        />
        {searching && (
          <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-fit-primary animate-spin" />
        )}
      </div>

      {/* Popular Food Quick Tags */}
      <div>
        <p className="text-xs text-fit-muted mb-2 font-semibold">Popular Staple Foods:</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {POPULAR_FOODS.map((name) => {
            const isMatch = selected?.name?.toLowerCase().includes(name.toLowerCase())
            return (
              <button
                key={name}
                onClick={() => handlePopularClick(name)}
                className={`chip text-xs py-1.5 px-3 transition-all active:scale-95 ${
                  isMatch
                    ? 'chip-active bg-fit-primary text-fit-bg font-bold shadow-glow border-fit-primary'
                    : 'hover:border-fit-primary/60'
                }`}
              >
                {name}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Searching Indicator */}
        {searching && (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-6 flex flex-col items-center gap-2 border-fit-border"
          >
            <Loader2 size={24} className="text-fit-primary animate-spin" />
            <p className="text-xs font-semibold text-fit-muted">Searching verified nutrition database...</p>
          </motion.div>
        )}

        {/* Error message */}
        {error && !searching && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-4 border-red-500/30 bg-red-500/5"
          >
            <p className="text-sm text-red-400 font-bold mb-0.5">Search notification</p>
            <p className="text-xs text-fit-muted">{error}</p>
          </motion.div>
        )}

        {/* Live Search Results List with distinct thumbnails */}
        {showResultsList && (
          <motion.div
            key="results-list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card divide-y divide-fit-border/60 overflow-hidden border-fit-border shadow-card"
          >
            {results.map((item) => {
              const itemImage = item.image || getFoodImage(item.name, item.category)
              return (
                <button
                  key={item.fdcId || item.name}
                  onClick={() => selectResult(item)}
                  className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-fit-surface2/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={itemImage}
                      onError={(e) => handleImageError(e, item.category)}
                      alt={item.name}
                      className="w-11 h-11 rounded-xl object-cover border border-fit-border/80 flex-shrink-0 bg-fit-surface2"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-fit-text truncate group-hover:text-fit-primary transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-fit-muted mt-0.5">
                        {item.category && <span className="text-fit-primary font-medium">{item.category}</span>}
                        {item.calories ? (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-orange-400">{item.calories} kcal</span>
                          </>
                        ) : null}
                        {item.protein ? (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-fit-text">{item.protein}g P</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-fit-muted flex-shrink-0 group-hover:text-fit-primary group-hover:translate-x-0.5 transition-all" />
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Loading details */}
        {loadingDetails && (
          <motion.div
            key="loading-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-6 flex flex-col items-center gap-2"
          >
            <Loader2 size={24} className="text-fit-primary animate-spin" />
            <p className="text-xs text-fit-muted font-medium">Extracting nutrition details...</p>
          </motion.div>
        )}

        {/* Selected food comprehensive nutrition card */}
        {currentData && !loadingDetails && (
          <motion.div
            key={currentData.fdcId || currentData.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="card overflow-hidden border border-fit-border bg-fit-surface shadow-card"
          >
            {/* Top Back and Toggle Bar */}
            <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-fit-border/40 bg-fit-surface2/30">
              {results.length > 1 ? (
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-fit-primary font-bold hover:underline"
                >
                  ← Back to search results
                </button>
              ) : (
                <span className="text-[11px] text-fit-muted uppercase tracking-wider font-bold">
                  {currentData.category || 'Nutrition Profile'}
                </span>
              )}

              {/* Per Serving vs Per 100g Toggle */}
              {selected.per100g && (
                <div className="flex items-center gap-1 bg-fit-surface border border-fit-border rounded-lg p-0.5 text-[10px] font-bold">
                  <button
                    onClick={() => setServingMode('serving')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      servingMode === 'serving'
                        ? 'bg-fit-primary text-fit-bg shadow-sm'
                        : 'text-fit-muted hover:text-fit-text'
                    }`}
                  >
                    Per Serving
                  </button>
                  <button
                    onClick={() => setServingMode('100g')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      servingMode === '100g'
                        ? 'bg-fit-primary text-fit-bg shadow-sm'
                        : 'text-fit-muted hover:text-fit-text'
                    }`}
                  >
                    Per 100g
                  </button>
                </div>
              )}
            </div>

            {/* Food Header Card */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center bg-gradient-to-r from-fit-primary/10 via-fit-surface to-transparent">
              <img
                key={currentData.name}
                src={currentData.image || getFoodImage(currentData.name, currentData.category)}
                onError={(e) => handleImageError(e, currentData.category)}
                alt={currentData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-fit-primary/30 flex-shrink-0 bg-fit-surface2 shadow-md mx-auto sm:mx-0"
              />
              <div className="min-w-0 text-center sm:text-left space-y-1">
                <span className="chip px-2 py-0.5 text-[10px] font-bold bg-fit-primary/15 border-fit-primary/30 text-fit-primary rounded-md uppercase tracking-wider inline-block">
                  {currentData.category || 'Food Item'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-fit-text leading-tight">{currentData.name}</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
                  <span className="flex items-center gap-1 text-orange-400 font-bold">
                    <Flame size={15} className="fill-orange-400" /> {formatStat(currentData.calories, ' kcal')}
                  </span>
                  <span className="text-fit-muted">•</span>
                  <span className="text-fit-muted font-medium">Serving: {currentData.servingLabel}</span>
                </div>
              </div>
            </div>

            {/* Core Nutrition Stats */}
            <div className="p-4 sm:p-5 space-y-5">
              {/* Primary 4 Macros */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-fit-muted block mb-2.5">
                  Core Macronutrients ({currentData.servingLabel})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {primaryStats.map(({ label, value, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="card p-3.5 flex flex-col items-center text-center gap-1 bg-fit-surface2/60 border border-fit-border/80"
                    >
                      <Icon size={18} className={color} />
                      <p className="text-base sm:text-lg font-black font-mono text-fit-text">{value}</p>
                      <p className="text-[10px] text-fit-muted uppercase font-bold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Micronutrients Grid */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-fit-muted block mb-2.5">
                  Complete Nutritional Breakdown
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {secondaryStats.map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className={`rounded-xl p-2.5 text-center border transition-all ${
                        highlight
                          ? 'bg-fit-primary/10 border-fit-primary/40'
                          : 'bg-fit-surface2/40 border-fit-border/60'
                      }`}
                    >
                      <p className="text-xs font-bold text-fit-text font-mono">{value}</p>
                      <p className="text-[10px] text-fit-muted font-medium mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Good for Tags */}
              {currentData.goodFor && currentData.goodFor.length > 0 && (
                <div className="pt-2 border-t border-fit-border/40 flex items-center flex-wrap gap-2">
                  <span className="text-[11px] font-bold text-fit-muted flex items-center gap-1">
                    <Sparkles size={12} className="text-fit-primary" /> Recommended For:
                  </span>
                  {currentData.goodFor.map((tag) => (
                    <span
                      key={tag}
                      className="chip text-[10px] font-bold px-2 py-0.5 bg-fit-surface2 border-fit-border text-fit-text flex items-center gap-1"
                    >
                      <CheckCircle2 size={11} className="text-fit-primary" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Genuinely no matching food in the database */}
        {showNoMatch && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-8 flex flex-col items-center text-center gap-2 border-fit-border bg-fit-surface"
          >
            <Search size={26} className="text-fit-muted" />
            <h4 className="text-sm font-bold text-fit-text">No matching food found</h4>
            <p className="text-xs text-fit-muted max-w-xs">
              Try searching for common foods like Egg, Chicken, Rice, Oats, Paneer, Banana, Almonds, or Milk.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

