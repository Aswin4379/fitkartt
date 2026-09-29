import { Check, ShoppingCart, MapPin, CreditCard, PackageCheck } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Cart', icon: ShoppingCart },
  { id: 2, label: 'Address', icon: MapPin },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Done', icon: PackageCheck },
]

export default function CheckoutStepper({ currentStep = 1 }) {
  return (
    <div className="checkout-stepper">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id
        const Icon = step.icon

        return (
          <div key={step.id} className="checkout-step-item">
            <div className={`checkout-step-circle ${isCompleted ? 'step-done' : isActive ? 'step-active' : 'step-pending'}`}>
              {isCompleted ? <Check size={14} strokeWidth={2.5} /> : <Icon size={14} />}
            </div>
            <span className={`checkout-step-label ${isActive ? 'text-fit-primary font-semibold' : isCompleted ? 'text-fit-primary/70' : 'text-fit-muted'}`}>
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <div className={`checkout-step-line ${isCompleted ? 'line-done' : 'line-pending'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
