import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80'

export default function HeroBanner() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden bg-fit-bg flex items-center border-b border-fit-border/40">
      {/* Background with Ambient Lights */}
      <img
        src={HERO_IMAGE}
        alt="Fitness Athlete"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-25 dark:opacity-35 filter contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-fit-bg via-fit-bg/95 to-fit-bg/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-fit-bg via-transparent to-transparent z-10" />
      
      {/* Ambient Radial Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-fit-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-80 h-80 bg-fit-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fit-primary/10 border border-fit-primary/30 text-fit-primary text-xs font-bold tracking-wide uppercase self-start mb-3 shadow-glow"
        >
          <Sparkles size={13} className="animate-spin text-fit-primary" />
          <span>India&apos;s #1 Fitness &amp; Nutrition Hub</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-fit-text font-display leading-[1.1] max-w-2xl"
        >
          Fuel Your Body.{' '}
          <span className="bg-gradient-to-r from-fit-primary via-emerald-500 to-fit-accent bg-clip-text text-transparent">
            Crush Your Limits.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-fit-muted mt-4 max-w-xl leading-relaxed font-medium"
        >
          100% Authentic Gym Supplements, High-Protein Meals &amp; Smart AI Nutrition Plans — delivered straight to your door in minutes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 mt-6"
        >
          <button
            onClick={() => navigate('/category/all')}
            className="btn-primary flex items-center gap-2 text-sm sm:text-base px-6 py-3 shadow-glow hover:scale-105 transition-transform"
          >
            <span>Shop Supplements</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate('/ai-recommendation')}
            className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-5 py-3 border-fit-border hover:border-fit-primary/60"
          >
            <Sparkles size={16} className="text-fit-primary" />
            <span>Get AI Diet Plan</span>
          </button>
        </motion.div>

        {/* Trust metrics bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 sm:flex sm:items-center gap-4 sm:gap-8 mt-8 pt-6 border-t border-fit-border max-w-xl text-left"
        >
          <div>
            <div className="flex items-center gap-1 text-base sm:text-lg font-black text-fit-text">
              <Zap size={15} className="text-fit-primary" /> 12 Mins
            </div>
            <p className="text-[11px] text-fit-muted">Ultra-fast delivery</p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-base sm:text-lg font-black text-fit-text">
              <ShieldCheck size={15} className="text-fit-primary" /> 100%
            </div>
            <p className="text-[11px] text-fit-muted">Lab tested authentic</p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-base sm:text-lg font-black text-fit-text">
              <Award size={15} className="text-fit-primary" /> 50K+
            </div>
            <p className="text-[11px] text-fit-muted">Happy athletes</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}