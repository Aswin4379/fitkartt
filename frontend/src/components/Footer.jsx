import { Link } from 'react-router-dom'
import { Dumbbell, Mail, Phone, MapPin, ShieldCheck, Award, Truck, Lock } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/home' },
  { label: 'All Products', to: '/category/all' },
  { label: 'AI Diet Planner', to: '/ai-recommendation' },
  { label: 'Workouts & Routines', to: '/workouts' },
  { label: 'Daily Fitness Tracker', to: '/dashboard' },
  { label: 'My Orders', to: '/profile/orders' },
]

const categoryLinks = [
  { label: 'Weight Loss Foods', to: '/category/weight-loss' },
  { label: 'Weight Gain & Mass', to: '/category/weight-gain' },
  { label: 'Protein Supplements', to: '/category/protein-supplements' },
  { label: 'Healthy Snacks & Oats', to: '/category/healthy-snacks' },
  { label: 'Diet Meals & Salads', to: '/category/diet-meals' },
  { label: 'Workout Essentials', to: '/category/workout-products' },
]

const guarantees = [
  { icon: ShieldCheck, title: '100% Authentic', desc: 'Sourced directly from certified brand labs' },
  { icon: Truck, title: '12-Min Delivery', desc: 'Express dispatch for your daily fitness fuel' },
  { icon: Award, title: 'FSSAI Approved', desc: 'All nutrition meets strict safety standards' },
  { icon: Lock, title: 'Secure Checkout', desc: 'Encrypted payments via UPI, Cards & EMI' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-fit-border bg-fit-surface/90 mt-12 transition-colors">
      {/* Trust Badges Strip */}
      <div className="border-b border-fit-border bg-fit-surface2/30">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {guarantees.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-fit-primary/10 border border-fit-primary/30 flex items-center justify-center shrink-0 text-fit-primary">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fit-text">{title}</h4>
                <p className="text-[11px] text-fit-muted mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <Link to="/home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fit-primary to-fit-accent p-1 flex items-center justify-center shadow-glow overflow-hidden">
              <img
                src={import.meta.env.BASE_URL + "workout-logo.png"}
                alt="FitKart Workout Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <span className="text-xl font-black font-display tracking-tight text-fit-text">FitKart</span>
          </Link>
          <p className="text-xs text-fit-muted leading-relaxed max-w-sm">
            India&apos;s ultimate fitness ecosystem. Precision nutrition, verified supplements, and interactive AI workout routines built for champions.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-fit-muted">
            <span className="w-2 h-2 rounded-full bg-fit-primary animate-pulse" />
            <span>Systems operational &amp; delivering live</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-fit-text mb-3">Explore FitKart</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-xs text-fit-muted hover:text-fit-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-fit-text mb-3">Shop Categories</h4>
          <ul className="space-y-2">
            {categoryLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-xs text-fit-muted hover:text-fit-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-fit-text mb-3">Support &amp; Contact</h4>
          <ul className="space-y-2.5 text-xs text-fit-muted">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-fit-primary shrink-0" />
              <span>support@fitkart.app</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-fit-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-fit-primary shrink-0 mt-0.5" />
              <span>FitKart Tech Park, Bengaluru &amp; Chennai Hubs</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-fit-border">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-fit-muted text-center sm:text-left">
          <p>© {year} FitKart Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2 justify-center">
            <span>Built for athletes and fitness enthusiasts.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}