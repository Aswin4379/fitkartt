import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  BarChart3,
  Dumbbell,
  Award,
  Flame,
  Zap,
  Play,
  CheckCircle,
  Check,
  Sparkles,
  Info,
  Calendar,
  Layers,
  History,
  TrendingUp,
  ChevronRight,
  RefreshCw,
  Target,
  ArrowRight,
  Sliders,
  Filter,
  Activity,
  HeartPulse
} from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import { workoutCategories, exerciseLibrary } from '../data/workouts.js'
import { workoutApi, exerciseApi } from '../services/api.js'
import ExerciseVideoPlayer from '../components/ExerciseVideoPlayer.jsx'
import { useUser } from '../context/UserContext.jsx'
import { getLocalDateString } from '../utils/metabolicEngine.js'

export default function Workouts() {
  const navigate = useNavigate()
  const { user, updateUser, refreshUser } = useUser()

  // Dynamic Exercises & Routines from MongoDB
  const [exercises, setExercises] = useState(exerciseLibrary)
  const [routines, setRoutines] = useState(workoutCategories)

  // Navigation tabs: 'hub' (Today + Curated + AI), 'library' (124 Exercises), 'history' (Analytics)
  const [activeSubTab, setActiveSubTab] = useState('hub')

  // Selected muscle group for library filtering
  const [selectedMuscle, setSelectedMuscle] = useState('All')

  // Curated routines plan filter
  const [curatedFilter, setCuratedFilter] = useState('All')

  // User Stats & Logs loaded from MongoDB profile / local cache
  const [stats, setStats] = useState({
    completed: 0,
    time: 0,
    calories: 0,
    streak: 0,
    lastWorkoutDate: ''
  })

  const [workoutLogs, setWorkoutLogs] = useState([])
  const [personalRecords, setPersonalRecords] = useState({})
  const [achievements, setAchievements] = useState([])
  const [selectedExerciseInfo, setSelectedExerciseInfo] = useState(null)
  const [logToast, setLogToast] = useState(null)

  // Today's recommended split state (allows switching)
  const [selectedTodaySplitIndex, setSelectedTodaySplitIndex] = useState(null)

  // AI Workout generator state variables
  const [genGoal, setGenGoal] = useState('Muscle Building')
  const [genLevel, setGenLevel] = useState('Intermediate')
  const [genEquipment, setGenEquipment] = useState('Dumbbells')
  const [genDuration, setGenDuration] = useState('30-45 min')
  const [customWorkoutReady, setCustomWorkoutReady] = useState(null)

  // Sync data whenever user profile loads or changes from MongoDB
  useEffect(() => {
    if (user?.fitnessStats) {
      const fs = user.fitnessStats
      if (fs.workoutStats) {
        setStats({
          completed: fs.workoutStats.completed || 0,
          time: fs.workoutStats.time || 0,
          calories: fs.workoutStats.calories || 0,
          streak: fs.workoutStats.streak || fs.streak?.current || 0,
          lastWorkoutDate: fs.workoutStats.lastWorkoutDate || ''
        })
      }
      if (Array.isArray(fs.workoutLogs)) {
        setWorkoutLogs(fs.workoutLogs)
      } else {
        setWorkoutLogs([])
      }
      if (fs.workoutPRs && typeof fs.workoutPRs === 'object') {
        setPersonalRecords(fs.workoutPRs)
      } else {
        setPersonalRecords({})
      }
      if (Array.isArray(fs.workoutAchievements || fs.achievements)) {
        setAchievements(fs.workoutAchievements || fs.achievements)
      } else {
        setAchievements([])
      }
      return
    }

    setWorkoutLogs([])
    setStats({ completed: 0, time: 0, calories: 0, streak: 0, lastWorkoutDate: '' })
    setPersonalRecords({})
    setAchievements([])
  }, [user])

  // Re-fetch fresh user profile & exercises/routines on mount from MongoDB
  useEffect(() => {
    let isMounted = true
    if (refreshUser) refreshUser()

    exerciseApi.getExercises()
      .then((res) => {
        if (isMounted && res?.exercises && res.exercises.length > 0) {
          setExercises(res.exercises)
        }
      })
      .catch(() => {})

    workoutApi.getWorkouts()
      .then((res) => {
        if (isMounted && Array.isArray(res) && res.length > 0) {
          setRoutines(res)
        }
      })
      .catch(() => {})

    return () => { isMounted = false }
  }, [])

  // =========================================================================
  // 1. PERSONALIZED TODAY'S WORKOUT ENGINE
  // =========================================================================
  const todayWorkoutSplits = useMemo(() => [
    {
      dayName: 'Sunday',
      focus: 'Active Recovery & Core Shred',
      planId: 'core-sculpt',
      tags: ['Mobility', 'Abs & Core', 'Recovery'],
      duration: '20-25 min',
      caloriesEst: 190,
      description: 'Low-impact core conditioning and posture stability to prepare for the week.',
      color: '#00F0FF'
    },
    {
      dayName: 'Monday',
      focus: 'Chest, Shoulders & Triceps (Push Day)',
      planId: 'push-power',
      tags: ['Chest', 'Delts', 'Triceps'],
      duration: '40-45 min',
      caloriesEst: 330,
      description: 'High-volume push hypertrophy targeting upper, mid and lower pectorals.',
      color: '#39FF6A'
    },
    {
      dayName: 'Tuesday',
      focus: 'Back, Biceps & Forearms (Pull Day)',
      planId: 'pull-power',
      tags: ['Lats', 'Biceps', 'Grip'],
      duration: '40-45 min',
      caloriesEst: 340,
      description: 'V-taper lat width, heavy rows and arm builder for back density.',
      color: '#B6FF3C'
    },
    {
      dayName: 'Wednesday',
      focus: 'Home Bodyweight & Core Shred',
      planId: 'home-shred',
      tags: ['HIIT', 'Core', 'Cardio Burn'],
      duration: '20-25 min',
      caloriesEst: 220,
      description: 'Explosive bodyweight circuit to elevate metabolic burn and shred the core.',
      color: '#FF7A00'
    },
    {
      dayName: 'Thursday',
      focus: 'Upper Body Compound Power',
      planId: 'upper-compound',
      tags: ['Compound', 'Strength', 'Upper'],
      duration: '45-50 min',
      caloriesEst: 380,
      description: 'Heavy multi-joint bench, overhead press and heavy pulling power.',
      color: '#B6FF3C'
    },
    {
      dayName: 'Friday',
      focus: 'Arm Hypertrophy & Peak Pump',
      planId: 'arm-pump',
      tags: ['Biceps', 'Triceps', 'Super-Pump'],
      duration: '30-35 min',
      caloriesEst: 270,
      description: 'Maximum blood-flow supersets for full bicep peaks and tricep horseshoe sweep.',
      color: '#39FF6A'
    },
    {
      dayName: 'Saturday',
      focus: 'Full Body Kickstart & Power',
      planId: 'beginner-kickstart',
      tags: ['Full Body', 'Legs', 'Compound'],
      duration: '25-30 min',
      caloriesEst: 260,
      description: 'Complete full body athletic conditioning to end the week strong.',
      color: '#39FF6A'
    }
  ], [])

  const currentDayIndex = new Date().getDay()
  const activeTodaySplit = todayWorkoutSplits[selectedTodaySplitIndex ?? currentDayIndex]
  const todayCuratedPlan = routines.find((w) => w.id === activeTodaySplit.planId) || routines[0]

  // Extract preview exercises for Today's Workout
  const todayExercisePreviews = useMemo(() => {
    if (!todayCuratedPlan?.exercises) return []
    return todayCuratedPlan.exercises
      .map((idOrName) => {
        const exObj = typeof idOrName === 'object' && idOrName !== null ? idOrName : null
        if (exObj && exObj.name) return exObj
        const searchKey = typeof idOrName === 'string' ? idOrName : (idOrName?.id || idOrName?.name)
        return exercises.find((e) => e.id === searchKey || e.name.toLowerCase() === (searchKey || '').toLowerCase())
      })
      .filter(Boolean)
      .slice(0, 4)
  }, [todayCuratedPlan, exercises])

  // =========================================================================
  // 2. AI WORKOUT GENERATOR
  // =========================================================================
  const generateCustomWorkout = () => {
    let filtered = exercises.filter((ex) => {
      const equipMatch =
        genEquipment === 'All' ||
        ex.equipment.toLowerCase().includes(genEquipment.toLowerCase()) ||
        ex.equipment.toLowerCase() === 'bodyweight' ||
        genEquipment.toLowerCase().includes(ex.equipment.toLowerCase())
      const levelMatch =
        genLevel === 'All' ||
        ex.level.toLowerCase() === genLevel.toLowerCase() ||
        ex.level.toLowerCase() === 'beginner'
      return equipMatch && levelMatch
    })

    if (filtered.length === 0) {
      filtered = exercises.slice(0, 4)
    }

    let count = 4
    if (genDuration.includes('15-20')) count = 3
    else if (genDuration.includes('30-45')) count = 5
    else if (genDuration.includes('45-60')) count = 6

    const exercisesSub = filtered.slice(0, count)

    const customPlan = {
      id: 'custom-gen',
      name: `Custom ${genGoal} (${genLevel})`,
      level: genLevel,
      duration: genDuration,
      color: '#B6FF3C',
      exercises: exercisesSub.map((e) => e.id)
    }

    setCustomWorkoutReady(customPlan)
  }

  const startCustomWorkout = () => {
    if (customWorkoutReady) {
      sessionStorage.setItem('fitkart_custom_workout', JSON.stringify(customWorkoutReady))
      navigate('/workouts/custom-gen')
    }
  }

  // =========================================================================
  // 3. 10 CATEGORIES FILTERING LOGIC
  // =========================================================================
  const workoutCategoriesList = [
    'All',
    'Chest',
    'Back',
    'Biceps',
    'Triceps',
    'Abs & Core',
    'Shoulders',
    'Forearms',
    'Warm-ups',
    'Push-ups',
    'Pull-ups'
  ]

  const isCategoryMatch = (ex, cat) => {
    if (!cat || cat === 'All') return true
    const catLower = cat.toLowerCase().trim()
    const targetLower = (ex.target || '').toLowerCase().trim()

    // Direct target match
    if (targetLower === catLower) return true
    if (catLower === 'abs & core' && (targetLower.includes('core') || targetLower.includes('abs'))) return true

    // Tag array match
    if (Array.isArray(ex.categories) && ex.categories.some((c) => c.toLowerCase().trim() === catLower)) return true

    // Name keyword fallbacks
    const nameLower = (ex.name || '').toLowerCase()
    if (catLower === 'push-ups' && nameLower.includes('push-up')) return true
    if (catLower === 'pull-ups' && (nameLower.includes('pull-up') || nameLower.includes('chin-up'))) return true
    if (catLower === 'warm-ups' && (nameLower.includes('warm-up') || nameLower.includes('stretch') || nameLower.includes('jack') || nameLower.includes('circle'))) return true
    if (catLower === 'abs & core' && (nameLower.includes('crunch') || nameLower.includes('plank') || nameLower.includes('twist') || nameLower.includes('raise') || nameLower.includes('ab'))) return true
    if (catLower === 'forearms' && (nameLower.includes('wrist') || nameLower.includes('grip') || nameLower.includes('farmer') || nameLower.includes('pinch') || nameLower.includes('hang'))) return true

    return false
  }

  // Filter curated workout plans
  const filteredCuratedPlans = useMemo(() => {
    if (curatedFilter === 'All') return routines
    if (curatedFilter === 'Push & Pull') return routines.filter((w) => w.id.includes('push') || w.id.includes('pull') || w.id.includes('chest') || w.id.includes('back'))
    if (curatedFilter === 'Arms & Upper') return routines.filter((w) => w.id.includes('arm') || w.id.includes('upper') || w.id.includes('gym'))
    if (curatedFilter === 'Core & Home') return routines.filter((w) => w.id.includes('home') || w.id.includes('core') || w.id.includes('shred'))
    if (curatedFilter === 'Beginner') return routines.filter((w) => w.level === 'Beginner' || w.id.includes('beginner'))
    return routines
  }, [routines, curatedFilter])

  // =========================================================================
  // 4. ACTION HANDLERS (START & COMPLETE WITH MONGODB SYNC)
  // =========================================================================
  const handleStartExerciseSession = (ex) => {
    if (!ex) return
    const singlePlan = {
      id: 'custom-gen',
      name: ex.name,
      level: ex.level || 'Intermediate',
      duration: '15-20 min',
      color: '#B6FF3C',
      exercises: [ex.id]
    }
    sessionStorage.setItem('fitkart_custom_workout', JSON.stringify(singlePlan))
    setSelectedExerciseInfo(null)
    navigate('/workouts/custom-gen')
  }

  const todayDateKey = getLocalDateString(new Date())

  // Filter workout logs strictly for today's calendar date
  const todaysWorkoutLogs = useMemo(() => {
    return workoutLogs.filter((l) => {
      if (!l) return false
      const logDate = getLocalDateString(l.date || l.completedAt)
      return Boolean(logDate) && logDate === todayDateKey
    })
  }, [workoutLogs, todayDateKey])

  // Real-time daily live stats (resets to 0 on next calendar date)
  const todayLiveStats = useMemo(() => {
    const time = todaysWorkoutLogs.reduce((sum, l) => sum + (Number(l.duration || l.durationMinutes) || 0), 0)
    const calories = todaysWorkoutLogs.reduce((sum, l) => sum + (Number(l.calories || l.caloriesBurned) || 0), 0)
    const done = todaysWorkoutLogs.length
    return { time, calories, done }
  }, [todaysWorkoutLogs])

  const handleCompleteExercise = async (ex) => {
    if (!ex) return
    const completedMinutes = 5
    const caloriesBurned = 35

    // 1. DUPLICATE PREVENTION: Prevent double logging within 15 seconds
    const isDuplicate = workoutLogs.some(
      (l) => l.workoutName === ex.name && l.date === todayDateKey && (Date.now() - new Date(l.completedAt || l.date).getTime() < 15000)
    )
    if (isDuplicate) {
      setLogToast(`"${ex.name}" already logged just now!`)
      setTimeout(() => setLogToast(null), 2500)
      return
    }

    // 2. Calculate streak
    let updatedStreak = stats.streak || 0
    if (stats.lastWorkoutDate) {
      const lastDate = new Date(stats.lastWorkoutDate)
      const diffTime = Math.abs(new Date().setHours(0,0,0,0) - lastDate.setHours(0,0,0,0))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays === 1) updatedStreak += 1
      else if (diffDays > 1) updatedStreak = 1
    } else {
      updatedStreak = 1
    }

    const nextStats = {
      completed: (stats.completed || 0) + 1,
      time: (stats.time || 0) + completedMinutes,
      calories: (stats.calories || 0) + caloriesBurned,
      streak: updatedStreak,
      lastWorkoutDate: todayDateKey
    }
    setStats(nextStats)
    try { localStorage.setItem('fitkart_workout_stats', JSON.stringify(nextStats)) } catch {}

    // 3. Add unique log entry
    const uniqueLogId = `wlog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const newLog = {
      id: uniqueLogId,
      date: todayDateKey,
      workoutName: ex.name,
      routineName: ex.name,
      duration: completedMinutes,
      durationMinutes: completedMinutes,
      calories: caloriesBurned,
      caloriesBurned: caloriesBurned,
      exercisesCount: 1,
      exerciseNames: [ex.name],
      completedAt: new Date().toISOString()
    }
    const updatedLogs = [newLog, ...workoutLogs.filter(l => l.id !== uniqueLogId)]
    setWorkoutLogs(updatedLogs)
    try { localStorage.setItem('fitkart_workout_logs', JSON.stringify(updatedLogs)) } catch {}

    // 4. Check PR & Achievements
    let updatedAchievements = [...achievements]
    if (!updatedAchievements.includes('first_step')) updatedAchievements.push('first_step')
    if (updatedStreak >= 3 && !updatedAchievements.includes('streak_3')) updatedAchievements.push('streak_3')
    setAchievements(updatedAchievements)
    try { localStorage.setItem('fitkart_achievements', JSON.stringify(updatedAchievements)) } catch {}

    // 5. Update activity stats for Tracker (strictly date-isolated)
    const currentActivity = user?.fitnessStats?.activity || {}
    const isToday = currentActivity.lastUpdatedDate === todayDateKey
    const updatedActivity = {
      todayMinutes: (isToday ? (Number(currentActivity.todayMinutes) || 0) : 0) + completedMinutes,
      todayCaloriesBurned: (isToday ? (Number(currentActivity.todayCaloriesBurned) || 0) : 0) + caloriesBurned,
      workoutsCompletedToday: (isToday ? (Number(currentActivity.workoutsCompletedToday) || 0) : 0) + 1,
      lastUpdatedDate: todayDateKey
    }

    // 6. Persist to MongoDB via updateUser
    if (updateUser) {
      try {
        await updateUser({
          fitnessStats: {
            workoutStats: nextStats,
            workoutLogs: updatedLogs,
            workoutAchievements: updatedAchievements,
            achievements: updatedAchievements,
            activity: updatedActivity,
            streak: {
              current: updatedStreak,
              best: Math.max(updatedStreak, user?.fitnessStats?.streak?.best || 0),
              lastActiveDate: todayDateKey
            }
          }
        })
      } catch (err) {
        console.warn('[Sync to MongoDB]:', err.message)
      }
    }

    setSelectedExerciseInfo(null)
    setLogToast(`Logged "${ex.name}" to your Activity & Tracker!`)
    setTimeout(() => setLogToast(null), 3500)
  }

  // =========================================================================
  // 5. ANALYTICS & MUSCLE GROUP METRICS
  // =========================================================================
  // Weekly Last 7 Days Activity Breakdown
  const weeklyActivityData = useMemo(() => {
    const days = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateKey = getLocalDateString(d)
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' })
      const fullDay = d.toLocaleDateString('en-US', { weekday: 'short' })
      
      const dayLogs = workoutLogs.filter((l) => {
        if (!l) return false
        const logDate = getLocalDateString(l.date || l.completedAt)
        return Boolean(logDate) && logDate === dateKey
      })

      const dayMinutes = dayLogs.reduce((acc, l) => acc + (Number(l.duration || l.durationMinutes) || 0), 0)
      const dayCalories = dayLogs.reduce((acc, l) => acc + (Number(l.calories || l.caloriesBurned) || 0), 0)

      days.push({
        dayLabel,
        fullDay,
        dateKey,
        isToday: i === 0,
        minutes: dayMinutes,
        calories: dayCalories,
        count: dayLogs.length
      })
    }
    return days
  }, [workoutLogs])

  const maxWeeklyMinutes = Math.max(...weeklyActivityData.map((d) => d.minutes), 45)

  // Muscle Group Focus Distribution Breakdown
  const muscleDistribution = useMemo(() => {
    const muscleCounts = {
      Chest: 0,
      Back: 0,
      Arms: 0,
      'Abs & Core': 0,
      Shoulders: 0,
      Legs: 0
    }

    workoutLogs.forEach((log) => {
      const names = Array.isArray(log.exerciseNames) ? log.exerciseNames : [log.workoutName]
      names.forEach((name) => {
        const found = exercises.find((e) => e.name.toLowerCase() === (name || '').toLowerCase())
        if (found) {
          const t = found.target
          if (t === 'Chest' || t === 'Push-ups') muscleCounts.Chest += 1
          else if (t === 'Back' || t === 'Pull-ups') muscleCounts.Back += 1
          else if (t === 'Biceps' || t === 'Triceps' || t === 'Forearms') muscleCounts.Arms += 1
          else if (t === 'Abs & Core') muscleCounts['Abs & Core'] += 1
          else if (t === 'Shoulders') muscleCounts.Shoulders += 1
          else if (t === 'Legs' || t === 'Warm-ups') muscleCounts.Legs += 1
        } else {
          // Heuristic
          const n = (name || '').toLowerCase()
          if (n.includes('chest') || n.includes('push')) muscleCounts.Chest += 1
          else if (n.includes('back') || n.includes('pull') || n.includes('deadlift')) muscleCounts.Back += 1
          else if (n.includes('bicep') || n.includes('tricep') || n.includes('arm')) muscleCounts.Arms += 1
          else if (n.includes('abs') || n.includes('core') || n.includes('plank')) muscleCounts['Abs & Core'] += 1
          else if (n.includes('shoulder')) muscleCounts.Shoulders += 1
          else muscleCounts.Legs += 1
        }
      })
    })

    const total = Object.values(muscleCounts).reduce((a, b) => a + b, 0) || 1
    return Object.entries(muscleCounts).map(([muscle, count]) => ({
      muscle,
      count,
      percentage: Math.round((count / total) * 100)
    }))
  }, [workoutLogs])

  const achievementDefinitions = [
    { id: 'first_step', title: 'First Steps', description: 'Log your first workout session', icon: Award, color: '#39FF6A' },
    { id: 'streak_3', title: 'Consistent', description: 'Hit a 3-day workout streak', icon: Flame, color: '#FF7A00' },
    { id: 'heavy_lifter', title: 'Iron Warrior', description: 'Record a Personal Record above 40kg', icon: Sparkles, color: '#B6FF3C' }
  ]

  return (
    <AppLayout>
      {/* Top Header Section */}
      <div className="page-pad pt-6 pb-4 bg-gradient-to-b from-fit-surface to-fit-bg border-b border-fit-border/40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-fit-text">Workouts Portal</h1>
            <p className="text-xs text-fit-muted">Personalized training routines & activity tracking</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-fit-primary/10 border border-fit-primary/30 flex items-center justify-center text-fit-primary shadow-glow">
            <Dumbbell size={20} />
          </div>
        </div>

        {/* Global Tracker Live Metrics (Strict Today Calendar Filtered + Active Streak) */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="card p-2.5 flex flex-col items-center justify-center text-center bg-fit-surface2/70 border border-fit-border/60">
            <Flame size={16} className="text-orange-500 mb-1" />
            <span className="text-base font-extrabold text-fit-text">{user?.fitnessStats?.streak?.current || stats.streak || 0}</span>
            <span className="text-[9px] text-fit-muted uppercase font-bold">Streak</span>
          </div>
          <div className="card p-2.5 flex flex-col items-center justify-center text-center bg-fit-surface2/70 border border-fit-border/60">
            <Clock size={16} className="text-fit-primary mb-1" />
            <span className="text-base font-extrabold text-fit-text">{todayLiveStats.time}m</span>
            <span className="text-[9px] text-fit-muted uppercase font-bold">Today Mins</span>
          </div>
          <div className="card p-2.5 flex flex-col items-center justify-center text-center bg-fit-surface2/70 border border-fit-border/60">
            <Sparkles size={16} className="text-fit-accent mb-1" />
            <span className="text-base font-extrabold text-fit-text">{todayLiveStats.calories}</span>
            <span className="text-[9px] text-fit-muted uppercase font-bold">Today Kcal</span>
          </div>
          <div className="card p-2.5 flex flex-col items-center justify-center text-center bg-fit-surface2/70 border border-fit-border/60">
            <CheckCircle size={16} className="text-blue-400 mb-1" />
            <span className="text-base font-extrabold text-fit-text">{todayLiveStats.done}</span>
            <span className="text-[9px] text-fit-muted uppercase font-bold">Today Done</span>
          </div>
        </div>
      </div>

      {/* Main Tab Controller Bar */}
      <div className="flex border-b border-fit-border bg-fit-surface/50 sticky top-0 z-20 backdrop-blur-md">
        <button
          onClick={() => setActiveSubTab('hub')}
          className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeSubTab === 'hub' ? 'border-fit-primary text-fit-primary font-bold' : 'border-transparent text-fit-muted hover:text-fit-text'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Zap size={14} /> Routines & Plans
          </div>
        </button>
        <button
          onClick={() => setActiveSubTab('library')}
          className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeSubTab === 'library' ? 'border-fit-primary text-fit-primary font-bold' : 'border-transparent text-fit-muted hover:text-fit-text'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Dumbbell size={14} /> Exercise Library
          </div>
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeSubTab === 'history' ? 'border-fit-primary text-fit-primary font-bold' : 'border-transparent text-fit-muted hover:text-fit-text'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <BarChart3 size={14} /> Analytics & Logs
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB SUB VIEW: HUB (TODAY'S WORKOUT + CURATED PLANS + AI BUILDER) */}
      {/* ========================================================================= */}
      {activeSubTab === 'hub' && (
        <div className="page-pad py-5 space-y-6">
          {/* 1. HERO CARD: PERSONALIZED TODAY'S WORKOUT */}
          <div className="relative overflow-hidden rounded-3xl border border-fit-primary/50 bg-gradient-to-br from-fit-surface via-fit-surface2 to-fit-bg p-5 sm:p-6 shadow-glow">
            <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
              <Zap size={120} className="text-fit-primary" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-full bg-fit-primary/15 border border-fit-primary/40 text-fit-primary shadow-sm">
                  <Flame size={12} className="animate-pulse" /> {activeTodaySplit.dayName} Focus
                </span>

                {/* Switch Split Dropdown / Quick Cycler */}
                <div className="flex items-center gap-1.5">
                  <select
                    value={selectedTodaySplitIndex ?? currentDayIndex}
                    onChange={(e) => setSelectedTodaySplitIndex(Number(e.target.value))}
                    className="bg-fit-surface2 text-fit-text text-[10px] font-bold px-2 py-1 rounded-lg border border-fit-border outline-none cursor-pointer"
                  >
                    {todayWorkoutSplits.map((split, sIdx) => (
                      <option key={sIdx} value={sIdx}>
                        {split.dayName}: {split.focus.split('(')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-fit-text tracking-tight mb-1.5">
                {activeTodaySplit.focus}
              </h2>
              <p className="text-xs text-fit-muted leading-relaxed mb-4 max-w-md">
                {activeTodaySplit.description}
              </p>

              {/* Workout Quick Specs */}
              <div className="flex items-center gap-3 text-xs font-bold text-fit-muted mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-fit-surface2 px-2.5 py-1 rounded-lg border border-fit-border/60 text-fit-text">
                  <Clock size={12} className="text-fit-primary" /> {activeTodaySplit.duration}
                </span>
                <span className="inline-flex items-center gap-1 bg-fit-surface2 px-2.5 py-1 rounded-lg border border-fit-border/60 text-fit-accent">
                  <Sparkles size={12} /> ~{activeTodaySplit.caloriesEst} kcal
                </span>
                <span className="inline-flex items-center gap-1 bg-fit-surface2 px-2.5 py-1 rounded-lg border border-fit-border/60 text-fit-text">
                  <Layers size={12} className="text-blue-400" /> {todayCuratedPlan.exercises?.length || 5} Movements
                </span>
              </div>

              {/* Exercises Preview Strip */}
              {todayExercisePreviews.length > 0 && (
                <div className="mb-5">
                  <span className="text-[10px] uppercase font-bold text-fit-muted block mb-2">Exercise Routine Preview</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {todayExercisePreviews.map((ex) => (
                      <div
                        key={ex.id}
                        onClick={() => setSelectedExerciseInfo(ex)}
                        className="p-2 rounded-xl bg-fit-surface2/60 border border-fit-border/60 flex items-center gap-2 cursor-pointer hover:border-fit-primary/40 transition-colors"
                      >
                        <img
                          src={ex.imageUrl}
                          alt={ex.name}
                          className="w-8 h-8 rounded-lg object-cover bg-fit-surface shrink-0"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        <span className="text-[11px] font-bold text-fit-text truncate">{ex.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Workout Primary CTA */}
              <button
                onClick={() => navigate(`/workouts/${activeTodaySplit.planId}`)}
                className="w-full sm:w-auto bg-fit-primary text-fit-bg font-black px-6 py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-glow hover:bg-fit-primary-dark active:scale-[0.99] transition-all"
              >
                <Play size={16} fill="currentColor" /> Start Today's Workout
              </button>
            </div>
          </div>

          {/* 2. CURATED WORKOUT PLANS SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-fit-text flex items-center gap-2">
                  <Layers size={16} className="text-fit-primary" /> Curated Workout Plans
                </h3>
                <p className="text-[11px] text-fit-muted">Targeted muscle-group splits and specialized programs</p>
              </div>
            </div>

            {/* Filter Chips for Plans */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {['All', 'Push & Pull', 'Arms & Upper', 'Core & Home', 'Beginner'].map((filterTag) => (
                <button
                  key={filterTag}
                  onClick={() => setCuratedFilter(filterTag)}
                  className={`chip py-1.5 px-3.5 text-xs font-bold whitespace-nowrap transition-all ${
                    curatedFilter === filterTag ? 'chip-active shadow-glow' : 'hover:border-fit-primary/40'
                  }`}
                >
                  {filterTag}
                </button>
              ))}
            </div>

            {/* Curated Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCuratedPlans.map((w) => (
                <div
                  key={w.id}
                  onClick={() => navigate(`/workouts/${w.id}`)}
                  className="group relative overflow-hidden rounded-2xl border border-fit-border bg-fit-surface cursor-pointer hover:border-fit-primary/60 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Background cover image with gradient */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={w.coverImage}
                      alt=""
                      className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500 filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fit-surface via-fit-surface/85 to-fit-surface/50" />
                  </div>

                  <div className="relative z-10 p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="inline-block text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-fit-surface2 border border-fit-border text-fit-text"
                        style={{ borderColor: `${w.color}40` }}
                      >
                        {w.level}
                      </span>
                      {w.caloriesEst && (
                        <span className="text-[10px] font-bold text-fit-accent bg-fit-surface2/60 px-2 py-0.5 rounded border border-fit-border/40">
                          ~{w.caloriesEst} kcal
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-base text-fit-text tracking-tight group-hover:text-fit-primary transition-colors">
                      {w.name}
                    </h4>

                    <div className="flex items-center gap-3 mt-2 text-xs text-fit-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-fit-primary" /> {w.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers size={12} className="text-fit-accent" /> {w.exercises?.length || 4} Exercises
                      </span>
                    </div>

                    {Array.isArray(w.tags) && (
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        {w.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] font-semibold text-fit-muted bg-fit-surface2/80 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 px-5 py-3 bg-fit-surface2/50 border-t border-fit-border/40 flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-fit-muted group-hover:text-fit-text transition-colors">
                      Start routine session
                    </span>
                    <span className="text-fit-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Begin <Play size={10} fill="currentColor" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. AI WORKOUT BUILDER PANEL */}
          <div className="card p-5 border border-fit-primary/30 bg-fit-surface/80 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-fit-primary animate-pulse" />
              <h3 className="text-sm font-bold text-fit-text tracking-wide uppercase">AI Custom Workout Builder</h3>
            </div>
            <p className="text-[11px] text-fit-muted mb-4">Dynamically assemble a custom tailored workout tailored to your equipment and available time.</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Target Goal</label>
                <select
                  value={genGoal}
                  onChange={(e) => setGenGoal(e.target.value)}
                  className="w-full bg-fit-surface2 border border-fit-border rounded-xl px-2 py-1.5 text-xs text-fit-text outline-none"
                >
                  <option>Muscle Building</option>
                  <option>Cardio Burn</option>
                  <option>Strength Focus</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Fitness Level</label>
                <select
                  value={genLevel}
                  onChange={(e) => setGenLevel(e.target.value)}
                  className="w-full bg-fit-surface2 border border-fit-border rounded-xl px-2 py-1.5 text-xs text-fit-text outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Equipment</label>
                <select
                  value={genEquipment}
                  onChange={(e) => setGenEquipment(e.target.value)}
                  className="w-full bg-fit-surface2 border border-fit-border rounded-xl px-2 py-1.5 text-xs text-fit-text outline-none"
                >
                  <option>Dumbbells</option>
                  <option>Barbell</option>
                  <option>Bodyweight</option>
                  <option>All</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-fit-muted block mb-1">Duration</label>
                <select
                  value={genDuration}
                  onChange={(e) => setGenDuration(e.target.value)}
                  className="w-full bg-fit-surface2 border border-fit-border rounded-xl px-2 py-1.5 text-xs text-fit-text outline-none"
                >
                  <option>15-20 min</option>
                  <option>30-45 min</option>
                  <option>45-60 min</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateCustomWorkout}
              className="w-full bg-fit-primary text-fit-bg font-bold py-2.5 rounded-xl text-xs shadow-glow hover:bg-fit-primary-dark transition-all"
            >
              Construct Custom Plan
            </button>

            {customWorkoutReady && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-fit-accent/40 bg-fit-accent/5 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-fit-text">{customWorkoutReady.name}</h4>
                  <span className="text-[10px] text-fit-muted">{customWorkoutReady.exercises.length} customized exercises</span>
                </div>
                <button
                  onClick={startCustomWorkout}
                  className="bg-fit-accent text-fit-bg font-black px-4 py-1.5 rounded-xl text-xs hover:bg-fit-accent/90"
                >
                  Start Now
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB SUB VIEW: LIBRARY (124 EXERCISES ACROSS 10 CATEGORIES) */}
      {/* ========================================================================= */}
      {activeSubTab === 'library' && (
        <div className="page-pad py-5 space-y-5">
          {/* Horizontal Category Filters for exact 10 categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {workoutCategoriesList.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`chip py-1.5 px-4 text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedMuscle === m ? 'chip-active shadow-glow' : 'hover:border-fit-primary/40'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-fit-muted px-1">
            <span>
              Showing <strong className="text-fit-primary font-extrabold">{exercises.filter((ex) => isCategoryMatch(ex, selectedMuscle)).length}</strong> exercises for <strong className="text-fit-text font-bold">{selectedMuscle}</strong>
            </span>
          </div>

          {/* Clean Visual Exercise Cards (Hiding sets/reps as requested) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exercises
              .filter((ex) => isCategoryMatch(ex, selectedMuscle))
              .map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExerciseInfo(ex)}
                  className="card p-3 sm:p-3.5 border border-fit-border hover:border-fit-primary/60 cursor-pointer bg-fit-surface/60 hover:bg-fit-surface/95 transition-all duration-200 rounded-2xl shadow-sm flex items-center gap-3.5 group relative overflow-hidden"
                >
                  {/* High Quality Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-fit-border/70 bg-fit-surface2 flex items-center justify-center relative shrink-0 shadow-inner">
                    <img
                      src={ex.imageUrl}
                      alt={ex.name}
                      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <Dumbbell size={22} className="text-fit-muted/40" />
                  </div>

                  {/* Clean Card Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="chip text-[9px] px-2 py-0.5 font-extrabold border-fit-primary/40 bg-fit-primary/10 text-fit-primary rounded-md uppercase">
                        {ex.target}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 font-extrabold rounded-md uppercase border ${
                        ex.level === 'Beginner' ? 'border-green-500/40 bg-green-500/10 text-green-400' :
                        ex.level === 'Intermediate' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                        'border-red-500/40 bg-red-500/10 text-red-400'
                      }`}>
                        {ex.level}
                      </span>
                      <span className="text-[9px] font-semibold text-fit-muted bg-fit-surface2/80 px-1.5 py-0.5 rounded border border-fit-border/40">
                        {ex.equipment}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-fit-text leading-snug group-hover:text-fit-primary transition-colors line-clamp-1">
                      {ex.name}
                    </h4>

                    <p className="text-[11px] text-fit-muted flex items-center gap-1 mt-1 group-hover:text-fit-primary/90 transition-colors">
                      <span className="font-semibold">Tap for Movement Guide & Form</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB SUB VIEW: ANALYTICS (TODAY'S SESSIONS, WEEKLY BREAKDOWN, MUSCLE PROGRESS & LOGS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'history' && (
        <div className="page-pad py-5 space-y-6">
          {/* 1. TODAY'S WORKOUT SESSIONS (STRICT DAILY ISOLATION) */}
          <div className="card p-5 border border-fit-primary/40 bg-gradient-to-br from-fit-surface to-fit-surface2 shadow-glow">
            <div className="flex items-center justify-between border-b border-fit-border/60 pb-3 mb-3">
              <div>
                <h3 className="text-sm font-extrabold uppercase text-fit-text tracking-wider flex items-center gap-2">
                  <Flame size={16} className="text-fit-primary" /> Today's Workout Sessions
                </h3>
                <p className="text-[11px] text-fit-muted">
                  Strictly tracking workouts completed on <strong className="text-fit-text">{todayDateKey}</strong> (resets to 0 tomorrow)
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-fit-primary bg-fit-primary/10 px-2.5 py-1 rounded-lg border border-fit-primary/20">
                {todaysWorkoutLogs.length} session{todaysWorkoutLogs.length !== 1 ? 's' : ''} today
              </span>
            </div>

            {todaysWorkoutLogs.length === 0 ? (
              <div className="py-6 text-center text-xs text-fit-muted space-y-1">
                <Dumbbell size={28} className="mx-auto text-fit-muted/40 mb-2" />
                <p className="font-bold text-fit-text">No workouts completed today yet.</p>
                <p className="text-[11px] max-w-sm mx-auto">
                  Today's log started fresh at 0. Complete a curated routine or log an exercise to track today's minutes and calories burned.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysWorkoutLogs.map((log, idx) => (
                  <div key={log.id || idx} className="p-3.5 rounded-xl bg-fit-surface2/80 border border-fit-primary/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-fit-text">{log.workoutName || log.routineName}</span>
                        <span className="chip text-[9px] px-2 py-0.5 bg-fit-primary/15 text-fit-primary border-fit-primary/30 uppercase font-extrabold">
                          Today
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-fit-muted font-medium">
                        <span className="flex items-center gap-1 text-fit-text font-bold">
                          <Clock size={11} className="text-fit-primary" /> {log.duration || log.durationMinutes || 15}m
                        </span>
                        <span>•</span>
                        <span className="text-fit-accent font-bold">
                          {log.calories || log.caloriesBurned || 100} kcal
                        </span>
                        <span>•</span>
                        <span>{log.exercisesCount || log.exerciseNames?.length || 1} exercises</span>
                      </div>
                    </div>
                    <CheckCircle size={18} className="text-fit-primary shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. WEEKLY WORKOUT CONSISTENCY BAR CHART */}
          <div className="card p-5 border border-fit-border bg-fit-surface/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-fit-text tracking-wider flex items-center gap-1.5">
                  <Activity size={14} className="text-fit-primary" /> Last 7 Days Workout Consistency
                </h3>
                <p className="text-[10px] text-fit-muted">Daily active minutes and workout frequency</p>
              </div>
              <span className="text-xs font-mono font-bold text-fit-primary bg-fit-primary/10 px-2.5 py-1 rounded-lg border border-fit-primary/20">
                {weeklyActivityData.reduce((a, b) => a + b.minutes, 0)} min total
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end pt-4 pb-1 border-b border-fit-border/40">
              {weeklyActivityData.map((d, idx) => {
                const heightPercent = d.minutes > 0 ? Math.max(18, Math.round((d.minutes / maxWeeklyMinutes) * 100)) : 8

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-fit-muted">
                      {d.minutes > 0 ? `${d.minutes}m` : '-'}
                    </span>
                    <div className="w-full max-w-[28px] h-28 bg-fit-surface2/60 rounded-xl flex items-end p-1 relative overflow-hidden">
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          d.isToday
                            ? 'bg-gradient-to-t from-fit-primary to-fit-accent shadow-glow'
                            : d.minutes > 0
                            ? 'bg-fit-primary/70'
                            : 'bg-fit-border/30'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${d.isToday ? 'text-fit-primary' : 'text-fit-muted'}`}>
                      {d.fullDay}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. MUSCLE GROUP FOCUS DISTRIBUTION */}
          <div className="card p-5 border border-fit-border bg-fit-surface/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-fit-text tracking-wider flex items-center gap-1.5">
                  <Target size={14} className="text-fit-primary" /> Muscle Group Volume Distribution
                </h3>
                <p className="text-[10px] text-fit-muted">Targeted muscle coverage from your workout logs</p>
              </div>
            </div>

            <div className="space-y-3">
              {muscleDistribution.map((m) => (
                <div key={m.muscle} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-fit-text flex items-center gap-1.5">
                      <Dumbbell size={11} className="text-fit-primary" /> {m.muscle}
                    </span>
                    <span className="font-mono text-[11px] text-fit-muted">
                      {m.count} exercises ({m.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-fit-surface2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-fit-primary to-fit-accent transition-all duration-500"
                      style={{ width: `${Math.max(5, m.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-fit-primary/5 border border-fit-primary/20 rounded-xl text-xs text-fit-muted flex items-center gap-2">
              <Sparkles size={16} className="text-fit-primary shrink-0" />
              <span>
                <strong>Coach Recommendation:</strong> Maintain balanced training between Push, Pull and Core to maximize athletic symmetry!
              </span>
            </div>
          </div>

          {/* 4. ACHIEVEMENTS / TROPHIES */}
          <div className="card p-5 border border-fit-border bg-fit-surface/60">
            <h3 className="text-xs font-extrabold uppercase text-fit-muted tracking-wider mb-3 flex items-center gap-1.5">
              <Award size={14} className="text-fit-primary" /> Trophies & Milestones
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {achievementDefinitions.map((ach) => {
                const earned = achievements.includes(ach.id)
                const IconComponent = ach.icon

                return (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                      earned ? 'bg-fit-primary/5 border-fit-primary/30 shadow-sm' : 'bg-fit-bg/40 border-fit-border/30 opacity-40'
                    }`}
                  >
                    <IconComponent size={22} style={{ color: earned ? ach.color : '#8CA398' }} />
                    <span className="text-[10px] font-bold text-fit-text mt-1.5 block leading-tight">{ach.title}</span>
                    <span className="text-[8px] text-fit-muted mt-0.5 line-clamp-1">{ach.description}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 5. PERSONAL RECORDS (PRs) */}
          <div className="card p-4 border border-fit-border">
            <div className="flex items-center gap-1.5 mb-3">
              <TrendingUp size={15} className="text-fit-primary" />
              <h3 className="text-xs font-extrabold uppercase text-fit-muted tracking-wider">Personal Records (PRs)</h3>
            </div>
            {Object.keys(personalRecords).length === 0 ? (
              <p className="text-[11px] text-fit-muted">Log sets in workouts to track your maximum weight loads.</p>
            ) : (
              <div className="divide-y divide-fit-border/40">
                {Object.entries(personalRecords).map(([exName, record]) => (
                  <div key={exName} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-fit-text">{exName}</span>
                    <span className="font-extrabold text-fit-primary font-mono">{record} kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. WORKOUT HISTORY LOGS TIMELINE (ALL-TIME PRESERVED) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase text-fit-muted tracking-wider flex items-center gap-1.5">
                <Calendar size={14} className="text-fit-primary" /> Activity History Log (All-Time)
              </h3>
              <span className="text-[11px] text-fit-muted font-bold">
                {workoutLogs.length} total recorded
              </span>
            </div>

            {workoutLogs.length === 0 ? (
              <div className="card p-8 text-center text-fit-muted text-xs border border-dashed border-fit-border">
                No logs recorded yet. Complete a session to log stats.
              </div>
            ) : (
              <div className="space-y-3">
                {workoutLogs.map((log, idx) => {
                  const logDate = getLocalDateString(log.date || log.completedAt)
                  const isTodayLog = Boolean(logDate) && logDate === todayDateKey

                  return (
                    <div key={log.id || idx} className="card p-4 border border-fit-border bg-fit-surface/40 hover:border-fit-primary/40 transition-colors">
                      <div className="flex items-center justify-between border-b border-fit-border/40 pb-2 mb-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-fit-text">
                          <Calendar size={13} className="text-fit-primary" />
                          {log.workoutName || log.routineName}
                          {isTodayLog && (
                            <span className="chip text-[8px] px-1.5 py-0.2 bg-fit-primary/20 text-fit-primary border-fit-primary/40 uppercase font-black ml-1">
                              Today
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-fit-muted font-mono">{log.date}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-fit-muted mb-2">
                        <div>
                          <span className="block font-bold text-fit-text text-xs">{log.duration || log.durationMinutes || 15}m</span>
                          Duration
                        </div>
                        <div>
                          <span className="block font-bold text-fit-text text-xs">{log.calories || log.caloriesBurned || 100} kcal</span>
                          Burned
                        </div>
                        <div>
                          <span className="block font-bold text-fit-text text-xs">{log.exercisesCount || log.exerciseNames?.length || 1}</span>
                          Exercises
                        </div>
                      </div>

                      {Array.isArray(log.exerciseNames) && log.exerciseNames.length > 0 && (
                        <div className="text-[10px] text-fit-muted line-clamp-1">
                          Exercises: {log.exerciseNames.join(', ')}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING LOG TOAST NOTIFICATION */}
      {logToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-fit-surface border border-fit-primary/40 shadow-glow px-4 py-2.5 rounded-2xl flex items-center gap-2.5 backdrop-blur-md">
          <CheckCircle size={16} className="text-fit-primary shrink-0 animate-bounce" />
          <span className="text-xs font-bold text-fit-text">{logToast}</span>
        </div>
      )}

      {/* EXERCISE DETAIL OVERLAY MODAL */}
      {selectedExerciseInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-fit-bg/90 backdrop-blur-md animate-fadeIn">
          <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto border border-fit-border bg-fit-surface p-4 sm:p-6 space-y-4 shadow-2xl rounded-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-fit-border/60 pb-3">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="chip px-2 py-0.5 text-[9px] font-bold border-fit-primary/40 bg-fit-primary/10 text-fit-primary rounded-md uppercase">
                    {selectedExerciseInfo.target}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 font-bold rounded-md uppercase border ${
                    selectedExerciseInfo.level === 'Beginner' ? 'border-green-500/40 bg-green-500/10 text-green-400' :
                    selectedExerciseInfo.level === 'Intermediate' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                    'border-red-500/40 bg-red-500/10 text-red-400'
                  }`}>
                    {selectedExerciseInfo.level}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-fit-text leading-tight">{selectedExerciseInfo.name}</h3>
              </div>
              <button
                onClick={() => setSelectedExerciseInfo(null)}
                className="w-8 h-8 rounded-xl bg-fit-surface2 border border-fit-border hover:border-fit-primary/50 flex items-center justify-center text-fit-text text-xs font-bold transition-colors shrink-0 ml-2"
              >
                ✕
              </button>
            </div>

            {/* Video / GIF / Animation Player */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-fit-muted">Movement Guide & Visual Form</span>
              <ExerciseVideoPlayer
                videoUrl={selectedExerciseInfo.videoUrl}
                imageUrl={selectedExerciseInfo.imageUrl}
                image2Url={selectedExerciseInfo.image2Url}
                gifUrl={selectedExerciseInfo.gifUrl}
                name={selectedExerciseInfo.name}
                target={selectedExerciseInfo.target}
              />
            </div>

            {/* Grid of Key Exercise Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-fit-surface2/70 border border-fit-border/60 text-center">
                <span className="text-[9px] uppercase font-bold text-fit-muted block">Sets & Reps</span>
                <span className="text-xs font-extrabold text-fit-primary mt-0.5 block font-mono">
                  {selectedExerciseInfo.defaultSets || 3} × {selectedExerciseInfo.defaultReps || 10} {selectedExerciseInfo.defaultReps > 30 ? 's' : 'reps'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-fit-surface2/70 border border-fit-border/60 text-center">
                <span className="text-[9px] uppercase font-bold text-fit-muted block">Equipment</span>
                <span className="text-xs font-extrabold text-fit-text mt-0.5 block truncate">
                  {selectedExerciseInfo.equipment}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-fit-surface2/70 border border-fit-border/60 text-center">
                <span className="text-[9px] uppercase font-bold text-fit-muted block">Difficulty</span>
                <span className={`text-xs font-extrabold mt-0.5 block ${
                  selectedExerciseInfo.level === 'Beginner' ? 'text-green-400' :
                  selectedExerciseInfo.level === 'Intermediate' ? 'text-amber-300' :
                  'text-red-400'
                }`}>
                  {selectedExerciseInfo.level}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-fit-surface2/70 border border-fit-border/60 text-center">
                <span className="text-[9px] uppercase font-bold text-fit-muted block">Target Muscle</span>
                <span className="text-xs font-extrabold text-fit-accent mt-0.5 block truncate">
                  {selectedExerciseInfo.target}
                </span>
              </div>
            </div>

            {/* Secondary Muscles Tag */}
            {selectedExerciseInfo.secondary && (
              <div className="text-[11px] text-fit-muted bg-fit-surface2/40 px-3 py-1.5 rounded-xl border border-fit-border/40">
                <strong className="text-fit-text font-semibold">Synergist Muscles:</strong> {selectedExerciseInfo.secondary}
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-fit-muted block mb-1.5">Step-by-step instructions</span>
              <ol className="list-decimal list-inside text-xs text-fit-muted space-y-1.5 pl-1">
                {selectedExerciseInfo.instructions.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-fit-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Coach Form Tips */}
            <div className="p-3 bg-fit-primary/5 border border-fit-primary/20 rounded-xl">
              <span className="text-[10px] uppercase font-black text-fit-primary block mb-1">💡 Coach form & safety tips</span>
              <p className="text-xs text-fit-muted leading-relaxed">{selectedExerciseInfo.formTips}</p>
            </div>

            {/* Common Mistakes */}
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
              <span className="text-[10px] uppercase font-black text-red-400 block mb-1">⚠️ Common mistakes & precautions</span>
              <p className="text-xs text-fit-muted leading-relaxed">{selectedExerciseInfo.commonMistakes}</p>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-3 border-t border-fit-border/60 flex items-center gap-2.5">
              <button
                onClick={() => handleStartExerciseSession(selectedExerciseInfo)}
                className="flex-1 bg-fit-primary text-fit-bg font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-glow hover:bg-fit-primary-dark transition-all"
              >
                <Play size={14} fill="currentColor" /> Start Workout
              </button>
              <button
                onClick={() => handleCompleteExercise(selectedExerciseInfo)}
                className="btn-secondary py-2.5 px-4 rounded-xl text-xs font-bold text-fit-text hover:text-fit-primary flex items-center justify-center gap-1.5 border border-fit-border hover:border-fit-primary/50"
              >
                <CheckCircle size={14} className="text-fit-primary" /> Complete / Log
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
