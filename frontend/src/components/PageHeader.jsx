import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title, subtitle, right }) {
  const navigate = useNavigate()
  return (
    <div className="relative z-10 glass-strong page-pad py-4 flex items-center gap-3 border-b border-fit-border/40">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-full border border-fit-border flex items-center justify-center flex-shrink-0 hover:border-fit-primary hover:text-fit-primary transition-colors cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-fit-text truncate">{title}</h1>
        {subtitle && <p className="text-xs text-fit-muted truncate">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
