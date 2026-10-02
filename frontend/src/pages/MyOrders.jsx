import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Loader2, ChevronRight, Clock, Truck } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useUser } from '../context/UserContext.jsx'
import { orderApi } from '../services/api.js'

export default function MyOrders() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getMyOrders()
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setOrders(res.map(o => ({ ...o, id: o.orderId || o.id || o._id })))
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn('[Fetch MyOrders backend fallback]:', err.message)
      }

      if (isMounted) {
        setOrders(user?.orders || [])
        setLoading(false)
      }
    }

    fetchOrders()
    return () => { isMounted = false }
  }, [user])

  return (
    <AppLayout>
      <PageHeader title="Order History" subtitle={`${orders.length} orders placed`} />
      
      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center py-20 text-center">
            <Loader2 size={36} className="animate-spin text-fit-primary mb-3" />
            <p className="text-xs text-fit-muted">Retrieving your verified orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="max-w-md mx-auto py-20 text-center px-4">
            <div className="w-20 h-20 rounded-3xl bg-fit-surface2 flex items-center justify-center mx-auto mb-4 border border-fit-border">
              <Package size={36} className="text-fit-muted" />
            </div>
            <h2 className="text-xl font-bold mb-1">No Orders Yet</h2>
            <p className="text-xs text-fit-muted mb-6">
              When you place orders for supplements or nutrition, they will appear here.
            </p>
            <button onClick={() => navigate('/home')} className="btn-primary">
              Explore Store
            </button>
          </div>
        ) : (
          orders.map((order) => {
            const orderKey = order.orderId || order.id || order._id
            return (
              <div
                key={orderKey}
                onClick={() => navigate('/order-tracking', { state: { order } })}
                className="card p-5 border-fit-border bg-fit-surface hover:border-fit-primary/50 transition-all cursor-pointer shadow-card space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-sm text-fit-text">
                      Order #{orderKey}
                    </span>
                    <p className="text-[11px] text-fit-muted flex items-center gap-1 mt-0.5">
                      <Clock size={11} />
                      {order.placedAt ? new Date(order.placedAt).toLocaleString() : new Date().toLocaleString()}
                    </p>
                  </div>
                  <span className="badge-new text-[11px] px-3 py-1 font-bold">
                    {order.status || 'Order Confirmed'}
                  </span>
                </div>

                <div className="text-xs text-fit-muted">
                  {order.items?.length || 0} item{order.items?.length > 1 ? 's' : ''} in this delivery
                </div>

                <div className="border-t border-fit-border pt-3 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 font-bold text-fit-text">
                    <span>Total Paid:</span>
                    <span className="text-fit-primary text-base font-black font-mono">₹{order.total || 0}</span>
                  </div>
                  
                  <span className="flex items-center gap-1 text-xs font-bold text-fit-primary hover:underline">
                    <span>Track Live</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            )
          })
        )}
      </main>
    </AppLayout>
  )
}
