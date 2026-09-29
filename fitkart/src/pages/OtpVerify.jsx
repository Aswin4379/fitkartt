import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { authApi } from '../services/api.js'
import { useUser } from '../context/UserContext.jsx'

export default function OtpVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup } = useUser()
  const email = location.state?.email || ''
  const name = location.state?.name || ''
  const password = location.state?.password || ''
  const next = location.state?.next || '/home'
  const intent = location.state?.intent || 'signup'
  
  const [digits, setDigits] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetToken, setResetToken] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const refs = useRef([])

  useEffect(() => {
    if (timer <= 0) return
    const t = setInterval(() => setTimer((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timer])

  const handleChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return
    const copy = [...digits]
    copy[i] = val
    setDigits(copy)
    if (val && i < 3) refs.current[i + 1]?.focus()
  }

  const verify = async (e) => {
    e.preventDefault()
    if (loading) return
    const otpCode = digits.join('')
    if (otpCode.length !== 4) {
      setError('Please enter all 4 digits.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // 1. Verify OTP
      const verifyRes = await authApi.verifyOtp({ email, otp: otpCode })
      if (!verifyRes.success) {
        setError(verifyRes.message || 'Invalid OTP.')
        setLoading(false)
        return
      }

      if (intent === 'reset') {
        // If intent is reset, we just verified the OTP. Now we wait for the user to enter the new password.
        setResetToken(verifyRes.resetToken);
        setLoading(false);
        return;
      }

      // 2. Register User now that OTP is verified
      const signupRes = await signup({ name, email, password })
      if (signupRes.success) {
        navigate(next, { replace: true })
      } else {
        setError(signupRes.message || 'Failed to complete registration.')
        setLoading(false)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during verification.')
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await authApi.resetPassword({ email, password: newPassword, resetToken })
      if (res.success || res.token) {
        navigate(next, { replace: true })
      } else {
        setError(res.message || 'Failed to reset password.')
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
    setError('')
    try {
      const res = await authApi.sendOtp({ email })
      if (res.success) {
        setTimer(30)
      } else {
        setError(res.message || 'Failed to resend code.')
      }
    } catch (err) {
      setError(err.message || 'Failed to resend code.')
    }
  }

  return (
    <div className="min-h-screen bg-fit-bg">
      <PageHeader title="Verify your identity" />
      <div className="page-pad py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-14 h-14 rounded-2xl bg-fit-primary/15 border border-fit-primary/40 flex items-center justify-center mb-6">
            <ShieldCheck size={24} className="text-fit-primary" />
          </div>
          <h1 className="text-xl font-bold mb-1">Enter verification code</h1>
          <p className="text-fit-muted text-sm mb-8">We sent a 4-digit code to {email}</p>

          {!resetToken ? (
            <form onSubmit={verify}>
              <div className="flex gap-3 mb-4">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    maxLength={1}
                    inputMode="numeric"
                    className="w-14 h-14 text-center text-xl font-bold input-field"
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-xs font-semibold text-center mb-4">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full mb-4">
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <p className="text-center text-sm text-fit-muted">
                {timer > 0 ? (
                  <>Resend code in {timer}s</>
                ) : (
                  <button type="button" onClick={resendCode} className="text-fit-primary font-medium hover:underline">
                    Resend code
                  </button>
                )}
              </p>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-fit-primary text-sm font-semibold mb-2">OTP Verified! Enter your new password.</p>
              <input
                type="password"
                placeholder="New Password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field w-full text-xs"
                required
              />
              {error && <p className="text-red-400 text-xs font-semibold text-center">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
