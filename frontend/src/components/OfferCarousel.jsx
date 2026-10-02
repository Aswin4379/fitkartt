import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, Sparkles, Copy, Check, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const offers = [
  {
    id: 1,
    code: 'FIRST20',
    title: 'Flat 20% OFF First Order',
    subtitle: 'Kickstart your fitness transformation with our best introductory offer.',
    badge: 'NEW ATHLETE OFFER',
    bg: 'from-fit-primary/20 via-fit-surface to-fit-surface2',
    accentColor: '#22C55E',
  },
  {
    id: 2,
    code: 'FREEDEL',
    title: 'Zero Delivery Fee Above ₹499',
    subtitle: 'Order top-grade whey, vitamins & snacks with free lightning dispatch.',
    badge: 'LIMITED TIME',
    bg: 'from-fit-accent/20 via-fit-surface to-fit-surface2',
    accentColor: '#A3E635',
  },
  {
    id: 3,
    code: 'PREMIUM',
    title: 'Unlock FitKart Pro AI Diet',
    subtitle: 'Get automated calorie calculations, workout rest timer & custom macro splits.',
    badge: 'PRO ACCESS',
    bg: 'from-blue-500/20 via-fit-surface to-fit-surface2',
    accentColor: '#38BDF8',
  },
]

export default function OfferCarousel() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % offers.length)
      setCopied(false)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  const offer = offers[index]

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-fit-border/80 bg-fit-surface shadow-card">
      <AnimatePresence mode="wait">
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
          className={`p-4 sm:p-5 bg-gradient-to-r ${offer.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
        >
          <div className="space-y-1">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border"
              style={{
                backgroundColor: `${offer.accentColor}15`,
                borderColor: `${offer.accentColor}40`,
                color: offer.accentColor,
              }}
            >
              {offer.badge}
            </span>
            <h3 className="text-base sm:text-lg font-black text-fit-text leading-tight mt-1">
              {offer.title}
            </h3>
            <p className="text-xs text-fit-muted max-w-lg leading-relaxed">
              {offer.subtitle}
            </p>
          </div>

          {/* Coupon Code & Action */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
            <button
              onClick={() => handleCopy(offer.code)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-fit-border bg-fit-surface2/80 hover:bg-fit-surface2 text-xs font-mono font-bold text-fit-text transition-all"
              title="Click to copy code"
            >
              <Tag size={12} className="text-fit-primary" />
              <span>{offer.code}</span>
              {copied ? (
                <Check size={12} className="text-fit-primary" />
              ) : (
                <Copy size={12} className="text-fit-muted" />
              )}
            </button>

            <button
              onClick={() => navigate('/category/all')}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
            >
              <span>Shop Now</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {offers.map((o, i) => (
          <button
            key={o.id}
            onClick={() => {
              setIndex(i)
              setCopied(false)
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-fit-primary' : 'w-1.5 bg-fit-border'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
