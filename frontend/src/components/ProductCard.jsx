import { motion } from 'framer-motion'
import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { getMinPrice, getBestDiscountVariant, getBestDiscountPct } from '../utils/productVariants.js'
import { getCategoryFallbackImage } from '../utils/foodImageMap.js'
import SmartFoodImage from './SmartFoodImage.jsx'

export default function ProductCard({ product, compact = false }) {
  const { user, toggleWishlist } = useUser()
  const isWishlisted = user?.wishlist?.includes(product.id)

  const minPrice = getMinPrice(product)
  const discountVariant = getBestDiscountVariant(product)
  const discountPct = getBestDiscountPct(product)
  const isNew = product.tags?.includes('new')

  // Pseudo-random but consistent ratings based on product ID to avoid "default" look
  const seed = product.id ? product.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 123
  const dynamicRating = product.rating === 4.5 || product.rating === 4.7 
    ? (4.0 + (seed % 10) / 10).toFixed(1) 
    : product.rating

  // Delivery badge formatting
  const dInfo = product.deliveryInfo || { type: 'FITNESS_PRODUCTS', min: 1, max: 3, unit: 'days' }
  const isFast = dInfo.unit === 'mins'
  const deliveryText = `${isFast ? '⚡' : '📦'} Delivery in ${dInfo.min}–${dInfo.max} ${dInfo.unit}`

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group card relative overflow-hidden flex flex-col justify-between bg-fit-surface hover:border-fit-primary/50 transition-all duration-300 ${
        compact ? 'w-[140px] sm:w-40 flex-shrink-0' : 'w-full'
      }`}
    >
      <div>
        {/* Product Image Area */}
        <Link to={`/product/${product.id}`} className="block relative aspect-square bg-fit-surface2/60 img-zoom-wrap overflow-hidden">
          <SmartFoodImage
            src={product.image}
            fallbackSrc={getCategoryFallbackImage(product.category)}
            alt={product.name}
            loading="lazy"
            className="w-full h-full"
            imgClassName="img-zoom w-full h-full object-cover p-1.5"
            rounded=""
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discountPct > 0 && (
              <span className="badge-discount shadow-md">
                {discountPct}% OFF
              </span>
            )}
            {isNew && !discountPct && (
              <span className="badge-new shadow-md">
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product.id)
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all z-10"
            aria-label="Toggle wishlist"
          >
            <Heart
              size={13}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
        </Link>

        {/* Product Information */}
        <Link to={`/product/${product.id}`} className="p-3 flex flex-col gap-1 block">
          {/* Variants chip */}
          <div className="flex items-center justify-between text-[10px]">
            <span className="uppercase tracking-wider font-semibold text-fit-primary">
              {product.variants?.length || 1} Option{product.variants?.length > 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-1 bg-fit-surface2/80 px-1.5 py-0.5 rounded-md border border-fit-border/40">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-fit-text">{dynamicRating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-fit-text leading-snug line-clamp-2 min-h-[2.4em] group-hover:text-fit-primary transition-colors mt-0.5">
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[10px] text-fit-muted font-medium">From</span>
            <span className="text-sm sm:text-base font-extrabold text-fit-text">
              ₹{minPrice}
            </span>
            {discountVariant.mrp > discountVariant.price && (
              <span className="text-[10px] text-fit-muted line-through">
                ₹{discountVariant.mrp}
              </span>
            )}
          </div>
          
          <div className="mt-1 flex items-center">
             <span className={`text-[10px] font-bold ${isFast ? 'text-green-500' : 'text-blue-400'}`}>
               {deliveryText}
             </span>
          </div>
        </Link>
      </div>

      {/* Action Footer */}
      <div className="px-3 pb-3 pt-0">
        <Link
          to={`/product/${product.id}`}
          className="w-full flex items-center justify-center gap-1 text-center text-[11px] font-bold border border-fit-primary/40 bg-fit-primary/5 text-fit-primary group-hover:bg-fit-primary group-hover:text-black rounded-xl py-2 transition-all duration-200 shadow-sm"
        >
          <span>Select Options</span>
          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
        </Link>
      </div>
    </motion.div>
  )
}