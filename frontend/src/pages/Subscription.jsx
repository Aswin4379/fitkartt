import { Crown, Truck, Sparkles, Percent, Activity, Check } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useUser } from '../context/UserContext.jsx'

const benefits = [
  { icon: Truck, title: 'Free delivery', desc: 'On every order, no minimum spend' },
  { icon: Sparkles, title: 'AI diet plans', desc: 'Unlimited personalized recommendations' },
  { icon: Percent, title: 'Member discounts', desc: 'Exclusive deals up to 30% off' },
  { icon: Activity, title: 'Fitness tracking', desc: 'Advanced dashboard & insights' },
]

const plans = [
  { id: 'monthly', label: 'Monthly', price: 99, period: '/month' },
  { id: 'yearly', label: 'Yearly', price: 799, period: '/year', tag: 'Save 33%' },
]

export default function Subscription() {
  const { user, updateUser } = useUser()

  const subscribe = () => updateUser({ isPremium: true })

  return (
    <AppLayout>
      <PageHeader title="FitKart Premium" />

      <div className="page-pad py-6 space-y-6">
        <div className="card p-6 text-center bg-gradient-to-br from-fit-primary/20 to-fit-accent/5">
          <Crown size={36} className="text-fit-primary mx-auto mb-3" />
          <h1 className="text-xl font-bold">FitKart Premium</h1>
          <p className="text-xs text-fit-muted mt-1">
            {user?.isPremium ? 'You are a Premium member' : 'Unlock the full fitness experience'}
          </p>
        </div>

        <div className="space-y-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fit-primary/15 flex items-center justify-center">
                <Icon size={18} className="text-fit-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-fit-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {!user?.isPremium && (
          <div className="grid grid-cols-2 gap-3">
            {plans.map((p) => (
              <div key={p.id} className="card p-4 text-center relative">
                {p.tag && (
                  <span className="absolute -top-2 right-2 bg-fit-accent text-fit-bg text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                )}
                <p className="text-xs text-fit-muted">{p.label}</p>
                <p className="text-xl font-bold mt-1">₹{p.price}<span className="text-xs text-fit-muted font-normal">{p.period}</span></p>
              </div>
            ))}
          </div>
        )}

        {user?.isPremium ? (
          <div className="card p-4 flex items-center gap-2 justify-center text-fit-primary text-sm font-semibold">
            <Check size={16} /> Premium active
          </div>
        ) : (
          <button onClick={subscribe} className="btn-primary w-full">
            Subscribe to Premium
          </button>
        )}
      </div>
    </AppLayout>
  )
}
