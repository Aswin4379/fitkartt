export const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export const calcDiscountPct = (mrp, price) => (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0)

export const truncate = (text, len = 60) => (text.length > len ? `${text.slice(0, len)}...` : text)
