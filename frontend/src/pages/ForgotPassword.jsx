import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, KeyRound } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { authApi } from '../services/api.js'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return;
    setLoading(true)
    setError('')
    try {
      const res = await authApi.sendOtp({ email });
      if (res.success) {
        navigate('/otp-verify', { state: { email, next: '/login', intent: 'reset' } })
      } else {
        setError(res.message || 'Failed to send reset code.')
      }
    } catch (err) {
      setError(err.message || 'Failed to send reset code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-fit-bg">
      <PageHeader title="Forgot password" />
      <div className="page-pad py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-14 h-14 rounded-2xl bg-fit-primary/15 border border-fit-primary/40 flex items-center justify-center mb-6">
            <KeyRound size={24} className="text-fit-primary" />
          </div>
          <h1 className="text-xl font-bold mb-1">Reset your password</h1>
          <p className="text-fit-muted text-sm mb-8">
            Enter the email linked to your account and we&apos;ll send a verification code.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fit-muted" />
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10 text-xs"
              />
            </div>
            {error && <p className="text-red-400 text-xs font-semibold text-center">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Sending code...' : 'Send Reset Code'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
