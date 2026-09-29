// Helpers for working with the nested product -> variants data shape.
// A "product" now represents ONE catalogue card. Its `variants` array holds
// every size/flavor combination, each with its own price, mrp, unit,
// calories, protein and stock.

const fallbackVariant = (product) => ({
  id: product?.id || 'default',
  size: 'Standard',
  flavor: '',
  unit: 'Standard',
  price: Number(product?.price) || 0,
  mrp: Number(product?.originalPrice || product?.mrp || product?.price) || 0,
  calories: Number(product?.calories) || 0,
  protein: Number(product?.protein) || 0,
  stock: Number(product?.stock) || 50
})

export const getMinPriceVariant = (product) => {
  if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
    return fallbackVariant(product)
  }
  return product.variants.reduce((min, v) => ((Number(v.price) || 0) < (Number(min.price) || 0) ? v : min), product.variants[0])
}

export const getMinPrice = (product) => {
  const v = getMinPriceVariant(product)
  return Number(v?.price) || 0
}

export const getBestDiscountVariant = (product) => {
  if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
    return fallbackVariant(product)
  }
  return product.variants.reduce((best, v) => {
    const vPrice = Number(v.price) || 0
    const vMrp = Number(v.mrp) || vPrice
    const bestPrice = Number(best.price) || 0
    const bestMrp = Number(best.mrp) || bestPrice
    const d = vMrp > vPrice ? (vMrp - vPrice) / vMrp : 0
    const bd = bestMrp > bestPrice ? (bestMrp - bestPrice) / bestMrp : 0
    return d > bd ? v : best
  }, product.variants[0])
}

export const getBestDiscountPct = (product) => {
  const v = getBestDiscountVariant(product)
  const price = Number(v?.price) || 0
  const mrp = Number(v?.mrp) || price
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
}

export const getDefaultVariant = (product) => {
  if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
    return fallbackVariant(product)
  }
  return product.variants[0] || fallbackVariant(product)
}

export const findVariant = (product, variantId) => {
  if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
    return fallbackVariant(product)
  }
  return product.variants.find((v) => v.id === variantId) || getDefaultVariant(product)
}

export const findVariantBySelection = (product, size, flavor) => {
  if (!product || !Array.isArray(product.variants) || product.variants.length === 0) {
    return fallbackVariant(product)
  }
  return (
    product.variants.find((v) => v.size === size && (v.flavor ? v.flavor === flavor : true)) ||
    product.variants.find((v) => v.size === size) ||
    getDefaultVariant(product)
  )
}

export const getUniqueSizes = (product) => {
  if (!product || !Array.isArray(product.variants)) return []
  return [...new Set(product.variants.map((v) => v.size).filter(Boolean))]
}

export const getUniqueFlavors = (product) => {
  if (!product || !Array.isArray(product.variants)) return []
  const flavors = product.variants.map((v) => v.flavor).filter(Boolean)
  return [...new Set(flavors)]
}

export const hasFlavors = (product) => getUniqueFlavors(product).length > 0

// Unique key used by the cart so different variants of the same product
// are tracked as separate line items.
export const cartKey = (productId, variantId) => `${productId}::${variantId || 'default'}`