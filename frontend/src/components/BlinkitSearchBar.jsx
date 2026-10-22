import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp, ChevronRight, Sparkles, Tag, ArrowUpRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext.jsx'

const ROTATING_SUGGESTIONS = [
  'whey protein',
  'fresh apples',
  'creatine monohydrate',
  'peanut butter',
  'apple cider vinegar',
  'rolled oats',
  'bcaa recovery',
  'almonds & dry fruits',
  'protein bars',
  'fish oil omega-3',
  'multivitamins'
]

const POPULAR_SEARCHES = [
  'Whey Protein',
  'Apples',
  'Creatine',
  'Peanut Butter',
  'Rolled Oats',
  'Almonds',
  'BCAA',
  'Avocado'
]

const RECENT_KEY = 'fitkart_recent_searches'

export default function BlinkitSearchBar({ className = '', isMobile = false }) {
  const navigate = useNavigate()
  const { categories = [], searchProducts } = useProducts()
  
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [keywordIndex, setKeywordIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const containerRef = useRef(null)
  const inputRef = useRef(null)

  // 1. Rotating placeholder timer (Blinkit style)
  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % ROTATING_SUGGESTIONS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  // 2. Outside click detection to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Save to recent searches
  const saveRecentSearch = (term) => {
    if (!term || !term.trim()) return
    const clean = term.trim()
    setRecentSearches((prev) => {
      const updated = [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5)
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
  }

  const removeRecentSearch = (e, term) => {
    e.stopPropagation()
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== term)
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
  }

  const clearAllRecents = (e) => {
    e.stopPropagation()
    setRecentSearches([])
    try {
      localStorage.removeItem(RECENT_KEY)
    } catch {}
  }

  // 3. Real-time search computation with starts-with prioritization
  const { matchingProducts, matchingCategories, totalMatches } = useMemo(() => {
    if (!query.trim()) {
      return { matchingProducts: [], matchingCategories: [], totalMatches: 0 }
    }

    const q = query.trim().toLowerCase()

    // Filter matching categories
    const matchedCats = categories.filter((c) =>
      c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    )

    // Use smart relevance-ranked search results from ProductContext
    const allMatches = searchProducts ? searchProducts(query) : []

    return {
      matchingProducts: allMatches.slice(0, 6),
      matchingCategories: matchedCats.slice(0, 2),
      totalMatches: allMatches.length,
    }
  }, [query, categories, searchProducts])

  // Navigate to search results
  const executeSearch = (searchTerm) => {
    const term = searchTerm || query || ROTATING_SUGGESTIONS[keywordIndex]
    if (!term || !term.trim()) return
    saveRecentSearch(term)
    setIsOpen(false)
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
  }

  // Navigate directly to product
  const selectProduct = (prod) => {
    saveRecentSearch(prod.name)
    setIsOpen(false)
    navigate(`/product/${prod.id}`)
  }

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedIndex >= 0 && selectedIndex < matchingProducts.length) {
      selectProduct(matchingProducts[selectedIndex])
    } else {
      executeSearch()
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < matchingProducts.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1))
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  // Highlight matched prefix in product name
  const renderHighlightedText = (text, highlight) => {
    if (!highlight || !highlight.trim()) return text
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-fit-primary font-black underline decoration-fit-primary/40 underline-offset-2">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative w-full flex items-center">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none flex items-center justify-center">
          <Search size={isMobile ? 15 : 16} className={isOpen ? 'text-fit-primary' : ''} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => {
            setIsOpen(true)
            setSelectedIndex(-1)
          }}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setSelectedIndex(-1)
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
          className={`w-full rounded-2xl border transition-all duration-200 outline-none text-xs text-fit-text ${
            isMobile
              ? 'py-2.5 pl-10 pr-9 bg-fit-surface2/70 border-fit-border shadow-inner focus:border-fit-primary/60 focus:bg-fit-surface'
              : 'py-2 pl-10 pr-9 bg-fit-surface2/60 border-fit-border/70 shadow-sm focus:border-fit-primary/70 focus:bg-fit-surface focus:ring-2 focus:ring-fit-primary/20'
          }`}
        />

        {/* Blinkit Animated Placeholder (Visible when input is empty) */}
        {!query && (
          <div
            onClick={() => inputRef.current?.focus()}
            className="absolute left-10 right-9 top-0 bottom-0 flex items-center pointer-events-none overflow-hidden text-xs text-fit-muted select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={keywordIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="truncate flex items-center gap-1"
              >
                <span>Search</span>
                <span className="font-semibold text-fit-text/80">&quot;{ROTATING_SUGGESTIONS[keywordIndex]}&quot;</span>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setSelectedIndex(-1)
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-fit-surface2 hover:bg-fit-border text-fit-muted hover:text-fit-text flex items-center justify-center transition-colors cursor-pointer"
            title="Clear search"
          >
            <X size={12} />
          </button>
        )}
      </form>

      {/* Real-time Auto-Suggest Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full left-0 right-0 mt-2 bg-fit-surface border border-fit-border rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl ring-1 ring-white/10 ${
              isMobile ? 'max-h-[75vh]' : 'max-h-[480px]'
            } flex flex-col`}
          >
            {/* Case A: User has typed a query */}
            {query.trim().length > 0 ? (
              <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-fit-border/40">
                {/* 1. Category Suggestions if any */}
                {matchingCategories.length > 0 && (
                  <div className="p-2.5 bg-fit-surface2/30">
                    <div className="text-[10px] font-bold text-fit-muted uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1">
                      <Tag size={11} className="text-fit-primary" />
                      <span>Matching Categories</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchingCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setIsOpen(false)
                            navigate(`/category/${cat.id}`)
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-fit-surface border border-fit-border hover:border-fit-primary/50 text-xs font-semibold text-fit-text transition-colors cursor-pointer group"
                        >
                          <span>{cat.name}</span>
                          <ChevronRight size={12} className="text-fit-muted group-hover:text-fit-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Direct Query Suggestion */}
                <div className="p-1.5">
                  <button
                    type="button"
                    onClick={() => executeSearch(query)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-fit-primary/10 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-fit-primary/20 text-fit-primary flex items-center justify-center shrink-0">
                        <Search size={14} />
                      </div>
                      <span className="text-xs text-fit-text truncate">
                        Search for &quot;<strong className="text-fit-primary">{query}</strong>&quot;
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-fit-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore <ArrowUpRight size={12} />
                    </span>
                  </button>
                </div>

                {/* 3. Product Matches (With starting letter matches prioritized!) */}
                {matchingProducts.length > 0 ? (
                  <div className="p-2 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold text-fit-muted uppercase tracking-wider flex items-center justify-between">
                      <span>Products matching &quot;{query}&quot;</span>
                      <span className="text-fit-primary font-bold">{totalMatches} found</span>
                    </div>

                    {matchingProducts.map((prod, idx) => {
                      const variant = prod.variants?.[0] || {}
                      const price = variant.price || prod.price || 0
                      const mrp = variant.mrp || prod.mrp || 0
                      const isSelected = selectedIndex === idx

                      return (
                        <div
                          key={prod.id}
                          onClick={() => selectProduct(prod)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all cursor-pointer group ${
                            isSelected ? 'bg-fit-primary/15 border-fit-primary/30 shadow-sm' : 'hover:bg-fit-surface2/70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {/* Thumbnail */}
                            <div className="w-10 h-10 rounded-lg bg-fit-surface2 border border-fit-border/60 overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={prod.image || prod.images?.[0]}
                                alt={prod.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                }}
                              />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              {prod.brand && (
                                <span className="text-[10px] font-bold text-fit-primary block leading-none mb-0.5">
                                  {renderHighlightedText(prod.brand, query)}
                                </span>
                              )}
                              <h4 className="text-xs font-bold text-fit-text truncate leading-snug group-hover:text-fit-primary transition-colors">
                                {renderHighlightedText(prod.name, query)}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-fit-muted">
                                <span className="capitalize">{prod.category.replace('-', ' ')}</span>
                                {variant.size && <span>• {variant.size}</span>}
                              </div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-fit-text">
                              ₹{price}
                            </div>
                            {mrp > price && (
                              <div className="text-[10px] text-fit-muted line-through">
                                ₹{mrp}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <p className="text-xs text-fit-muted">
                      No products found starting with &quot;<span className="text-fit-text font-bold">{query}</span>&quot;
                    </p>
                    <p className="text-[11px] text-fit-muted/80">
                      Try searching for <button type="button" onClick={() => executeSearch('Whey Protein')} className="text-fit-primary underline font-semibold cursor-pointer">Whey Protein</button>, <button type="button" onClick={() => executeSearch('Oats')} className="text-fit-primary underline font-semibold cursor-pointer">Oats</button>, or <button type="button" onClick={() => executeSearch('Creatine')} className="text-fit-primary underline font-semibold cursor-pointer">Creatine</button>.
                    </p>
                  </div>
                )}

                {/* Footer Link */}
                {totalMatches > 0 && (
                  <div className="p-2.5 bg-fit-surface2/40 border-t border-fit-border/40">
                    <button
                      type="button"
                      onClick={() => executeSearch(query)}
                      className="w-full py-1.5 px-3 rounded-xl bg-fit-primary/10 hover:bg-fit-primary/20 text-fit-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View all {totalMatches} results for &quot;{query}&quot;</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Case B: Input is focused but empty — Show Recent & Popular Searches */
              <div className="p-3 space-y-4 max-h-[380px] overflow-y-auto no-scrollbar">
                {/* 1. Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-fit-muted uppercase tracking-wider mb-2 px-1">
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-fit-primary" /> Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearAllRecents}
                        className="text-fit-muted hover:text-red-400 transition-colors cursor-pointer text-[10px]"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((item) => (
                        <div
                          key={item}
                          onClick={() => executeSearch(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-fit-surface2/80 hover:bg-fit-surface2 border border-fit-border text-xs text-fit-text transition-colors cursor-pointer group"
                        >
                          <Clock size={11} className="text-fit-muted group-hover:text-fit-primary transition-colors" />
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={(e) => removeRecentSearch(e, item)}
                            className="text-fit-muted hover:text-red-400 p-0.5 rounded-full cursor-pointer"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Popular / Trending Searches */}
                <div>
                  <div className="text-[10px] font-bold text-fit-muted uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
                    <TrendingUp size={11} className="text-fit-primary" />
                    <span>Popular Searches</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => executeSearch(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-fit-surface2/60 hover:bg-fit-primary/10 border border-fit-border/70 hover:border-fit-primary/40 text-xs font-semibold text-fit-text hover:text-fit-primary transition-colors cursor-pointer"
                      >
                        <Sparkles size={11} className="text-fit-accent" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Quick categories list */}
                <div className="pt-2 border-t border-fit-border/40">
                  <div className="text-[10px] font-bold text-fit-muted uppercase tracking-wider mb-2 px-1">
                    Explore Categories
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setIsOpen(false)
                          navigate(`/category/${c.id}`)
                        }}
                        className="p-2 rounded-xl bg-fit-surface2/40 hover:bg-fit-surface2 border border-fit-border/50 text-left transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs font-medium text-fit-text truncate">{c.name}</span>
                        <ChevronRight size={12} className="text-fit-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
