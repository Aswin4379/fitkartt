import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { productApi } from '../services/api.js'
import { categories as staticCategories, products as staticProducts } from '../data/products.js'

const ProductContext = createContext(null)

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
      if (!query || !query.trim()) return products
      const q = query.toLowerCase().trim()
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
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
