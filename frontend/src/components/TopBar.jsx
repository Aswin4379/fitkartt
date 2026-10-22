import { MapPin, Search, Clock, ChevronDown, Heart, ShoppingCart, User, Sun, Moon, Dumbbell, Sparkles, Activity } from 'lucide-react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import BlinkitSearchBar from './BlinkitSearchBar.jsx'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [aiCoachOpen, setAiCoachOpen] = useState(false)
  const aiCoachRef = useRef(null)
  const { itemCount, total } = useCart()
  const { user } = useUser()
  const { theme, toggleTheme } = useTheme()

  // Close AI Coach dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aiCoachRef.current && !aiCoachRef.current.contains(e.target)) {
        setAiCoachOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setAiCoachOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Auto-close dropdown when navigating to a new route
  useEffect(() => {
    setAiCoachOpen(false)
  }, [location.pathname])

  const quickSearches = ['Whey Protein', 'Peanut Butter', 'Creatine', 'Oats', 'BCAA']

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-fit-border transition-all duration-200">
      {/* Top Banner / Location & Desktop Navigation */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/home" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fit-primary to-fit-accent p-1 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                <img
                  src={import.meta.env.BASE_URL + "workout-logo.png"}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-fit-primary font-semibold">Express Delivery</span> · Free over ₹499
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold relative">
            <Link
              to="/home"
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                location.pathname === '/home' || location.pathname === '/'
                  ? 'text-fit-primary bg-fit-primary/10 font-bold'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/category/all"
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                location.pathname.startsWith('/category') || location.pathname.startsWith('/product')
                  ? 'text-fit-primary bg-fit-primary/10 font-bold'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Shop
            </Link>

            <Link
              to="/fitness"
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                location.pathname.startsWith('/fitness') && !location.pathname.startsWith('/fitness/bodycare')
                  ? 'text-fit-primary bg-fit-primary/10 font-bold'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              Fitness
            </Link>

            {/* AI Coach Dropdown Menu */}
            <div 
              ref={aiCoachRef}
              className="relative"
              onMouseEnter={() => setAiCoachOpen(true)}
              onMouseLeave={() => setAiCoachOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAiCoachOpen((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                  location.pathname === '/ai-recommendation' || location.pathname === '/fitness/bodycare'
                    ? 'text-fit-primary bg-fit-primary/10 font-bold'
                    : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
                }`}
                aria-expanded={aiCoachOpen}
                aria-haspopup="true"
              >
                <Sparkles size={14} className="text-fit-accent animate-pulse" />
                <span>AI Coach</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${aiCoachOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Card */}
              {aiCoachOpen && (
                <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2.5 bg-fit-surface border border-fit-border rounded-2xl shadow-2xl space-y-1 ring-1 ring-white/10">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-fit-muted uppercase tracking-wider flex items-center justify-between border-b border-fit-border/40 pb-2">
                      <span>FitKart AI Intelligence</span>
                      <span className="inline-flex items-center gap-1 text-[9px] text-fit-primary font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-fit-primary animate-ping" />
                        ACTIVE
                      </span>
                    </div>

                    <Link
                      to="/ai-recommendation"
                      onClick={() => setAiCoachOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-fit-surface2 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-fit-primary/10 border border-fit-primary/20 flex items-center justify-center text-fit-primary group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                        <Sparkles size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-fit-text group-hover:text-fit-primary transition-colors flex items-center gap-1.5">
                          <span>AI Diet Plan</span>
                          <span className="text-[9px] bg-fit-primary/20 text-fit-primary px-1.5 py-0.2 rounded font-black">MACROS</span>
                        </div>
                        <p className="text-[11px] text-fit-muted leading-tight mt-0.5">
                          Personalized calories, protein &amp; custom meal targets.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/fitness/bodycare"
                      onClick={() => setAiCoachOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-fit-surface2 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                        <Activity size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-fit-text group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                          <span>BodyCare AI</span>
                          <span className="text-[9px] bg-teal-500/20 text-teal-400 px-1.5 py-0.2 rounded font-black">RECOVERY</span>
                        </div>
                        <p className="text-[11px] text-fit-muted leading-tight mt-0.5">
                          Interactive body map, soreness relief &amp; joint care.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-fit-primary bg-fit-primary/10 font-bold'
                  : 'text-fit-muted hover:text-fit-text hover:bg-fit-surface2/50'
              }`}
            >
              My Activity
            </Link>
          </nav>

          {/* Desktop Search Bar (Blinkit Style) */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-2">
            <BlinkitSearchBar />
          </div>

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
          <BlinkitSearchBar isMobile />

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