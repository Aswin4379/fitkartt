import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BarChart3, ChevronLeft, Play, Info, Check, RotateCcw, Award, ChevronRight, Volume2, VolumeX, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import AppLayout from '../components/AppLayout.jsx'

import { workoutCategories, exerciseLibrary } from '../data/workouts.js'
import { workoutApi, exerciseApi } from '../services/api.js'
import ExerciseVideoPlayer from '../components/ExerciseVideoPlayer.jsx'
import { useUser } from '../context/UserContext.jsx'
import { getLocalDateString } from '../utils/metabolicEngine.js'

export default function WorkoutDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateUser } = useUser()

  // Dynamic state workout configuration
  const [workout, setWorkout] = useState(null)

  // Navigation tabs: 'overview' or 'active'
  const [activeTab, setActiveTab] = useState('overview')

  // Workout state tracking
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  // Keeps track of the weight & reps for each set of each exercise
  // Format: { [exerciseIndex]: { [setIndex]: { weight: number, reps: number, completed: boolean } } }
  const [setTracker, setSetTracker] = useState({})
  
  // Overall timing
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Rest Timer State
  const [restTimeLeft, setRestTimeLeft] = useState(0)
  const [totalRestDuration, setTotalRestDuration] = useState(60)
  const [isRestTimerActive, setIsRestTimerActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Details Modal overlays
  const [selectedInstructionEx, setSelectedInstructionEx] = useState(null)

  // Completion and validation modal states
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [showIncompleteModal, setShowIncompleteModal] = useState(false)
  const [hasLoggedSession, setHasLoggedSession] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Timer intervals
  const sessionTimerRef = useRef(null)
  const restTimerRef = useRef(null)

  // Load workout details and init tracking structure from MongoDB
  useEffect(() => {
    let isMounted = true

    const loadWorkoutData = async () => {
      let selectedWorkout = null
      let availableExercises = exerciseLibrary

      // Fetch fresh exercise catalog from MongoDB
      try {
        const exRes = await exerciseApi.getExercises()
        if (exRes?.exercises && exRes.exercises.length > 0) {
          availableExercises = exRes.exercises
        }
      } catch {}

      if (id === 'custom-gen') {
        const customString = sessionStorage.getItem('fitkart_custom_workout')
        if (customString) {
          try {
            selectedWorkout = JSON.parse(customString)
          } catch (e) {}
        }
      } else {
        // Try fetching from MongoDB workoutApi first
        try {
          const apiWorkout = await workoutApi.getWorkoutById(id)
          if (apiWorkout && (apiWorkout.id || apiWorkout.name || apiWorkout.title)) {
            selectedWorkout = {
              ...apiWorkout,
              name: apiWorkout.name || apiWorkout.title,
              id: apiWorkout.id || id
            }
          }
        } catch {}

        if (!selectedWorkout) {
          selectedWorkout = workoutCategories.find((w) => w.id === id)
        }
      }

      if (selectedWorkout && isMounted) {
        // Map basic exercise ids or embedded exercise objects to complete exercise details
        const detailedExercises = (selectedWorkout.exercises || []).map((exIdOrObj) => {
          if (typeof exIdOrObj === 'object' && exIdOrObj !== null && exIdOrObj.name && exIdOrObj.target) {
            return exIdOrObj
          }
          const searchKey = typeof exIdOrObj === 'string' ? exIdOrObj : (exIdOrObj?.id || exIdOrObj?.name)
          const found = availableExercises.find((e) => e.id === searchKey || e.name.toLowerCase() === (searchKey || '').toLowerCase())
          if (found) return found
          // Fallback
          return {
            id: searchKey || 'ex_gen',
            name: searchKey || 'Standard Exercise',
            target: 'Full Body',
            equipment: 'None',
            level: 'Beginner',
            instructions: ['Perform standard reps with strict form.'],
            formTips: 'Maintain solid structure and tempo.',
            commonMistakes: 'Lack of control and fast eccentric.',
            defaultSets: 3,
            defaultReps: 10,
            defaultWeight: 0
          }
        })

        const enrichedWorkout = {
          ...selectedWorkout,
          name: selectedWorkout.name || selectedWorkout.title || 'Workout Routine',
          exercises: detailedExercises
        }
        setWorkout(enrichedWorkout)

        // Initialize tracker structure
        const initialTracker = {}
        enrichedWorkout.exercises.forEach((ex, exIdx) => {
          initialTracker[exIdx] = {}
          const setsCount = ex.defaultSets || ex.sets || 3
          for (let s = 0; s < setsCount; s++) {
            initialTracker[exIdx][s] = {
              weight: ex.defaultWeight || 0,
              reps: ex.defaultReps || 10,
              completed: false
            }
          }
        })
        setSetTracker(initialTracker)
      }
    }

    loadWorkoutData()
    return () => { isMounted = false }
  }, [id])

  // Session duration timer logic
  useEffect(() => {
    if (isTimerRunning) {
      sessionTimerRef.current = setInterval(() => {
        setSessionSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(sessionTimerRef.current)
    }
    return () => clearInterval(sessionTimerRef.current)
  }, [isTimerRunning])

  // Rest timer countdown logic
  useEffect(() => {
    if (isRestTimerActive && restTimeLeft > 0) {
      restTimerRef.current = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(restTimerRef.current)
            setIsRestTimerActive(false)
            playCompletionSound()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(restTimerRef.current)
    }
    return () => clearInterval(restTimerRef.current)
  }, [isRestTimerActive, restTimeLeft])

  if (!workout) {
    return (
      <AppLayout>
        <div className="page-pad py-10 text-center">
          <p className="text-fit-muted">Workout session details not found.</p>
          <button onClick={() => navigate('/workouts')} className="btn-primary mt-4">
            Go to Workouts
          </button>
        </div>
      </AppLayout>
    )
  }

  // Play browser synthesizer beep for completion sound
  const playCompletionSound = () => {
    if (!soundEnabled) return
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
      
      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.3)
    } catch (e) {
      console.warn('Web Audio API not supported / blocked', e)
    }
  }

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    return `${mins}:${s < 10 ? '0' : ''}${s}`
  }

  const startWorkout = () => {
    setActiveTab('active')
    setIsTimerRunning(true)
  }

  // Toggle single set completion state
  const toggleSet = (exIdx, setIdx) => {
    const trackerCopy = { ...setTracker }
    const currentStatus = trackerCopy[exIdx]?.[setIdx]?.completed || false
    if (!trackerCopy[exIdx]) trackerCopy[exIdx] = {}
    if (!trackerCopy[exIdx][setIdx]) {
      trackerCopy[exIdx][setIdx] = { weight: 0, reps: 10, completed: false }
    }
    trackerCopy[exIdx][setIdx].completed = !currentStatus
    setSetTracker(trackerCopy)

    // Trigger rest timer only if checking off a set (transitioning false -> true)
    if (!currentStatus) {
      triggerRestTimer(45)
    }
  }

  const handleStatChange = (exIdx, setIdx, field, value) => {
    const trackerCopy = { ...setTracker }
    if (!trackerCopy[exIdx]) trackerCopy[exIdx] = {}
    if (!trackerCopy[exIdx][setIdx]) {
      trackerCopy[exIdx][setIdx] = { weight: 0, reps: 10, completed: false }
    }
    trackerCopy[exIdx][setIdx][field] = Number(value)
    setSetTracker(trackerCopy)
  }

  const triggerRestTimer = (seconds) => {
    setTotalRestDuration(seconds)
    setRestTimeLeft(seconds)
    setIsRestTimerActive(true)
  }

  const skipRestTimer = () => {
    setIsRestTimerActive(false)
    setRestTimeLeft(0)
  }

  const adjustRestTime = (amount) => {
    setRestTimeLeft((prev) => Math.max(0, prev + amount))
    setTotalRestDuration((prev) => Math.max(0, prev + amount))
  }

  // Comprehensive workout progress tracking & completion validator
  const getWorkoutProgressInfo = () => {
    let totalSets = 0
    let completedSets = 0
    const incompleteExercises = []

    if (workout && workout.exercises) {
      workout.exercises.forEach((ex, exIdx) => {
        const setsForEx = setTracker[exIdx] || {}
        const totalSetsForEx = ex.defaultSets || ex.sets || Object.keys(setsForEx).length || 3
        let completedSetsForEx = 0

        for (let s = 0; s < totalSetsForEx; s++) {
          totalSets++
          if (setsForEx[s]?.completed) {
            completedSets++
            completedSetsForEx++
          }
        }

        const remainingSetsForEx = totalSetsForEx - completedSetsForEx
        if (remainingSetsForEx > 0) {
          incompleteExercises.push({
            index: exIdx,
            name: ex.name,
            target: ex.target,
            totalSets: totalSetsForEx,
            completedSets: completedSetsForEx,
            remainingSets: remainingSetsForEx
          })
        }
      })
    }

    const remainingSets = totalSets - completedSets
    const percentage = totalSets === 0 ? 0 : Math.round((completedSets / totalSets) * 100)
    const isFullyCompleted = totalSets > 0 && completedSets === totalSets

    return {
      totalSets,
      completedSets,
      remainingSets,
      percentage,
      isFullyCompleted,
      incompleteExercises
    }
  }

  const finishWorkout = () => {
    const progressInfo = getWorkoutProgressInfo()

    // 1. STRICT VALIDATION: Do NOT mark workout as completed if any exercise or set is incomplete
    if (!progressInfo.isFullyCompleted) {
      setShowIncompleteModal(true)
      return
    }

    // 2. DUPLICATE PREVENTION: Prevent double logging if same session is clicked or submitted again
    if (hasLoggedSession || isSubmitting) {
      setShowCompletionModal(true)
      return
    }

    setIsSubmitting(true)
    setHasLoggedSession(true)
    setIsTimerRunning(false)
    setIsRestTimerActive(false)

    const activeMinutes = Math.max(1, Math.round(sessionSeconds / 60) || 1)
    const caloriesBurned = activeMinutes * 7

    // 3. Update basic tracker stats from MongoDB profile or cache
    const todayDateKey = getLocalDateString()

    // 3. Update basic tracker stats from MongoDB profile or cache
    const userWorkoutStats = user?.fitnessStats?.workoutStats
    const savedStats = localStorage.getItem('fitkart_workout_stats')
    let currentStats = userWorkoutStats || { completed: 0, time: 0, calories: 0, streak: 0, lastWorkoutDate: '' }
    if (!userWorkoutStats && savedStats) {
      try {
        currentStats = JSON.parse(savedStats)
      } catch (e) {}
    }

    // Process Streaks logic
    let updatedStreak = currentStats.streak || 0
    if (currentStats.lastWorkoutDate) {
      const lastDate = new Date(currentStats.lastWorkoutDate)
      const diffTime = Math.abs(new Date().setHours(0,0,0,0) - lastDate.setHours(0,0,0,0))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        updatedStreak += 1
      } else if (diffDays > 1) {
        updatedStreak = 1 // Reset streak
      }
    } else {
      updatedStreak = 1
    }

    const nextStats = {
      completed: (currentStats.completed || 0) + 1,
      time: (currentStats.time || 0) + activeMinutes,
      calories: (currentStats.calories || 0) + caloriesBurned,
      streak: updatedStreak,
      lastWorkoutDate: todayDateKey
    }
    try { localStorage.setItem('fitkart_workout_stats', JSON.stringify(nextStats)) } catch {}

    // 4. Log History (with unique session ID & deduplication)
    const userWorkoutLogs = user?.fitnessStats?.workoutLogs
    const savedLogs = localStorage.getItem('fitkart_workout_logs')
    let currentLogs = Array.isArray(userWorkoutLogs) ? [...userWorkoutLogs] : []
    if (currentLogs.length === 0 && savedLogs) {
      try {
        currentLogs = JSON.parse(savedLogs)
      } catch (e) {}
    }

    const uniqueSessionId = `wlog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const newLog = {
      id: uniqueSessionId,
      date: todayDateKey,
      workoutName: workout.name,
      routineName: workout.name,
      duration: activeMinutes,
      durationMinutes: activeMinutes,
      calories: caloriesBurned,
      caloriesBurned: caloriesBurned,
      exercisesCount: workout.exercises.length,
      exerciseNames: workout.exercises.map((e) => e.name),
      completedAt: new Date().toISOString()
    }
    const updatedLogs = [newLog, ...currentLogs.filter(l => l.id !== uniqueSessionId)]
    try { localStorage.setItem('fitkart_workout_logs', JSON.stringify(updatedLogs)) } catch {}

    // 5. Process Personal Records (PR)
    const userPRs = user?.fitnessStats?.workoutPRs
    const savedPRs = localStorage.getItem('fitkart_workout_prs')
    let currentPRs = { ...(userPRs || {}) }
    if (Object.keys(currentPRs).length === 0 && savedPRs) {
      try {
        currentPRs = JSON.parse(savedPRs)
      } catch (e) {}
    }

    let hasPRBonus = false
    Object.keys(setTracker).forEach((exIdx) => {
      const exerciseName = workout.exercises[exIdx]?.name
      if (!exerciseName) return
      Object.keys(setTracker[exIdx] || {}).forEach((setIdx) => {
        const weightValue = Number(setTracker[exIdx][setIdx]?.weight || 0)
        if (weightValue > 0 && (!currentPRs[exerciseName] || weightValue > currentPRs[exerciseName])) {
          currentPRs[exerciseName] = weightValue
          if (weightValue >= 40) {
            hasPRBonus = true
          }
        }
      })
    })
    try { localStorage.setItem('fitkart_workout_prs', JSON.stringify(currentPRs)) } catch {}

    // 6. Update achievements list
    const userAchievements = user?.fitnessStats?.workoutAchievements || user?.fitnessStats?.achievements
    const savedAchievements = localStorage.getItem('fitkart_achievements')
    let earnedAchievements = Array.isArray(userAchievements) ? [...userAchievements] : []
    if (earnedAchievements.length === 0 && savedAchievements) {
      try {
        earnedAchievements = JSON.parse(savedAchievements)
      } catch (e) {}
    }

    if (!earnedAchievements.includes('first_step')) {
      earnedAchievements.push('first_step')
    }
    if (updatedStreak >= 3 && !earnedAchievements.includes('streak_3')) {
      earnedAchievements.push('streak_3')
    }
    if (hasPRBonus && !earnedAchievements.includes('heavy_lifter')) {
      earnedAchievements.push('heavy_lifter')
    }
    try { localStorage.setItem('fitkart_achievements', JSON.stringify(earnedAchievements)) } catch {}

    // 7. Update Activity metrics (strictly date-isolated)
    const currentActivity = user?.fitnessStats?.activity || {}
    const isToday = currentActivity.lastUpdatedDate === todayDateKey
    const updatedActivity = {
      todayMinutes: (isToday ? (Number(currentActivity.todayMinutes) || 0) : 0) + activeMinutes,
      todayCaloriesBurned: (isToday ? (Number(currentActivity.todayCaloriesBurned) || 0) : 0) + caloriesBurned,
      workoutsCompletedToday: (isToday ? (Number(currentActivity.workoutsCompletedToday) || 0) : 0) + 1,
      lastUpdatedDate: todayDateKey
    }

    // 8. Push to MongoDB via updateUser
    if (updateUser) {
      updateUser({
        fitnessStats: {
          workoutStats: nextStats,
          workoutLogs: updatedLogs,
          workoutPRs: currentPRs,
          workoutAchievements: earnedAchievements,
          achievements: earnedAchievements,
          activity: updatedActivity,
          streak: {
            current: updatedStreak,
            best: Math.max(updatedStreak, user?.fitnessStats?.streak?.best || 0),
            lastActiveDate: todayDateKey
          }
        }
      }).catch((err) => {
        console.warn('[Sync workout to MongoDB failed]:', err)
      }).finally(() => {
        setIsSubmitting(false)
      })
    } else {
      setIsSubmitting(false)
    }

    setShowCompletionModal(true)
  }

  const activeExercise = workout.exercises[currentExerciseIndex]
  const progressInfo = getWorkoutProgressInfo()
  const overallProgress = progressInfo.percentage

  return (
    <AppLayout showNav={activeTab === 'overview'}>
      {/* Top Header Sticky navigation */}
      <div className="sticky top-0 z-30 glass-strong border-b border-fit-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/workouts')} className="text-fit-text hover:text-fit-primary">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="font-bold text-sm text-fit-text line-clamp-1">{workout.name}</h2>
            <div className="flex items-center gap-2 text-[10px] text-fit-muted">
              <span>{workout.level}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><Clock size={10} /> {workout.duration}</span>
            </div>
          </div>
        </div>

        {/* Global Progress Indicators */}
        {activeTab === 'active' && (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-fit-muted">Time Elapsed</span>
              <span className="text-xs font-mono font-bold text-fit-primary">{formatTime(sessionSeconds)}</span>
            </div>
            <button
              onClick={finishWorkout}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1.5 ${
                progressInfo.isFullyCompleted
                  ? 'bg-fit-primary text-fit-bg shadow-glow font-black'
                  : 'bg-fit-surface2 text-amber-400 hover:text-amber-300 border border-amber-500/30'
              }`}
            >
              {progressInfo.isFullyCompleted ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              Finish {progressInfo.isFullyCompleted ? '(100%)' : `(${progressInfo.completedSets}/${progressInfo.totalSets})`}
            </button>
          </div>
        )}
      </div>

      {/* Mode selectors */}
      <div className="page-pad pt-4 flex gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg border transition-all ${
            activeTab === 'overview'
              ? 'bg-fit-surface border-fit-primary text-fit-primary'
              : 'bg-fit-surface2/40 border-fit-border text-fit-muted'
          }`}
        >
          Overview List
        </button>
        <button
          onClick={startWorkout}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg border transition-all ${
            activeTab === 'active'
              ? 'bg-fit-surface border-fit-primary text-fit-primary'
              : 'bg-fit-surface2/40 border-fit-border text-fit-muted'
          }`}
        >
          Live Play Tracker
        </button>
      </div>

      {/* Progress tracking line */}
      <div className="page-pad mt-4">
        <div className="card p-3.5 bg-fit-surface/50 border-fit-border/40">
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
            <span className="text-fit-muted">Session Progress</span>
            <span className={progressInfo.isFullyCompleted ? "text-fit-primary font-bold" : "text-fit-text"}>
              {overallProgress}% Complete ({progressInfo.completedSets}/{progressInfo.totalSets} Sets)
            </span>
          </div>
          <div className="h-2.5 bg-fit-surface2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressInfo.isFullyCompleted
                  ? 'bg-fit-primary shadow-glow'
                  : 'bg-gradient-to-r from-fit-primary to-fit-accent'
              }`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* TAB 1: ROUTINE SUMMARY */}
      {activeTab === 'overview' && (
        <div className="page-pad py-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-fit-muted">Exercises in this workout</h3>
            <button
              onClick={startWorkout}
              className="text-xs text-fit-primary font-bold flex items-center gap-1 hover:underline"
            >
              Start Session <Play size={12} fill="currentColor" />
            </button>
          </div>

          <div className="space-y-3">
            {workout.exercises.map((ex, idx) => {
              const totalSetsForEx = ex.defaultSets || ex.sets || 3
              let completedSetsForEx = 0
              for (let s = 0; s < totalSetsForEx; s++) {
                if (setTracker[idx]?.[s]?.completed) completedSetsForEx++
              }
              const isExDone = completedSetsForEx === totalSetsForEx && totalSetsForEx > 0

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentExerciseIndex(idx)
                    startWorkout()
                  }}
                  className={`w-full card p-4 flex items-center justify-between text-left transition-colors cursor-pointer border ${
                    isExDone
                      ? 'bg-fit-primary/5 border-fit-primary/40 hover:border-fit-primary'
                      : 'bg-fit-surface/40 border-fit-border hover:border-fit-primary/45'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-bold ${
                      isExDone
                        ? 'bg-fit-primary text-fit-bg border-fit-primary shadow-glow'
                        : 'bg-fit-surface2 border-fit-border text-fit-text'
                    }`}>
                      {isExDone ? '✓' : idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-fit-text leading-tight flex items-center gap-1.5">
                        {ex.name}
                        {isExDone && <span className="text-[10px] text-fit-primary font-bold">✓ Done</span>}
                      </h4>
                      <span className="text-[10px] text-fit-primary font-medium mt-0.5 inline-block">
                        {ex.target} ({ex.equipment})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-bold block ${isExDone ? 'text-fit-primary' : 'text-fit-text'}`}>
                      {completedSetsForEx}/{totalSetsForEx} Sets
                    </span>
                    <span className="text-[10px] text-fit-muted block">
                      {ex.defaultReps} reps • {ex.defaultWeight > 0 ? `${ex.defaultWeight}kg` : 'Bodyweight'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE CARD PLAY TRACKER */}
      {activeTab === 'active' && activeExercise && (
        <div className="page-pad py-5 space-y-5">
          {/* Deck controller header */}
          <div className="flex items-center justify-between">
            <button
              disabled={currentExerciseIndex === 0}
              onClick={() => setCurrentExerciseIndex((p) => p - 1)}
              className="w-8 h-8 rounded-lg bg-fit-surface border border-fit-border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-fit-muted">
              Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
            </span>
            <button
              disabled={currentExerciseIndex === workout.exercises.length - 1}
              onClick={() => setCurrentExerciseIndex((p) => p + 1)}
              className="w-8 h-8 rounded-lg bg-fit-surface border border-fit-border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Core exercise frame */}
          <div className="card p-5 bg-gradient-to-br from-fit-surface to-fit-surface2/60 border border-fit-border">
            <div className="flex items-start justify-between">
              <div>
                <span className="chip px-2 py-0.5 text-[9px] font-bold border-fit-primary/40 bg-fit-primary/10 text-fit-primary rounded-md uppercase tracking-wider mb-2 inline-block">
                  {activeExercise.target}
                </span>
                <h3 className="text-lg font-extrabold text-fit-text tracking-tight mt-1">{activeExercise.name}</h3>
              </div>

              {/* Instruction trigger button */}
              <button
                onClick={() => setSelectedInstructionEx(activeExercise)}
                className="w-8 h-8 rounded-full border border-fit-border flex items-center justify-center text-fit-muted hover:text-fit-primary"
              >
                <Info size={16} />
              </button>
            </div>

            {/* Set Tracking Table */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-4 text-center text-[10px] font-bold uppercase tracking-wider text-fit-muted pb-1 border-b border-fit-border/30">
                <span>Set</span>
                <span>Kg</span>
                <span>Reps</span>
                <span>Status</span>
              </div>

              {Array.from({ length: activeExercise.defaultSets || 3 }).map((_, setIdx) => {
                const spec = setTracker[currentExerciseIndex]?.[setIdx] || { weight: 0, reps: 10, completed: false }

                return (
                  <div
                    key={setIdx}
                    className={`grid grid-cols-4 items-center text-center py-2.5 px-1 rounded-xl border transition-colors ${
                      spec.completed
                        ? 'bg-fit-primary/10 border-fit-primary/40'
                        : 'bg-fit-bg/40 border-fit-border/40 hover:border-fit-border'
                    }`}
                  >
                    <span className="text-xs font-bold text-fit-text">Set {setIdx + 1}</span>

                    {/* Weight adjustments with quick stepper */}
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        disabled={spec.completed || spec.weight <= 0}
                        onClick={() => handleStatChange(currentExerciseIndex, setIdx, 'weight', Math.max(0, spec.weight - 2.5))}
                        className="w-5 h-5 rounded bg-fit-surface border border-fit-border text-[10px] font-bold text-fit-muted hover:text-fit-primary flex items-center justify-center disabled:opacity-30"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={spec.weight}
                        onChange={(e) => handleStatChange(currentExerciseIndex, setIdx, 'weight', e.target.value)}
                        disabled={spec.completed}
                        className="w-10 bg-fit-surface2 text-xs text-center border border-fit-border/60 rounded px-1 py-0.5 font-bold disabled:opacity-50 text-fit-text font-mono"
                      />
                      <button
                        type="button"
                        disabled={spec.completed}
                        onClick={() => handleStatChange(currentExerciseIndex, setIdx, 'weight', spec.weight + 2.5)}
                        className="w-5 h-5 rounded bg-fit-surface border border-fit-border text-[10px] font-bold text-fit-muted hover:text-fit-primary flex items-center justify-center disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    {/* Reps adjustments with quick stepper */}
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        disabled={spec.completed || spec.reps <= 1}
                        onClick={() => handleStatChange(currentExerciseIndex, setIdx, 'reps', Math.max(1, spec.reps - 1))}
                        className="w-5 h-5 rounded bg-fit-surface border border-fit-border text-[10px] font-bold text-fit-muted hover:text-fit-primary flex items-center justify-center disabled:opacity-30"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={spec.reps}
                        onChange={(e) => handleStatChange(currentExerciseIndex, setIdx, 'reps', e.target.value)}
                        disabled={spec.completed}
                        className="w-10 bg-fit-surface2 text-xs text-center border border-fit-border/60 rounded px-1 py-0.5 font-bold disabled:opacity-50 text-fit-text font-mono"
                      />
                      <button
                        type="button"
                        disabled={spec.completed}
                        onClick={() => handleStatChange(currentExerciseIndex, setIdx, 'reps', spec.reps + 1)}
                        className="w-5 h-5 rounded bg-fit-surface border border-fit-border text-[10px] font-bold text-fit-muted hover:text-fit-primary flex items-center justify-center disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    {/* Checkbox trigger button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleSet(currentExerciseIndex, setIdx)}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                          spec.completed
                            ? 'bg-fit-primary text-fit-bg scale-105 shadow-glow'
                            : 'border-2 border-fit-border/80 hover:border-fit-primary/80 bg-fit-surface2/50 text-fit-muted'
                        }`}
                      >
                        {spec.completed ? <Check size={16} strokeWidth={3} /> : <span className="text-[10px] font-bold">✓</span>}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Exercise Navigation Action Bar */}
            <div className="mt-5 pt-4 border-t border-fit-border/40 flex items-center gap-3">
              {currentExerciseIndex < workout.exercises.length - 1 ? (
                <button
                  onClick={() => setCurrentExerciseIndex((p) => p + 1)}
                  className="w-full bg-fit-surface2 hover:bg-fit-surface2/90 text-fit-text font-bold py-2.5 rounded-xl text-xs border border-fit-border flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Next: {workout.exercises[currentExerciseIndex + 1]?.name}</span>
                  <ChevronRight size={14} className="text-fit-primary" />
                </button>
              ) : (
                <button
                  onClick={finishWorkout}
                  className={`w-full font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 ${
                    progressInfo.isFullyCompleted
                      ? 'bg-fit-primary text-fit-bg shadow-glow hover:bg-fit-primary-dark'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  }`}
                >
                  {progressInfo.isFullyCompleted ? (
                    <>
                      <Award size={16} /> Finish & Complete Workout (100% Done)
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} className="text-amber-400" />
                      Finish & Complete Workout ({progressInfo.remainingSets} sets remaining)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Quick Manual Rest Timer Trigger button */}
          {!isRestTimerActive && (
            <div className="flex justify-center gap-2.5">
              <button
                onClick={() => triggerRestTimer(30)}
                className="chip px-3.5 py-1.5 border-fit-border/80 text-xs hover:border-fit-primary/40 bg-fit-surface/40 font-bold"
              >
                ⏱️ +30s Rest
              </button>
              <button
                onClick={() => triggerRestTimer(60)}
                className="chip px-3.5 py-1.5 border-fit-border/80 text-xs hover:border-fit-primary/40 bg-fit-surface/40 font-bold"
              >
                ⏱️ +60s Rest
              </button>
              <button
                onClick={() => triggerRestTimer(90)}
                className="chip px-3.5 py-1.5 border-fit-border/80 text-xs hover:border-fit-primary/40 bg-fit-surface/40 font-bold"
              >
                ⏱️ +90s Rest
              </button>
            </div>
          )}
        </div>
      )}

      {/* INSTRUCTIONS MODAL DURING WORKOUT */}
      {selectedInstructionEx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fit-bg/90 backdrop-blur-sm">
          <div className="card w-full max-w-md max-h-[80vh] overflow-y-auto border border-fit-border bg-fit-surface p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-fit-border pb-3">
              <div>
                <span className="chip px-2 py-0.5 text-[9px] font-bold border-fit-primary/40 bg-fit-primary/10 text-fit-primary rounded-md uppercase">
                  {selectedInstructionEx.target}
                </span>
                <h3 className="text-base font-extrabold text-fit-text mt-1">{selectedInstructionEx.name}</h3>
              </div>
              <button
                onClick={() => setSelectedInstructionEx(null)}
                className="w-8 h-8 rounded-lg bg-fit-surface2 border border-fit-border flex items-center justify-center text-fit-text text-xs font-bold"
              >
                ✕
              </button>
            </div>
            {selectedInstructionEx && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-fit-muted">Movement Guide & Visual Form</span>
                <ExerciseVideoPlayer
                  videoUrl={selectedInstructionEx.videoUrl}
                  imageUrl={selectedInstructionEx.imageUrl}
                  image2Url={selectedInstructionEx.image2Url}
                  gifUrl={selectedInstructionEx.gifUrl}
                  name={selectedInstructionEx.name}
                  target={selectedInstructionEx.target}
                />
              </div>
            )}

            <div>
              <span className="text-[10px] uppercase font-bold text-fit-muted block mb-1.5">Instructions</span>
              <ol className="list-decimal list-inside text-xs text-fit-muted space-y-1.5">
                {selectedInstructionEx.instructions.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    <span className="text-fit-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-3 bg-fit-primary/5 border border-fit-primary/20 rounded-xl">
              <span className="text-[10px] uppercase font-black text-fit-primary block mb-1">💡 Coach tips</span>
              <p className="text-xs text-fit-muted leading-relaxed">{selectedInstructionEx.formTips}</p>
            </div>

            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
              <span className="text-[10px] uppercase font-black text-red-400 block mb-1">⚠️ Common mistakes</span>
              <p className="text-xs text-fit-muted leading-relaxed">{selectedInstructionEx.commonMistakes}</p>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING REST TIMER CONTROLLER (Fitbod Style) */}
      <AnimatePresence>
        {isRestTimerActive && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-fit-border p-5 rounded-t-3xl max-w-lg mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-fit-border rounded-full mb-3" />

              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-fit-text">Resting...</span>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-fit-muted hover:text-fit-text"
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              </div>

              {/* Circular progress bar */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-5">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-fit-border"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-fit-primary transition-all duration-1000"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={351.8}
                    strokeDashoffset={351.8 - (351.8 * restTimeLeft) / totalRestDuration}
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-fit-text font-mono">
                    {restTimeLeft}
                  </span>
                  <span className="text-[10px] text-fit-muted">seconds left</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => adjustRestTime(-10)}
                  className="flex-1 py-2 rounded-xl bg-fit-surface text-xs font-semibold text-fit-text border border-fit-border hover:border-fit-primary/40 active:scale-95 transition-transform"
                >
                  - 10s
                </button>
                <button
                  onClick={skipRestTimer}
                  className="flex-2 px-6 py-2 rounded-xl bg-fit-primary text-fit-bg text-xs font-bold shadow-glow hover:bg-fit-primary-dark active:scale-95 transition-transform"
                >
                  Skip Rest
                </button>
                <button
                  onClick={() => adjustRestTime(10)}
                  className="flex-1 py-2 rounded-xl bg-fit-surface text-xs font-semibold text-fit-text border border-fit-border hover:border-fit-primary/40 active:scale-95 transition-transform"
                >
                  + 10s
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INCOMPLETE WORKOUT VALIDATION MODAL */}
      <AnimatePresence>
        {showIncompleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fit-bg/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="card p-6 w-full max-w-md border border-amber-500/40 bg-fit-surface relative overflow-hidden shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-fit-border/40 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <AlertCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-fit-text">Workout Incomplete</h3>
                    <p className="text-[11px] text-fit-muted">
                      {progressInfo.remainingSets} required set{progressInfo.remainingSets !== 1 ? 's' : ''} remaining
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIncompleteModal(false)}
                  className="w-8 h-8 rounded-lg bg-fit-surface2 border border-fit-border flex items-center justify-center text-fit-text text-xs font-bold hover:border-fit-primary"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl">
                <p className="text-xs text-amber-300 leading-relaxed font-medium">
                  To complete this workout and log it to your tracker, please complete <strong>all exercises</strong> and check off <strong>every required set</strong>.
                </p>
              </div>

              {/* Incomplete Exercises List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fit-muted block">
                  Remaining Exercises ({progressInfo.incompleteExercises.length})
                </span>

                {progressInfo.incompleteExercises.map((item) => (
                  <div
                    key={item.index}
                    onClick={() => {
                      setCurrentExerciseIndex(item.index)
                      setActiveTab('active')
                      setShowIncompleteModal(false)
                    }}
                    className="p-3 rounded-xl bg-fit-surface2/60 hover:bg-fit-surface2 border border-fit-border/60 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-fit-surface border border-fit-border text-[11px] font-bold text-fit-text flex items-center justify-center">
                        {item.index + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-fit-text group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-fit-muted">{item.target}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="chip text-[10px] font-bold px-2 py-0.5 bg-amber-500/15 border-amber-500/30 text-amber-300">
                        {item.completedSets}/{item.totalSets} sets done
                      </span>
                      <ChevronRight size={14} className="text-fit-muted group-hover:text-amber-300 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-fit-border/40">
                <button
                  onClick={() => {
                    if (progressInfo.incompleteExercises.length > 0) {
                      setCurrentExerciseIndex(progressInfo.incompleteExercises[0].index)
                    }
                    setActiveTab('active')
                    setShowIncompleteModal(false)
                  }}
                  className="w-full btn-primary text-xs py-3 flex items-center justify-center gap-1.5 font-bold shadow-glow"
                >
                  <Play size={14} fill="currentColor" /> Resume & Complete Sets
                </button>
                <button
                  onClick={() => setShowIncompleteModal(false)}
                  className="w-full btn-secondary text-xs py-2 text-fit-muted hover:text-fit-text"
                >
                  Keep Workout in Progress
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONGRATULATIONS COMPLETION MODAL */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fit-bg/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card p-6 w-full max-w-sm text-center border border-fit-primary bg-fit-surface relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-gradient from-fit-primary/10 to-transparent pointer-events-none" />

              <div className="w-16 h-16 bg-fit-primary/10 border border-fit-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 text-fit-primary">
                <Award size={36} />
              </div>

              <h2 className="text-xl font-black text-fit-text">Workout Complete!</h2>
              <p className="text-xs text-fit-muted mt-1.5">You knocked it out of the park today.</p>

              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-2 my-5 p-3.5 bg-fit-surface2/80 rounded-2xl border border-fit-border/40 text-center">
                <div>
                  <span className="text-[9px] text-fit-muted block uppercase font-bold">Time</span>
                  <span className="text-sm font-extrabold text-fit-text font-mono">
                    {Math.round(sessionSeconds / 60) || 1}m
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-fit-muted block uppercase font-bold">Burned</span>
                  <span className="text-sm font-extrabold text-fit-primary font-mono">
                    {(Math.round(sessionSeconds / 60) || 1) * 7} kcal
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-fit-muted block uppercase font-bold">Streak</span>
                  <span className="text-sm font-extrabold text-orange-400 font-mono">
                    {user?.fitnessStats?.workoutStats?.streak || 1} 🔥
                  </span>
                </div>
              </div>

              <div className="p-3 bg-fit-primary/10 border border-fit-primary/30 rounded-xl mb-5 space-y-0.5">
                <p className="text-xs text-fit-primary font-bold">🎉 Workout saved to Cloud & Tracker!</p>
                <p className="text-[10px] text-fit-muted">+15 FitPoints awarded to your profile</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowCompletionModal(false)
                    navigate('/dashboard')
                  }}
                  className="w-full btn-primary text-xs py-3 flex items-center justify-center gap-1.5 font-black shadow-glow"
                >
                  <BarChart3 size={15} /> View Updated Tracker
                </button>
                <button
                  onClick={() => {
                    setShowCompletionModal(false)
                    navigate('/workouts')
                  }}
                  className="w-full btn-secondary text-xs py-2.5 text-fit-muted hover:text-fit-text"
                >
                  Return to Workouts
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  )
}
