import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi } from '../services/api.js'

const UserContext = createContext(null)

const STORAGE_KEY = 'fitkart_user'
const TOKEN_KEY = 'fitkart_token'

const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const safeSetItem = (key, val) => {
  try {
    localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val))
  } catch {}
}

const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {}
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = safeGetItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const refreshUser = useCallback(async () => {
    const token = safeGetItem(TOKEN_KEY)
    if (!token) return null
    try {
      const res = await authApi.getMe()
      if (res?.user) {
        setUser(res.user)
        safeSetItem(STORAGE_KEY, res.user)
        return res.user
      }
    } catch (err) {
      console.warn('[Refresh User MongoDB Warning]:', err.message)
      if (err.message && (err.message.includes('401') || err.message.includes('404') || err.message.includes('User not found') || err.message.includes('Invalid token') || err.message.includes('jwt'))) {
        safeRemoveItem(STORAGE_KEY)
        safeRemoveItem(TOKEN_KEY)
        setUser(null)
      }
    }
    return null
  }, [])

  // Sync user with MongoDB on initial load and window focus
  useEffect(() => {
    refreshUser()

    const handleSyncOnFocus = () => {
      if (document.visibilityState === 'visible') {
        refreshUser()
      }
    }

    window.addEventListener('focus', handleSyncOnFocus)
    document.addEventListener('visibilitychange', handleSyncOnFocus)
    return () => {
      window.removeEventListener('focus', handleSyncOnFocus)
      document.removeEventListener('visibilitychange', handleSyncOnFocus)
    }
  }, [refreshUser])

  // Keep localStorage cache in sync whenever user state changes
  useEffect(() => {
    if (user) safeSetItem(STORAGE_KEY, user)
    else safeRemoveItem(STORAGE_KEY)
  }, [user])

  const signup = async ({ name, email, password }) => {
    try {
      const res = await authApi.register({ name, email, password })
      if (res?.token && res?.user) {
        safeSetItem(TOKEN_KEY, res.token)
        safeSetItem(STORAGE_KEY, res.user)
        setUser(res.user)
        return { success: true, user: res.user }
      }
      return { success: false, message: res?.message || 'Registration failed.' }
    } catch (err) {
      console.error('[Signup Error]:', err.message)
      return { success: false, message: err.message || 'Registration failed. Please try again.' }
    }
  }

  const login = async ({ email, password }) => {
    try {
      const res = await authApi.login({ email, password })
      if (res?.token && res?.user) {
        safeSetItem(TOKEN_KEY, res.token)
        safeSetItem(STORAGE_KEY, res.user)
        setUser(res.user)
        return { success: true, user: res.user }
      }
      return { success: false, message: 'Invalid email or password.' }
    } catch (err) {
      console.error('[Login Error]:', err.message)
      return { success: false, message: err.message || 'Invalid email or password.' }
    }
  }

  const loginWithGoogle = async (credential) => {
    try {
      const res = await authApi.googleLogin({ credential })
      if (res?.token && res?.user) {
        safeSetItem(TOKEN_KEY, res.token)
        safeSetItem(STORAGE_KEY, res.user)
        setUser(res.user)
        return { success: true, user: res.user }
      }
      return { success: false, message: res?.message || 'Google Sign-In failed.' }
    } catch (err) {
      console.error('[Google Auth error]:', err.message)
      return { success: false, message: err.message || 'Google Sign-In failed.' }
    }
  }

  const logout = () => {
    safeRemoveItem(STORAGE_KEY)
    safeRemoveItem(TOKEN_KEY)
    setUser(null)
  }

  const updateUser = async (patch) => {
    try {
      const res = await authApi.updateProfile(patch)
      if (res?.user) {
        setUser(res.user)
        safeSetItem(STORAGE_KEY, res.user)
        return res.user
      }
    } catch (err) {
      console.warn('[Update User Error]:', err.message)
    }

    // Optimistic fallback while online sync finishes
    setUser((prev) => {
      if (!prev) return prev
      const updated = {
        ...prev,
        ...patch,
        fitnessStats: patch.fitnessStats
          ? {
              ...(prev.fitnessStats || {}),
              ...patch.fitnessStats,
              nutrition: {
                ...(prev.fitnessStats?.nutrition || {}),
                ...(patch.fitnessStats?.nutrition || {})
              },
              water: {
                ...(prev.fitnessStats?.water || {}),
                ...(patch.fitnessStats?.water || {})
              },
              activity: {
                ...(prev.fitnessStats?.activity || {}),
                ...(patch.fitnessStats?.activity || {})
              },
              streak: typeof patch.fitnessStats?.streak === 'object'
                ? { ...(prev.fitnessStats?.streak || {}), ...patch.fitnessStats?.streak }
                : (patch.fitnessStats?.streak ?? prev.fitnessStats?.streak)
            }
          : prev.fitnessStats
      }
      safeSetItem(STORAGE_KEY, updated)
      return updated
    })
  }

  const toggleWishlist = async (productId) => {
    try {
      const res = await authApi.toggleWishlist(productId)
      if (res?.wishlist) {
        setUser((prev) => {
          if (!prev) return prev
          const updated = { ...prev, wishlist: res.wishlist }
          safeSetItem(STORAGE_KEY, updated)
          return updated
        })
        return res.wishlist
      }
    } catch (err) {
      console.warn('[Wishlist Error]:', err.message)
    }

    setUser((prev) => {
      if (!prev) return prev
      const exists = prev.wishlist?.includes(productId)
      const wishlist = exists
        ? prev.wishlist.filter((id) => id !== productId)
        : [...(prev.wishlist || []), productId]
      const updated = { ...prev, wishlist }
      safeSetItem(STORAGE_KEY, updated)
      return updated
    })
  }

  const addAddress = async (address) => {
    try {
      const res = await authApi.addAddress(address)
      if (res?.addresses) {
        setUser((prev) => {
          if (!prev) return prev
          const updated = { ...prev, addresses: res.addresses }
          safeSetItem(STORAGE_KEY, updated)
          return updated
        })
        return res.addresses
      }
    } catch (err) {
      console.warn('[Add Address Error]:', err.message)
    }
  }

  const deleteAddress = async (addressId) => {
    try {
      const res = await authApi.deleteAddress(addressId)
      if (res?.addresses) {
        setUser((prev) => {
          if (!prev) return prev
          const updated = { ...prev, addresses: res.addresses }
          safeSetItem(STORAGE_KEY, updated)
          return updated
        })
        return res.addresses
      }
    } catch (err) {
      console.warn('[Delete Address Error]:', err.message)
    }
  }

  const addOrder = (order) => {
    setUser((prev) => {
      if (!prev) return prev
      const orders = [order.orderId || order.id, ...(prev.orders || [])]
      const fitCoins = (prev.fitCoins || 0) + Math.round((order.total || 0) / 20)
      const updated = { ...prev, orders, fitCoins }
      safeSetItem(STORAGE_KEY, updated)
      return updated
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateUser,
        refreshUser,
        toggleWishlist,
        addAddress,
        deleteAddress,
        addOrder
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
