import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title, subtitle, right }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-40 glass-strong page-pad py-4 flex items-center gap-3">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-full border border-fit-border flex items-center justify-center flex-shrink-0"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>
      <div className="flex-1">
        <h1 className="text-base font-semibold text-fit-text">{title}</h1>
        {subtitle && <p className="text-xs text-fit-muted">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
