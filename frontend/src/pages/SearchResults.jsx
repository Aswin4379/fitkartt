import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import AppLayout from '../components/AppLayout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../context/ProductContext.jsx'

export default function SearchResults() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const { products, searchProducts } = useProducts()

  const quickPills = ['Protein', 'Peanut Butter', 'Creatine', 'Oats', 'BCAA', 'Mass Gainer', 'Bar']

  const results = useMemo(() => {
    if (!query.trim()) return products
    return searchProducts(query)
  }, [products, query, searchProducts])

  return (
    <AppLayout showFooter>
      <PageHeader
        title="Search FitKart"
        subtitle={query ? `${results.length} results found for "${query}"` : 'Browse all catalog items'}
      />

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-fit-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setParams({ q: e.target.value })
            }}
            placeholder="Search whey, oats, pre-workout, vitamins..."
            className="input-field pl-11 py-3 text-sm shadow-card"
          />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-fit-muted font-bold shrink-0">Popular:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => {
                setQuery(pill)
                setParams({ q: pill })
              }}
              className={`chip text-xs py-1 px-3 ${
                query.toLowerCase() === pill.toLowerCase() ? 'chip-active' : ''
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="product-grid pt-2">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="max-w-md mx-auto py-16 text-center px-4 card border-dashed">
            <p className="text-base font-bold text-fit-text mb-1">No Matching Products</p>
            <p className="text-xs text-fit-muted mb-4">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try searching for &quot;protein&quot; or &quot;creatine&quot;.
            </p>
            <button
              onClick={() => {
                setQuery('')
                setParams({})
              }}
              className="btn-primary text-xs"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </AppLayout>
  )
}