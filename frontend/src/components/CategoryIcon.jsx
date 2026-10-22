import React from 'react'
import {
  Flame,
  Dumbbell,
  Activity,
  Zap,
  Leaf,
  UtensilsCrossed,
  Apple,
  Sparkles
} from 'lucide-react'

export default function CategoryIcon({ id, size = 16, className = 'text-fit-primary' }) {
  const normalizedId = String(id || '').toLowerCase().trim()

  switch (normalizedId) {
    case 'weight-loss':
      return <Flame size={size} className={className} />
    case 'weight-gain':
      return <Dumbbell size={size} className={className} />
    case 'fitness-maintenance':
      return <Activity size={size} className={className} />
    case 'protein-supplements':
      return <Zap size={size} className={className} />
    case 'healthy-snacks':
      return <Leaf size={size} className={className} />
    case 'diet-meals':
      return <UtensilsCrossed size={size} className={className} />
    case 'fruits':
      return <Apple size={size} className={className} />
    case 'workout-products':
      return <Dumbbell size={size} className={className} />
    default:
      return <Sparkles size={size} className={className} />
  }
}
