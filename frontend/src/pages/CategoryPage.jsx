import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import AppLayout from '../components/AppLayout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { getMinPrice } from '../utils/productVariants.js'
import { SlidersHorizontal, Sparkles, ChevronRight, Zap } from 'lucide-react'

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Customer Rating' },
]

export default function CategoryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, categories } = useProducts()
  const [activeCat, setActiveCat] = useState(id || 'all')
  const [sort, setSort] = useState('popular')

  useEffect(() => {
    if (id) setActiveCat(id)
  }, [id])

  const category = categories.find((c) => c.id === activeCat)

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? [...products] : products.filter((p) => p.category === activeCat)
    if (sort === 'price-asc') list.sort((a, b) => getMinPrice(a) - getMinPrice(b))
    if (sort === 'price-desc') list.sort((a, b) => getMinPrice(b) - getMinPrice(a))
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [products, activeCat, sort])

  return (
    <AppLayout showFooter>
      <PageHeader
        title={activeCat === 'all' ? 'All Fitness Products' : category?.name || 'Category'}
        subtitle={`${filtered.length} verified authentic products available`}
      />

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        
        {/* Category Hero Visual Banner */}
        {category && (
          <div className="relative overflow-hidden rounded-3xl border border-fit-border h-36 sm:h-48 bg-fit-surface2 p-6 flex flex-col justify-end shadow-card">
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-black/70 backdrop-blur border border-white/10 flex items-center justify-center text-base">
                  {category.icon}
                </span>
                <span className="badge-new text-[10px]">{category.name}</span>
                <span className="text-xs text-gray-200 font-mono">({filtered.length} items)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                {category.name}
              </h2>
              {category.subtitle && (
                <p className="text-xs text-gray-200 max-w-xl font-medium">
                  {category.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Category Selection Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => {
              setActiveCat('all')
              navigate('/category/all')
            }}
            className={`chip flex items-center gap-1.5 py-2 px-4 text-xs font-bold ${
              activeCat === 'all' ? 'chip-active' : ''
            }`}
          >
            <Sparkles size={14} /> <span>All Products</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCat(c.id)
                navigate(`/category/${c.id}`)
              }}
              className={`chip flex items-center gap-1.5 py-2 px-4 text-xs font-bold ${
                activeCat === c.id ? 'chip-active' : ''
              }`}
            >
              <span>{c.icon}</span> <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-fit-border flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-fit-muted font-bold flex items-center gap-1">
              <SlidersHorizontal size={13} /> Sort By:
            </span>
            {sortOptions.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`chip text-xs py-1 px-3 ${sort === s.id ? 'chip-active' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-fit-muted font-mono">
            Showing <strong className="text-fit-text">{filtered.length}</strong> items
          </span>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 card border-dashed">
            <p className="text-base font-bold text-fit-text mb-1">No products found</p>
            <p className="text-xs text-fit-muted">No products currently match this category filter.</p>
          </div>
        )}
      </main>
    </AppLayout>
  )
}