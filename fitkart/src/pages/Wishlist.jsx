import { Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useProducts } from '../context/ProductContext.jsx'

export default function Wishlist() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { products } = useProducts()
  const items = products.filter((p) => user?.wishlist?.includes(p.id) || user?.wishlist?.includes(p._id))

  return (
    <AppLayout showFooter>
      <PageHeader
        title="Saved Favorites"
        subtitle={`${items.length} item${items.length === 1 ? '' : 's'} saved in your wishlist`}
      />

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {items.length === 0 ? (
          <div className="max-w-md mx-auto py-20 px-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-fit-surface2 flex items-center justify-center mx-auto mb-4 border border-fit-border shadow-card">
              <Heart size={36} className="text-fit-muted" />
            </div>
            <h2 className="text-xl font-bold text-fit-text mb-1">Your Wishlist is Empty</h2>
            <p className="text-xs text-fit-muted mb-6">
              Save your favorite proteins, creatine, snacks and supplements for quick 1-click re-ordering.
            </p>
            <button onClick={() => navigate('/category/all')} className="btn-primary">
              Discover Products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  )
}