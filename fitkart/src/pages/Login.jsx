import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dumbbell, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { useUser } from '../context/UserContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [googleStep, setGoogleStep] = useState('chooser') // 'chooser', 'email', 'password'
  const [googleAuthEmail, setGoogleAuthEmail] = useState('')
  const [googleAuthPassword, setGoogleAuthPassword] = useState('')
  const [showGoogleAuthPassword, setShowGoogleAuthPassword] = useState(false)

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

  const handleGoogleLoginClick = () => {
    setGoogleStep('chooser')
    setGoogleAuthEmail('')
    setGoogleAuthPassword('')
    setShowGooglePopup(true)
  }

  const handleGoogleAccountSelect = async (selectedEmail) => {
    setShowGooglePopup(false)
    setError('')
    setLoading(true)
    const rawName = selectedEmail.split('@')[0].replace(/[._0-9]/g, ' ').trim()
    const nameToUse = rawName.length > 1
      ? rawName.replace(/\b\w/g, (l) => l.toUpperCase())
      : 'Aswin SP'

    const res = await loginWithGoogle({
      email: selectedEmail,
      name: nameToUse,
    })
    if (res.success) {
      navigate('/home', { replace: true })
    } else {
      setError(res.message || 'Google Sign-In failed.')
      setLoading(false)
    }
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
              src="/workout-logo.png"
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

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-fit-border" />
          <span className="text-[11px] font-bold text-fit-muted uppercase">Or Continue With</span>
          <div className="flex-1 h-px bg-fit-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLoginClick}
          className="btn-outline w-full py-3 text-xs font-bold flex items-center justify-center gap-2.5"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
            <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.2-5.6l-6.6-5.4C29.6 34.9 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.4C41.4 35.9 44 30.4 44 24c0-1.3-.1-2.7-.4-3.5z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-fit-muted mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-fit-primary font-bold hover:underline">
            Create Free Account
          </Link>
        </p>
      </motion.div>

      {/* Simulated Google OAuth Account Chooser Popup (Dark Mode) */}
      {showGooglePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowGooglePopup(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-[#1f1f1f] text-gray-200 rounded-3xl w-full max-w-[400px] shadow-2xl overflow-hidden flex flex-col"
            style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif' }}
          >
            {googleStep === 'chooser' && (
              <>
                <div className="p-10 pb-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-8">
                    <svg className="w-6 h-6" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    <span className="text-[15px] font-medium text-gray-300 tracking-wide">Sign in with Google</span>
                  </div>
                  <h2 className="text-[32px] leading-10 font-normal tracking-tight text-white mb-2">Choose an account</h2>
                  <p className="text-[16px] font-normal text-gray-300">to continue to <span className="text-[#8ab4f8]">FitKart</span></p>
                </div>
                
                <div className="flex flex-col">
                  {[
                    { name: 'Aswin S P', email: 'aswinsp.2006@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Aswin+S+P&background=d84315&color=fff&rounded=true' },
                    { name: 'Divakar', email: 'divakar7tech@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Divakar&background=e64a19&color=fff&rounded=true' },
                    { name: 'Divakar Divakar', email: 'muthudivakar01022006@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Divakar+Divakar&background=00838f&color=fff&rounded=true' },
                    { name: 'Use another account', email: '', avatar: null, isOther: true }
                  ].map((acc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (acc.isOther) {
                          setGoogleStep('email')
                        } else {
                          handleGoogleAccountSelect(acc.email)
                        }
                      }}
                      className={`w-full flex items-center gap-4 px-10 py-3 hover:bg-[#2b2b2b] transition-colors text-left ${i !== 3 ? 'border-b border-gray-700/50' : ''}`}
                    >
                      {acc.isOther ? (
                        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-gray-300 bg-transparent border border-gray-500">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                          </svg>
                        </div>
                      ) : (
                        <img src={acc.avatar} alt={acc.name} className="w-[36px] h-[36px] rounded-full object-cover" />
                      )}
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[14px] font-medium text-gray-200 leading-tight tracking-wide">{acc.name}</span>
                        {acc.email && <span className="text-[12px] text-gray-400 mt-0.5">{acc.email}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {googleStep === 'email' && (
              <div className="p-10 pb-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <svg className="w-6 h-6" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span className="text-[15px] font-medium text-gray-300 tracking-wide">Sign in with Google</span>
                </div>
                <h2 className="text-[32px] leading-10 font-normal tracking-tight text-white mb-2">Sign in</h2>
                <p className="text-[16px] font-normal text-gray-300 mb-8">to continue to <span className="text-[#8ab4f8]">FitKart</span></p>

                <div className="relative mb-2 mt-4">
                  <input
                    type="email"
                    value={googleAuthEmail}
                    onChange={(e) => setGoogleAuthEmail(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded text-white px-4 py-4 focus:outline-none focus:border-[#8ab4f8] focus:border-2 peer text-[16px]"
                    placeholder=" "
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && googleAuthEmail.trim()) {
                        setGoogleStep('password')
                      }
                    }}
                  />
                  <label className="pointer-events-none absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] px-2 left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#8ab4f8]">
                    Email or phone
                  </label>
                </div>
                <button type="button" onClick={() => window.open('https://accounts.google.com/signin/v2/usernamerecovery', '_blank')} className="text-[#8ab4f8] text-[14px] font-medium text-left hover:underline mb-12 w-max">Forgot email?</button>

                <div className="flex justify-between items-center mt-auto">
                  <button type="button" onClick={() => window.open('https://accounts.google.com/signup', '_blank')} className="text-[#8ab4f8] text-[14px] font-medium hover:bg-[#8ab4f8]/10 px-4 py-2 rounded transition-colors">Create account</button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (googleAuthEmail.trim()) setGoogleStep('password')
                    }}
                    className="bg-[#8ab4f8] text-[#1f1f1f] px-6 py-2 rounded-full font-medium text-[14px] hover:bg-[#9ebdf5] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {googleStep === 'password' && (
              <div className="p-10 pb-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <svg className="w-6 h-6" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span className="text-[15px] font-medium text-gray-300 tracking-wide">Sign in with Google</span>
                </div>
                <h2 className="text-[32px] leading-10 font-normal tracking-tight text-white mb-2">Welcome</h2>
                <div className="flex items-center gap-2 border border-gray-600 rounded-full px-3 py-1 w-max mb-8 text-sm cursor-pointer hover:bg-gray-800" onClick={() => setGoogleStep('email')}>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  <span>{googleAuthEmail}</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>

                <div className="relative mb-2 mt-4">
                  <input
                    type={showGoogleAuthPassword ? "text" : "password"}
                    value={googleAuthPassword}
                    onChange={(e) => setGoogleAuthPassword(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded text-white px-4 py-4 focus:outline-none focus:border-[#8ab4f8] focus:border-2 peer text-[16px]"
                    placeholder=" "
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (googleAuthPassword.length < 8) {
                          alert('Wrong password. Try again or click Forgot password to reset it.')
                        } else {
                          handleGoogleAccountSelect(googleAuthEmail)
                        }
                      }
                    }}
                    autoFocus
                  />
                  <label className="pointer-events-none absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1f1f1f] px-2 left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#8ab4f8]">
                    Enter your password
                  </label>
                </div>
                <div className="flex items-center gap-4 mb-10 mt-2">
                  <input 
                    type="checkbox" 
                    id="showGooglePw"
                    checked={showGoogleAuthPassword}
                    onChange={(e) => setShowGoogleAuthPassword(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#8ab4f8] cursor-pointer" 
                  />
                  <label htmlFor="showGooglePw" className="text-[14px] text-gray-300 cursor-pointer select-none">Show password</label>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <button type="button" onClick={() => window.open('https://accounts.google.com/signin/v2/recoveryidentifier', '_blank')} className="text-[#8ab4f8] text-[14px] font-medium hover:bg-[#8ab4f8]/10 px-4 py-2 rounded transition-colors">Forgot password?</button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (googleAuthPassword.length < 8) {
                        alert('Wrong password. Try again or click Forgot password to reset it.')
                      } else {
                        handleGoogleAccountSelect(googleAuthEmail)
                      }
                    }}
                    className="bg-[#8ab4f8] text-[#1f1f1f] px-6 py-2 rounded-full font-medium text-[14px] hover:bg-[#9ebdf5] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            <div className="px-10 py-6 mt-4 flex justify-between bg-[#1f1f1f] items-center">
              <div className="relative">
                <select className="appearance-none bg-transparent text-gray-400 text-[12px] cursor-pointer hover:text-gray-300 pr-4 focus:outline-none">
                  <option value="en-GB" className="bg-[#1f1f1f] text-gray-200">English (United Kingdom)</option>
                  <option value="en-US" className="bg-[#1f1f1f] text-gray-200">English (United States)</option>
                  <option value="ta-IN" className="bg-[#1f1f1f] text-gray-200">தமிழ் (Tamil)</option>
                  <option value="hi-IN" className="bg-[#1f1f1f] text-gray-200">हिन्दी (Hindi)</option>
                </select>
                <svg className="w-[10px] h-[10px] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
              </div>
              <div className="flex gap-4 text-[12px] text-gray-400">
                <a href="https://support.google.com/accounts" target="_blank" rel="noreferrer" className="hover:bg-gray-800 px-2 py-1 rounded cursor-pointer transition-colors">Help</a>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:bg-gray-800 px-2 py-1 rounded cursor-pointer transition-colors">Privacy</a>
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:bg-gray-800 px-2 py-1 rounded cursor-pointer transition-colors">Terms</a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}