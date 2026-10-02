import { useState } from 'react'
import { ChevronDown, ChevronUp, Tag, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useProducts } from '../../context/ProductContext.jsx'
import SmartFoodImage from '../SmartFoodImage.jsx'
import { getCategoryFallbackImage } from '../../utils/foodImageMap.js'

export default function OrderSummary({ collapsible = false }) {
  const { items, subtotal, discount, deliveryFee, total, coupon } = useCart()
  const { getProductById } = useProducts()
  const [collapsed, setCollapsed] = useState(collapsible)

  const savings = discount + items.reduce((sum, i) => sum + (i.mrp - i.price) * i.qty, 0)

  return (
    <div className="order-summary-card">
      {/* Header */}
      <button
        className={`flex items-center justify-between w-full ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => collapsible && setCollapsed(!collapsed)}
      >
        <h3 className="text-sm font-bold text-fit-text">
          Order Summary
          <span className="ml-2 text-fit-muted font-normal">({items.length} item{items.length !== 1 ? 's' : ''})</span>
        </h3>
        {collapsible && (
          <div className="flex items-center gap-1 text-fit-primary text-xs font-semibold">
            ₹{total} {collapsed ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
          </div>
        )}
      </button>

      {!collapsed && (
        <>
          {/* Items */}
          <div className="mt-3 space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            {items.map((item) => (
              <div key={item.key} className="flex gap-2.5 items-start">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-fit-surface2">
                  <SmartFoodImage
                    src={item.image}
                    fallbackSrc={getCategoryFallbackImage(item.category)}
                    alt={item.name}
                    className="w-full h-full"
                    rounded=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-fit-text line-clamp-2 leading-tight">{item.name}</p>
                  {(item.size || item.flavor) && (
                    <p className="text-[10px] text-fit-muted mt-0.5">{[item.size, item.flavor].filter(Boolean).join(' / ')}</p>
                  )}
                  {(() => {
                    const catalogProduct = getProductById(item.productId)
                    const dInfo = catalogProduct?.deliveryInfo || { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' }
                    const isFast = dInfo.unit === 'mins'
                    const deliveryText = `${isFast ? '⚡' : '📦'} Delivery in ${dInfo.min}–${dInfo.max} ${dInfo.unit}`
                    return (
                      <p className={`text-[10px] font-bold mt-0.5 ${isFast ? 'text-green-500' : 'text-blue-400'}`}>
                        {deliveryText}
                      </p>
                    )
                  })()}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-fit-muted">Qty: {item.qty}</span>
                    <span className="text-xs font-bold text-fit-text">₹{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Applied */}
          {coupon && (
            <div className="mt-3 flex items-center gap-2 bg-fit-primary/10 border border-fit-primary/30 rounded-lg px-3 py-2">
              <Tag size={13} className="text-fit-primary flex-shrink-0" />
              <span className="text-xs text-fit-primary font-medium">{coupon.code} — {coupon.label} applied</span>
            </div>
          )}

          <div className="mt-3 border-t border-fit-border pt-3 space-y-2">
            <div className="flex justify-between text-xs text-fit-muted">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-xs text-fit-primary">
                <span>Coupon discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-fit-muted">
              <span className="flex items-center gap-1"><Truck size={11} />Delivery</span>
              <span className={deliveryFee === 0 ? 'text-fit-primary font-medium' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Total savings</span>
                <span>-₹{savings}</span>
              </div>
            )}
            <div className="border-t border-fit-border pt-2 flex justify-between font-bold text-sm">
              <span>Total Amount</span>
              <span className="text-fit-primary">₹{total}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-fit-muted">
            <ShieldCheck size={12} className="text-fit-primary flex-shrink-0" />
            Safe &amp; Secure Payments · 100% Authentic Products
          </div>
        </>
      )}
    </div>
  )
}
