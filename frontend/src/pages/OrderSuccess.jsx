import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Package, Truck, MapPin, CreditCard, Star, ChevronRight, Home } from 'lucide-react'
import { useProducts } from '../context/ProductContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SmartFoodImage from '../components/SmartFoodImage.jsx'
import { getCategoryFallbackImage } from '../utils/foodImageMap.js'

// Deterministic confetti pieces based on index
const CONFETTI_COLORS = ['#39FF6A', '#B6FF3C', '#00e5ff', '#ff6b6b', '#ffd93d', '#a78bfa']
const CONFETTI_COUNT = 24

function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: `${(i * 4.2) % 100}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: `${(i * 0.18) % 3}s`,
      duration: `${2.5 + (i % 4) * 0.5}s`,
      size: 6 + (i % 3) * 3,
      shape: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0%',
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            borderRadius: p.shape,
            animation: `confetti-fall ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

const TRACKING_STEPS = [
  { icon: Package, label: 'Order Placed', done: true },
  { icon: Package, label: 'Packed', done: false },
  { icon: Truck, label: 'Shipped', done: false },
  { icon: Home, label: 'Delivered', done: false },
]

function PaymentMethodLabel(method) {
  const map = {
    upi: 'UPI Payment',
    card: 'Credit/Debit Card',
    netbanking: 'Net Banking',
    emi: 'EMI',
    cod: 'Cash on Delivery',
  }
  return map[method] || method
}

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { products, getProductById } = useProducts()
  const order = location.state?.order

  let deliveryText = ''
  if (order?.deliveryEstimate) {
    if (order.deliveryEstimate.unit === 'mins') {
      deliveryText = `Today in ${order.deliveryEstimate.min}-${order.deliveryEstimate.max} mins ⚡`
    } else {
      const deliveryDateObj = new Date(Date.now() + (order.deliveryEstimate.max || 3) * 86400000)
      deliveryText = deliveryDateObj.toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long'
      })
    }
  } else {
    deliveryText = new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long'
    })
  }

  const recommended = useMemo(() => {
    const cartProductIds = new Set((order?.items || []).map((i) => i.productId))
    return products.filter((p) => !cartProductIds.has(p.id) && !cartProductIds.has(p._id)).slice(0, 8)
  }, [order, products])

  const resolveItem = (item, idx) => {
    const productId = item.productId || item.id || item._id
    const catalogProduct = getProductById(productId)

    const name = item.name || catalogProduct?.name || 'FitKart Product'
    const image = item.image || (item.product && item.product.image) || catalogProduct?.image || ''
    const category = item.category || (item.product && item.product.category) || catalogProduct?.category || ''

    // Quantity: never blank or NaN
    const rawQty = item.quantity !== undefined ? item.quantity : (item.qty !== undefined ? item.qty : 1)
    const qty = (!isNaN(rawQty) && Number(rawQty) > 0) ? Number(rawQty) : 1

    // Price: actual price stored in real order document (or catalog fallback if missing in legacy order)
    let rawPrice = item.price !== undefined && item.price !== null ? item.price : (item.selectedVariant?.price ?? item.variant?.price)
    if ((rawPrice === undefined || rawPrice === null || isNaN(rawPrice)) && catalogProduct) {
      rawPrice = catalogProduct.price ?? catalogProduct.variants?.[0]?.price
    }
    const numPrice = Number(rawPrice)
    const hasValidPrice = !isNaN(numPrice) && numPrice >= 0

    // Variant details
    const size = item.size || item.selectedVariant?.size || item.variant?.size || ''
    const flavor = item.flavor || item.selectedVariant?.flavor || item.variant?.flavor || ''
    const variantLabel = [size, flavor].filter(Boolean).join(' · ')

    const itemTotal = hasValidPrice ? numPrice * qty : null

    return {
      key: item.key || item.productId || item.id || `order-item-${idx}`,
      name,
      image,
      category,
      qty,
      price: numPrice,
      hasValidPrice,
      itemTotal,
      variantLabel,
    }
  }

  const orderId = order?.orderId || order?.id || order?._id || 'FK00000000'

  const deliveryFeeText = () => {
    if (order?.deliveryFee === 0 || order?.deliveryFee === '0') return 'FREE'
    if (order?.deliveryFee !== undefined && !isNaN(order.deliveryFee)) return `₹${order.deliveryFee}`
    return 'FREE'
  }

  const totalPaidText = () => {
    if (order?.total !== undefined && !isNaN(order.total)) return `₹${order.total}`
    const computedTotal = (order?.items || []).reduce((sum, it) => {
      const p = Number(it.price || it.selectedVariant?.price || 0)
      const q = Number(it.quantity || it.qty || 1)
      return sum + p * q
    }, 0)
    return computedTotal > 0 ? `₹${computedTotal}` : '₹0'
  }

  return (
    <div className="min-h-screen bg-fit-bg text-fit-text relative overflow-hidden">
      <Confetti />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-fit-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* Success Icon + Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
            className="w-28 h-28 rounded-full bg-fit-primary/15 border-4 border-fit-primary flex items-center justify-center mb-5 shadow-glow"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 size={60} className="text-fit-primary" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Order Confirmed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-fit-muted text-sm max-w-sm"
          >
            Your FitKart order has been placed successfully. Get ready for your fitness fuel!
          </motion.p>
        </div>

        {/* Order ID + delivery date */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="glass rounded-2xl border border-fit-primary/30 p-4 text-center mb-4 shadow-card"
        >
          <p className="text-xs text-fit-muted uppercase tracking-widest mb-1">Order ID</p>
          <p className="text-xl font-bold text-fit-primary">{orderId}</p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-fit-muted">
            <Truck size={14} className="text-fit-primary" />
            Expected delivery by{' '}
            <span className="font-semibold text-fit-text">{deliveryText}</span>
          </div>
        </motion.div>

        {/* Order tracking mini steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl border border-fit-border p-4 mb-4 shadow-card"
        >
          <p className="text-xs text-fit-muted uppercase tracking-wide font-semibold mb-4">Order Tracking</p>
          <div className="flex items-start">
            {TRACKING_STEPS.map((step, idx) => {
              const Icon = step.icon
              const isFirst = idx === 0
              return (
                <div key={step.label} className="flex-1 flex flex-col items-center text-center">
                  <div className="flex items-center w-full">
                    {idx > 0 && (
                      <div className={`flex-1 h-0.5 ${isFirst ? 'bg-fit-primary' : 'bg-fit-border'}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isFirst ? 'bg-fit-primary text-fit-bg' : 'bg-fit-surface2 border border-fit-border text-fit-muted'
                      }`}>
                      <Icon size={14} />
                    </div>
                    {idx < TRACKING_STEPS.length - 1 && (
                      <div className="flex-1 h-0.5 bg-fit-border" />
                    )}
                  </div>
                  <p className={`text-[10px] mt-1.5 font-medium ${isFirst ? 'text-fit-primary' : 'text-fit-muted'}`}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Order Items + details */}
        {order?.items?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="glass rounded-2xl border border-fit-border overflow-hidden mb-4 shadow-card"
          >
            <div className="px-4 py-3 border-b border-fit-border flex items-center gap-2">
              <Package size={14} className="text-fit-primary" />
              <p className="text-sm font-bold">{order.items.length} Item{order.items.length > 1 ? 's' : ''} ordered</p>
            </div>
            <div className="p-4 space-y-3">
              {order.items.map((rawItem, idx) => {
                const item = resolveItem(rawItem, idx)
                return (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-fit-surface2 border border-fit-border">
                      <SmartFoodImage
                        src={item.image}
                        fallbackSrc={getCategoryFallbackImage(item.category)}
                        alt={item.name}
                        className="w-full h-full"
                        rounded=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-fit-text line-clamp-1">{item.name}</p>
                      <p className="text-xs text-fit-muted">
                        {[item.variantLabel, `Qty: ${item.qty}`].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    {item.hasValidPrice ? (
                      <p className="text-sm font-bold flex-shrink-0">₹{item.itemTotal}</p>
                    ) : (
                      <p className="text-xs text-fit-muted flex-shrink-0">Price unavailable</p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Price summary */}
            <div className="border-t border-fit-border px-4 py-3 space-y-1.5 bg-fit-surface2/40">
              {order.discount > 0 && (
                <div className="flex justify-between text-xs text-fit-primary">
                  <span>Discount</span><span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-fit-muted">
                <span>Delivery</span>
                <span>{deliveryFeeText()}</span>
              </div>
              <div className="flex justify-between font-bold text-sm border-t border-fit-border pt-2 mt-1">
                <span>Total Paid</span>
                <span className="text-fit-primary">{totalPaidText()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-fit-muted mt-1">
                <CreditCard size={11} className="text-fit-primary" />
                Paid via {PaymentMethodLabel(order.paymentMethod || 'upi')}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex gap-3 mb-8"
        >
          <button
            onClick={() => navigate('/order-tracking', { state: { order } })}
            className="flex-1 bg-fit-primary text-fit-bg font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-fit-primary-dark transition-colors shadow-glow"
          >
            <Truck size={16} /> Track Order
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex-1 border-2 border-fit-border text-fit-text font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:border-fit-primary hover:text-fit-primary transition-colors"
          >
            <Home size={16} /> Continue Shopping
          </button>
        </motion.div>

        {/* Rate your order */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass rounded-2xl border border-fit-border p-4 text-center mb-8"
        >
          <p className="text-sm font-semibold mb-2">Rate your shopping experience</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className="w-9 h-9 flex items-center justify-center hover:scale-110 transition-transform">
                <Star size={24} className="text-fit-border hover:fill-amber-400 hover:text-amber-400 transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Products */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Continue Your Fitness Journey</h2>
              <button
                onClick={() => navigate('/home')}
                className="text-xs text-fit-primary font-semibold flex items-center gap-1"
              >
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
