import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Package, ChefHat, Truck, PartyPopper, RefreshCw, MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useUser } from '../context/UserContext.jsx'
import { orderApi } from '../services/api.js'

const stages = [
  { key: 'Order Confirmed', icon: CheckCircle2, desc: 'We’ve received your order and verified payment' },
  { key: 'Preparing', icon: ChefHat, desc: 'Items are being packed fresh from certified stock' },
  { key: 'Packed', icon: Package, desc: 'Sealed with tamper-proof authentic packaging' },
  { key: 'Out for Delivery', icon: Truck, desc: 'Express fitness rider is en-route' },
  { key: 'Delivered', icon: PartyPopper, desc: 'Delivered! Fuel your fitness goals' },
]

export default function OrderTracking() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUser()
  const initialOrder = location.state?.order || user?.orders?.[0]
  const [order, setOrder] = useState(initialOrder)
  const [stageIndex, setStageIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const orderId = order?.orderId || order?.id || order?._id

  const syncOrder = async () => {
    if (!orderId) return
    setRefreshing(true)
    try {
      const res = await orderApi.getOrderById(orderId)
      if (res) {
        setOrder(res)
        const foundIdx = stages.findIndex(s => s.key.toLowerCase() === (res.status || '').toLowerCase())
        if (foundIdx !== -1) setStageIndex(foundIdx)
      }
    } catch (err) {
      console.warn('[Sync Order Status Backend fallback]:', err.message)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    syncOrder()
  }, [orderId])

  useEffect(() => {
    if (stageIndex >= stages.length - 1) return
    const t = setTimeout(() => setStageIndex((s) => s + 1), 4000)
    return () => clearTimeout(t)
  }, [stageIndex])

  if (!order) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto py-20 px-4 text-center">
          <Package size={40} className="text-fit-muted mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">No Order Found</h2>
          <p className="text-xs text-fit-muted mb-6">Track your ongoing orders directly from your profile.</p>
          <button onClick={() => navigate('/home')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <PageHeader
        title="Live Order Tracking"
        subtitle={orderId ? `Order Reference: #${orderId}` : ''}
        rightAction={
          <button
            onClick={syncOrder}
            className="p-2.5 rounded-xl border border-fit-border bg-fit-surface2 hover:border-fit-primary text-fit-muted hover:text-fit-primary transition-all"
            title="Refresh order status"
          >
            <RefreshCw size={15} className={refreshing ? 'animate-spin text-fit-primary' : ''} />
          </button>
        }
      />

      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        
        {/* Estimated Time Card */}
        <div className="card p-6 bg-gradient-to-r from-fit-primary/15 via-fit-surface to-fit-surface2 border-fit-primary/40 text-center shadow-glow">
          <span className="text-xs font-bold text-fit-muted uppercase tracking-wider">Estimated Delivery Time</span>
          <h2 className="text-3xl sm:text-4xl font-black text-fit-primary font-display mt-1">
            {stageIndex === stages.length - 1 ? 'Delivered 🎉' : (
              order?.deliveryEstimate?.unit === 'mins'
                ? `${order.deliveryEstimate.min} - ${order.deliveryEstimate.max} Minutes`
                : `${order?.deliveryEstimate?.min || 1} - ${order?.deliveryEstimate?.max || 3} Days`
            )}
          </h2>
          <p className="text-xs text-fit-muted mt-2">
            {order?.deliveryEstimate?.unit === 'mins' 
              ? 'Rider is prioritized for cold-chain supplements and express delivery.' 
              : 'Your items are being packed for safe transit via our courier partners.'}
          </p>
        </div>

        {/* Live Stepper Track */}
        <div className="card p-6 border-fit-border bg-fit-surface shadow-card space-y-6">
          <h3 className="text-sm font-bold text-fit-text uppercase tracking-wider">Delivery Timeline</h3>
          
          <div className="relative pl-6 space-y-8">
            {/* Connecting Vertical Track */}
            <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-fit-border" />
            <motion.div
              className="absolute left-[13px] top-3 w-0.5 bg-fit-primary origin-top shadow-glow"
              initial={{ height: 0 }}
              animate={{ height: `${(stageIndex / (stages.length - 1)) * 100}%` }}
              transition={{ duration: 0.6 }}
            />

            {stages.map((stage, i) => {
              const done = i <= stageIndex
              const isCurrent = i === stageIndex
              const Icon = stage.icon

              return (
                <div key={stage.key} className="relative flex items-start gap-4">
                  {/* Status Node Circle */}
                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: isCurrent ? Infinity : 0, duration: 1.5 }}
                    className={`absolute -left-6 w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      done
                        ? 'bg-fit-primary text-black shadow-glow font-bold'
                        : 'bg-fit-surface2 text-fit-muted border border-fit-border'
                    }`}
                  >
                    <Icon size={14} />
                  </motion.div>

                  <div className="ml-3">
                    <p className={`text-sm font-bold ${done ? 'text-fit-text' : 'text-fit-muted'}`}>
                      {stage.key}
                    </p>
                    <p className="text-xs text-fit-muted mt-0.5 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rider & Delivery Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-4 border-fit-border bg-fit-surface flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-fit-primary/10 border border-fit-primary/30 flex items-center justify-center text-fit-primary shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-fit-text">Express Rider</p>
              <p className="text-[11px] text-fit-muted">Karthik (Vaccinated &amp; Verified)</p>
              <p className="text-[11px] text-fit-primary font-semibold mt-0.5">📞 +91 98765 12345</p>
            </div>
          </div>

          <div className="card p-4 border-fit-border bg-fit-surface flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-fit-surface2 border border-fit-border flex items-center justify-center text-fit-muted shrink-0">
              <MapPin size={22} className="text-fit-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-fit-text">Delivery Destination</p>
              <p className="text-[11px] text-fit-muted truncate">
                {order.deliveryAddress?.line || 'Registered Delivery Address'}, {order.deliveryAddress?.city || 'City'}
              </p>
            </div>
          </div>
        </div>

        {/* Order Itemized Summary */}
        <div className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-3">
          <h3 className="text-sm font-bold text-fit-text uppercase tracking-wider pb-2 border-b border-fit-border">
            Itemized Order Details
          </h3>

          <div className="space-y-2.5">
            {order.items?.map((item, idx) => {
              const qty = Number(item.quantity || item.qty || 1)
              const numPrice = Number(item.price ?? (item.selectedVariant?.price ?? 0))
              const hasValidPrice = !isNaN(numPrice) && numPrice >= 0

              return (
                <div key={item.id || item.productId || idx} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-fit-text">{item.name}</span>
                    <span className="text-fit-muted ml-1.5 font-mono">× {qty}</span>
                    {(item.size || item.flavor) && (
                      <p className="text-[10px] text-fit-muted">
                        {[item.size, item.flavor].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-fit-text">
                    {hasValidPrice ? `₹${numPrice * qty}` : '₹' + (item.price || 0)}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="border-t border-fit-border pt-3 flex justify-between text-base font-black text-fit-text">
            <span>Total Amount Paid</span>
            <span className="text-fit-primary font-mono text-lg">₹{order.total || 0}</span>
          </div>
        </div>

        {/* Return to Home CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/home')}
            className="btn-outline text-xs px-6 py-2.5"
          >
            Continue Shopping
          </button>
        </div>

      </main>
    </AppLayout>
  )
}
