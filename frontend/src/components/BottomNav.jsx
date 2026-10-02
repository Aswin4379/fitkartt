import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'

const items = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Track', icon: LayoutGrid },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const { itemCount } = useCart()
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-fit-surface/95 backdrop-blur-2xl border-t border-fit-border px-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-colors"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-fit-primary font-bold scale-105'
                  : 'text-fit-muted hover:text-fit-text active:scale-95'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative flex items-center justify-center">
                  <Icon size={21} className={isActive ? 'stroke-[2.5] text-fit-primary' : 'stroke-[1.75]'} />
                  {to === '/cart' && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-fit-primary to-fit-accent text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-glow">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] tracking-tight ${isActive ? 'text-fit-primary font-bold' : 'text-fit-muted'}`}>
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1 w-5 h-1 rounded-full bg-gradient-to-r from-fit-primary to-fit-accent shadow-glow"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
