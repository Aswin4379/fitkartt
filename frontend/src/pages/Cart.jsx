import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, Tag, ShoppingBag, Heart, ChevronRight, Truck, ShieldCheck, Gift, X, Sparkles } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import CheckoutStepper from '../components/checkout/CheckoutStepper.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { getCategoryFallbackImage } from '../utils/foodImageMap.js'
import SmartFoodImage from '../components/SmartFoodImage.jsx'

const AVAILABLE_COUPONS = [
  { code: 'FIRST20', label: '20% off on your first order', type: 'percent', value: 20 },
  { code: 'FIT50', label: 'Flat ₹50 off on orders above ₹199', type: 'flat', value: 50 },
  { code: 'PROTEIN10', label: '10% off on protein supplements', type: 'percent', value: 10 },
]

export default function Cart() {
  const navigate = useNavigate()
  const { items, updateQty, removeFromCart, coupon, applyCoupon, removeCoupon, subtotal, discount, deliveryFee, total } = useCart()
  const { products, getProductById } = useProducts()
  const { user, toggleWishlist } = useUser()
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)

  const cartProductIds = new Set(items.map((i) => i.productId))
  const recommended = products.filter((p) => !cartProductIds.has(p.id) && !cartProductIds.has(p._id)).slice(0, 8)
  const itemMrpTotal = items.reduce((sum, i) => sum + (Number(i.mrp) || Number(i.price)) * i.qty, 0)
  const itemDiscount = Math.max(0, itemMrpTotal - subtotal)
  const totalSavings = itemDiscount + discount

  const handleApply = (codeToApply) => {
    const c = codeToApply || code
    if (!c.trim()) return
    const res = applyCoupon(c)
    setMsg(res.message)
    setCode('')
    setShowCoupons(false)
  }

  // Empty State
  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="bg-fit-surface border-b border-fit-border">
          <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
            <CheckoutStepper currentStep={1} />
          </div>
        </div>
        <div className="max-w-md mx-auto py-20 px-4 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-fit-surface2/80 border border-fit-border flex items-center justify-center mb-6 shadow-card">
            <ShoppingBag size={40} className="text-fit-muted" />
          </div>
          <h2 className="text-2xl font-black text-fit-text mb-2">Your Cart is Empty</h2>
          <p className="text-sm text-fit-muted mb-8 max-w-sm">
            Looks like you haven&apos;t added anything to your cart yet. Explore premium fitness supplements and nutrition meals!
          </p>
          <button onClick={() => navigate('/category/all')} className="btn-primary flex items-center gap-2">
            <span>Explore Store</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      {/* Checkout Stepper */}
      <div className="bg-fit-surface/80 backdrop-blur-md border-b border-fit-border sticky top-0 z-30">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <CheckoutStepper currentStep={1} />
        </div>
      </div>

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column: Cart Items & Free Delivery Progress */}
          <div className="space-y-4 min-w-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black text-fit-text flex items-center gap-2">
                <span>My Shopping Cart</span>
                <span className="text-xs font-bold text-fit-muted bg-fit-surface2 px-2.5 py-0.5 rounded-full border border-fit-border">
                  {items.length} Item{items.length > 1 ? 's' : ''}
                </span>
              </h1>
              {deliveryFee === 0 && (
                <span className="delivery-badge flex items-center gap-1 text-xs">
                  <Truck size={14} /> FREE EXPRESS DELIVERY
                </span>
              )}
            </div>

            {/* Free Delivery Unlock Meter */}
            {deliveryFee > 0 && (
              <div className="card p-4 bg-gradient-to-r from-fit-primary/10 via-fit-surface to-fit-surface border-fit-primary/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-fit-text flex items-center gap-1.5">
                    <Truck size={14} className="text-fit-primary animate-bounce" />
                    Add ₹{499 - subtotal} more for <span className="text-fit-primary">FREE Delivery</span>
                  </span>
                  <span className="text-fit-primary font-mono">₹{subtotal} / ₹499</span>
                </div>
                <div className="h-2 bg-fit-surface2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fit-primary to-fit-accent transition-all duration-500 rounded-full shadow-glow"
                    style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Item List */}
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((item) => {
                  const itemTotal = item.price * item.qty
                  const itemMrp = (Number(item.mrp) || Number(item.price)) * item.qty
                  const isWishlisted = user?.wishlist?.includes(item.productId)

                  return (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="card p-4 border-fit-border bg-fit-surface flex flex-col sm:flex-row gap-4 justify-between"
                    >
                      <div className="flex gap-4 min-w-0">
                        {/* Image */}
                        <Link to={`/product/${item.productId}`} className="shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-fit-surface2 border border-fit-border p-1">
                            <SmartFoodImage
                              src={item.image}
                              fallbackSrc={getCategoryFallbackImage(item.category)}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              rounded=""
                            />
                          </div>
                        </Link>

                        {/* Details */}
                        <div className="space-y-1 min-w-0">
                          <Link to={`/product/${item.productId}`}>
                            <h3 className="text-sm font-bold text-fit-text hover:text-fit-primary transition-colors leading-snug line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          {(item.size || item.flavor) && (
                            <p className="text-xs text-fit-muted">
                              {[item.size, item.flavor].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-base font-black text-fit-text">₹{itemTotal}</span>
                            {itemMrp > itemTotal && (
                              <span className="text-xs text-fit-muted line-through">₹{itemMrp}</span>
                            )}
                          </div>
                          
                          {(() => {
                            const catalogProduct = getProductById(item.productId);
                            const dInfo = catalogProduct?.deliveryInfo || { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' };
                            const isFast = dInfo.unit === 'mins';
                            const deliveryText = `${isFast ? '⚡' : '📦'} Delivery in ${dInfo.min}–${dInfo.max} ${dInfo.unit}`;
                            return (
                              <div className="mt-1 flex items-center">
                                <span className={`text-[10px] font-bold ${isFast ? 'text-green-500' : 'text-blue-400'}`}>
                                  {deliveryText}
                                </span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-fit-border">
                        {/* Stepper */}
                        <div className="flex items-center border border-fit-border rounded-xl bg-fit-surface2/60">
                          <button
                            onClick={() => updateQty(item.key, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-fit-surface2 text-fit-text"
                            aria-label="Decrease"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-fit-text border-x border-fit-border">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.key, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-fit-surface2 text-fit-text"
                            aria-label="Increase"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 text-xs text-fit-muted">
                          <button
                            onClick={() => toggleWishlist(item.productId)}
                            className="hover:text-fit-primary flex items-center gap-1 transition-colors"
                          >
                            <Heart size={13} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                            <span className="hidden sm:inline">Save</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="hover:text-red-400 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Coupon Code Panel */}
            <div className="card p-4 border-fit-border bg-fit-surface space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-fit-text">
                  <Gift size={16} className="text-fit-primary" />
                  <span>Coupons &amp; Promotional Codes</span>
                </div>
                {!coupon && (
                  <button
                    onClick={() => setShowCoupons(!showCoupons)}
                    className="text-xs text-fit-primary font-bold hover:underline"
                  >
                    {showCoupons ? 'Hide Offers' : 'View Offers'}
                  </button>
                )}
              </div>

              {coupon ? (
                <div className="flex items-center justify-between bg-fit-primary/10 border border-fit-primary/30 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-fit-primary">
                    <Tag size={14} />
                    <span>{coupon.code} Applied ({coupon.label})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-fit-muted hover:text-red-400 p-1">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase())
                        setMsg('')
                      }}
                      placeholder="Enter Promo Code"
                      className="input-field text-xs uppercase"
                      onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                    />
                    <button
                      onClick={() => handleApply()}
                      className="btn-outline px-4 py-2 text-xs font-bold shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {msg && (
                    <p className={`text-xs font-medium ${msg.includes('applied') ? 'text-fit-primary' : 'text-red-400'}`}>
                      {msg}
                    </p>
                  )}

                  {/* Available Coupon list */}
                  {showCoupons && (
                    <div className="grid grid-cols-1 gap-2 pt-2 border-t border-fit-border">
                      {AVAILABLE_COUPONS.map((c) => (
                        <div
                          key={c.code}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-dashed border-fit-border bg-fit-surface2/60"
                        >
                          <div>
                            <span className="font-mono font-bold text-xs text-fit-primary">{c.code}</span>
                            <p className="text-[11px] text-fit-muted">{c.label}</p>
                          </div>
                          <button
                            onClick={() => handleApply(c.code)}
                            className="text-xs font-bold text-fit-primary border border-fit-primary/40 px-3 py-1 rounded-lg hover:bg-fit-primary hover:text-black transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recommended Products */}
            {recommended.length > 0 && (
              <div className="pt-6">
                <h3 className="section-title text-base mb-3">Frequently Bought Together</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {recommended.map((p) => (
                    <ProductCard key={p.id} product={p} compact />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Price Summary (Sticky on desktop) */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-20 card p-5 border-fit-border bg-fit-surface shadow-card space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-fit-text pb-2 border-b border-fit-border">
                Order Price Breakdown
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-fit-muted">
                  <span>Cart Subtotal</span>
                  <span className="font-bold text-fit-text">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-fit-primary font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-fit-muted">
                  <span className="flex items-center gap-1"><Truck size={13} /> Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-fit-primary font-bold' : 'font-bold text-fit-text'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="border-t border-fit-border pt-3 flex justify-between text-base font-black text-fit-text">
                  <span>Grand Total</span>
                  <span className="text-fit-primary text-xl font-mono">₹{total}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="p-2.5 rounded-xl bg-fit-primary/10 border border-fit-primary/30 text-center text-xs font-bold text-fit-primary">
                    🎉 You saved a total of ₹{totalSavings}!
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout/address')}
                className="w-full btn-primary py-3.5 flex items-center justify-between text-sm shadow-glow hover:scale-[1.02] transition-transform"
              >
                <span>Proceed to Delivery Address</span>
                <ChevronRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-fit-muted pt-1">
                <ShieldCheck size={14} className="text-fit-primary" />
                <span>Safe and Secure 256-bit Encrypted Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-fit-border px-4 py-3 z-40 backdrop-blur-xl shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-fit-muted">Total Payable</span>
          <p className="text-xl font-black text-fit-primary font-mono leading-tight">₹{total}</p>
        </div>
        <button
          onClick={() => navigate('/checkout/address')}
          className="btn-primary py-2.5 px-6 text-xs flex items-center gap-1.5 shadow-glow"
        >
          <span>Continue</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </AppLayout>
  )
}
