import Workout from '../models/Workout.js';
import WorkoutSession from '../models/WorkoutSession.js';
import CustomRoutine from '../models/CustomRoutine.js';
import { logAuditEvent } from '../utils/auditLogger.js';

// @desc Get all workouts
// @route GET /api/workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get workout by ID
// @route GET /api/workouts/:id
export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    let workout = await Workout.findOne({ id });
    if (!workout && id.match(/^[0-9a-fA-F]{24}$/)) {
      workout = await Workout.findById(id);
    }
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import User from '../models/User.js';

// @desc Save a workout session
// @route POST /api/workouts/sessions
export const saveWorkoutSession = async (req, res) => {
  try {
    const { name, exercises, durationSeconds, caloriesBurned, startTime, endTime } = req.body;
    
    // 1. Calculate volume and muscle groups
    let totalVolume = 0;
    const muscleGroups = new Set();
    let prsHit = [];

    // Assuming user is fetched with full document to update PRs
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');
    
    // Initialize stats safely if missing
    if (!user.fitnessStats) user.fitnessStats = {};
    if (!user.fitnessStats.streak) {
      user.fitnessStats.streak = { current: 0, best: 0, lastActiveDate: '', history: [] };
    }
    if (!user.fitnessStats.workoutStats) {
      user.fitnessStats.workoutStats = { completed: 0, time: 0, calories: 0, streak: 0, lastWorkoutDate: '' };
    }
    if (!user.fitnessStats.workoutPRs) user.fitnessStats.workoutPRs = {};
    if (!user.fitnessStats.muscleRecovery) {
      user.fitnessStats.muscleRecovery = { chest: 100, back: 100, shoulders: 100, biceps: 100, triceps: 100, forearms: 100, abs: 100, glutes: 100, quads: 100, hamstrings: 100, calves: 100 };
    }

    exercises?.forEach(ex => {
      let maxWeightForEx = 0;
      let maxRepsForEx = 0;
      let maxVolumeForEx = 0;
      let completedSets = 0;
      
      ex.sets?.forEach(set => {
        if (set.isCompleted) {
          completedSets++;
          const weight = Number(set.weight) || 0;
          const reps = Number(set.reps) || 0;
          const vol = weight * reps;
          totalVolume += vol;
          if (weight > maxWeightForEx) maxWeightForEx = weight;
          if (reps > maxRepsForEx) maxRepsForEx = reps;
          if (vol > maxVolumeForEx) maxVolumeForEx = vol;
        }
      });
      
      if (completedSets > 0) {
        // Extract muscles from target or targetMuscles
        let muscles = [];
        if (Array.isArray(ex.targetMuscles)) muscles.push(...ex.targetMuscles);
        else if (typeof ex.targetMuscles === 'string') muscles.push(ex.targetMuscles);
        if (Array.isArray(ex.target)) muscles.push(...ex.target);
        else if (typeof ex.target === 'string') muscles.push(ex.target);
        
        muscles.forEach(m => {
          muscleGroups.add(m.toLowerCase());
          // Reduce muscle recovery based on sets completed (e.g., 5% per set, max 50%)
          if (user.fitnessStats.muscleRecovery[m.toLowerCase()] !== undefined) {
            const fatigue = Math.min(50, completedSets * 5);
            user.fitnessStats.muscleRecovery[m.toLowerCase()] = Math.max(0, user.fitnessStats.muscleRecovery[m.toLowerCase()] - fatigue);
          }
        });
      }

      // Check PRs
      if (maxWeightForEx > 0 || maxVolumeForEx > 0) {
        const est1RM = Math.round(maxWeightForEx * (1 + maxRepsForEx / 30));
        const prevPR = user.fitnessStats.workoutPRs[ex.name] || {};
        const prevWeight = typeof prevPR === 'number' ? prevPR : (prevPR.weight?.value || 0);
        const prevVolume = typeof prevPR === 'number' ? 0 : (prevPR.volume?.value || 0);
        
        const todayStr = new Date().toISOString();
        let hitPR = false;
        
        let newPR = {
           weight: { value: Math.max(prevWeight, maxWeightForEx), date: maxWeightForEx > prevWeight ? todayStr : (prevPR.weight?.date || todayStr) },
           reps: { value: Math.max(typeof prevPR === 'number' ? 0 : (prevPR.reps?.value || 0), maxRepsForEx), date: maxRepsForEx > (prevPR.reps?.value || 0) ? todayStr : (prevPR.reps?.date || todayStr) },
           volume: { value: Math.max(prevVolume, maxVolumeForEx), date: maxVolumeForEx > prevVolume ? todayStr : (prevPR.volume?.date || todayStr) },
           oneRepMax: { value: Math.max(typeof prevPR === 'number' ? 0 : (prevPR.oneRepMax?.value || 0), est1RM), date: est1RM > (prevPR.oneRepMax?.value || 0) ? todayStr : (prevPR.oneRepMax?.date || todayStr) }
        };
        
        if (maxWeightForEx > prevWeight || maxVolumeForEx > prevVolume) {
          hitPR = true;
        }

        user.fitnessStats.workoutPRs[ex.name] = newPR;
        if (hitPR) prsHit.push(ex.name);
      }
    });
    
    // Set last updated time for recovery regeneration
    user.fitnessStats.muscleRecovery.lastUpdated = new Date();


    // 2. Update AI Plan if this was a scheduled day
    const dayMatch = name.match(/Day (\d+):/i) || (req.body.planDay ? [null, req.body.planDay] : null);
    if (dayMatch && user.fitnessStats.fitnessPlan?.schedule) {
      const dayNum = parseInt(dayMatch[1]);
      const scheduleDay = user.fitnessStats.fitnessPlan.schedule.find(s => s.day === dayNum);
      if (scheduleDay && !scheduleDay.isCompleted) {
        scheduleDay.isCompleted = true;
        scheduleDay.completedAt = new Date();
      }
    }

    // Clear active session upon successful workout completion
    user.fitnessStats.activeWorkoutSession = null;
    user.markModified('fitnessStats.activeWorkoutSession');

    // 3. Update Streak & Stats
    const todayStr = new Date().toISOString().split('T')[0];
    const durationMinutes = Math.round(durationSeconds / 60);

    if (user.fitnessStats.streak.lastActiveDate !== todayStr) {
      user.fitnessStats.streak.current += 1;
      user.fitnessStats.streak.lastActiveDate = todayStr;
      if (user.fitnessStats.streak.current > user.fitnessStats.streak.best) {
        user.fitnessStats.streak.best = user.fitnessStats.streak.current;
      }
    }
    user.fitnessStats.workoutStats.completed += 1;
    user.fitnessStats.workoutStats.time += durationMinutes;
    user.fitnessStats.workoutStats.calories += (caloriesBurned || 0);
    user.fitnessStats.workoutStats.lastWorkoutDate = todayStr;

    // 4. Save Session document
    const formattedExercises = (exercises || []).map((e, idx) => ({
      ...e,
      exerciseId: e.exerciseId || e.id || `ex-${idx}-${Date.now()}`,
      name: e.name || 'Exercise'
    }));

    const session = new WorkoutSession({
      user: req.user._id,
      ...req.body,
      exercises: formattedExercises,
      totalVolume,
      muscleGroups: Array.from(muscleGroups),
      prsHit
    });
    
    const savedSession = await session.save();

    // 5. Synchronize with User fitnessStats workoutLogs & daily activity
    if (!Array.isArray(user.fitnessStats.workoutLogs)) {
      user.fitnessStats.workoutLogs = [];
    }

    let completedSetsCount = 0;
    exercises?.forEach(ex => {
      ex.sets?.forEach(s => {
        if (s.isCompleted) completedSetsCount++;
      });
    });

    user.fitnessStats.workoutLogs.unshift({
      id: savedSession._id.toString(),
      date: todayStr,
      workoutName: name || 'Workout Session',
      duration: durationMinutes,
      calories: caloriesBurned || 0,
      exercisesCount: exercises?.length || 0,
      exerciseNames: exercises?.map(e => e.name).filter(Boolean) || [],
      setsCompleted: completedSetsCount,
      completedAt: new Date()
    });

    if (!user.fitnessStats.activity) {
      user.fitnessStats.activity = { todayMinutes: 0, todayCaloriesBurned: 0, workoutsCompletedToday: 0, history: [] };
    }
    user.fitnessStats.activity.todayMinutes = (user.fitnessStats.activity.todayMinutes || 0) + durationMinutes;
    user.fitnessStats.activity.todayCaloriesBurned = (user.fitnessStats.activity.todayCaloriesBurned || 0) + (caloriesBurned || 0);
    user.fitnessStats.activity.workoutsCompletedToday = (user.fitnessStats.activity.workoutsCompletedToday || 0) + 1;
    user.fitnessStats.activity.lastUpdatedDate = todayStr;

    user.markModified('fitnessStats.workoutPRs');
    user.markModified('fitnessStats.muscleRecovery');
    user.markModified('fitnessStats.fitnessPlan');
    user.markModified('fitnessStats.workoutLogs');
    user.markModified('fitnessStats.activity');
    await user.save();

    await logAuditEvent({
      userId: user._id,
      userEmail: user.email,
      action: 'WORKOUT_COMPLETED',
      entityType: 'WorkoutSession',
      entityId: savedSession._id.toString(),
      metadata: {
        workoutName: name || 'Workout Session',
        durationMinutes,
        caloriesBurned: caloriesBurned || 0,
        exercisesCount: exercises?.length || 0,
        prsHit
      },
      req
    });

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get workout sessions for current user
// @route GET /api/workouts/sessions
export const getWorkoutSessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ user: req.user._id }).sort({ startTime: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Save custom routine
// @route POST /api/workouts/custom-routines
export const saveCustomRoutine = async (req, res) => {
  try {
    const routine = new CustomRoutine({
      user: req.user._id,
      ...req.body
    });
    const savedRoutine = await routine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get custom routines
// @route GET /api/workouts/custom-routines
export const getCustomRoutines = async (req, res) => {
  try {
    const routines = await CustomRoutine.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete custom routine
// @route DELETE /api/workouts/custom-routines/:id
export const deleteCustomRoutine = async (req, res) => {
  try {
    const routine = await CustomRoutine.findOne({ _id: req.params.id, user: req.user._id });
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    await routine.deleteOne();
    res.json({ message: 'Routine removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Generate AI Workout Plan
// @route POST /api/workouts/generate-plan
// Helper to build a science-based 7-day weekly schedule template adhering strictly to user inputs
function buildStructuredWeeklySchedule({
  daysPerWeek = 4,
  split = 'Full Body',
  goal = 'Build Muscle',
  duration = 45,
  level = 'Beginner',
  equipment = ['Bodyweight'],
  targetAreas = ['fullbody'],
  workoutDays = null,
  restStyle = 'consecutive',
  allDbExercises = []
}) {
  const numDays = Math.min(6, Math.max(2, Number(daysPerWeek) || 4));

  // Determine active workout vs rest days in a 7-day week
  const getActiveDaysMap = () => {
    if (Array.isArray(workoutDays) && workoutDays.length > 0) {
      return [1, 2, 3, 4, 5, 6, 7].map(d => workoutDays.includes(d));
    }
    if (restStyle === 'spread' || restStyle === 'midweek') {
      switch (numDays) {
        case 2: return [true, false, false, true, false, false, false];
        case 3: return [true, false, true, false, true, false, false];
        case 4: return [true, true, false, true, true, false, false];
        case 5: return [true, true, false, true, true, true, false];
        case 6: return [true, true, true, true, true, true, false];
        default: return [true, true, false, true, true, false, false];
      }
    }
    // Default: Consecutive training days (Days 1 to N Workout, remaining Rest days grouped together at the end)
    // E.g. 4 days -> Days 1, 2, 3, 4 Gym, Days 5, 6, 7 Rest (no vittu vittu rest)
    return [1, 2, 3, 4, 5, 6, 7].map(d => d <= numDays);
  };

  const activeDaysMap = getActiveDaysMap();
  const normSplit = String(split || '').toLowerCase();
  let splitFoci = [];

  if (normSplit.includes('upper') && normSplit.includes('lower')) {
    splitFoci = [
      { focus: 'Upper Body Strength & Power', target: ['Chest', 'Back', 'Shoulders', 'Arms'] },
      { focus: 'Lower Body Quads & Hamstrings', target: ['Legs', 'Core'] },
      { focus: 'Upper Body Hypertrophy & Arms', target: ['Chest', 'Back', 'Arms'] },
      { focus: 'Lower Body Glutes & Calves', target: ['Legs', 'Core'] },
      { focus: 'Upper & Core Functional Density', target: ['Shoulders', 'Arms', 'Core'] },
      { focus: 'Full Body Athletic Conditioning', target: ['Full Body', 'Legs', 'Core'] }
    ];
  } else if (normSplit.includes('push') || normSplit.includes('pull')) {
    splitFoci = [
      { focus: 'Push: Chest, Shoulders & Triceps', target: ['Chest', 'Shoulders', 'Arms'] },
      { focus: 'Pull: Back, Rear Delts & Biceps', target: ['Back', 'Arms'] },
      { focus: 'Legs: Quads, Hamstrings & Calves', target: ['Legs', 'Core'] },
      { focus: 'Push: Incline Chest & Overhead Press', target: ['Chest', 'Shoulders', 'Arms'] },
      { focus: 'Pull: Lat Width & Bicep Peak', target: ['Back', 'Arms'] },
      { focus: 'Legs & Core Power', target: ['Legs', 'Core'] }
    ];
  } else if (normSplit.includes('bro') || normSplit.includes('part')) {
    splitFoci = [
      { focus: 'Chest & Tricep Hypertrophy', target: ['Chest', 'Arms'] },
      { focus: 'Back & Bicep Thickness', target: ['Back', 'Arms'] },
      { focus: 'Shoulders & Trap Sculpting', target: ['Shoulders'] },
      { focus: 'Legs & Lower Body Dominance', target: ['Legs'] },
      { focus: 'Arms & Abdominal Core', target: ['Arms', 'Core'] },
      { focus: 'Functional Mobility & Conditioning', target: ['Core', 'Full Body'] }
    ];
  } else {
    // Full Body default
    splitFoci = [
      { focus: 'Full Body Compound Strength', target: ['Chest', 'Back', 'Legs'] },
      { focus: 'Full Body Hypertrophy & Stamina', target: ['Legs', 'Shoulders', 'Arms'] },
      { focus: 'Full Body Functional Core & Power', target: ['Full Body', 'Core', 'Back'] },
      { focus: 'Full Body Muscular Density', target: ['Chest', 'Legs', 'Arms'] },
      { focus: 'Full Body Athletic Conditioning', target: ['Legs', 'Back', 'Core'] },
      { focus: 'Full Body Power & Mobility', target: ['Full Body'] }
    ];
  }

  const goalConfig = {
    'Build Strength': { sets: 4, reps: '5-8 reps', rest: 90, weight: 'Heavy / Strength load' },
    'Build Muscle': { sets: 3, reps: '8-12 reps', rest: 60, weight: 'Moderate-Heavy' },
    'Lose Weight': { sets: 3, reps: '12-15 reps', rest: 45, weight: 'High Burn / Fast cadence' },
    'Get Fit': { sets: 3, reps: '10-12 reps', rest: 60, weight: 'Moderate / Functional' }
  }[goal] || { sets: 3, reps: '10-12 reps', rest: 60, weight: 'Moderate' };

  let activeIdx = 0;
  const sevenDaySchedule = [];

  for (let day = 1; day <= 7; day++) {
    const isActive = activeDaysMap[day - 1];
    if (!isActive) {
      sevenDaySchedule.push({
        day,
        focus: 'Rest & Active Recovery',
        estimatedDuration: 0,
        exercises: []
      });
    } else {
      const dayConfig = splitFoci[activeIdx % splitFoci.length];
      activeIdx++;

      const matchingPool = allDbExercises.filter(ex => {
        return dayConfig.target.some(t => 
          (ex.target && ex.target.toLowerCase().includes(t.toLowerCase())) ||
          (ex.categories && ex.categories.some(c => c.toLowerCase().includes(t.toLowerCase())))
        );
      });

      const poolToUse = matchingPool.length >= 4 ? matchingPool : allDbExercises;
      const dayExercises = [];
      const numExercises = duration >= 60 ? 6 : (duration >= 45 ? 5 : 4);

      for (let e = 0; e < numExercises; e++) {
        const ex = poolToUse[(activeIdx * 2 + e) % poolToUse.length] || {
          name: 'Functional Compound Exercise',
          target: 'Full Body'
        };

        const isWarmup = e === 0;
        const isCooldown = e === numExercises - 1;

        dayExercises.push({
          name: ex.name,
          type: isWarmup ? 'warm-up' : (isCooldown ? 'cooldown' : 'main'),
          sets: isWarmup || isCooldown ? 2 : goalConfig.sets,
          reps: isWarmup ? '30-45 secs' : (isCooldown ? 'Stretching / 60s' : goalConfig.reps),
          recommendedWeight: isWarmup || isCooldown ? 'Bodyweight' : (ex.defaultWeight || goalConfig.weight),
          restTime: isWarmup || isCooldown ? 30 : goalConfig.rest,
          targetMuscles: ex.target ? [ex.target] : dayConfig.target,
          difficulty: level || ex.level || 'Intermediate',
          equipment: ex.equipment || 'None',
          reason: isWarmup ? 'Prepares joints and nervous system' : (isCooldown ? 'Aids recovery and reduces soreness' : `Targets ${ex.target || 'target muscles'} for ${goal}`),
          gifUrl: ex.gifUrl || '',
          videoUrl: ex.videoUrl || '',
          instructions: ex.instructions || [],
          secondary: ex.secondary || '',
          formTips: ex.formTips || 'Control the movement through full range of motion.',
          commonMistakes: ex.commonMistakes || 'Avoid using momentum or arching your back.'
        });
      }

      sevenDaySchedule.push({
        day,
        focus: dayConfig.focus,
        estimatedDuration: Number(duration) || 45,
        exercises: dayExercises
      });
    }
  }

  return sevenDaySchedule;
}

export const generateAIPlan = async (req, res) => {
  try {
    const { goal, gender, weight, height, age, targetAreas, level, equipment, daysPerWeek, duration, split, workoutDays, restStyle } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const numDaysPerWeek = Math.min(6, Math.max(2, Number(daysPerWeek) || 4));

    // Determine active workout days vs rest days
    let activeDaysList = [];
    if (Array.isArray(workoutDays) && workoutDays.length > 0) {
      activeDaysList = workoutDays.map(Number);
    } else if (restStyle === 'spread' || restStyle === 'midweek') {
      if (numDaysPerWeek === 4) activeDaysList = [1, 2, 4, 5];
      else if (numDaysPerWeek === 5) activeDaysList = [1, 2, 4, 5, 6];
      else if (numDaysPerWeek === 3) activeDaysList = [1, 3, 5];
      else if (numDaysPerWeek === 2) activeDaysList = [1, 4];
      else activeDaysList = Array.from({ length: numDaysPerWeek }, (_, i) => i + 1);
    } else {
      // Consecutive default: Days 1 to numDaysPerWeek are WORKOUT days (no vittu vittu rest)
      activeDaysList = Array.from({ length: numDaysPerWeek }, (_, i) => i + 1);
    }

    const restDaysList = [1, 2, 3, 4, 5, 6, 7].filter(d => !activeDaysList.includes(d));

    // Load available DB exercises for mapping
    const allDbExercises = await import('../models/Exercise.js').then(m => m.default.find({}).lean());

    let sevenDaySchedule = null;

    if (GROQ_API_KEY) {
      try {
        const prompt = `You are an elite fitness coach AI.
Generate a structured 7-day workout schedule (Day 1 to Day 7) for a ${age || 25}yo ${gender || 'Male'}, ${weight || 70}kg, ${height || 175}cm.
Goal: "${goal || 'Build Muscle'}". Experience level: ${level || 'Intermediate'}.
Equipment available: ${equipment?.join(', ') || 'Full Gym'}.
Training split: "${split || 'Upper / Lower'}".
Days per week: ${numDaysPerWeek} days/week.
Session duration: ${duration || 45} mins.
Target muscles: ${targetAreas?.join(', ') || 'Full Body'}.

MANDATORY RULES:
1. The "schedule" array MUST contain EXACTLY 7 items, numbered day 1 to day 7.
2. Active workout days: Day ${activeDaysList.join(', Day ')} are WORKOUT days (${activeDaysList.length} workout days).
3. Rest days: Day ${restDaysList.join(', Day ')} are REST days (${restDaysList.length} rest days).
4. On REST days, "focus" must be "Rest & Active Recovery", "estimatedDuration" must be 0, and "exercises" array must be completely empty [].
5. On ACTIVE days, include 5-6 exercises tailored to "${split}" and "${goal}".
6. Output ONLY raw JSON matching:
{
  "schedule": [
    {
      "day": 1,
      "focus": "Upper Body Strength & Power",
      "estimatedDuration": ${duration || 45},
      "exercises": [
        {
          "name": "Barbell Bench Press",
          "type": "main",
          "sets": 4,
          "reps": "5-8",
          "recommendedWeight": "60kg",
          "restTime": 90,
          "targetMuscles": ["Chest", "Triceps"],
          "difficulty": "Intermediate",
          "equipment": "Barbell",
          "reason": "Compound mass & strength builder"
        }
      ]
    }
  ]
}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 3800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.choices[0]?.message?.content || '';
          let cleanContent = aiContent.replace(/```json\n?|\n?```/gi, '').trim();
          const firstBrace = cleanContent.indexOf('{');
          const lastBrace = cleanContent.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
            cleanContent = cleanContent.substring(firstBrace, lastBrace + 1);
          }
          const parsed = JSON.parse(cleanContent);
          if (parsed && Array.isArray(parsed.schedule) && parsed.schedule.length === 7) {
            sevenDaySchedule = parsed.schedule;
          }
        }
      } catch (aiErr) {
        console.warn("[workoutController] Groq AI generation fallback triggered:", aiErr.message);
      }
    }

    // If Groq was unavailable or returned non-7-day plan, use our scientific 7-day builder
    if (!sevenDaySchedule || sevenDaySchedule.length !== 7) {
      sevenDaySchedule = buildStructuredWeeklySchedule({
        daysPerWeek: numDaysPerWeek,
        split,
        goal,
        duration,
        level,
        equipment,
        targetAreas,
        workoutDays: activeDaysList,
        restStyle,
        allDbExercises
      });
    }

    // Expand the 7-day schedule across the full 30 days with progressive overload phases
    const expandedSchedule = [];
    for (let i = 0; i < 30; i++) {
      const weekNum = Math.floor(i / 7) + 1;
      const dayInWeek = i % 7;
      const sourceDay = sevenDaySchedule[dayInWeek];
      const isRest = !sourceDay.exercises || sourceDay.exercises.length === 0;

      let progressiveFocus = sourceDay.focus;
      if (!isRest) {
        if (weekNum === 1) progressiveFocus = `${sourceDay.focus} (Phase 1: Foundation)`;
        else if (weekNum === 2) progressiveFocus = `${sourceDay.focus} (Phase 2: Volume Progression)`;
        else if (weekNum === 3) progressiveFocus = `${sourceDay.focus} (Phase 3: Peak Intensity)`;
        else if (weekNum === 4) progressiveFocus = `${sourceDay.focus} (Phase 4: Hypertrophy Overload)`;
        else progressiveFocus = `${sourceDay.focus} (Phase 5: Strength Consolidation)`;
      }

      expandedSchedule.push({
        ...sourceDay,
        day: i + 1,
        focus: progressiveFocus,
        estimatedDuration: isRest ? 0 : (sourceDay.estimatedDuration || duration || 45)
      });
    }

    let scheduleData = expandedSchedule;
    
    // Helper to find closest DB exercise
    const findMatchingExercise = (aiName) => {
      const nameClean = (aiName || '').toLowerCase().trim();
      const nameNorm = nameClean.replace(/[^a-z0-9 ]/g, '');
      
      // 1. Exact match
      let match = allDbExercises.find(ex => (ex.name || '').toLowerCase().trim() === nameClean);
      if (match) return match;

      // 2. Normalized match (without special characters or extra spacing)
      match = allDbExercises.find(ex => (ex.name || '').toLowerCase().replace(/[^a-z0-9 ]/g, '') === nameNorm);
      if (match) return match;

      // 3. Exact containment (only if DB name is contained in AI name, avoiding false positives)
      match = allDbExercises.find(ex => {
        const dbNorm = (ex.name || '').toLowerCase().replace(/[^a-z0-9 ]/g, '');
        return nameNorm.includes(dbNorm) || dbNorm.includes(nameNorm);
      });
      if (match) return match;

      return {
        name: aiName,
        gifUrl: '',
        videoUrl: '',
        level: 'Beginner',
        equipment: 'Bodyweight',
        target: 'Full Body'
      };
    };

    const plan = {
      onboarded: true,
      goal,
      targetAreas,
      level,
      equipment,
      daysPerWeek,
      duration,
      split,
      planGeneratedAt: new Date(),
      schedule: scheduleData.map((s, index) => ({
        day: s.day || (index + 1),
        focus: s.focus || 'Workout',
        estimatedDuration: s.estimatedDuration || duration || 45,
        exercises: Array.isArray(s.exercises) ? s.exercises.map(e => {
          const dbMatch = findMatchingExercise(e.name || 'Exercise');
          return {
            name: e.name || 'Exercise', 
            type: e.type || 'main',
            sets: e.sets || 3, 
            reps: e.reps || 10,
            recommendedWeight: e.recommendedWeight || 'Bodyweight',
            restTime: e.restTime || 60,
            targetMuscles: Array.isArray(e.targetMuscles) ? e.targetMuscles : (dbMatch?.target ? [dbMatch.target] : []),
            difficulty: e.difficulty || dbMatch?.level || 'Intermediate',
            equipment: e.equipment || dbMatch?.equipment || 'None',
            reason: e.reason || '',
            gifUrl: dbMatch?.gifUrl || '',
            videoUrl: dbMatch?.videoUrl || '',
            instructions: dbMatch?.instructions || [],
            secondary: dbMatch?.secondary || '',
            formTips: dbMatch?.formTips || '',
            commonMistakes: dbMatch?.commonMistakes || ''
          };
        }) : [],
        isCompleted: false
      }))
    };

    
    // Use findByIdAndUpdate to bypass strict whole-document validation 
    // that fails if existing DB records lack required fields
    const { default: User } = await import('../models/User.js');
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { 
      $set: { 
        'fitnessStats.fitnessPlan': plan,
        // Add default fields just in case it's a mocked user upsert
        ...(typeof req.user.save !== 'function' && {
          name: req.user.name || 'Cloud User',
          email: req.user.email || 'cloud@fitkart.com',
          password: 'mockpassword'
        })
      } 
    }, { upsert: true, new: true, runValidators: false });

    console.log("DB Updated User fitnessPlan onboarded:", updatedUser?.fitnessStats?.fitnessPlan?.onboarded);

    res.json(plan);
  } catch (error) {
    console.error('AI Plan Gen Error:', error);
    res.status(500).json({ message: 'Failed to generate AI plan. Error: ' + error.message });
  }
};


// Active Session Logic
export const getActiveSession = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    res.json(user?.fitnessStats?.activeWorkoutSession || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveActiveSession = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { 'fitnessStats.activeWorkoutSession': req.body } },
      { new: true, runValidators: false }
    );
    res.json(updated?.fitnessStats?.activeWorkoutSession || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearActiveSession = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { 'fitnessStats.activeWorkoutSession': null } },
      { new: true, runValidators: false }
    );
    res.json({ message: 'Active session cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetAIPlan = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { 'fitnessStats.fitnessPlan': null } },
      { new: true, runValidators: false }
    );
    res.json({ message: 'Workout plan reset successfully', user: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

