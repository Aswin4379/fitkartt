import { createContext, useContext, useEffect, useMemo, useState, useRef } from 'react'
import { cartKey } from '../utils/productVariants.js'
import { useUser } from './UserContext.jsx'
import { authApi } from '../services/api.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'fitkart_cart'

export function CartProvider({ children }) {
  const { user } = useUser()
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [coupon, setCoupon] = useState(null)
  const isInitialSync = useRef(false)

  // Sync cart from MongoDB when logged-in user profile loads or changes
  useEffect(() => {
    if (user && Array.isArray(user.cart)) {
      if (user.cart.length > 0) {
        setItems(user.cart)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user.cart))
        } catch {}
      } else if (!isInitialSync.current && items.length > 0) {
        // Initial login: push existing local cart to user's MongoDB profile
        authApi.updateProfile({ cart: items }).catch(() => {})
      }
      isInitialSync.current = true
    }
  }, [user?._id, user?.id])

  const syncToMongoDB = (newItems) => {
    if (user) {
      authApi.updateProfile({ cart: newItems }).catch((err) => {
        console.warn('[Cart MongoDB Sync Error]:', err.message)
      })
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  // product: base product (id, name, image, category...)
  // variant: the selected variant object (id, size, flavor, price, mrp, unit...)
  const addToCart = (product, variant, qty = 1) => {
    const key = cartKey(product.id, variant.id)
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      const nextItems = existing
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [
            ...prev,
            {
              key,
              productId: product.id,
              variantId: variant.id,
              name: product.name,
              image: product.image,
              category: product.category,
              size: variant.size,
              flavor: variant.flavor || null,
              unit: variant.unit,
              price: variant.price,
              mrp: variant.mrp,
              qty,
            },
          ]
      syncToMongoDB(nextItems)
      return nextItems
    })
  }

  const removeFromCart = (key) => {
    setItems((prev) => {
      const nextItems = prev.filter((i) => i.key !== key)
      syncToMongoDB(nextItems)
      return nextItems
    })
  }

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeFromCart(key)
    setItems((prev) => {
      const nextItems = prev.map((i) => (i.key === key ? { ...i, qty } : i))
      syncToMongoDB(nextItems)
      return nextItems
    })
  }

  // Convenience: is a specific product+variant already in the cart?
  const getCartItem = (productId, variantId) => {
    const key = cartKey(productId, variantId)
    return items.find((i) => i.key === key)
  }

  const clearCart = () => {
    setItems([])
    setCoupon(null)
    syncToMongoDB([])
  }

  const applyCoupon = (code) => {
    const coupons = {
      FIT50: { code: 'FIT50', type: 'flat', value: 50, label: 'â‚¹50 off' },
      FIRST20: { code: 'FIRST20', type: 'percent', value: 20, label: '20% off' },
      PROTEIN10: { code: 'PROTEIN10', type: 'percent', value: 10, label: '10% off' },
    }
    const found = coupons[code.toUpperCase()]
    if (found) {
      setCoupon(found)
      return { success: true, message: `Coupon applied: ${found.label}` }
    }
    return { success: false, message: 'Invalid coupon code.' }
  }

  const removeCoupon = () => setCoupon(null)

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  const discount = useMemo(() => {
    if (!coupon) return 0
    if (coupon.type === 'flat') return Math.min(coupon.value, subtotal)
    return Math.round((subtotal * coupon.value) / 100)
  }, [coupon, subtotal])

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 29
  const total = Math.max(subtotal - discount + deliveryFee, 0)
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        getCartItem,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        deliveryFee,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)