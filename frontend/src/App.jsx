import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import OtpVerify from './pages/OtpVerify.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import SearchResults from './pages/SearchResults.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddressPage from './pages/AddressPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import Profile from './pages/Profile.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Wishlist from './pages/Wishlist.jsx'
import AiRecommendation from './pages/AiRecommendation.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Workouts from './pages/Workouts.jsx'
import WorkoutDetail from './pages/WorkoutDetail.jsx'
import Rewards from './pages/Rewards.jsx'
import Subscription from './pages/Subscription.jsx'
import Community from './pages/Community.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Fitness from './pages/Fitness.jsx'
import FitnessActiveWorkout from './pages/FitnessActiveWorkout.jsx'
import FitnessRoutines from './pages/FitnessRoutines.jsx'
import FitnessRoutineBuilder from './pages/FitnessRoutineBuilder.jsx'
import FitnessHistory from './pages/FitnessHistory.jsx'
import FitnessLibrary from './pages/FitnessLibrary.jsx'
import FitnessBodyCare from './pages/FitnessBodyCare.jsx'
import FitnessOnboarding from './pages/FitnessOnboarding/FitnessOnboarding.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OtpVerify />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/category/:id" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout/address" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
      <Route path="/address/select" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
      <Route path="/checkout/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="/order-tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/profile/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

      <Route path="/ai-recommendation" element={<ProtectedRoute><AiRecommendation /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
      <Route path="/workouts/:id" element={<ProtectedRoute><WorkoutDetail /></ProtectedRoute>} />
      
      <Route path="/fitness" element={<ProtectedRoute><Fitness /></ProtectedRoute>} />
      <Route path="/fitness/active" element={<ProtectedRoute><FitnessActiveWorkout /></ProtectedRoute>} />
      <Route path="/fitness/routines" element={<ProtectedRoute><FitnessRoutines /></ProtectedRoute>} />
      <Route path="/fitness/builder" element={<ProtectedRoute><FitnessRoutineBuilder /></ProtectedRoute>} />
      <Route path="/fitness/history" element={<ProtectedRoute><FitnessHistory /></ProtectedRoute>} />
      <Route path="/fitness/library" element={<ProtectedRoute><FitnessLibrary /></ProtectedRoute>} />
      <Route path="/fitness/bodycare" element={<ProtectedRoute><FitnessBodyCare /></ProtectedRoute>} />
      <Route path="/fitness/onboarding" element={<ProtectedRoute><FitnessOnboarding /></ProtectedRoute>} />
      
      <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
      <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Splash />} />
    </Routes>
  )
}
