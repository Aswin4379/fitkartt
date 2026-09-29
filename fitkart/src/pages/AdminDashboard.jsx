import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, Edit2, TrendingUp, Package, Users, DollarSign, ClipboardList, CheckCircle2, ChevronRight, Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { adminApi, productApi } from '../services/api.js'
import { useUser } from '../context/UserContext.jsx'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'products', label: 'Inventory', icon: Package },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
]

const ORDER_STAGES = ['Order Placed', 'Order Confirmed', 'Preparing', 'Packed', 'Out for Delivery', 'Delivered']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [tab, setTab] = useState('overview')
  const [productList, setProductList] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    deliveredOrders: 0,
    pendingOrders: 0
  })
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'weight-loss', stock: 50 })

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.allSettled([
        adminApi.getStats(),
        adminApi.getAllOrders(),
        productApi.getProducts({ limit: 100 })
      ])

      if (statsRes.status === 'fulfilled' && statsRes.value) {
        setStats(prev => ({ ...prev, ...statsRes.value }))
      }
      if (ordersRes.status === 'fulfilled' && Array.isArray(ordersRes.value)) {
        setOrders(ordersRes.value)
      }
      if (productsRes.status === 'fulfilled' && productsRes.value?.products) {
        setProductList(productsRes.value.products)
      }
    } catch (err) {
      console.warn('[Admin Dashboard fetch error]:', err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  // Dynamic 7-day sales calculation
  const weeklySalesData = useMemo(() => {
    const days = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dayStr = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString('en-US', { weekday: 'narrow' })
      days.push({ dayStr, label, total: 0 })
    }

    orders.forEach(o => {
      const orderDate = (o.createdAt || o.placedAt || '').split('T')[0]
      const found = days.find(d => d.dayStr === orderDate)
      if (found) {
        found.total += (o.total || 0)
      }
    })

    const maxSale = Math.max(...days.map(d => d.total), 1)
    return days.map(d => ({
      ...d,
      pct: d.total > 0 ? Math.max(15, Math.round((d.total / maxSale) * 100)) : 5
    }))
  }, [orders])

  // Category breakdown
  const categoryStats = useMemo(() => {
    if (productList.length === 0) return []
    const counts = {}
    productList.forEach(p => {
      const cat = p.category || 'Other'
      counts[cat] = (counts[cat] || 0) + 1
    })
    const total = productList.length
    return Object.entries(counts)
      .map(([cat, count]) => {
        const formatted = cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        return {
          label: formatted,
          count,
          pct: Math.round((count / total) * 100)
        }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [productList])

  const advanceOrderStatus = async (orderId, currentStatus) => {
    const currentIdx = ORDER_STAGES.indexOf(currentStatus)
    const nextStatus = currentIdx !== -1 && currentIdx < ORDER_STAGES.length - 1
      ? ORDER_STAGES[currentIdx + 1]
      : 'Delivered'

    setOrders(prev => prev.map(o => (o.orderId === orderId || o.id === orderId || o._id === orderId) ? { ...o, status: nextStatus } : o))

    try {
      await adminApi.updateOrderStatus(orderId, nextStatus, `Status updated to ${nextStatus} by Admin`)
      const updatedStats = await adminApi.getStats()
      if (updatedStats) setStats(prev => ({ ...prev, ...updatedStats }))
    } catch (err) {
      console.warn('[Update Order Status fallback]:', err.message)
    }
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const productData = {
      id: `admin-${Date.now()}`,
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      rating: 5.0,
      reviewCount: 0,
      image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=500&q=80',
      mrp: Math.round(Number(newProduct.price) * 1.25),
      inStock: true,
      variants: [{ id: `v-${Date.now()}`, size: 'Standard', price: Number(newProduct.price), mrp: Math.round(Number(newProduct.price) * 1.25), stock: Number(newProduct.stock) || 50 }]
    }

    try {
      const saved = await adminApi.createProduct(productData)
      setProductList((prev) => [saved || productData, ...prev])
      setStats(prev => ({ ...prev, totalProducts: (prev.totalProducts || 0) + 1 }))
    } catch (err) {
      setProductList((prev) => [productData, ...prev])
    }

    setNewProduct({ name: '', price: '', category: 'weight-loss', stock: 50 })
    setShowAdd(false)
  }

  const removeProduct = async (id) => {
    setProductList((prev) => prev.filter((p) => p.id !== id && p._id !== id))
    setStats(prev => ({ ...prev, totalProducts: Math.max(0, (prev.totalProducts || 1) - 1) }))
    try {
      await adminApi.deleteProduct(id)
    } catch (err) {
      console.warn('[Delete Product backend fallback]:', err.message)
    }
  }

  if (user?.email !== 'aswinsp.2006@gmail.com') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-red-500 mb-2">Access Denied</h1>
        <p className="text-fit-muted mb-4">You do not have permission to view the Admin Portal.</p>
        <button onClick={() => navigate('/')} className="bg-fit-primary text-black px-6 py-2 rounded-full font-bold">
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fit-bg text-fit-text">
      {/* Top Header */}
      <div className="border-b border-fit-border bg-fit-surface/80 sticky top-0 z-30 backdrop-blur-md">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="icon-btn hover:border-fit-primary">
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-base font-black font-display text-fit-text">
              FitKart Operations Backoffice
            </h1>
          </div>
          <span className="badge-new">LIVE DATABASE</span>
        </div>
      </div>

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`chip flex items-center gap-1.5 py-2 px-4 text-xs font-bold ${
                tab === id ? 'chip-active' : ''
              }`}
            >
              <Icon size={15} /> <span>{label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-fit-muted">
            <Loader2 className="animate-spin mb-3 text-fit-primary" size={32} />
            <p className="text-xs">Connecting to MongoDB &amp; fetching analytics...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="card p-5 border-fit-border bg-fit-surface shadow-card">
                    <span className="text-[11px] font-bold text-fit-muted uppercase">Gross Revenue</span>
                    <p className="text-2xl font-black text-fit-primary font-mono mt-1">
                      ₹{(stats.totalRevenue || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="card p-5 border-fit-border bg-fit-surface shadow-card">
                    <span className="text-[11px] font-bold text-fit-muted uppercase">Total Orders</span>
                    <p className="text-2xl font-black text-fit-text font-mono mt-1">{stats.totalOrders}</p>
                  </div>

                  <div className="card p-5 border-fit-border bg-fit-surface shadow-card">
                    <span className="text-[11px] font-bold text-fit-muted uppercase">Live Catalog</span>
                    <p className="text-2xl font-black text-fit-text font-mono mt-1">{stats.totalProducts || productList.length}</p>
                  </div>

                  <div className="card p-5 border-fit-border bg-fit-surface shadow-card">
                    <span className="text-[11px] font-bold text-fit-muted uppercase">Pending Dispatches</span>
                    <p className="text-2xl font-black text-amber-400 font-mono mt-1">{stats.pendingOrders || 0}</p>
                  </div>
                </div>

                {/* Live Orders Feed */}
                <div className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-fit-text">
                    Real-time Orders Feed
                  </h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-10 text-fit-muted text-xs border border-dashed border-fit-border rounded-2xl">
                      No active orders found in the database.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 6).map((o) => {
                        const key = o.orderId || o.id || o._id
                        return (
                          <div
                            key={key}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-fit-surface2/60 border border-fit-border"
                          >
                            <div>
                              <span className="font-mono font-bold text-xs text-fit-text">#{key}</span>
                              <p className="text-xs text-fit-muted font-medium mt-0.5">
                                {o.customerName || 'Customer'} · {o.items?.length || 1} items
                              </p>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <div className="text-right">
                                <span className="font-mono font-black text-sm text-fit-primary">₹{o.total}</span>
                                <span className="block text-[10px] text-fit-muted">{o.status}</span>
                              </div>

                              {o.status !== 'Delivered' && (
                                <button
                                  onClick={() => advanceOrderStatus(key, o.status)}
                                  className="btn-primary text-xs py-1.5 px-3.5 shadow-glow font-bold"
                                >
                                  Advance Status
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* INVENTORY TAB */}
            {tab === 'products' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowAdd((s) => !s)}
                  className="btn-primary flex items-center gap-2 text-xs py-2.5 px-5"
                >
                  <Plus size={15} />
                  <span>{showAdd ? 'Cancel Addition' : 'Add New Product'}</span>
                </button>

                {showAdd && (
                  <form onSubmit={addProduct} className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-3">
                    <h3 className="text-xs font-bold uppercase text-fit-muted">Create Product</h3>
                    <input
                      required
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="input-field text-xs"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        type="number"
                        placeholder="Price (₹)"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="input-field text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="input-field text-xs"
                      />
                    </div>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="input-field text-xs"
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="weight-gain">Weight Gain</option>
                      <option value="protein-supplements">Protein Supplements</option>
                      <option value="healthy-snacks">Healthy Snacks</option>
                    </select>
                    <button type="submit" className="btn-primary py-2.5 text-xs w-full">
                      Save to Database
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 gap-3">
                  {productList.map((p) => {
                    const pId = p.id || p._id
                    return (
                      <div key={pId} className="card p-3.5 flex items-center gap-4 border-fit-border bg-fit-surface">
                        <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-fit-surface2" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-fit-text truncate">{p.name}</p>
                          <p className="text-xs text-fit-muted">
                            ₹{p.price || p.variants?.[0]?.price || 499} · Stock: {p.variants?.[0]?.stock ?? 50} units
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(pId)}
                          className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
                          aria-label="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <div className="text-center py-16 card border-dashed">
                    <p className="text-sm font-bold text-fit-text">No active orders</p>
                  </div>
                ) : (
                  orders.map((o) => {
                    const key = o.orderId || o.id || o._id
                    return (
                      <div key={key} className="card p-4 border-fit-border bg-fit-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-mono font-bold text-sm text-fit-text">#{key}</p>
                          <p className="text-xs text-fit-muted mt-0.5">
                            Customer: {o.customerName || 'FitKart User'} · {o.customerPhone || 'Verified'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <div className="text-right">
                            <p className="font-mono font-black text-sm text-fit-primary">₹{o.total}</p>
                            <span className="badge-new text-[10px]">{o.status}</span>
                          </div>
                          {o.status !== 'Delivered' && (
                            <button
                              onClick={() => advanceOrderStatus(key, o.status)}
                              className="btn-primary text-xs py-1.5 px-3"
                            >
                              Advance
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {/* ANALYTICS TAB */}
            {tab === 'analytics' && (
              <div className="space-y-6">
                <div className="card p-6 border-fit-border bg-fit-surface shadow-card space-y-4">
                  <h3 className="text-sm font-bold uppercase text-fit-text">
                    Revenue Trajectory (Past 7 Days)
                  </h3>
                  <div className="flex items-end gap-2.5 h-36 pt-4">
                    {weeklySalesData.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1.5 h-full">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${d.total > 0 ? 'bg-fit-primary shadow-glow' : 'bg-fit-surface2'}`}
                          style={{ height: `${d.pct}%` }}
                        />
                        <span className="text-[10px] text-fit-muted font-bold">{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-6 border-fit-border bg-fit-surface shadow-card space-y-3">
                  <h3 className="text-sm font-bold uppercase text-fit-text">Category Share</h3>
                  <div className="space-y-2.5">
                    {categoryStats.map((c) => (
                      <div key={c.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-fit-muted">{c.label} ({c.count})</span>
                          <span className="font-bold text-fit-text">{c.pct}%</span>
                        </div>
                        <div className="h-2 bg-fit-surface2 rounded-full overflow-hidden">
                          <div className="h-full bg-fit-primary rounded-full" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}
