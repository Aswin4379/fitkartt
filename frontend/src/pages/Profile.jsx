import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package, Heart, MapPin, Target, Coins, Crown, LogOut, ChevronRight, Settings, ShieldCheck, Dumbbell, Sparkles, Edit3, X, Check, User, Clock, Activity, Loader2, Phone
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import { useUser } from '../context/UserContext.jsx'
import { authApi } from '../services/api.js'

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
  const [editError, setEditError] = useState('')

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
    setEditError('')
    setShowEditModal(true)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    const trimmedPhone = editPhone.trim()
    let cleanPhone = ''
    if (trimmedPhone) {
      cleanPhone = trimmedPhone.replace(/\D/g, '').slice(-10)
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        setEditError('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).')
        return
      }
    }
    setEditError('')
    setSaving(true)
    try {
      await updateUser({
        name: editName.trim() || user.name,
        phone: cleanPhone,
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
      setEditError(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const [showActivityModal, setShowActivityModal] = useState(false)
  const [activityLogs, setActivityLogs] = useState([])
  const [loadingActivity, setLoadingActivity] = useState(false)

  const openActivityModal = async () => {
    setShowActivityModal(true)
    setLoadingActivity(true)
    try {
      const logs = await authApi.getActivityLog()
      setActivityLogs(Array.isArray(logs) ? logs : [])
    } catch (err) {
      console.warn('Failed to fetch activity logs:', err)
    } finally {
      setLoadingActivity(false)
    }
  }

  const menu = [
    { icon: Package, label: 'My Orders', desc: `${user.orders?.length || 0} orders placed`, to: '/profile/orders' },
    { icon: Heart, label: 'Wishlist & Favorites', desc: `${user.wishlist?.length || 0} saved items`, to: '/profile/wishlist' },
    { icon: MapPin, label: 'Saved Addresses', desc: `${user.addresses?.length || 0} locations`, to: '/checkout/address' },
    { icon: Target, label: 'Fitness Goal & Plan', desc: user.goal || 'Weight Loss', to: '/ai-recommendation' },
    { icon: Coins, label: 'FitCoins & Rewards', desc: `${user.fitCoins || 120} Coins available`, to: '/rewards' },
    { icon: Crown, label: 'FitKart VIP Pro', desc: user.isPremium ? 'Active Pro Tier' : 'Upgrade for 0 delivery fees', to: '/subscription' },
    { icon: ShieldCheck, label: 'Activity History & Audit Log', desc: 'Verified database event trail', action: openActivityModal },
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
              {user.phone ? (
                <p className="text-xs text-fit-muted flex items-center justify-center sm:justify-start gap-1">
                  <span>📞 +91 {user.phone.length === 10 ? `${user.phone.slice(0, 5)} ${user.phone.slice(5)}` : user.phone}</span>
                </p>
              ) : (
                <p className="text-xs text-fit-muted/70 italic flex items-center justify-center sm:justify-start gap-1">
                  <span>📞 No phone linked (click Edit to add)</span>
                </p>
              )}
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
        
        {/* DEV DIAGNOSTICS */}
        <div className="card p-4 border border-fit-primary/50 bg-fit-primary/5 rounded-xl text-[10px] sm:text-xs font-mono text-fit-muted">
          <p className="font-bold text-fit-primary mb-2 uppercase">System Sync Diagnostics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><span className="opacity-70">Email:</span> {user.email}</div>
            <div><span className="opacity-70">Account ID:</span> {user._id || user.id || 'N/A'}</div>
            <div className="sm:col-span-2"><span className="opacity-70">API URL:</span> {import.meta.env?.VITE_API_URL || 'https://fitkartt.onrender.com/api'}</div>
            <div><span className="opacity-70">Weight (Current/Target):</span> {user.currentWeight}kg / {user.targetWeight}kg</div>
            <div><span className="opacity-70">Height / Age:</span> {user.height}cm / {user.age}</div>
            <div><span className="opacity-70">Goal:</span> {user.goal}</div>
            <div><span className="opacity-70">Activity:</span> {user.activityLevel}</div>
          </div>
        </div>

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
          {menu.map(({ icon: Icon, label, desc, to, action }) => (
            <button
              key={label}
              onClick={() => action ? action() : navigate(to)}
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

        {/* Admin and Developer Links - Owner & Admin Only */}
        {(user?.role === 'admin' || user?.email === 'aswinsp.2006@gmail.com') && (
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
                  Mobile Number <span className="text-[10px] text-fit-muted/70 font-normal lowercase">(India +91)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-fit-muted pointer-events-none">
                    <Phone size={14} />
                    <span className="text-xs font-bold text-fit-text border-r border-fit-border pr-1.5 ml-0.5">+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={editPhone}
                    onChange={(e) => {
                      setEditPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                      if (editError) setEditError('')
                    }}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="input-field text-xs pl-[72px]"
                  />
                </div>
                {editError && <p className="text-red-400 text-[11px] font-semibold mt-1">{editError}</p>}
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
      {/* Activity History & Audit Log Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="card w-full max-w-lg max-h-[85vh] flex flex-col border-fit-border bg-fit-surface shadow-2xl p-0 overflow-hidden">
            <div className="p-4 border-b border-fit-border flex items-center justify-between bg-fit-surface2/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-fit-primary/10 flex items-center justify-center text-fit-primary">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-fit-text">Account Activity & Audit Log</h3>
                  <p className="text-[11px] text-fit-muted">Verified database event history</p>
                </div>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-fit-surface2 flex items-center justify-center text-fit-muted hover:text-fit-text transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {loadingActivity ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 size={32} className="animate-spin text-fit-primary mb-2" />
                  <p className="text-xs text-fit-muted">Fetching audit records from MongoDB...</p>
                </div>
              ) : activityLogs.length === 0 ? (
                <div className="py-12 text-center text-fit-muted space-y-2">
                  <Clock size={32} className="mx-auto opacity-40" />
                  <p className="text-xs">No recent activity events recorded yet.</p>
                </div>
              ) : (
                activityLogs.map((log) => {
                  const actionColor = {
                    LOGIN_SUCCESS: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                    ORDER_CREATED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
                    ORDER_CANCELLED: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
                    WORKOUT_COMPLETED: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
                    PROFILE_UPDATED: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                    TRACKER_UPDATED: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
                    REWARD_REDEEMED: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
                    SUBSCRIPTION_ACTIVATED: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
                    ADDRESS_ADDED: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
                    ADDRESS_DELETED: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
                    REVIEW_SUBMITTED: 'text-amber-300 bg-amber-300/10 border-amber-300/20'
                  }[log.action] || 'text-fit-muted bg-fit-surface2 border-fit-border';

                  return (
                    <div
                      key={log._id || log.id || `${log.action}_${log.createdAt}`}
                      className="p-3 rounded-xl border border-fit-border bg-fit-surface2/30 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${actionColor}`}>
                          {log.action?.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-fit-muted font-mono">
                          {log.createdAt ? new Date(log.createdAt).toLocaleString() : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-fit-text">
                          {log.entityType} {log.entityId ? `#${log.entityId}` : ''}
                        </span>
                        {log.metadata?.total && (
                          <span className="font-mono font-bold text-fit-primary">₹{log.metadata.total}</span>
                        )}
                        {log.metadata?.cost && (
                          <span className="font-mono font-bold text-amber-400">-{log.metadata.cost} Coins</span>
                        )}
                        {log.metadata?.durationMinutes && (
                          <span className="font-mono text-cyan-400">{log.metadata.durationMinutes} mins</span>
                        )}
                      </div>
                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <p className="text-[11px] text-fit-muted truncate">
                          {log.metadata.label || log.metadata.name || log.metadata.description || (log.metadata.fields ? `Updated: ${log.metadata.fields.join(', ')}` : '')}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-3 border-t border-fit-border bg-fit-surface2/30 text-right">
              <button
                onClick={() => setShowActivityModal(false)}
                className="btn-secondary text-xs py-1.5 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
