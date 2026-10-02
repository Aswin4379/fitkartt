import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Plus, CheckCircle2, Home, Briefcase, Building,
  Trash2, ChevronRight, Phone, User, Edit2, ShieldCheck
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import CheckoutStepper from '../components/checkout/CheckoutStepper.jsx'
import OrderSummary from '../components/checkout/OrderSummary.jsx'
import { useUser } from '../context/UserContext.jsx'

const ADDRESS_TYPES = [
  { id: 'Home', icon: Home, label: 'Home' },
  { id: 'Work', icon: Briefcase, label: 'Work' },
  { id: 'Other', icon: Building, label: 'Other' },
]

const EMPTY_FORM = {
  name: '',
  phone: '',
  line: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
  type: 'Home',
  instructions: '',
}

export default function AddressPage() {
  const navigate = useNavigate()
  const { user, addAddress, deleteAddress } = useUser()

  const [selected, setSelected] = useState(() => {
    const first = user?.addresses?.[0]
    return first ? (first._id || first.id) : null
  })
  const [showForm, setShowForm] = useState(!user?.addresses?.length)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.line.trim()) e.line = 'Address line is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = 'Valid 6-digit pincode is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    await addAddress(form)
    setShowForm(false)
    setForm(EMPTY_FORM)
    setErrors({})
  }

  const handleDelete = async (e, addrId) => {
    e.stopPropagation()
    if (deleteAddress) {
      await deleteAddress(addrId)
      if (selected === addrId) {
        setSelected(null)
      }
    }
  }

  const proceed = () => {
    if (selected) {
      const activeAddr = user?.addresses?.find((a) => (a._id || a.id) === selected)
      if (activeAddr) {
        try {
          localStorage.setItem('fitkart_selected_address', JSON.stringify(activeAddr))
        } catch {}
      }
      navigate('/checkout/payment')
    }
  }

  return (
    <AppLayout>
      {/* Checkout Stepper */}
      <div className="bg-fit-surface/80 backdrop-blur-md border-b border-fit-border sticky top-0 z-30">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <CheckoutStepper currentStep={2} />
        </div>
      </div>

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column: Address Selection & Creation */}
          <div className="space-y-4">
            <h1 className="text-xl font-black text-fit-text flex items-center gap-2">
              <MapPin size={22} className="text-fit-primary" />
              <span>Select Delivery Destination</span>
            </h1>

            {/* Saved Addresses List */}
            {user?.addresses?.length > 0 && !showForm && (
              <div className="space-y-3">
                <AnimatePresence>
                  {user.addresses.map((addr) => {
                    const addrId = addr._id || addr.id
                    const TypeObj = ADDRESS_TYPES.find((t) => t.id === addr.type) || ADDRESS_TYPES[0]
                    const Icon = TypeObj.icon
                    const isSelected = selected === addrId

                    return (
                      <motion.div
                        key={addrId}
                        layout
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelected(addrId)}
                        className={`w-full text-left card p-5 border-2 cursor-pointer transition-all duration-200 shadow-card ${
                          isSelected ? 'border-fit-primary bg-fit-primary/5' : 'border-fit-border hover:border-fit-primary/40'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Radio Button */}
                          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'border-fit-primary bg-fit-primary/20' : 'border-fit-border'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-fit-primary" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                isSelected ? 'bg-fit-primary text-black' : 'bg-fit-surface2 text-fit-muted'
                              }`}>
                                <Icon size={12} /> {addr.type}
                              </span>
                              <div className="flex items-center gap-2">
                                {isSelected && (
                                  <span className="flex items-center gap-1 text-xs text-fit-primary font-bold">
                                    <CheckCircle2 size={13} /> Selected for Delivery
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => handleDelete(e, addrId)}
                                  className="text-fit-muted hover:text-red-400 p-1 transition-colors"
                                  title="Delete Address"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            <p className="text-sm font-bold text-fit-text">
                              {addr.name || user?.name || 'Customer'}
                            </p>

                            <p className="text-xs text-fit-muted leading-relaxed mt-1">
                              {addr.line}{addr.landmark ? `, ${addr.landmark}` : ''}, {addr.city}{addr.state ? `, ${addr.state}` : ''} - <span className="font-bold text-fit-text">{addr.pincode}</span>
                            </p>

                            {addr.phone && (
                              <p className="text-xs text-fit-muted mt-1 font-medium">📞 +91 {addr.phone}</p>
                            )}

                            {addr.instructions && (
                              <p className="text-[11px] text-fit-muted mt-1.5 italic bg-fit-surface2 rounded-lg px-2.5 py-1">
                                📝 {addr.instructions}
                              </p>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 pt-3 border-t border-fit-border/60"
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                proceed()
                              }}
                              className="w-full btn-primary py-2.5 text-xs flex items-center justify-center gap-2 shadow-glow"
                            >
                              <span>Deliver to this Address</span>
                              <ChevronRight size={14} />
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {/* Add New Address Button */}
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-fit-primary/40 text-fit-primary rounded-2xl py-4 text-xs font-bold hover:bg-fit-primary/5 transition-all"
                >
                  <Plus size={16} />
                  <span>Add New Delivery Address</span>
                </button>
              </div>
            )}

            {/* Add Address Form */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={submit}
                  className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-fit-border">
                    <h2 className="font-bold text-base text-fit-text flex items-center gap-2">
                      <Plus size={16} className="text-fit-primary" />
                      <span>Add New Delivery Address</span>
                    </h2>
                    {user?.addresses?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => { setShowForm(false); setErrors({}) }}
                        className="text-xs text-fit-muted hover:text-fit-primary font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="space-y-3.5">
                    {/* Address Type Selector */}
                    <div>
                      <label className="text-xs font-bold text-fit-muted uppercase tracking-wider block mb-1.5">Address Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {ADDRESS_TYPES.map(({ id, icon: Icon, label }) => (
                          <button
                            type="button"
                            key={id}
                            onClick={() => setForm({ ...form, type: id })}
                            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                              form.type === id
                                ? 'border-fit-primary bg-fit-primary/10 text-fit-primary'
                                : 'border-fit-border text-fit-muted hover:border-fit-primary/40'
                            }`}
                          >
                            <Icon size={14} /> <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-fit-muted block mb-1">Recipient Name</label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fit-muted" />
                          <input
                            placeholder="Full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="input-field text-xs pl-9"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-fit-muted block mb-1">Contact Phone</label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fit-muted" />
                          <input
                            placeholder="10-digit mobile"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                            className="input-field text-xs pl-9"
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address line */}
                    <div>
                      <label className="text-xs font-semibold text-fit-muted block mb-1">
                        Flat / House No., Apartment &amp; Street *
                      </label>
                      <input
                        required
                        placeholder="e.g. 102, Fitness Tower, Gym Street"
                        value={form.line}
                        onChange={(e) => { setForm({ ...form, line: e.target.value }); setErrors({ ...errors, line: '' }) }}
                        className={`input-field text-xs ${errors.line ? 'border-red-500' : ''}`}
                      />
                      {errors.line && <p className="text-xs text-red-400 mt-1">{errors.line}</p>}
                    </div>

                    {/* City / State / Pincode */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-fit-muted block mb-1">City *</label>
                        <input
                          required
                          placeholder="City"
                          value={form.city}
                          onChange={(e) => { setForm({ ...form, city: e.target.value }); setErrors({ ...errors, city: '' }) }}
                          className={`input-field text-xs ${errors.city ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-fit-muted block mb-1">State</label>
                        <input
                          placeholder="State"
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                          className="input-field text-xs"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs font-semibold text-fit-muted block mb-1">Pincode *</label>
                        <input
                          required
                          placeholder="6-digit pincode"
                          value={form.pincode}
                          onChange={(e) => { setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }); setErrors({ ...errors, pincode: '' }) }}
                          className={`input-field text-xs ${errors.pincode ? 'border-red-500' : ''}`}
                          maxLength={6}
                        />
                      </div>
                    </div>

                    {/* Submit Form */}
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="flex-1 btn-primary py-3 text-xs">
                        Save &amp; Select Address
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary */}
          <div className="hidden lg:block space-y-4">
            <div className="sticky top-20">
              <OrderSummary />
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Sticky Proceed Button */}
      {!showForm && selected && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-fit-border px-4 py-3 z-40 backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={proceed}
            className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 shadow-glow"
          >
            <span>Continue to Payment</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </AppLayout>
  )
}
