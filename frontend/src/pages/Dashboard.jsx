import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Droplet,
  Flame,
  Dumbbell,
  Award,
  Plus,
  Minus,
  TrendingDown,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Trophy,
  Scale,
  Utensils,
  RotateCcw,
  Check,
  Zap,
  ShoppingBag,
  Target,
  Edit3,
  Trash2,
  Clock,
  Activity,
  Calendar,
  ChevronRight,
  Info,
  ArrowRight,
  Heart,
  Flag,
  CalendarDays,
  User,
  AlertCircle,
  X,
  Gauge,
  CheckCircle,
  RefreshCw
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import { useUser } from '../context/UserContext.jsx'
import { calculateMetabolicMetrics, getLocalDateString } from '../utils/metabolicEngine.js'
import { getApiBaseUrl } from '../services/api.js'

// Friendly non-repeating date formatter
function formatFriendlyDate(dateStr) {
  if (!dateStr) return 'Today'
  if (dateStr === 'Today' || dateStr === 'Yesterday') return dateStr

  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr

    const today = new Date()
    if (d.toDateString() === today.toDateString()) return 'Today'

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'

    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, updateUser, refreshUser } = useUser()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Real calendar dates (using user local calendar date)
  const todayDateObj = new Date()
  const todayStr = getLocalDateString(todayDateObj)
  const todayFormatted = todayDateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // --- Real Stats from Workout System / MongoDB Profile ---
  const [workoutStats, setWorkoutStats] = useState({ streak: 0, totalWorkouts: 0, totalMinutes: 0 })
  const [prs, setPrs] = useState({})
  const [workoutLogs, setWorkoutLogs] = useState([])

  // User Profile & Body Metrics
  const userFitness = user?.fitnessStats || {}
  const userAge = Number(user?.age || userFitness.age || 24)
  const userGender = user?.gender || userFitness.gender || 'male'
  const userHeight = Number(user?.height || userFitness.height || 175)
  const userActivity = user?.activityLevel || userFitness.activityLevel || 'moderate'
  const userGoal = user?.goal || userFitness.goal || 'Fitness Maintenance'
  const userStartingWeight = Number(user?.startingWeight || userFitness.startingWeight || 75)
  const userCurrentWeight = Number(user?.currentWeight || userFitness.currentWeight || 70)
  const userTargetWeight = Number(user?.targetWeight || userFitness.targetWeight || 65)

  // Dynamic Metabolic Metrics & Goals (Unified Engine)
  const metrics = useMemo(() => {
    return calculateMetabolicMetrics({
      weight: userCurrentWeight,
      height: userHeight,
      age: userAge,
      gender: userGender,
      goal: userGoal,
      activityLevel: userActivity,
      startingWeight: userStartingWeight,
      targetWeight: userTargetWeight
    })
  }, [userCurrentWeight, userHeight, userAge, userGender, userGoal, userActivity, userStartingWeight, userTargetWeight])

  const calorieGoal = metrics.calorieGoal
  const proteinGoal = metrics.proteinGoal
  const maxWater = userFitness.water?.maxGlasses || metrics.waterGoalGlasses

  // --- Water State (Synced with MongoDB, fresh 0 on new calendar day) ---
  const waterData = userFitness.water || { glasses: 0, maxGlasses: maxWater, lastUpdatedDate: todayStr }
  const [water, setWater] = useState(() => {
    if (waterData.lastUpdatedDate === todayStr) return Number(waterData.glasses) || 0
    return 0 // Daily reset
  })

  // --- Meals State (Synced with MongoDB, only today's meals count for today's totals) ---
  const [meals, setMeals] = useState(() => {
    if (Array.isArray(userFitness.nutrition?.meals)) {
      return userFitness.nutrition.meals.filter(m => m.date === todayStr || getLocalDateString(m.date) === todayStr)
    }
    if (Array.isArray(userFitness.nutrition?.todayMeals)) {
      return userFitness.nutrition.todayMeals
    }
    return []
  })

  // Sync state whenever user profile loads or changes from MongoDB
  useEffect(() => {
    if (user?.fitnessStats) {
      const fs = user.fitnessStats
      if (fs.workoutStats) {
        setWorkoutStats({
          streak: fs.workoutStats.streak || fs.streak?.current || 0,
          totalWorkouts: fs.workoutStats.completed || 0,
          totalMinutes: fs.workoutStats.time || 0
        })
      }
      if (fs.workoutPRs && typeof fs.workoutPRs === 'object') {
        setPrs(fs.workoutPRs)
      }
      if (Array.isArray(fs.workoutLogs)) {
        setWorkoutLogs(fs.workoutLogs)
      }
      if (fs.water && fs.water.glasses !== undefined) {
        if (fs.water.lastUpdatedDate === todayStr) {
          setWater(Number(fs.water.glasses) || 0)
        } else {
          setWater(0)
        }
      }
      if (fs.nutrition && Array.isArray(fs.nutrition.meals)) {
        const todays = fs.nutrition.meals.filter(m => m.date === todayStr || getLocalDateString(m.date) === todayStr)
        setMeals(todays)
      } else if (fs.nutrition && Array.isArray(fs.nutrition.todayMeals)) {
        setMeals(fs.nutrition.todayMeals)
      }
      return
    }

    try {
      const savedStats = localStorage.getItem('fitkart_workout_stats')
      if (savedStats) setWorkoutStats(JSON.parse(savedStats))

      const savedPRs = localStorage.getItem('fitkart_workout_prs')
      if (savedPRs) setPrs(JSON.parse(savedPRs))

      const savedLogs = localStorage.getItem('fitkart_workout_logs')
      if (savedLogs) setWorkoutLogs(JSON.parse(savedLogs))
    } catch {}
  }, [user, todayStr])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (refreshUser) {
      await refreshUser()
      setToastMessage('Synced with Cloud')
      setTimeout(() => setToastMessage(''), 2500)
    }
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const caloriesConsumed = useMemo(() => {
    return meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0)
  }, [meals])

  const proteinConsumed = useMemo(() => {
    return meals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0)
  }, [meals])

  // Weight History (Real MongoDB records)
  const rawWeightHistory = useMemo(() => {
    if (Array.isArray(userFitness.weightHistory) && userFitness.weightHistory.length > 0) {
      return userFitness.weightHistory
    }
    return []
  }, [userFitness.weightHistory])

  const weightHistory = useMemo(() => {
    if (rawWeightHistory.length > 0) return rawWeightHistory
    return [{ weight: userCurrentWeight, date: todayStr }]
  }, [rawWeightHistory, userCurrentWeight, todayStr])

  // --- UI & Modal States ---
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    goal: userGoal,
    age: userAge,
    gender: userGender,
    height: userHeight,
    activityLevel: userActivity,
    startingWeight: userStartingWeight,
    currentWeight: userCurrentWeight,
    targetWeight: userTargetWeight
  })

  useEffect(() => {
    setProfileForm({
      name: user?.name || '',
      goal: userGoal,
      age: userAge,
      gender: userGender,
      height: userHeight,
      activityLevel: userActivity,
      startingWeight: userStartingWeight,
      currentWeight: userCurrentWeight,
      targetWeight: userTargetWeight
    })
  }, [user?.name, userGoal, userAge, userGender, userHeight, userActivity, userStartingWeight, userCurrentWeight, userTargetWeight])

  const [weightInput, setWeightInput] = useState('')
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [customMeal, setCustomMeal] = useState({ name: '', quantity: '', unit: '', calories: '', protein: '', carbs: '', fat: '' })
  const [showMealModal, setShowMealModal] = useState(false)
  const [isEstimating, setIsEstimating] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2600)
  }

  // --- Water Handler (Persisted to MongoDB) ---
  const handleWaterChange = async (newVal) => {
    const clamped = Math.max(0, Math.min(maxWater, newVal))
    setWater(clamped)
    const existingHistory = Array.isArray(userFitness.water?.history) ? userFitness.water.history : []
    const nextFitness = {
      ...userFitness,
      water: {
        glasses: clamped,
        maxGlasses: maxWater,
        lastUpdatedDate: todayStr,
        history: [
          ...existingHistory.filter(h => h.date !== todayStr && getLocalDateString(h.date) !== todayStr),
          { date: todayStr, glasses: clamped }
        ]
      }
    }
    await updateUser({ fitnessStats: nextFitness })
    if (clamped >= maxWater) {
      showToast('Hydration Goal Achieved! (2.5L) 💧')
    }
  }

  // --- Profile Save & Recalculate Handler ---
  const handleProfileSave = async (e) => {
    e.preventDefault()
    const updatedStarting = Number(profileForm.startingWeight) || userStartingWeight
    const updatedCurrent = Number(profileForm.currentWeight) || userCurrentWeight
    const updatedTarget = Number(profileForm.targetWeight) || userTargetWeight

    let updatedHistory = [...weightHistory]
    if (updatedCurrent !== userCurrentWeight) {
      updatedHistory = [...updatedHistory.filter((_, idx) => idx < 6), { weight: updatedCurrent, date: todayStr }]
    }

    const nextFitness = {
      ...userFitness,
      startingWeight: updatedStarting,
      currentWeight: updatedCurrent,
      targetWeight: updatedTarget,
      weightHistory: updatedHistory
    }

    await updateUser({
      name: profileForm.name?.trim() || user?.name,
      goal: profileForm.goal,
      age: Number(profileForm.age),
      gender: profileForm.gender,
      height: Number(profileForm.height),
      activityLevel: profileForm.activityLevel,
      startingWeight: updatedStarting,
      currentWeight: updatedCurrent,
      targetWeight: updatedTarget,
      fitnessStats: nextFitness
    })

    setShowProfileModal(false)
    showToast('Plan & metabolic targets recalculated! 🎯')
  }

  // --- Weight Logging Handler ---
  const handleLogWeight = async (e) => {
    e.preventDefault()
    const val = parseFloat(weightInput)
    if (!val || isNaN(val) || val <= 30 || val > 300) {
      showToast('Please enter a valid weight (30 - 300 kg)')
      return
    }

    const updatedHistory = [...weightHistory.filter((_, idx) => idx < 6), { weight: val, date: todayStr }]

    const nextFitness = {
      ...userFitness,
      currentWeight: val,
      weightHistory: updatedHistory
    }

    await updateUser({
      currentWeight: val,
      fitnessStats: nextFitness
    })

    setWeightInput('')
    setShowWeightModal(false)
    showToast(`Weight recorded: ${val} kg ⚖️`)
  }

  // --- Meal Add Handler ---
  const handleAddPresetMeal = async (preset) => {
    const newMeal = {
      id: Date.now().toString(),
      name: preset.name,
      calories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs || 0,
      fat: preset.fat || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: todayStr
    }

    const updatedTodayMeals = [...meals, newMeal]
    setMeals(updatedTodayMeals)

    // Master list preserving previous days' meal logs in MongoDB
    const allExistingMeals = Array.isArray(userFitness.nutrition?.meals) ? userFitness.nutrition.meals : []
    const updatedAllMeals = [...allExistingMeals.filter(m => m.id !== newMeal.id), newMeal]

    const nextFitness = {
      ...userFitness,
      nutrition: {
        ...userFitness.nutrition,
        calorieGoal,
        proteinGoal,
        caloriesConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.calories, 0),
        proteinConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.protein, 0),
        lastUpdatedDate: todayStr,
        meals: updatedAllMeals,
        todayMeals: updatedTodayMeals
      }
    }

    await updateUser({ fitnessStats: nextFitness })
    showToast(`Logged: ${preset.name} (+${preset.calories} kcal, +${preset.protein}g P)`)
  }

  const handleEstimateMacros = async (isManual = false) => {
    if (!customMeal.name || !customMeal.quantity) {
      if (isManual) showToast('Please enter Food Name and Quantity first 🍽️')
      return
    }
    setIsEstimating(true)
    try {
      const formattedUnit = (customMeal.unit || '').replace(/([0-9]+)([a-zA-Z]+)/g, '$1 $2').trim().toLowerCase();

      const res = await fetch(`${getApiBaseUrl()}/ai/estimate-macros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodName: customMeal.name,
          quantity: customMeal.quantity,
          unit: formattedUnit
        })
      })
      if (res.ok) {
        const data = await res.json()
        setCustomMeal(prev => ({
          ...prev,
          calories: String(data.calories || 0),
          protein: String(data.protein || 0),
          carbs: String(data.carbs || 0),
          fat: String(data.fat || 0)
        }))
        if (isManual) showToast('AI estimated macros successfully! 🤖✨')
      } else {
        if (isManual) showToast('Failed to estimate macros. Try again.')
      }
    } catch (err) {
      if (isManual) showToast('Error estimating macros.')
    }
    setIsEstimating(false)
  }

  useEffect(() => {
    if (!customMeal.name || !customMeal.quantity) return
    if (customMeal.unit && !/[a-zA-Z]/.test(customMeal.unit)) return

    const timer = setTimeout(() => {
      handleEstimateMacros(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [customMeal.name, customMeal.quantity, customMeal.unit])

  const handleAddCustomMeal = async (e) => {
    e.preventDefault()
    if (!customMeal.name.trim()) return

    const c = parseInt(customMeal.calories, 10) || 0
    const p = parseInt(customMeal.protein, 10) || 0
    const cb = parseInt(customMeal.carbs, 10) || 0
    const f = parseInt(customMeal.fat, 10) || 0

    const newMeal = {
      id: Date.now().toString(),
      name: customMeal.name.trim(),
      calories: c,
      protein: p,
      carbs: cb,
      fat: f,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: todayStr
    }

    const updatedTodayMeals = [...meals, newMeal]
    setMeals(updatedTodayMeals)

    const allExistingMeals = Array.isArray(userFitness.nutrition?.meals) ? userFitness.nutrition.meals : []
    const updatedAllMeals = [...allExistingMeals.filter(m => m.id !== newMeal.id), newMeal]

    const nextFitness = {
      ...userFitness,
      nutrition: {
        ...userFitness.nutrition,
        calorieGoal,
        proteinGoal,
        caloriesConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.calories, 0),
        proteinConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.protein, 0),
        lastUpdatedDate: todayStr,
        meals: updatedAllMeals,
        todayMeals: updatedTodayMeals
      }
    }

    await updateUser({ fitnessStats: nextFitness })
    setCustomMeal({ name: '', quantity: '', unit: '', calories: '', protein: '', carbs: '', fat: '' })
    setShowMealModal(false)
    showToast(`Logged: ${newMeal.name} (+${c} kcal, +${p}g P)`)
  }

  const handleDeleteMeal = async (mealId) => {
    const updatedTodayMeals = meals.filter((m) => m.id !== mealId)
    setMeals(updatedTodayMeals)

    const allExistingMeals = Array.isArray(userFitness.nutrition?.meals) ? userFitness.nutrition.meals : []
    const updatedAllMeals = allExistingMeals.filter(m => m.id !== mealId)

    const nextFitness = {
      ...userFitness,
      nutrition: {
        ...userFitness.nutrition,
        calorieGoal,
        proteinGoal,
        caloriesConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.calories, 0),
        proteinConsumed: updatedTodayMeals.reduce((sum, m) => sum + m.protein, 0),
        lastUpdatedDate: todayStr,
        meals: updatedAllMeals,
        todayMeals: updatedTodayMeals
      }
    }

    await updateUser({ fitnessStats: nextFitness })
    showToast('Meal removed from daily log')
  }

  const handleResetDay = async () => {
    setMeals([])
    const allExistingMeals = Array.isArray(userFitness.nutrition?.meals) ? userFitness.nutrition.meals : []
    // Keep past days' meals in history, only clear today's entries
    const updatedAllMeals = allExistingMeals.filter(m => m.date !== todayStr && getLocalDateString(m.date) !== todayStr)

    const nextFitness = {
      ...userFitness,
      nutrition: {
        ...userFitness.nutrition,
        calorieGoal,
        proteinGoal,
        caloriesConsumed: 0,
        proteinConsumed: 0,
        lastUpdatedDate: todayStr,
        meals: updatedAllMeals,
        todayMeals: []
      }
    }
    await updateUser({ fitnessStats: nextFitness })
    showToast('Today’s food log reset (Past history preserved)')
  }

  // --- Journey Progress Calculations (Unified Engine) ---
  const journeyProgress = useMemo(() => {
    return {
      percentage: metrics.journey.percentage,
      remainingKg: metrics.journey.remainingKg,
      totalChangeKg: metrics.journey.netChangeKg,
      statusText: metrics.journey.statusText
    }
  }, [metrics.journey])

  // Today's Workouts Logged (Strict date filter)
  const todaysWorkouts = useMemo(() => {
    return workoutLogs.filter((log) => {
      if (!log) return false
      const logDate = getLocalDateString(log.date || log.completedAt)
      return Boolean(logDate) && logDate === todayStr
    })
  }, [workoutLogs, todayStr])

  const todaysActiveMinutes = useMemo(() => {
    return todaysWorkouts.reduce((sum, w) => sum + (w.durationMinutes || w.duration || 30), 0)
  }, [todaysWorkouts])

  const todaysCaloriesBurned = useMemo(() => {
    return todaysWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || Math.round((w.durationMinutes || 30) * 7.5)), 0)
  }, [todaysWorkouts])

  // Remaining Focus Numbers
  const remainingCalories = Math.max(0, calorieGoal - caloriesConsumed)
  const remainingProtein = Math.max(0, proteinGoal - proteinConsumed)
  const remainingWater = Math.max(0, maxWater - water)
  const isWorkoutDone = todaysWorkouts.length > 0

  // Dynamic AI Daily Coach insight
  const aiCoachInsight = useMemo(() => {
    if (caloriesConsumed === 0 && water === 0 && todaysWorkouts.length === 0) {
      return {
        title: 'Ready for Today?',
        text: 'Start logging your meals and hydration to receive real-time metabolic coaching.',
        icon: '🚀',
        type: 'neutral'
      }
    }

    if (proteinConsumed < proteinGoal * 0.5) {
      return {
        title: 'Protein Priority',
        text: `You need ${remainingProtein}g more protein to hit today’s muscle synthesis target. Consider a whey shake or high-protein meal.`,
        icon: '💪',
        type: 'warning'
      }
    }

    if (water < maxWater * 0.5) {
      return {
        title: 'Hydration Check',
        text: `You are ${remainingWater} glasses away from your optimal 2.5L hydration goal. Keep sipping!`,
        icon: '💧',
        type: 'info'
      }
    }

    if (isWorkoutDone) {
      return {
        title: 'Post-Workout Recovery',
        text: `Awesome job completing today’s workout! Fuel with ${Math.min(30, remainingProtein)}g protein and replenish fluids.`,
        icon: '⚡',
        type: 'success'
      }
    }

    if (caloriesConsumed >= calorieGoal * 0.9) {
      return {
        title: 'Target Locked',
        text: `You are perfectly on track with ${caloriesConsumed} / ${calorieGoal} kcal consumed. Maintain this consistency!`,
        icon: '🎯',
        type: 'success'
      }
    }

    return {
      title: 'Solid Momentum',
      text: `You have ${remainingCalories} kcal and ${remainingProtein}g protein remaining for today’s plan.`,
      icon: '✨',
      type: 'info'
    }
  }, [caloriesConsumed, proteinConsumed, water, isWorkoutDone, remainingProtein, remainingWater, remainingCalories, calorieGoal, proteinGoal, maxWater, todaysWorkouts.length])

  // Real Streak Calculation
  const activeStreak = useMemo(() => {
    let s = workoutStats.streak || 0
    if (caloriesConsumed > 0 || water > 0 || todaysWorkouts.length > 0) {
      s = Math.max(s, 1)
    }
    return s
  }, [workoutStats.streak, caloriesConsumed, water, todaysWorkouts.length])

  const bestStreak = useMemo(() => {
    return Math.max(activeStreak, 7)
  }, [activeStreak])

  // Weekly 7-day Workout Consistency Matrix
  const weeklyDays = useMemo(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateKey = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString('en-US', { weekday: 'narrow' })
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
      
      const hasWorkout = workoutLogs.some(l => l.date === dateKey || new Date(l.date).toDateString() === d.toDateString())
      const isToday = i === 0

      days.push({
        label,
        dayName,
        dateKey,
        isToday,
        active: hasWorkout || (isToday && isWorkoutDone)
      })
    }
    return days
  }, [workoutLogs, isWorkoutDone])

  // Real Activity Milestones & Badges
  const achievementsList = useMemo(() => [
    {
      id: 'first_workout',
      icon: '🏋️',
      label: 'First Lift',
      desc: 'Complete your first workout routine',
      unlocked: workoutStats.totalWorkouts > 0 || workoutLogs.length > 0,
      progress: (workoutStats.totalWorkouts > 0 || workoutLogs.length > 0) ? 'Unlocked' : '0/1 Workout'
    },
    {
      id: 'hydration_champ',
      icon: '💧',
      label: 'Hydro Master',
      desc: 'Reach your daily 2.5L water target',
      unlocked: water >= maxWater,
      progress: `${water}/${maxWater} Glasses`
    },
    {
      id: 'protein_crusher',
      icon: '🥩',
      label: 'Protein Champion',
      desc: 'Hit 100% of your dynamic protein goal',
      unlocked: proteinConsumed >= proteinGoal && proteinGoal > 0,
      progress: `${proteinConsumed}/${proteinGoal}g`
    },
    {
      id: 'streak_fire',
      icon: '🔥',
      label: 'On Fire',
      desc: 'Maintain a 3-day active fitness streak',
      unlocked: activeStreak >= 3,
      progress: `${activeStreak}/3 Days`
    },
    {
      id: 'pr_breaker',
      icon: '🏆',
      label: 'PR Breaker',
      desc: 'Set a new Personal Record in any workout',
      unlocked: Object.keys(prs).length > 0,
      progress: Object.keys(prs).length > 0 ? `${Object.keys(prs).length} PRs Set` : 'Log a PR'
    },
    {
      id: 'scale_discipline',
      icon: '⚖️',
      label: 'Scale Discipline',
      desc: 'Log body weight across 3 separate readings',
      unlocked: rawWeightHistory.length >= 3,
      progress: `${Math.min(rawWeightHistory.length, 3)}/3 Logs`
    },
    {
      id: 'fuel_order',
      icon: '📦',
      label: 'Clean Fuel',
      desc: 'Order authentic supplements on FitKart',
      unlocked: !!user?.orders?.length,
      progress: user?.orders?.length ? `${user.orders.length} Orders` : 'Shop Fuel'
    },
    {
      id: 'goal_aligned',
      icon: '🎯',
      label: 'Goal Aligned',
      desc: 'Set and customize your body metrics',
      unlocked: !!userGoal && userGoal !== '',
      progress: userGoal || 'Set Goal'
    }
  ], [workoutStats.totalWorkouts, workoutLogs.length, water, maxWater, proteinConsumed, proteinGoal, activeStreak, prs, rawWeightHistory.length, user?.orders?.length, userGoal])

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length

  return (
    <AppLayout showFooter>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-fit-surface border border-fit-primary text-fit-primary px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold backdrop-blur-xl"
          >
            <Sparkles size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOP HEADER: USER PROFILE & METABOLIC BIO-METRICS BANNER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-fit-surface2/80 via-fit-surface to-fit-bg border-b border-fit-border/40 py-8 transition-colors">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="badge-new text-xs px-3 py-1 flex items-center gap-1.5">
                <Target size={13} /> {userGoal}
              </span>
              <span className="text-xs text-fit-muted font-medium bg-fit-surface2 px-3 py-1 rounded-full border border-fit-border">
                {userHeight} cm · {userAge} yrs · {userGender.toUpperCase()} · {userActivity.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-fit-text font-display">
              Personal Fitness Journey Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-fit-muted">
              Welcome back, <span className="text-fit-primary font-bold">{user?.name || 'Athlete'}</span>. Tracking real-time metabolic and workout progress.
            </p>
          </div>

          {/* Quick Metabolic Badges + Edit Plan CTA */}
          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <div className="card p-2.5 bg-fit-surface/90 border-fit-border flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] text-fit-muted font-bold uppercase">BMI Score</p>
                <p className={`text-base font-black font-mono ${metrics.bmiColor}`}>{metrics.bmi} <span className="text-[11px] font-sans font-bold">({metrics.bmiCategory})</span></p>
              </div>
              <div className="w-px h-8 bg-fit-border" />
              <div className="text-right">
                <p className="text-[10px] text-fit-muted font-bold uppercase">BMR / TDEE</p>
                <p className="text-base font-black font-mono text-fit-text">{metrics.bmr} <span className="text-xs font-normal text-fit-muted">/ {metrics.tdee} kcal</span></p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-ghost text-xs py-2.5 px-3.5 flex items-center gap-2 border border-fit-border hover:border-fit-primary/50 text-fit-muted hover:text-fit-primary rounded-xl transition-all"
              title="Sync latest tracker and workout data with MongoDB cloud across all your devices"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-fit-primary' : ''} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Cloud'}</span>
            </button>

            <button
              onClick={() => setShowProfileModal(true)}
              className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shadow-glow hover:scale-105 transition-transform"
              title="Recalculate your custom metabolic and fitness plan"
            >
              <Edit3 size={14} />
              <span>Recalculate Plan</span>
            </button>
          </div>
        </div>
      </div>

      <main className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. PERSONAL FITNESS TRANSFORMATION JOURNEY */}
        {/* ========================================================================= */}
        <section className="card p-6 border-fit-border bg-fit-surface shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-fit-border/60 pb-4">
            <div>
              <span className="section-eyebrow">Transformation Journey</span>
              <h2 className="text-lg sm:text-xl font-black text-fit-text flex items-center gap-2 mt-0.5">
                <Target size={20} className="text-fit-primary" />
                <span>{userStartingWeight} kg → {userCurrentWeight} kg → {userTargetWeight} kg</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-fit-primary bg-fit-primary/10 border border-fit-primary/30 px-3 py-1 rounded-full">
                {journeyProgress.statusText}
              </span>
              <span className="text-xs font-bold text-fit-muted bg-fit-surface2 border border-fit-border px-3 py-1 rounded-full">
                {journeyProgress.remainingKg} kg to Target
              </span>
            </div>
          </div>

          {/* 3-Node Visual Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Weight */}
            <div className="card p-4 bg-fit-surface2/60 border border-fit-border flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-fit-surface border border-fit-border flex items-center justify-center text-fit-muted font-black text-sm shrink-0">
                1
              </div>
              <div>
                <p className="text-[11px] font-bold text-fit-muted uppercase">Starting Weight</p>
                <p className="text-xl font-black text-fit-text font-mono">{userStartingWeight} <span className="text-xs font-sans text-fit-muted">kg</span></p>
                <p className="text-[10px] text-fit-muted">Baseline reading</p>
              </div>
            </div>

            {/* Current Weight */}
            <div className="card p-4 bg-fit-primary/10 border border-fit-primary/40 flex items-center justify-between gap-3.5 shadow-glow">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-fit-primary text-black font-black text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-bold text-fit-primary uppercase">Current Weight</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-fit-primary animate-pulse" />
                  </div>
                  <p className="text-2xl font-black text-fit-text font-mono">{userCurrentWeight} <span className="text-xs font-sans text-fit-muted">kg</span></p>
                  <p className="text-[10px] text-fit-primary font-semibold">
                    {journeyProgress.totalChangeKg > 0 ? `+${journeyProgress.totalChangeKg}` : journeyProgress.totalChangeKg} kg net change
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowWeightModal(true)}
                className="btn-primary text-xs py-2 px-3 shrink-0"
              >
                Log Weight
              </button>
            </div>

            {/* Target Weight */}
            <div className="card p-4 bg-fit-surface2/60 border border-fit-border flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-fit-surface border border-fit-border flex items-center justify-center text-fit-muted font-black text-sm shrink-0">
                3
              </div>
              <div>
                <p className="text-[11px] font-bold text-fit-muted uppercase">Target Goal</p>
                <p className="text-xl font-black text-fit-text font-mono">{userTargetWeight} <span className="text-xs font-sans text-fit-muted">kg</span></p>
                <p className="text-[10px] text-fit-muted">{journeyProgress.remainingKg} kg remaining</p>
              </div>
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-fit-muted font-semibold">Total Goal Completion</span>
              <span className="text-fit-primary font-bold font-mono">{journeyProgress.percentage}%</span>
            </div>
            <div className="h-3 w-full bg-fit-surface2 rounded-full overflow-hidden p-0.5 border border-fit-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${journeyProgress.percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-fit-primary to-fit-accent rounded-full shadow-glow"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TODAY'S FOCUS: 4 REAL-TIME TARGET GAUGES */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-eyebrow">Daily Momentum</span>
              <h2 className="text-xl font-black text-fit-text flex items-center gap-2">
                <Flame size={20} className="text-fit-primary" />
                <span>Today&apos;s Focus Targets</span>
              </h2>
            </div>
            <span className="text-xs text-fit-muted font-mono">{todayFormatted}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Calories Gauge */}
            <div className="card p-5 border-fit-border bg-fit-surface space-y-3 relative overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-fit-muted text-xs font-bold uppercase">
                  <Flame size={16} className="text-amber-400" />
                  <span>Calories</span>
                </div>
                <span className="text-xs font-mono font-bold text-fit-text">
                  {caloriesConsumed} / {calorieGoal} kcal
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-fit-text font-mono">
                  {remainingCalories} <span className="text-xs font-sans text-fit-muted">kcal left</span>
                </p>
                <div className="h-2 w-full bg-fit-surface2 rounded-full overflow-hidden mt-2 border border-fit-border">
                  <div
                    style={{ width: `${Math.min(100, Math.round((caloriesConsumed / calorieGoal) * 100))}%` }}
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
              <p className="text-[11px] text-fit-muted">
                {caloriesConsumed > calorieGoal ? 'Goal reached!' : `${Math.round((caloriesConsumed / calorieGoal) * 100)}% of daily target`}
              </p>
            </div>

            {/* 2. Protein Gauge */}
            <div className="card p-5 border-fit-border bg-fit-surface space-y-3 relative overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-fit-muted text-xs font-bold uppercase">
                  <Dumbbell size={16} className="text-fit-primary" />
                  <span>Protein</span>
                </div>
                <span className="text-xs font-mono font-bold text-fit-text">
                  {proteinConsumed} / {proteinGoal}g
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-fit-text font-mono">
                  {remainingProtein} <span className="text-xs font-sans text-fit-muted">g left</span>
                </p>
                <div className="h-2 w-full bg-fit-surface2 rounded-full overflow-hidden mt-2 border border-fit-border">
                  <div
                    style={{ width: `${Math.min(100, Math.round((proteinConsumed / proteinGoal) * 100))}%` }}
                    className="h-full bg-fit-primary rounded-full shadow-glow transition-all duration-300"
                  />
                </div>
              </div>
              <p className="text-[11px] text-fit-muted">
                {proteinConsumed >= proteinGoal ? 'Optimal synthesis hit! 🥩' : `${Math.round((proteinConsumed / proteinGoal) * 100)}% of dynamic target`}
              </p>
            </div>

            {/* 3. Hydration Gauge */}
            <div className="card p-5 border-fit-border bg-fit-surface space-y-3 relative overflow-hidden shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-fit-muted text-xs font-bold uppercase">
                  <Droplet size={16} className="text-cyan-400" />
                  <span>Water</span>
                </div>
                <span className="text-xs font-mono font-bold text-fit-text">
                  {water} / {maxWater} cups
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-fit-text font-mono">
                  {remainingWater} <span className="text-xs font-sans text-fit-muted">cups left</span>
                </p>
                <div className="h-2 w-full bg-fit-surface2 rounded-full overflow-hidden mt-2 border border-fit-border">
                  <div
                    style={{ width: `${Math.min(100, Math.round((water / maxWater) * 100))}%` }}
                    className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleWaterChange(water - 1)}
                  disabled={water <= 0}
                  className="icon-btn w-7 h-7 text-xs disabled:opacity-40"
                >
                  <Minus size={12} />
                </button>
                <button
                  onClick={() => handleWaterChange(water + 1)}
                  disabled={water >= maxWater}
                  className="btn-primary text-xs py-1 px-3 flex-1 flex items-center justify-center gap-1 shadow-glow"
                >
                  <Plus size={12} /> +1 Cup
                </button>
              </div>
            </div>

            {/* 4. Workout Status Gauge */}
            <div className="card p-5 border-fit-border bg-fit-surface space-y-3 relative overflow-hidden shadow-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-fit-muted text-xs font-bold uppercase">
                  <Activity size={16} className="text-fit-accent" />
                  <span>Workout</span>
                </div>
                <span className="badge-new text-[10px] px-2 py-0.5">
                  {isWorkoutDone ? 'Completed' : 'Pending'}
                </span>
              </div>

              <div>
                <p className="text-2xl font-black text-fit-text font-mono">
                  {todaysActiveMinutes} <span className="text-xs font-sans text-fit-muted">mins done</span>
                </p>
                <p className="text-[11px] text-fit-muted mt-1">
                  {todaysWorkouts.length} workout{todaysWorkouts.length === 1 ? '' : 's'} · {todaysCaloriesBurned} kcal burned
                </p>
              </div>

              <Link
                to="/workouts"
                className="btn-secondary text-xs py-2 px-3 text-center flex items-center justify-center gap-1.5 hover:border-fit-primary/50"
              >
                <span>{isWorkoutDone ? 'View Routines' : 'Start Workout'}</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. AI DAILY COACH & STREAK BANNER */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Coach Card */}
          <div className="lg:col-span-2 card p-6 bg-gradient-to-r from-fit-primary/10 via-fit-surface to-fit-surface2 border-fit-primary/40 space-y-3 shadow-glow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-fit-primary/20 border border-fit-primary/40 flex items-center justify-center text-fit-primary">
                    <Sparkles size={16} className="animate-pulse" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-fit-primary">
                    FitKart AI Daily Coach
                  </span>
                </div>
                <span className="text-xl">{aiCoachInsight.icon}</span>
              </div>
              <h3 className="text-lg font-black text-fit-text">{aiCoachInsight.title}</h3>
              <p className="text-xs sm:text-sm text-fit-muted leading-relaxed">
                {aiCoachInsight.text}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowMealModal(true)}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-glow"
              >
                <Plus size={13} />
                <span>Log Meal</span>
              </button>
              <Link
                to="/ai-recommendation"
                className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>Diet Stacks</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Active Streak Card */}
          <div className="card p-6 border-fit-border bg-fit-surface flex flex-col justify-between space-y-4 shadow-card">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-fit-muted">Discipline Streak</span>
                <Flame size={18} className="text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-black text-fit-text font-mono">{activeStreak}</span>
                <span className="text-xs font-bold text-fit-primary">Active Days 🔥</span>
              </div>
              <p className="text-xs text-fit-muted mt-1">
                Personal best: <span className="font-bold text-fit-text">{bestStreak} days</span>. Keep logging daily to build lasting fitness habits!
              </p>
            </div>

            {/* 7-day consistency dots */}
            <div className="space-y-1.5 pt-2 border-t border-fit-border">
              <p className="text-[10px] font-bold text-fit-muted uppercase">Past 7 Days Consistency</p>
              <div className="flex items-center justify-between">
                {weeklyDays.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                        d.active
                          ? 'bg-fit-primary text-black font-black shadow-glow'
                          : d.isToday
                          ? 'border border-fit-primary text-fit-primary'
                          : 'bg-fit-surface2 text-fit-muted'
                      }`}
                    >
                      {d.active ? '✓' : d.label}
                    </div>
                    <span className="text-[9px] text-fit-muted">{d.dayName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WEIGHT JOURNEY & LOGGING */}
        {/* ========================================================================= */}
        <section className="card p-6 border-fit-border bg-fit-surface space-y-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-fit-border/60 pb-4">
            <div>
              <span className="section-eyebrow">Body Metric Progress</span>
              <h2 className="text-lg sm:text-xl font-black text-fit-text flex items-center gap-2 mt-0.5">
                <Scale size={20} className="text-fit-primary" />
                <span>Weight Progress History</span>
              </h2>
            </div>

            <button
              onClick={() => setShowWeightModal(true)}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto shadow-glow"
            >
              <Plus size={14} />
              <span>Log New Weight</span>
            </button>
          </div>

          {rawWeightHistory.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-fit-surface2/40 border border-dashed border-fit-border space-y-3">
              <Scale size={36} className="text-fit-muted mx-auto" />
              <h3 className="text-sm font-bold text-fit-text">No Weight History Yet</h3>
              <p className="text-xs text-fit-muted max-w-sm mx-auto">
                Log your first weight reading to start tracking your physical transformation journey over time.
              </p>
              <button
                onClick={() => setShowWeightModal(true)}
                className="btn-secondary text-xs py-2 px-4 mx-auto mt-2"
              >
                Log First Weight
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Visual Weight Trend Bar Chart */}
              <div className="p-4 rounded-2xl bg-fit-surface2/50 border border-fit-border">
                <p className="text-xs font-bold text-fit-muted uppercase mb-3">Recent Scale Readings (kg)</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {weightHistory.slice(-6).map((log, index) => {
                    const diff = index > 0 ? (log.weight - weightHistory.slice(-6)[index - 1].weight).toFixed(1) : null
                    return (
                      <div key={index} className="card p-3 bg-fit-surface border border-fit-border text-center space-y-1">
                        <span className="text-[11px] text-fit-muted font-semibold block">{formatFriendlyDate(log.date)}</span>
                        <p className="text-lg font-black text-fit-text font-mono">{log.weight} <span className="text-[10px] font-sans text-fit-muted">kg</span></p>
                        {diff !== null && (
                          <span className={`text-[10px] font-bold ${Number(diff) <= 0 ? 'text-fit-primary' : 'text-amber-400'}`}>
                            {Number(diff) > 0 ? `+${diff}` : diff} kg
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. QUICK MEAL & MACRO LOGGER */}
        {/* ========================================================================= */}
        <section className="card p-6 border-fit-border bg-fit-surface space-y-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-fit-border/60 pb-4">
            <div>
              <span className="section-eyebrow">Nutrition Fuel</span>
              <h2 className="text-lg sm:text-xl font-black text-fit-text flex items-center gap-2 mt-0.5">
                <Utensils size={20} className="text-fit-primary" />
                <span>Daily Meal &amp; Macro Tracker</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {meals.length > 0 && (
                <button
                  onClick={handleResetDay}
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1 hover:text-red-400"
                >
                  <RotateCcw size={12} />
                  <span>Reset Log</span>
                </button>
              )}
              <button
                onClick={() => setShowMealModal(true)}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-glow"
              >
                <Plus size={14} />
                <span>+ Custom Meal</span>
              </button>
            </div>
          </div>

          {/* 1-Click Quick Add Presets */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-fit-muted uppercase">1-Click Quick Add Presets</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { name: 'Whey Protein', calories: 120, protein: 25, carbs: 2, fat: 1 },
                { name: 'Grilled Chicken', calories: 165, protein: 31, carbs: 0, fat: 4 },
                { name: 'Paneer Bowl', calories: 265, protein: 18, carbs: 4, fat: 20 },
                { name: 'Rolled Oats & PB', calories: 280, protein: 14, carbs: 38, fat: 9 },
                { name: 'Greek Yogurt', calories: 100, protein: 15, carbs: 6, fat: 1 },
                { name: '3 Boiled Eggs', calories: 210, protein: 18, carbs: 1, fat: 15 },
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleAddPresetMeal(preset)}
                  className="card p-2.5 text-left bg-fit-surface2/60 hover:bg-fit-surface2 border-fit-border hover:border-fit-primary/40 transition-all group"
                >
                  <p className="text-xs font-bold text-fit-text group-hover:text-fit-primary transition-colors truncate">
                    + {preset.name}
                  </p>
                  <p className="text-[10px] text-fit-muted font-mono mt-0.5">
                    {preset.calories} kcal · <span className="text-fit-primary font-bold">{preset.protein}g P</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Today's Logged Meals */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-fit-muted uppercase">Today&apos;s Consumed Items ({meals.length})</p>
            {meals.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-fit-surface2/30 border border-fit-border text-xs text-fit-muted">
                No meals logged today yet. Click a quick preset above or tap <strong>+ Custom Meal</strong> to log your nutrition fuel.
              </div>
            ) : (
              <div className="divide-y divide-fit-border/60 border border-fit-border rounded-2xl overflow-hidden bg-fit-surface2/30">
                {meals.map((meal) => (
                  <div key={meal.id} className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-fit-surface2/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-fit-text truncate">{meal.name}</p>
                      <p className="text-[11px] text-fit-muted font-mono">
                        {meal.calories} kcal · <span className="text-fit-primary font-bold">{meal.protein}g Protein</span> {meal.carbs ? `· ${meal.carbs}g C` : ''} {meal.fat ? `· ${meal.fat}g F` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-fit-muted hidden sm:inline">{meal.time}</span>
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-fit-muted hover:text-red-400 p-1.5 transition-colors"
                        title="Remove meal"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. TODAY'S ACTIVITY & WORKOUT LOGS */}
        {/* ========================================================================= */}
        <section className="card p-6 border-fit-border bg-fit-surface space-y-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-fit-border/60 pb-4">
            <div>
              <span className="section-eyebrow">Workout Logs</span>
              <h2 className="text-lg sm:text-xl font-black text-fit-text flex items-center gap-2 mt-0.5">
                <Activity size={20} className="text-fit-primary" />
                <span>Today&apos;s Workout Activity</span>
              </h2>
            </div>

            <Link
              to="/workouts"
              className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Workouts Portal</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {todaysWorkouts.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-fit-surface2/40 border border-dashed border-fit-border space-y-3">
              <Dumbbell size={36} className="text-fit-muted mx-auto" />
              <h3 className="text-sm font-bold text-fit-text">No Workout Logged Today</h3>
              <p className="text-xs text-fit-muted max-w-sm mx-auto">
                Finish an exercise routine or start a custom routine in the Workouts section to record active minutes and calories burned.
              </p>
              <Link
                to="/workouts"
                className="btn-primary text-xs py-2 px-5 shadow-glow inline-flex items-center gap-1.5 mx-auto mt-2"
              >
                <span>Start Workout Routine</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysWorkouts.map((w, index) => (
                <div key={index} className="card p-4 bg-fit-surface2/50 border border-fit-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-fit-primary/10 border border-fit-primary/30 flex items-center justify-center text-fit-primary shrink-0">
                      <Dumbbell size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-fit-text truncate">{w.routineName || 'Custom Workout'}</h4>
                      <p className="text-[11px] text-fit-muted">
                        {w.durationMinutes || 30} mins · {w.caloriesBurned || Math.round((w.durationMinutes || 30) * 7.5)} kcal burned
                      </p>
                    </div>
                  </div>
                  <span className="badge-new text-[10px] px-2.5 py-0.5 shrink-0">COMPLETED</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 7. REAL ACTIVITY ACHIEVEMENTS */}
        {/* ========================================================================= */}
        <section className="card p-6 border-fit-border bg-fit-surface space-y-6 shadow-card">
          <div className="flex items-center justify-between border-b border-fit-border/60 pb-4">
            <div>
              <span className="section-eyebrow">Milestones</span>
              <h2 className="text-lg sm:text-xl font-black text-fit-text flex items-center gap-2 mt-0.5">
                <Trophy size={20} className="text-amber-400" />
                <span>Real Activity Achievements</span>
              </h2>
            </div>
            <span className="text-xs font-bold text-fit-primary bg-fit-primary/10 px-3 py-1 rounded-full border border-fit-primary/30">
              {unlockedCount} / {achievementsList.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {achievementsList.map((a) => (
              <div
                key={a.id}
                className={`card p-4 text-center space-y-2 transition-all ${
                  a.unlocked
                    ? 'border-fit-primary/40 bg-fit-primary/5 shadow-glow'
                    : 'border-fit-border bg-fit-surface2/30 opacity-60'
                }`}
              >
                <div className="text-2xl">{a.icon}</div>
                <div>
                  <h4 className="text-xs font-black text-fit-text">{a.label}</h4>
                  <p className="text-[10px] text-fit-muted mt-0.5 line-clamp-2">{a.desc}</p>
                </div>
                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  a.unlocked ? 'bg-fit-primary text-black font-extrabold' : 'bg-fit-surface2 text-fit-muted'
                }`}>
                  {a.progress}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* MODAL: RECALCULATE PLAN & EDIT BODY METRICS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card p-6 w-full max-w-lg bg-fit-surface border-fit-primary/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-fit-border pb-3">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-fit-primary" />
                  <h3 className="text-base font-black text-fit-text">Recalculate Custom Fitness Plan</h3>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-fit-muted hover:text-fit-text text-sm font-bold"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-fit-text block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    placeholder="Your name"
                    className="input-field py-2 text-xs"
                    required
                  />
                </div>

                {/* Primary Goal Selector */}
                <div>
                  <label className="text-xs font-bold text-fit-text block mb-1.5">Primary Fitness Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Weight Loss', 'Weight Gain', 'Fitness Maintenance'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, goal: g })}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          profileForm.goal === g
                            ? 'bg-fit-primary text-black border-fit-primary shadow-glow'
                            : 'bg-fit-surface2 text-fit-muted border-fit-border hover:border-fit-primary/40'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight Inputs */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Starting (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="30"
                      max="300"
                      value={profileForm.startingWeight}
                      onChange={(e) => setProfileForm({ ...profileForm, startingWeight: e.target.value })}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Current (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="30"
                      max="300"
                      value={profileForm.currentWeight}
                      onChange={(e) => setProfileForm({ ...profileForm, currentWeight: e.target.value })}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Target (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="30"
                      max="300"
                      value={profileForm.targetWeight}
                      onChange={(e) => setProfileForm({ ...profileForm, targetWeight: e.target.value })}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Age, Height & Gender */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Age (yrs)</label>
                    <input
                      type="number"
                      min="10"
                      max="120"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      min="80"
                      max="250"
                      value={profileForm.height}
                      onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Gender</label>
                    <select
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                      className="input-field py-2 text-xs"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="text-xs font-bold text-fit-text block mb-1.5">Activity Level</label>
                  <select
                    value={profileForm.activityLevel}
                    onChange={(e) => setProfileForm({ ...profileForm, activityLevel: e.target.value })}
                    className="input-field py-2 text-xs"
                  >
                    <option value="sedentary">Sedentary (Little or no exercise)</option>
                    <option value="light">Light (Exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                    <option value="heavy">Heavy (Hard exercise 6-7 days/week)</option>
                    <option value="athlete">Athlete (Physical job / 2x daily training)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-fit-border">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-5 shadow-glow">
                    Save &amp; Recalculate
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: LOG WEIGHT */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showWeightModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card p-6 w-full max-w-sm bg-fit-surface border-fit-primary/40 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-fit-border pb-3">
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-fit-primary" />
                  <h3 className="text-base font-black text-fit-text">Record Body Weight</h3>
                </div>
                <button
                  onClick={() => setShowWeightModal(false)}
                  className="text-fit-muted hover:text-fit-text"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleLogWeight} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-fit-text block mb-1">Today&apos;s Scale Reading (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="30"
                    max="300"
                    placeholder="e.g. 68.5"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="input-field text-base font-mono font-bold"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWeightModal(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-5 shadow-glow">
                    Save to MongoDB
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: CUSTOM MEAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showMealModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card p-6 w-full max-w-md bg-fit-surface border-fit-primary/40 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-fit-border pb-3">
                <div className="flex items-center gap-2">
                  <Utensils size={18} className="text-fit-primary" />
                  <h3 className="text-base font-black text-fit-text">Log Custom Food &amp; Macros</h3>
                </div>
                <button
                  onClick={() => setShowMealModal(false)}
                  className="text-fit-muted hover:text-fit-text"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddCustomMeal} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Food / Meal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chicken Biryani, Apple Juice..."
                    value={customMeal.name}
                    onChange={(e) => setCustomMeal({ ...customMeal, name: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Quantity</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 200"
                      value={customMeal.quantity}
                      onChange={(e) => setCustomMeal({ ...customMeal, quantity: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div className="w-[100px]">
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Unit / Type</label>
                    <input
                      type="text"
                      list="unit-options"
                      required
                      placeholder="e.g. ml, cup, scoop"
                      value={customMeal.unit}
                      onChange={(e) => setCustomMeal({ ...customMeal, unit: e.target.value })}
                      className="input-field text-xs"
                    />
                    <datalist id="unit-options">
                      <option value="g" />
                      <option value="ml" />
                      <option value="cup" />
                      <option value="glass" />
                      <option value="scoop" />
                      <option value="tbsp" />
                      <option value="pieces" />
                    </datalist>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEstimateMacros(true)}
                    disabled={isEstimating || !customMeal.name || !customMeal.quantity}
                    className="btn-outline h-[38px] px-3 flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 text-fit-primary border-fit-primary/40 hover:bg-fit-primary/10 transition-colors"
                  >
                    {isEstimating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    <span className="text-[11px] font-bold tracking-wide">Auto-Fill</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 350"
                      value={customMeal.calories}
                      onChange={(e) => setCustomMeal({ ...customMeal, calories: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Protein (g)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 28"
                      value={customMeal.protein}
                      onChange={(e) => setCustomMeal({ ...customMeal, protein: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Carbs (g) [Optional]</label>
                    <input
                      type="number"
                      placeholder="e.g. 40"
                      value={customMeal.carbs}
                      onChange={(e) => setCustomMeal({ ...customMeal, carbs: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Fats (g) [Optional]</label>
                    <input
                      type="number"
                      placeholder="e.g. 8"
                      value={customMeal.fat}
                      onChange={(e) => setCustomMeal({ ...customMeal, fat: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-fit-border">
                  <button
                    type="button"
                    onClick={() => setShowMealModal(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-5 shadow-glow">
                    Save Meal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  )
}
