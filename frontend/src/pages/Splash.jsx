import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import { useUser } from '../context/UserContext.jsx'

export default function Splash() {
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(user ? '/home' : '/login', { replace: true })
    }, 2200)
    return () => clearTimeout(t)
  }, [navigate, user])

  return (
    <div className="min-h-screen bg-fit-bg flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-fit-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-fit-accent rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-tr from-fit-primary to-fit-accent p-3 flex items-center justify-center shadow-glow overflow-hidden"
      >
        <img
          src={import.meta.env.BASE_URL + "workout-logo.png"}
          alt="FitKart Workout Logo"
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 mt-6 text-3xl font-bold tracking-tight"
      >
        Fit<span className="text-fit-primary">Kart</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 mt-2 text-sm text-fit-muted"
      >
        Fuel delivered in minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-10 w-40 h-1 bg-fit-surface2 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ delay: 0.8, duration: 1.3, ease: 'easeInOut' }}
          className="h-full bg-fit-primary"
        />
      </motion.div>
    </div>
  )
}
