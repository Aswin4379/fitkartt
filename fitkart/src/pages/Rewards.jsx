import { useState } from 'react'
import { Coins, Gift, Zap } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useUser } from '../context/UserContext.jsx'

const redeemOptions = [
  { id: 1, label: '₹25 off coupon', cost: 100 },
  { id: 2, label: '₹60 off coupon', cost: 220 },
  { id: 3, label: 'Free delivery pass (3 orders)', cost: 150 },
  { id: 4, label: '1 month FitKart Premium', cost: 500 },
]

export default function Rewards() {
  const { user, updateUser } = useUser()
  const [redeemed, setRedeemed] = useState([])
  const coins = user?.fitCoins || 0

  const redeem = (opt) => {
    if (coins < opt.cost) return
    updateUser({ fitCoins: coins - opt.cost })
    setRedeemed((r) => [...r, opt.id])
  }

  return (
    <AppLayout>
      <PageHeader title="FitCoins & Rewards" />

      <div className="page-pad py-5 space-y-6">
        <div className="card p-6 text-center bg-gradient-to-br from-fit-primary/15 to-transparent">
          <Coins size={32} className="text-fit-primary mx-auto mb-2" />
          <p className="text-3xl font-bold">{coins}</p>
          <p className="text-xs text-fit-muted">FitCoins available</p>
        </div>

        <div className="card p-4">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <Zap size={15} className="text-fit-accent" /> How to earn
          </h2>
          <ul className="text-xs text-fit-muted space-y-1.5">
            <li>• Earn 1 FitCoin for every ₹20 spent</li>
            <li>• +50 coins on completing a workout streak</li>
            <li>• +30 coins for community transformation posts</li>
            <li>• +20 coins on first order every month</li>
          </ul>
        </div>

        <div>
          <h2 className="section-title mb-3 flex items-center gap-1.5">
            <Gift size={16} className="text-fit-primary" /> Redeem
          </h2>
          <div className="space-y-3">
            {redeemOptions.map((opt) => {
              const isRedeemed = redeemed.includes(opt.id)
              const canAfford = coins >= opt.cost
              return (
                <div key={opt.id} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-fit-muted">{opt.cost} FitCoins</p>
                  </div>
                  <button
                    disabled={!canAfford || isRedeemed}
                    onClick={() => redeem(opt)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full ${
                      isRedeemed
                        ? 'bg-fit-surface2 text-fit-muted'
                        : canAfford
                        ? 'bg-fit-primary text-fit-bg'
                        : 'bg-fit-surface2 text-fit-muted'
                    }`}
                  >
                    {isRedeemed ? 'Redeemed' : 'Redeem'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
