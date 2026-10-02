import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package, Heart, MapPin, Target, Coins, Crown, LogOut, ChevronRight, Settings, ShieldCheck, Dumbbell, Sparkles, Edit3, X, Check, User
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import { useUser } from '../context/UserContext.jsx'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout, updateUser, refreshUser } = useUser()
  const [showEditModal, setShowEditModal] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editGoal, setEditGoal] = useState('')
  const [editAge, setEditAge] = useState('24')
  const [editHeight, setEditHeight] = useState('175')
  const [editCurrentWeight, setEditCurrentWeight] = useState('70')
  const [editStartingWeight, setEditStartingWeight] = useState('75')
  const [editTargetWeight, setEditTargetWeight] = useState('65')
  const [editActivity, setEditActivity] = useState('moderate')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  if (!user) {
    navigate('/login')
    return null
  }

  const openEditModal = () => {
    setEditName(user.name || '')
    setEditPhone(user.phone || '')
    setEditGoal(user.goal || 'Fitness Maintenance')
    setEditAge(String(user.age || 24))
    setEditHeight(String(user.height || 175))
    setEditCurrentWeight(String(user.currentWeight || 70))
    setEditStartingWeight(String(user.startingWeight || 75))
    setEditTargetWeight(String(user.targetWeight || 65))
    setEditActivity(user.activityLevel || 'moderate')
    setShowEditModal(true)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateUser({
        name: editName.trim() || user.name,
        phone: editPhone.trim(),
        goal: editGoal,
        age: Number(editAge) || 24,
        height: Number(editHeight) || 175,
        currentWeight: Number(editCurrentWeight) || 70,
        startingWeight: Number(editStartingWeight) || 75,
        targetWeight: Number(editTargetWeight) || 65,
        activityLevel: editActivity
      })
      if (refreshUser) await refreshUser()
      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => {
        setSuccessMsg('')
        setShowEditModal(false)
      }, 1000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const menu = [
    { icon: Package, label: 'My Orders', desc: `${user.orders?.length || 0} orders placed`, to: '/profile/orders' },
    { icon: Heart, label: 'Wishlist & Favorites', desc: `${user.wishlist?.length || 0} saved items`, to: '/profile/wishlist' },
    { icon: MapPin, label: 'Saved Addresses', desc: `${user.addresses?.length || 0} locations`, to: '/checkout/address' },
    { icon: Target, label: 'Fitness Goal & Plan', desc: user.goal || 'Weight Loss', to: '/ai-recommendation' },
    { icon: Coins, label: 'FitCoins & Rewards', desc: `${user.fitCoins || 120} Coins available`, to: '/rewards' },
    { icon: Crown, label: 'FitKart VIP Pro', desc: user.isPremium ? 'Active Pro Tier' : 'Upgrade for 0 delivery fees', to: '/subscription' },
  ]

  const displayName = user.name || (user.email ? user.email.split('@')[0] : 'Athlete')
  const initial = displayName.trim().charAt(0).toUpperCase() || 'U'

  return (
    <AppLayout showFooter>
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-b from-fit-surface to-fit-bg border-b border-fit-border/40 py-8">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-fit-primary via-fit-accent to-emerald-400 p-0.5 shadow-glow">
              <div className="w-full h-full rounded-[22px] bg-fit-surface flex items-center justify-center text-2xl font-black text-fit-primary">
                {initial}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-fit-text font-display">{displayName}</h1>
                {user.isPremium ? (
                  <span className="badge-new text-[10px] px-2.5 py-0.5">VIP PRO</span>
                ) : (
                  <span className="text-[10px] font-bold text-fit-muted bg-fit-surface2 px-2.5 py-0.5 rounded-full border border-fit-border">
                    ATHLETE TIER
                  </span>
                )}
              </div>
              <p className="text-xs text-fit-muted">{user.email}</p>
              {user.phone && <p className="text-xs text-fit-muted">Phone: {user.phone}</p>}
              <p className="text-xs text-fit-primary font-semibold flex items-center justify-center sm:justify-start gap-1 pt-1">
                <Sparkles size={12} /> Goal: {user.goal || 'Weight Loss'}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={openEditModal}
            className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 rounded-xl border-fit-border hover:border-fit-primary/50 text-fit-text hover:text-fit-primary"
          >
            <Edit3 size={13} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6 pb-12">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/profile/orders')}
            className="card p-4 text-center hover:border-fit-primary/40 transition-colors"
          >
            <p className="text-xl font-black text-fit-text font-mono">{user.orders?.length || 0}</p>
            <p className="text-[11px] text-fit-muted font-semibold mt-0.5">Orders</p>
          </button>

          <button
            onClick={() => navigate('/rewards')}
            className="card p-4 text-center hover:border-fit-primary/40 transition-colors"
          >
            <p className="text-xl font-black text-fit-primary font-mono">{user.fitCoins || 120}</p>
            <p className="text-[11px] text-fit-muted font-semibold mt-0.5">FitCoins</p>
          </button>

          <button
            onClick={() => navigate('/profile/wishlist')}
            className="card p-4 text-center hover:border-fit-primary/40 transition-colors"
          >
            <p className="text-xl font-black text-fit-text font-mono">{user.wishlist?.length || 0}</p>
            <p className="text-[11px] text-fit-muted font-semibold mt-0.5">Wishlist</p>
          </button>
        </div>

        {/* Menu Options */}
        <div className="card border-fit-border bg-fit-surface divide-y divide-fit-border overflow-hidden shadow-card">
          {menu.map(({ icon: Icon, label, desc, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="w-full flex items-center gap-3.5 p-4 text-left hover:bg-fit-surface2/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-fit-surface2 flex items-center justify-center text-fit-primary shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-fit-text">{label}</p>
                <p className="text-xs text-fit-muted">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-fit-muted" />
            </button>
          ))}
        </div>

        {/* Admin and Developer Links - Owner Only */}
        {user?.email === 'aswinsp.2006@gmail.com' && (
          <div className="card border-fit-border bg-fit-surface divide-y divide-fit-border overflow-hidden shadow-card">
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-3.5 p-4 text-left hover:bg-fit-surface2/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-fit-surface2 flex items-center justify-center text-fit-primary shrink-0">
                <Settings size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-fit-text">Admin Operations Portal</p>
                <p className="text-xs text-fit-muted">Manage orders, inventory &amp; analytics</p>
              </div>
              <ChevronRight size={16} className="text-fit-muted" />
            </button>
          </div>
        )}

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="w-full card p-3.5 border-red-500/30 hover:bg-red-500/10 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out of FitKart</span>
          </button>
        </div>

      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-fit-surface border border-fit-border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-fit-border">
              <div className="flex items-center gap-2">
                <User size={18} className="text-fit-primary" />
                <h3 className="font-bold text-base text-fit-text">Edit Personal Profile</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-lg text-fit-muted hover:text-fit-text hover:bg-fit-surface2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {successMsg && (
              <div className="p-3 bg-fit-primary/10 border border-fit-primary/30 rounded-xl text-fit-primary text-xs font-bold flex items-center gap-2">
                <Check size={14} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your full name"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">
                  Fitness Goal
                </label>
                <select
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="Weight Loss">Weight Loss (Fat Shred)</option>
                  <option value="Weight Gain">Weight Gain (Lean Muscle Mass)</option>
                  <option value="Fitness Maintenance">Fitness Maintenance (Tone & Energy)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="12"
                    max="100"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={editHeight}
                    onChange={(e) => setEditHeight(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-fit-muted uppercase block mb-1">Start (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editStartingWeight}
                    onChange={(e) => setEditStartingWeight(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-fit-muted uppercase block mb-1">Current (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editCurrentWeight}
                    onChange={(e) => setEditCurrentWeight(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-fit-muted uppercase block mb-1">Target (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editTargetWeight}
                    onChange={(e) => setEditTargetWeight(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Activity Level</label>
                <select
                  value={editActivity}
                  onChange={(e) => setEditActivity(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="sedentary">Sedentary (Desk job / little activity)</option>
                  <option value="light">Light (1-2 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="heavy">Heavy (6-7 days/week intense)</option>
                  <option value="athlete">Athlete (Daily 2x training)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs py-2 px-5 shadow-glow"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
