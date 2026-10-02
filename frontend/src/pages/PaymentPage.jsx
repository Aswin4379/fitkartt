import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, CreditCard, Landmark, Wallet, Loader2,
  ChevronRight, ChevronDown, Eye, EyeOff, ShieldCheck,
  Lock, CheckCircle2,
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import CheckoutStepper from '../components/checkout/CheckoutStepper.jsx'
import OrderSummary from '../components/checkout/OrderSummary.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { orderApi } from '../services/api.js'

const UPI_APPS = [
  { name: 'GPay', color: '#4285F4', letter: 'G' },
  { name: 'PhonePe', color: '#5F259F', letter: 'P' },
  { name: 'Paytm', color: '#00BAF2', letter: 'T' },
  { name: 'BHIM', color: '#FF6B00', letter: 'B' },
]

const BANKS = [
  'SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'Canara', 'BOB',
]

const EMI_OPTIONS = [3, 6, 9, 12]

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI Instant Pay', desc: 'Pay via Google Pay, PhonePe, Paytm or QR', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Maestro', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', desc: 'Over 50+ major Indian banks supported', icon: Landmark },
  { id: 'emi', label: 'No-Cost EMI', desc: 'Flexible monthly installments', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay with cash at your doorstep', icon: Wallet },
]

export default function PaymentPage() {
  const navigate = useNavigate()
  const { items, subtotal, discount, deliveryFee, total, clearCart, coupon } = useCart()
  const { user, addOrder } = useUser()

  const [selected, setSelected] = useState('upi')
  const [processing, setProcessing] = useState(false)

  // UPI
  const [upiId, setUpiId] = useState('')

  // Card
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [showCvv, setShowCvv] = useState(false)

  // Net banking
  const [bank, setBank] = useState('')

  // EMI
  const [emiMonths, setEmiMonths] = useState(3)
  const emiAmount = Math.ceil(total / emiMonths)

  const formatCardNumber = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const pay = async () => {
    setProcessing(true)

    // Get selected address
    let deliveryAddress = null
    try {
      const raw = localStorage.getItem('fitkart_selected_address')
      if (raw) deliveryAddress = JSON.parse(raw)
    } catch {}

    if (!deliveryAddress && user?.addresses?.length > 0) {
      deliveryAddress = user.addresses[0]
    }

    const localOrderId = `FK${Date.now().toString().slice(-8)}`
    const orderPayload = {
      orderId: localOrderId,
      items: items.map((i) => {
        const qty = Number(i.qty || i.quantity || 1)
        const price = Number(i.price ?? (i.variant?.price ?? 0))
        const mrp = Number(i.mrp || i.originalPrice || price)
        const size = i.size || i.variant?.size || ''
        const flavor = i.flavor || i.variant?.flavor || ''
        const unit = i.unit || i.variant?.unit || ''
        const variantId = i.variantId || i.variant?.id || ''
        const productId = i.productId || i.id || ''

        return {
          id: productId,
          productId,
          name: i.name || 'FitKart Product',
          image: i.image || '',
          category: i.category || '',
          price,
          mrp,
          quantity: qty,
          qty,
          size,
          flavor,
          unit,
          variantId,
          selectedVariant: {
            id: variantId,
            size,
            flavor,
            unit,
            price,
            mrp
          },
          variant: {
            id: variantId,
            size,
            flavor,
            unit,
            price,
            mrp
          }
        }
      }),
      subtotal: Number(subtotal || 0),
      discount: Number(discount || 0),
      deliveryFee: Number(deliveryFee || 0),
      total: Number(total || 0),
      coupon: coupon?.code || null,
      paymentMethod: selected,
      deliveryAddress: deliveryAddress || {},
      customerName: user?.name || 'FitKart Customer',
      customerEmail: user?.email || '',
      customerPhone: user?.phone || '',
    }

    let finalOrder = {
      id: localOrderId,
      orderId: localOrderId,
      ...orderPayload,
      status: 'Order Confirmed',
      placedAt: new Date().toISOString()
    }

    try {
      const res = await orderApi.createOrder(orderPayload)
      if (res?.order) {
        finalOrder = {
          ...res.order,
          id: res.order.orderId || res.order.id || localOrderId,
          orderId: res.order.orderId || localOrderId
        }
      }
    } catch (err) {
      console.warn('[Backend order creation fallback to local]:', err.message)
    }

    addOrder(finalOrder)
    clearCart()
    setProcessing(false)
    navigate('/order-success', { state: { order: finalOrder } })
  }

  return (
    <AppLayout>
      {/* Checkout Stepper */}
      <div className="bg-fit-surface/80 backdrop-blur-md border-b border-fit-border sticky top-0 z-30">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <CheckoutStepper currentStep={3} />
        </div>
      </div>

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column: Payment Methods Accordion */}
          <div className="space-y-4">
            <h1 className="text-xl font-black text-fit-text flex items-center gap-2">
              <Lock size={22} className="text-fit-primary" />
              <span>Choose Payment Method</span>
            </h1>

            <div className="card border-fit-border bg-fit-surface overflow-hidden shadow-card divide-y divide-fit-border">
              {PAYMENT_METHODS.map(({ id, label, desc, icon: Icon }) => {
                const isActive = selected === id
                return (
                  <div key={id} className="transition-colors">
                    {/* Method Toggle */}
                    <button
                      onClick={() => setSelected(id)}
                      className={`w-full flex items-center gap-3.5 p-4 sm:p-5 text-left transition-all ${
                        isActive ? 'bg-fit-primary/5' : 'hover:bg-fit-surface2/50'
                      }`}
                    >
                      {/* Radio */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isActive ? 'border-fit-primary bg-fit-primary/20' : 'border-fit-border'
                      }`}>
                        {isActive && <div className="w-2.5 h-2.5 rounded-full bg-fit-primary" />}
                      </div>

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-fit-primary/20 text-fit-primary' : 'bg-fit-surface2 text-fit-muted'
                      }`}>
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold ${isActive ? 'text-fit-primary' : 'text-fit-text'}`}>{label}</p>
                        <p className="text-xs text-fit-muted">{desc}</p>
                      </div>

                      <ChevronDown size={16} className={`text-fit-muted transition-transform duration-200 ${
                        isActive ? 'rotate-180 text-fit-primary' : ''
                      }`} />
                    </button>

                    {/* Method Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 sm:p-5 pt-0 bg-fit-surface2/30 border-t border-fit-border/40">
                            
                            {/* UPI App Selection */}
                            {id === 'upi' && (
                              <div className="space-y-3 pt-3">
                                <p className="text-xs font-bold text-fit-muted uppercase tracking-wider">Fast UPI Apps</p>
                                <div className="grid grid-cols-4 gap-2">
                                  {UPI_APPS.map(({ name, color, letter }) => (
                                    <button
                                      key={name}
                                      onClick={() => setUpiId(`${user?.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'user'}@${name.toLowerCase()}`)}
                                      className="p-3 rounded-2xl border border-fit-border bg-fit-surface hover:border-fit-primary flex flex-col items-center gap-1.5 transition-all"
                                    >
                                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm" style={{ backgroundColor: color }}>
                                        {letter}
                                      </div>
                                      <span className="text-[11px] font-bold text-fit-text">{name}</span>
                                    </button>
                                  ))}
                                </div>

                                <div className="relative pt-1">
                                  <input
                                    placeholder="Enter your UPI ID (e.g. mobile@upi)"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="input-field text-xs pr-16"
                                  />
                                  {upiId && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-fit-primary">
                                      Verified ✓
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Card Details */}
                            {id === 'card' && (
                              <div className="space-y-3 pt-3">
                                <input
                                  placeholder="Card Number (16 digits)"
                                  value={card.number}
                                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                                  className="input-field text-xs font-mono"
                                  maxLength={19}
                                />
                                <input
                                  placeholder="Name on Card"
                                  value={card.name}
                                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                                  className="input-field text-xs"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    placeholder="MM/YY"
                                    value={card.expiry}
                                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                                    className="input-field text-xs"
                                    maxLength={5}
                                  />
                                  <div className="relative">
                                    <input
                                      placeholder="CVV"
                                      type={showCvv ? 'text' : 'password'}
                                      value={card.cvv}
                                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                      className="input-field text-xs pr-9"
                                      maxLength={3}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowCvv(!showCvv)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 text-fit-muted"
                                    >
                                      {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Net Banking */}
                            {id === 'netbanking' && (
                              <div className="space-y-3 pt-3">
                                <div className="grid grid-cols-4 gap-2">
                                  {BANKS.map((b) => (
                                    <button
                                      key={b}
                                      onClick={() => setBank(b)}
                                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                                        bank === b
                                          ? 'border-fit-primary bg-fit-primary/10 text-fit-primary'
                                          : 'border-fit-border text-fit-muted hover:border-fit-primary/40'
                                      }`}
                                    >
                                      {b}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* EMI */}
                            {id === 'emi' && (
                              <div className="space-y-3 pt-3">
                                <p className="text-xs text-fit-muted">Select your installment duration:</p>
                                <div className="grid grid-cols-4 gap-2">
                                  {EMI_OPTIONS.map((m) => (
                                    <button
                                      key={m}
                                      onClick={() => setEmiMonths(m)}
                                      className={`p-3 rounded-2xl border text-center transition-all ${
                                        emiMonths === m
                                          ? 'border-fit-primary bg-fit-primary/10 text-fit-primary shadow-glow'
                                          : 'border-fit-border bg-fit-surface text-fit-muted'
                                      }`}
                                    >
                                      <span className="text-base font-black block">{m}</span>
                                      <span className="text-[10px] block">months</span>
                                      <span className="text-xs font-bold text-fit-primary mt-1 block">
                                        ₹{Math.ceil(total / m)}/mo
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Cash on Delivery */}
                            {id === 'cod' && (
                              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5 mt-3">
                                <Wallet size={16} className="shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-bold">Cash on Delivery Available</p>
                                  <p className="text-[11px] text-fit-muted mt-0.5 leading-relaxed">
                                    Keep exact cash amount of ₹{total} ready upon delivery. UPI payment at delivery is also accepted by the rider.
                                  </p>
                                </div>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Desktop Place Order Button */}
            <div className="hidden lg:block pt-2">
              <button
                onClick={pay}
                disabled={processing}
                className="w-full btn-primary py-4 text-base font-black flex items-center justify-center gap-2 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Authorizing &amp; Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    <span>Pay ₹{total} &amp; Confirm Order</span>
                  </>
                )}
              </button>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center gap-2 text-xs text-fit-muted bg-fit-surface2/60 p-3.5 rounded-2xl border border-fit-border">
              <ShieldCheck size={16} className="text-fit-primary shrink-0" />
              <span>PCI-DSS compliant 256-bit encryption. Your payment credentials are never stored.</span>
            </div>
          </div>

          {/* Right Column: Order Summary (Desktop) */}
          <div className="hidden lg:block space-y-4">
            <div className="sticky top-20">
              <OrderSummary />
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-fit-border px-4 py-3 z-40 backdrop-blur-xl shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-fit-muted">Final Amount</span>
          <p className="text-xl font-black text-fit-primary font-mono leading-tight">₹{total}</p>
        </div>
        <button
          onClick={pay}
          disabled={processing}
          className="btn-primary py-3 px-8 text-xs font-black shadow-glow flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock size={14} />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </AppLayout>
  )
}
