import { MapPin, Search, Clock, ChevronDown, Heart, ShoppingCart, User, Sun, Moon, Dumbbell, Sparkles } from 'lucide-react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const { itemCount, total } = useCart()
  const { user } = useUser()
  const { theme, toggleTheme } = useTheme()

  const submit = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const quickSearches = ['Whey Protein', 'Peanut Butter', 'Creatine', 'Oats', 'BCAA']

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-fit-border transition-all duration-200">
      {/* Top Banner / Location & Desktop Navigation */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/home" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fit-primary to-fit-accent p-1 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                <img
                  src="/workout-logo.png"
                  alt="FitKart Workout Logo"
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:brightness-110 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight font-display text-fit-text group-hover:text-fit-primary transition-colors flex items-center gap-1">
                  FitKart <span className="w-1.5 h-1.5 rounded-full bg-fit-primary animate-pulse" />
                </span>
              </div>
            </Link>

            {/* Delivery address chip */}
            <button
              onClick={() => navigate('/checkout/address')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-fit-surface2/70 hover:bg-fit-surface2 border border-fit-border/60 hover:border-fit-primary/40 transition-all text-left min-w-0"
              title="Change delivery address"
            >
              <MapPin size={15} className="text-fit-primary shrink-0 animate-bounce" />
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-xs font-bold text-fit-text truncate">
                  <span>Deliver to Home</span>
                  <ChevronDown size={12} className="text-fit-muted shrink-0" />
                </div>
                <div className="text-[10px] text-fit-muted flex items-center gap-1">
                  <Clock size={10} className="text-fit-primary" /> <span className="text-fit-primary font-semibold">12 mins</span> · Express
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <Link
              to="/home"
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                location.pathname === '/home' || location.pathname === '/'
                  ? 'text-fit-primary bg-fit-primary/10'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/category/all"
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                location.pathname.startsWith('/category')
                  ? 'text-fit-primary bg-fit-primary/10'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Products
            </Link>
            <Link
              to="/workouts"
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                location.pathname.startsWith('/workouts')
                  ? 'text-fit-primary bg-fit-primary/10'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Workouts
            </Link>
            <Link
              to="/ai-recommendation"
              className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                location.pathname === '/ai-recommendation'
                  ? 'text-fit-primary bg-fit-primary/10'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              <Sparkles size={14} className="text-fit-accent" /> AI Diet Plan
            </Link>
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-fit-primary bg-fit-primary/10'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Tracker
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <form onSubmit={submit} className="hidden md:flex flex-1 max-w-md relative mx-2">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search protein, workouts, creatine, oats..."
              className="input-field pl-10 pr-4 py-2 text-xs w-full bg-fit-surface2/60 focus:bg-fit-surface"
            />
          </form>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="icon-btn hover:border-fit-primary/40"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} className="text-fit-text" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/profile/wishlist')}
              className="icon-btn hover:border-fit-primary/40 relative"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart
                size={17}
                className={user?.wishlist?.length ? 'fill-red-500 text-red-500' : 'text-fit-text'}
              />
              {user?.wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {user.wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-fit-primary/10 hover:bg-fit-primary/20 border border-fit-primary/30 text-fit-primary font-bold text-xs transition-all relative"
              aria-label="Cart"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">
                {itemCount > 0 ? `₹${total}` : 'Cart'}
              </span>
              {itemCount > 0 && (
                <span className="bg-fit-primary text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-glow">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate(user ? '/profile' : '/login')}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-fit-surface2 to-fit-surface border border-fit-border hover:border-fit-primary flex items-center justify-center text-fit-primary font-bold text-xs transition-all overflow-hidden"
              aria-label="Profile"
              title={user ? (user.name || user.email) : 'Sign In'}
            >
              {user ? (
                user.avatar ? (
                  <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full object-cover" />
                ) : user.name ? (
                  <span className="font-extrabold text-xs text-fit-primary">
                    {user.name.trim().charAt(0).toUpperCase()}
                  </span>
                ) : user.email ? (
                  <span className="font-extrabold text-xs text-fit-primary">
                    {user.email.trim().charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={16} className="text-fit-text" />
                )
              ) : (
                <User size={16} className="text-fit-text" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & Quick Tags */}
        <div className="md:hidden mt-2.5 space-y-2">
          <form onSubmit={submit} className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search protein, oats, workouts..."
              className="input-field pl-10 py-2.5 text-xs shadow-inner"
            />
          </form>

          {/* Quick pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {quickSearches.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}
                className="text-[10px] font-semibold text-fit-muted hover:text-fit-primary bg-fit-surface2/60 border border-fit-border/60 hover:border-fit-primary/40 rounded-full px-2.5 py-0.5 whitespace-nowrap transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}