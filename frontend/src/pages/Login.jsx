import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useUser } from '../context/UserContext.jsx'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)
    const res = await login({
      email: form.email.trim(),
      password: form.password,
    })
    if (res.success) {
      navigate('/home', { replace: true })
    } else {
      setError(res.message || 'Invalid email or password.')
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
      {/* Ambient background glow */}
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

        <h1 className="text-2xl font-black text-fit-text font-display mb-1">Welcome Back, Athlete</h1>
        <p className="text-fit-muted text-xs mb-6">Sign in to track orders, routines &amp; custom AI diets.</p>

        <form onSubmit={submit} noValidate className="space-y-4">
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
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-fit-muted uppercase">Password</label>
              <Link to="/forgot-password" className="text-xs text-fit-primary font-bold hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fit-muted pointer-events-none" />
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
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
            {loading ? 'Authenticating...' : 'Sign In to FitKart'}
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
            text="signin_with"
            width="100%"
          />
        </div>

        <p className="text-center text-xs text-fit-muted mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-fit-primary font-bold hover:underline">
            Create Free Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}