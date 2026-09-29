import { useState, useEffect } from 'react'
import { PLACEHOLDER_IMAGE } from '../utils/foodImageMap.js'

export default function SmartFoodImage({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  imgClassName = '',
  rounded = 'rounded-lg',
  loading = 'lazy',
  ...rest
}) {
  const initialSrc = src || fallbackSrc || PLACEHOLDER_IMAGE
  const [currentSrc, setCurrentSrc] = useState(initialSrc)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const nextSrc = src || fallbackSrc || PLACEHOLDER_IMAGE
    setCurrentSrc(nextSrc)
    setHasError(false)
    setIsLoading(true)
  }, [src, fallbackSrc])

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(true)
    } else if (currentSrc !== PLACEHOLDER_IMAGE) {
      setCurrentSrc(PLACEHOLDER_IMAGE)
      setHasError(true)
    }
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden bg-fit-surface2 ${rounded} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 shimmer" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${imgClassName}`}
        {...rest}
      />
    </div>
  )
}
