import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { productApi } from '../services/api.js'
import { categories as staticCategories, products as staticProducts } from '../data/products.js'

const ProductContext = createContext(null)

export function rankProductsBySearch(productsList, query) {
  if (!query || !query.trim()) return productsList
  const q = query.trim().toLowerCase()
  const genericPackWords = new Set(['pack', 'packs', 'package', 'packet', 'combo'])

  const scored = []
  for (const p of productsList) {
    let score = 0
    const name = (p.name || '').toLowerCase()
    const brand = (p.brand || '').toLowerCase()
    const category = (p.category || '').toLowerCase()
    const subCategory = (p.subCategory || '').toLowerCase()
    const tags = Array.isArray(p.tags) ? p.tags.map((t) => t.toLowerCase()) : []
    const description = (p.description || '').toLowerCase()

    const nameWords = name.split(/[^a-z0-9]+/).filter(Boolean)
    const brandWords = brand.split(/[^a-z0-9]+/).filter(Boolean)

    // Check where the match happens:
    // 1. Exact match with name
    if (name === q) {
      score += 1000
    } 
    // 2. Name starts with query
    else if (name.startsWith(q)) {
      score += 600
    } 
    // 3. Match in words of the product name
    else {
      // Find words in main title (before parentheses or pack mentions)
      const cleanMainTitle = name.replace(/\s*\(.*?\)\s*/g, ' ').trim()
      const mainWords = cleanMainTitle.split(/[^a-z0-9]+/).filter(Boolean)
      
      const matchingMainWord = mainWords.slice(0, 4).find((w) => w.startsWith(q))
      if (matchingMainWord) {
        if (genericPackWords.has(matchingMainWord)) {
          score += 280
        } else {
          score += 450
        }
      } else if (nameWords.some((w) => w.startsWith(q))) {
        score += 220
      }
    }

    // Brand matching
    if (brand === q) {
      score += 400
    } else if (brand.startsWith(q)) {
      score += 250
    } else if (brandWords.some((w) => w.startsWith(q))) {
      score += 180
    }

    // Category / SubCategory matching
    if (category === q || subCategory === q) {
      score += 220
    } else if (category.startsWith(q) || subCategory.startsWith(q)) {
      score += 150
    }

    // Tags matching
    if (tags.some((t) => t === q)) {
      score += 180
    } else if (tags.some((t) => t.startsWith(q))) {
      score += 120
    }

    // Only for queries of 4+ characters, look into substrings inside words and descriptions
    if (q.length >= 4) {
      if (name.includes(q) && !name.startsWith(q) && !nameWords.some((w) => w.startsWith(q))) {
        score += 80
      }
      if (brand.includes(q) && !brand.startsWith(q) && !brandWords.some((w) => w.startsWith(q))) {
        score += 50
      }
      if (tags.some((t) => t.includes(q) && !t.startsWith(q))) {
        score += 40
      }
      // Description: only whole words matching, low weight
      const descWords = description.split(/[^a-z0-9]+/).filter(Boolean)
      if (descWords.includes(q)) {
        score += 25
      } else if (descWords.some((w) => w.startsWith(q))) {
        score += 15
      }
    }

    if (score > 0) {
      scored.push({ product: p, score })
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    const bRating = b.product.rating || 0
    const aRating = a.product.rating || 0
    return bRating - aRating
  })

  return scored.map((s) => s.product)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(staticProducts)
  const [categories, setCategories] = useState(staticCategories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await productApi.getProducts({ limit: 500 })
      if (res && Array.isArray(res.products) && res.products.length > 0) {
        setProducts(res.products)
        setError(null)
      }
    } catch (err) {
      console.warn('[ProductContext API Load Warning, using fallback]:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const getProductById = useCallback(
    (id) => {
      if (!id) return null
      return products.find((p) => p.id === id || p._id === id) || null
    },
    [products]
  )

  const getProductsByCategory = useCallback(
    (categoryId) => {
      if (!categoryId || categoryId === 'all') return products
      return products.filter((p) => p.category === categoryId)
    },
    [products]
  )

  const getTrending = useCallback(() => {
    const list = products.filter((p) => p.tags?.includes('trending'))
    return list.length > 0 ? list.slice(0, 8) : products.slice(0, 8)
  }, [products])

  const getBestSellers = useCallback(() => {
    const list = products.filter((p) => p.tags?.includes('bestseller'))
    return list.length > 0 ? list.slice(0, 8) : products.slice(8, 16)
  }, [products])

  const getNewArrivals = useCallback(() => {
    return products.slice(-8)
  }, [products])

  const getRecommended = useCallback(
    (limit = 8) => {
      return products.slice(0, limit)
    },
    [products]
  )

  const searchProducts = useCallback(
    (query) => {
      return rankProductsBySearch(products, query)
    },
    [products]
  )

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      refreshProducts: fetchProducts,
      getProductById,
      getProductsByCategory,
      getTrending,
      getBestSellers,
      getNewArrivals,
      getRecommended,
      searchProducts,
    }),
    [
      products,
      categories,
      loading,
      error,
      fetchProducts,
      getProductById,
      getProductsByCategory,
      getTrending,
      getBestSellers,
      getNewArrivals,
      getRecommended,
      searchProducts,
    ]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
