import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user } = useUser()

  // Also check localStorage directly as a synchronous fallback.
  // On mobile, React context state may not have updated yet when the router
  // navigates to the protected route (React state updates are async).
  // Since login() now writes to localStorage synchronously before calling setUser(),
  // this check is always accurate immediately after login.
  const hasSession = user || (() => {
    try { return !!localStorage.getItem('fitkart_user') } catch { return false }
  })()

  if (!hasSession) return <Navigate to="/login" replace />
  return children
}