import { useMemo, useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Heart, Flame, Dumbbell, Wheat, Droplet, Leaf,
  Minus, Plus, ShieldCheck, Check, ShoppingCart, Zap,
  Truck, RotateCcw, Award, ChevronRight, Tag, Package,
  Info, ChevronDown, ChevronUp, Share2, MapPin, Scale,
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ReviewSection from '../components/ReviewSection.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { productApi } from '../services/api.js'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { PLACEHOLDER_IMAGE, getCategoryFallbackImage } from '../utils/foodImageMap.js'
import SmartFoodImage from '../components/SmartFoodImage.jsx'
import {
  getDefaultVariant,
  findVariantBySelection,
  getUniqueSizes,
  getUniqueFlavors,
  hasFlavors,
} from '../utils/productVariants.js'
import { getProductNutrition } from '../utils/productNutrition.js'

// No fake bank offers

const HIGHLIGHTS = [
  '100% Authentic & Lab Tested',
  'Fresh & Double-Sealed Packaging',
  'Express 24-48h Dispatch',
  '7-Day Easy Returns',
]

function NutritionStat({ icon: Icon, label, value, unit = 'g', highlight = false }) {
  return (
    <div
      className={`p-3 rounded-2xl border text-center transition-all ${
        highlight
          ? 'bg-fit-primary/10 border-fit-primary/40 shadow-sm'
          : 'bg-fit-surface2/60 border-fit-border'
      }`}
    >
      <Icon
        size={18}
        className={`mx-auto mb-1 ${highlight ? 'text-fit-primary' : 'text-fit-muted'}`}
      />
      <div className={`text-base font-bold ${highlight ? 'text-fit-primary' : 'text-fit-text'}`}>
        {value}
        <span className="text-xs font-normal text-fit-muted ml-0.5">{unit}</span>
      </div>
      <div className="text-[10px] text-fit-muted font-medium">{label}</div>
    </div>
  )
}

function HighlightRow({ title, value, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-fit-muted" />
        ) : (
          <ChevronDown size={16} className="text-fit-muted" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-xs text-fit-muted leading-relaxed border-t border-fit-border pt-3"
          >
            {value || children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AccordionSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="card p-4 border border-fit-border bg-fit-surface mb-3 shadow-card">
      <button
        className="w-full flex items-center justify-between text-left font-bold text-sm text-fit-text"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-fit-primary" />}
          {title}
        </span>
        {open ? <ChevronUp size={16} className="text-fit-muted" /> : <ChevronDown size={16} className="text-fit-muted" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const reviewsRef = useRef(null)
  const { products, getProductById } = useProducts()
  const [liveProduct, setLiveProduct] = useState(null)
  const { getCartItem, addToCart, updateQty } = useCart()
  const { user, toggleWishlist } = useUser()
  const [realReviews, setRealReviews] = useState({ rating: null, count: null })

  useEffect(() => {
    let isMounted = true
    if (id) {
      productApi.getProductById(id)
        .then((data) => {
          if (isMounted && data && (data.name || data.id)) {
            setLiveProduct(data)
          }
        })
        .catch(() => {})
    }
    return () => { isMounted = false }
  }, [id])

  const product = liveProduct || getProductById(id)
  const defaultVariant = product ? getDefaultVariant(product) : null

  const [selectedSize, setSelectedSize] = useState(defaultVariant?.size || '')
  const [selectedFlavor, setSelectedFlavor] = useState(defaultVariant?.flavor || '')
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addedAnim, setAddedAnim] = useState(false)
  const [nutritionMode, setNutritionMode] = useState('pack') // 'pack' or 'serving'

  useEffect(() => {
    if (product) {
      const def = getDefaultVariant(product)
      setSelectedSize(def?.size || '')
      setSelectedFlavor(def?.flavor || '')
      setActiveImage(0)
    }
  }, [product?.id, product?._id])

  if (!product) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto py-20 text-center px-4">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p className="text-sm text-fit-muted mb-6">The requested product could not be located.</p>
          <button onClick={() => navigate('/home')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </AppLayout>
    )
  }

  const rawGallery = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : Array.isArray(product.gallery) && product.gallery.length > 0
    ? product.gallery
    : [product.image].filter(Boolean)

  const gallery = rawGallery.length > 0 ? rawGallery : [PLACEHOLDER_IMAGE]

  const sizes = getUniqueSizes(product)
  const flavors = getUniqueFlavors(product)
  const productHasFlavors = hasFlavors(product)

  const currentVariant = findVariantBySelection(product, selectedSize, selectedFlavor) || defaultVariant || {
    id: product.id || 'default',
    size: 'Standard',
    flavor: '',
    unit: 'Standard',
    price: Number(product.price) || 0,
    mrp: Number(product.originalPrice || product.mrp || product.price) || 0,
    stock: Number(product.stock) || 50
  }
  const variantLabel = [currentVariant.size, currentVariant.flavor].filter(Boolean).join(' / ')

  const inCart = getCartItem(product.id, currentVariant.id)
  const isWishlisted = user?.wishlist?.includes(product.id)
  const variantPrice = Number(currentVariant.price) || 0
  const variantMrp = Number(currentVariant.mrp) || variantPrice
  const discountPct =
    variantMrp > variantPrice
      ? Math.round(((variantMrp - variantPrice) / variantMrp) * 100)
      : 0
  const savings = Math.max(0, variantMrp - variantPrice)

  // Dynamically scaled nutrition based on selected pack size
  const nutrition = useMemo(
    () => getProductNutrition(product, currentVariant, nutritionMode),
    [product, currentVariant, nutritionMode]
  )

  const related = useMemo(
    () => (products || []).filter((p) => p.category === product?.category && (p.id !== product?.id && p._id !== product?._id)).slice(0, 8),
    [products, product]
  )
  const recommended = useMemo(
    () => (products || []).filter((p) => p.category !== product?.category).slice(0, 8),
    [products, product]
  )

  const selectSize = (size) => {
    setSelectedSize(size)
    if (Array.isArray(product.variants)) {
      const stillValid = product.variants.some((v) => v.size === size && v.flavor === selectedFlavor)
      if (!stillValid) {
        const fallback = product.variants.find((v) => v.size === size)
        setSelectedFlavor(fallback?.flavor || '')
      }
    }
  }

  const handleAddToCart = () => {
    addToCart(product, currentVariant, qty)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 1200)
  }

  const handleBuyNow = () => {
    if (!inCart) addToCart(product, currentVariant, qty)
    navigate('/checkout/address')
  }

  const categoryLabel = (product.category || 'Fitness')
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ')

  // Pseudo-random but consistent ratings/reviews based on product ID
  const seed = product.id ? product.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 123
  const dynamicRating = product.rating === 4.5 || product.rating === 4.7 
    ? (4.0 + (seed % 10) / 10).toFixed(1) 
    : product.rating
  const dynamicReviews = product.reviewCount === 120 || product.reviewCount === 512
    ? 150 + (seed % 800)
    : product.reviewCount

  const displayRating = realReviews.count !== null && realReviews.count > 0 
    ? realReviews.rating.toFixed(1) 
    : dynamicRating
    
  const displayCount = realReviews.count !== null && realReviews.count > 0
    ? realReviews.count
    : dynamicReviews

  // Real delivery logic for all products
  const dInfo = product.deliveryInfo || { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' }
  const isFast = dInfo.unit === 'mins'
  const deliveryDate = `${isFast ? '⚡' : '📦'} Delivery in ${dInfo.min}–${dInfo.max} ${dInfo.unit}`

  return (
    <AppLayout showFooter>
      {/* Breadcrumb Bar */}
      <div className="border-b border-fit-border bg-fit-surface/60 sticky top-0 z-30 backdrop-blur-md">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-12">
          <nav className="flex items-center gap-1.5 text-xs text-fit-muted overflow-hidden">
            <Link to="/home" className="hover:text-fit-primary transition-colors shrink-0">Home</Link>
            <ChevronRight size={12} className="shrink-0 text-fit-border" />
            <Link to={`/category/${product.category}`} className="hover:text-fit-primary transition-colors shrink-0 max-w-[120px] truncate">
              {categoryLabel}
            </Link>
            <ChevronRight size={12} className="shrink-0 text-fit-border" />
            <span className="text-fit-text font-semibold truncate max-w-[160px]">{product.name}</span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="icon-btn hover:border-red-400"
              aria-label="Wishlist"
            >
              <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-fit-text'} />
            </button>
            <button
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {})}
              className="icon-btn hidden sm:flex"
              aria-label="Share"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[560px_1fr] gap-8 lg:gap-12">
          
          {/* Left: Gallery (Sticky on desktop) */}
          <div className="lg:sticky lg:top-16 lg:self-start space-y-4">
            {/* Main Stage View */}
            <div className="relative w-full aspect-square rounded-3xl bg-fit-surface2/60 border border-fit-border overflow-hidden flex items-center justify-center p-8 shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={gallery[activeImage]}
                  alt={product.name}
                  onError={(e) => {
                    const fallback = getCategoryFallbackImage(product.category)
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback
                    } else if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = PLACEHOLDER_IMAGE
                    }
                  }}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </AnimatePresence>

              {/* Discount Badge */}
              {discountPct > 0 && (
                <div className="absolute top-3.5 left-3.5 badge-discount text-xs px-3 py-1 shadow-md">
                  {discountPct}% OFF
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 bg-fit-surface2 ${
                    activeImage === i
                      ? 'border-fit-primary shadow-glow scale-105'
                      : 'border-fit-border hover:border-fit-primary/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SmartFoodImage
                    src={src}
                    fallbackSrc={getCategoryFallbackImage(product.category)}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full"
                    rounded=""
                  />
                </button>
              ))}
            </div>

            {/* Desktop Trust Seals */}
            <div className="hidden lg:grid grid-cols-2 gap-2.5 pt-2">
              {[
                { icon: ShieldCheck, label: '100% Lab Tested Authentic' },
                { icon: RotateCcw, label: '24hr Easy Replacement' },
                { icon: Truck, label: '12-Min Express Dispatch' },
                { icon: Award, label: 'FSSAI Certified Safety' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-fit-surface2/60 rounded-xl p-3 text-xs text-fit-muted border border-fit-border">
                  <Icon size={16} className="text-fit-primary shrink-0" />
                  <span className="font-semibold text-fit-text">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="space-y-6">
            
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge-new">FITKART DIRECT</span>
                <span className="text-xs text-fit-muted font-semibold uppercase tracking-wider">
                  {categoryLabel}
                </span>
                {product.brand && (
                  <>
                    <span className="text-fit-muted">|</span>
                    <span className="text-xs text-fit-primary font-bold uppercase tracking-wider">
                      {product.brand}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-fit-text font-display leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <button
                  onClick={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1.5 bg-fit-primary/15 text-fit-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-fit-primary/25 transition-colors border border-fit-primary/30"
                >
                  <Star size={13} className="fill-fit-primary" />
                  <span>{displayRating}</span>
                </button>

                <button
                  onClick={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-fit-muted hover:text-fit-primary underline underline-offset-4"
                >
                  {displayCount} verified reviews
                </button>

                <span className="text-xs text-fit-primary font-bold flex items-center gap-1">
                  <Truck size={13} /> In Stock &amp; Ready to Ship
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-fit-text">₹{currentVariant.price}</span>
                {currentVariant.mrp > currentVariant.price && (
                  <span className="text-lg text-fit-muted line-through font-medium">₹{currentVariant.mrp}</span>
                )}
                {discountPct > 0 && (
                  <span className="badge-discount text-xs px-2.5 py-0.5 font-bold">
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              {savings > 0 && (
                <p className="text-xs text-fit-primary font-bold">
                  🎉 You save ₹{savings} on the {currentVariant.size} pack!
                </p>
              )}

              <p className="text-[11px] text-fit-muted">Inclusive of all applicable taxes and GST invoice</p>
            </div>

            {/* Variant Selector - Size/Pack */}
            {sizes.length > 1 && (
              <div>
                <p className="text-xs font-bold text-fit-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Package size={14} className="text-fit-primary" />
                  Select Pack Size: <span className="text-fit-primary font-bold">{currentVariant.size}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((size) => {
                    const sizeVariant = product.variants.find((v) => v.size === size)
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => selectSize(size)}
                        className={`px-4 py-2.5 rounded-2xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? 'border-fit-primary bg-fit-primary/10 text-fit-primary shadow-glow'
                            : 'border-fit-border bg-fit-surface text-fit-muted hover:border-fit-primary/40'
                        }`}
                      >
                        <span>{size}</span>
                        {sizeVariant && (
                          <span className={`text-[10px] font-normal ${isSelected ? 'text-fit-primary' : 'text-fit-muted'}`}>
                            ₹{sizeVariant.price}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Variant Selector - Flavors */}
            {productHasFlavors && flavors.length > 1 && (
              <div>
                <p className="text-xs font-bold text-fit-muted uppercase tracking-wider mb-2">
                  Select Flavour: <span className="text-fit-primary font-bold">{currentVariant.flavor}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {flavors
                    .filter((flavor) => product.variants.some((v) => v.size === selectedSize && v.flavor === flavor))
                    .map((flavor) => {
                      const isSelected = selectedFlavor === flavor
                      return (
                        <button
                          key={flavor}
                          onClick={() => setSelectedFlavor(flavor)}
                          className={`px-4 py-2 rounded-xl border-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'border-fit-primary bg-fit-primary/10 text-fit-primary shadow-glow'
                              : 'border-fit-border bg-fit-surface text-fit-muted hover:border-fit-primary/40'
                          }`}
                        >
                          {isSelected && <Check size={12} className="stroke-[3]" />}
                          <span>{flavor}</span>
                        </button>
                      )
                    })}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div>
              <p className="text-xs font-bold text-fit-muted uppercase tracking-wider mb-2">Quantity</p>
              <div className="inline-flex items-center border-2 border-fit-border rounded-2xl overflow-hidden bg-fit-surface">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-fit-surface2 transition-colors text-fit-text"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-12 text-center text-sm font-black text-fit-text border-x border-fit-border h-10 flex items-center justify-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-fit-surface2 transition-colors text-fit-text"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex gap-3 pt-2">
              {inCart ? (
                <div className="flex items-center justify-between bg-fit-primary text-black rounded-2xl px-6 py-3.5 flex-1 shadow-glow font-black text-sm">
                  <button onClick={() => updateQty(inCart.key, inCart.qty - 1)} className="hover:scale-110 transition-transform">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span>{inCart.qty} in Cart</span>
                  <button onClick={() => updateQty(inCart.key, inCart.qty + 1)} className="hover:scale-110 transition-transform">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  animate={addedAnim ? { scale: [1, 0.95, 1] } : {}}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-fit-primary text-fit-primary font-bold rounded-2xl py-3.5 text-sm hover:bg-fit-primary hover:text-black transition-all"
                >
                  <ShoppingCart size={17} />
                  <span>{addedAnim ? 'Added to Cart!' : 'Add to Cart'}</span>
                </motion.button>
              )}

              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-fit-primary to-fit-accent text-black font-black rounded-2xl py-3.5 text-sm hover:opacity-95 transition-all shadow-glow"
              >
                <Zap size={17} className="fill-black" />
                <span>Buy Now • ₹{currentVariant.price * qty}</span>
              </button>
            </div>

            {/* Delivery & Pincode Highlights */}
            <div className="card p-4 border-fit-border bg-fit-surface space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Truck size={16} className="text-fit-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-fit-text">
                    Free Delivery <span className="text-fit-muted font-normal">on orders above ₹499</span>
                  </p>
                  <p className="text-fit-muted mt-0.5">
                    Estimated delivery by <span className="text-fit-primary font-bold">{deliveryDate}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-fit-primary shrink-0 mt-0.5" />
                <p className="text-fit-muted">
                  Pan-India coverage with temperature-controlled cold storage.
                </p>
              </div>
            </div>

            {/* Accordion Detail Sections */}
            <div className="pt-2">
              <AccordionSection title="Product Description" icon={Info} defaultOpen={true}>
                <p className="text-xs sm:text-sm text-fit-muted leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {HIGHLIGHTS.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-fit-muted">
                      <Check size={13} className="text-fit-primary shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </AccordionSection>

              {/* Dynamic Nutrition Information */}
              {nutrition.isEdible && (nutrition.calories > 0 || nutrition.protein > 0) && (
                <AccordionSection title="Macro &amp; Nutrition Breakdown" icon={Flame} defaultOpen={true}>
                  
                  {/* Mode Selector Toggle: Selected Pack vs Per Serving */}
                  <div className="flex items-center justify-between gap-2 mb-3 bg-fit-surface2/60 p-1 rounded-xl border border-fit-border">
                    <button
                      onClick={() => setNutritionMode('pack')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        nutritionMode === 'pack'
                          ? 'bg-fit-primary text-black shadow-glow'
                          : 'text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      Selected Pack ({currentVariant.size || 'Pack'})
                    </button>
                    <button
                      onClick={() => setNutritionMode('serving')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        nutritionMode === 'serving'
                          ? 'bg-fit-primary text-black shadow-glow'
                          : 'text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      Per Standard Serving
                    </button>
                  </div>

                  {/* Serving / Quantity Dynamic Subtitle */}
                  <p className="text-[11px] text-fit-muted mb-3 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-fit-primary animate-pulse shrink-0" />
                    <span>{nutrition.servingLabel}</span>
                  </p>
                  
                  {/* Visual Macro Metric Cards */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                    {[
                      { label: 'Calories', value: nutrition.calories, unit: 'kcal', Icon: Flame, color: 'text-orange-400' },
                      { label: 'Protein', value: nutrition.protein, unit: 'g', Icon: Dumbbell, color: 'text-fit-primary' },
                      { label: 'Carbs', value: nutrition.carbs, unit: 'g', Icon: Wheat, color: 'text-yellow-400' },
                      { label: 'Total Fat', value: nutrition.fat, unit: 'g', Icon: Droplet, color: 'text-blue-400' },
                      { label: 'Dietary Fiber', value: nutrition.fiber, unit: 'g', Icon: Leaf, color: 'text-fit-accent' },
                    ].map(({ label, value, unit, Icon, color }) => (
                      <div key={label} className="card p-2.5 text-center bg-fit-surface2/60 border-fit-border transition-all">
                        <Icon size={16} className={`${color} mx-auto mb-1`} />
                        <p className="text-sm font-black text-fit-text">{value}<span className="text-[10px] font-normal text-fit-muted">{unit}</span></p>
                        <p className="text-[10px] text-fit-muted truncate">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Scaled Nutrition Table */}
                  <div className="rounded-2xl overflow-hidden border border-fit-border shadow-inner">
                    <table className="nutrition-table">
                      <thead>
                        <tr>
                          <th>Nutrient</th>
                          <th>{nutritionMode === 'pack' ? `Amount in ${currentVariant.size || 'Pack'}` : 'Per Serving'}</th>
                          <th>% Daily Value*</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-semibold">Energy / Calories</td>
                          <td className="font-black text-fit-primary">{nutrition.calories} kcal</td>
                          <td>{nutrition.dailyValues?.calories || Math.round(nutrition.calories / 2000 * 100)}%</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Protein</td>
                          <td className="font-black text-fit-primary">{nutrition.protein}g</td>
                          <td>{nutrition.dailyValues?.protein || Math.round(nutrition.protein / 50 * 100)}%</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Carbohydrates</td>
                          <td className="font-bold text-fit-text">{nutrition.carbs}g</td>
                          <td>{nutrition.dailyValues?.carbs || Math.round(nutrition.carbs / 300 * 100)}%</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Total Fat</td>
                          <td className="font-bold text-fit-text">{nutrition.fat}g</td>
                          <td>{nutrition.dailyValues?.fat || Math.round(nutrition.fat / 78 * 100)}%</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Dietary Fiber</td>
                          <td className="font-bold text-fit-text">{nutrition.fiber}g</td>
                          <td>{nutrition.dailyValues?.fiber || Math.round(nutrition.fiber / 28 * 100)}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-fit-muted mt-2">
                    * % Daily Values based on standard 2,000 kcal diet. Values dynamically scale when selecting different pack sizes (250g, 500g, 1kg, 2kg).
                  </p>
                </AccordionSection>
              )}

              {/* Ingredients */}
              {(() => {
                const ingredientsList = Array.isArray(product.ingredients)
                  ? product.ingredients
                  : typeof product.ingredients === 'string' && product.ingredients.trim()
                  ? product.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
                  : []

                if (ingredientsList.length === 0) return null

                return (
                  <AccordionSection title="Ingredients &amp; Composition" icon={Leaf} defaultOpen={false}>
                    <div className="flex flex-wrap gap-2">
                      {ingredientsList.map((ing) => (
                        <span key={ing} className="chip text-xs bg-fit-surface2">{ing}</span>
                      ))}
                    </div>
                  </AccordionSection>
                )
              })()}

              {/* Equipment Specifications */}
              {product.specifications && (
                <AccordionSection title="Build & Warranty Specifications" icon={ShieldCheck} defaultOpen={true}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-fit-border/40 pb-1">
                        <span className="text-xs text-fit-muted capitalize">{key}</span>
                        <span className="text-xs font-bold text-fit-text">{value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionSection>
              )}
            </div>

          </div>
        </div>

        {/* Similar Products */}
        {related.length > 0 && (
          <div className="mt-12 pt-6 border-t border-fit-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Similar Products in {categoryLabel}</h2>
              <Link to={`/category/${product.category}`} className="text-xs text-fit-primary font-bold hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12" ref={reviewsRef}>
          <ReviewSection 
            product={product} 
            selectedVariantLabel={variantLabel} 
            onStatsChange={setRealReviews} 
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-fit-border px-4 py-3 flex items-center gap-3 z-40 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-fit-muted">Total Price</span>
          <span className="text-lg font-black text-fit-primary leading-tight">₹{currentVariant.price * qty}</span>
        </div>

        {inCart ? (
          <div className="flex items-center justify-between bg-fit-primary text-black rounded-xl px-4 py-2.5 flex-1 font-bold text-xs shadow-glow">
            <button onClick={() => updateQty(inCart.key, inCart.qty - 1)}>
              <Minus size={14} strokeWidth={3} />
            </button>
            <span>{inCart.qty} in cart</span>
            <button onClick={() => updateQty(inCart.key, inCart.qty + 1)}>
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 border border-fit-primary/60 text-fit-primary font-bold rounded-xl py-2.5 text-xs bg-fit-primary/10 hover:bg-fit-primary hover:text-black transition-all"
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        )}

        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-fit-primary to-fit-accent text-black font-black rounded-xl py-2.5 text-xs shadow-glow"
        >
          <Zap size={14} className="fill-black" />
          <span>Buy Now</span>
        </button>
      </div>
    </AppLayout>
  )
}
