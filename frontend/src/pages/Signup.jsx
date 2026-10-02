import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useUser } from '../context/UserContext.jsx'
import { authApi } from '../services/api.js'
import { GoogleLogin } from '@react-oauth/google'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, loginWithGoogle } = useUser()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await authApi.sendOtp({ email: form.email.trim() })
      if (res.success) {
        navigate('/otp-verify', { 
          state: { 
            email: form.email.trim(), 
            name: form.name.trim(), 
            password: form.password, 
            next: '/home' 
          } 
        })
      } else {
        setError(res.message || 'Failed to send OTP.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while sending OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setLoading(true)
    const res = await loginWithGoogle(credentialResponse.credential)
    if (res.success) {
      navigate('/home', { replace: true })
    } else {
      setError(res.message || 'Google Sign-In failed.')
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google Sign-In was unsuccessful. Try again.')
  }

  return (
    <div className="min-h-screen bg-fit-bg page-pad flex flex-col justify-center items-center py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fit-primary/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card p-8 border-fit-border bg-fit-surface/90 shadow-2xl backdrop-blur-2xl w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fit-primary to-fit-accent p-1.5 flex items-center justify-center shadow-glow overflow-hidden">
            <img
              src={import.meta.env.BASE_URL + "workout-logo.png"}
              alt="FitKart Workout Logo"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
          <span className="text-2xl font-black font-display tracking-tight text-fit-text">FitKart</span>
        </div>

        <h1 className="text-2xl font-black text-fit-text font-display mb-1">Join the Movement</h1>
        <p className="text-fit-muted text-xs mb-6">Create your athlete profile and start tracking your fitness goals.</p>

        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
              <input
                type="text"
                autoComplete="name"
                placeholder="Rohit Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field text-xs pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="athlete@fitkart.app"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field text-xs pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field text-xs pl-10 pr-10"
              />
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fit-muted hover:text-fit-primary"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-xs font-bold shadow-glow mt-2"
          >
            {loading ? 'Creating Athlete Account...' : 'Create My Free Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center relative">
          <div className="absolute w-full border-t border-fit-border" />
          <span className="relative bg-fit-surface px-4 text-xs font-bold text-fit-muted uppercase tracking-wider">OR</span>
        </div>

        <div className="mt-6 flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="pill"
            theme="filled_black"
            size="large"
            text="signup_with"
            width="100%"
          />
        </div>

        <p className="text-center text-xs text-fit-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-fit-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}