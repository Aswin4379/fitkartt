import Workout from '../models/Workout.js';
import WorkoutSession from '../models/WorkoutSession.js';
import CustomRoutine from '../models/CustomRoutine.js';

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
    
    // Initialize stats if missing
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
    if (user.fitnessStats.streak.lastActiveDate !== todayStr) {
      user.fitnessStats.streak.current += 1;
      user.fitnessStats.streak.lastActiveDate = todayStr;
      if (user.fitnessStats.streak.current > user.fitnessStats.streak.best) {
        user.fitnessStats.streak.best = user.fitnessStats.streak.current;
      }
    }
    user.fitnessStats.workoutStats.completed += 1;
    user.fitnessStats.workoutStats.time += Math.round(durationSeconds / 60);
    user.fitnessStats.workoutStats.calories += caloriesBurned;
    user.fitnessStats.workoutStats.lastWorkoutDate = todayStr;

    user.markModified('fitnessStats.workoutPRs');
    user.markModified('fitnessStats.muscleRecovery');
    user.markModified('fitnessStats.fitnessPlan');
    await user.save();

    // 4. Save Session
    const session = new WorkoutSession({
      user: req.user._id,
      ...req.body,
      totalVolume,
      muscleGroups: Array.from(muscleGroups),
      prsHit
    });
    
    const savedSession = await session.save();
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
export const generateAIPlan = async (req, res) => {
  try {
    const { goal, gender, weight, height, age, targetAreas, level, equipment, daysPerWeek, duration, split } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ message: 'Groq API key not configured.' });
    }

    const prompt = `You are a world-class fitness coach AI.
Generate a structured 3-day seed workout schedule for a ${age}yo ${gender}, ${weight}kg, ${height}cm.
Goal: "${goal}". Experience level: ${level || 'Beginner'}.
Equipment available: ${equipment?.join(', ') || 'Bodyweight'}.
Training split: ${split || 'Full Body'}, ${daysPerWeek || 3} days/week, ${duration || 45} mins per session.
Target areas: ${targetAreas?.join(', ') || 'Full Body'}.

Create a JSON response with EXACTLY this structure:
{
  "schedule": [
    {
      "day": 1,
      "focus": "Upper Body Push",
      "estimatedDuration": 45,
      "exercises": [
        { 
          "name": "Arm Circles", 
          "type": "warm-up", 
          "sets": 1, 
          "reps": "30 secs", 
          "recommendedWeight": "Bodyweight",
          "restTime": 15,
          "targetMuscles": ["Shoulders"],
          "difficulty": "Beginner",
          "equipment": "Bodyweight",
          "reason": "Increases shoulder mobility"
        },
        { 
          "name": "Dumbbell Bench Press", 
          "type": "main", 
          "sets": 3, 
          "reps": "10-12", 
          "recommendedWeight": "15kg",
          "restTime": 90,
          "targetMuscles": ["Chest", "Triceps"],
          "difficulty": "Intermediate",
          "equipment": "Dumbbells",
          "reason": "Primary mass builder for chest"
        }
      ]
    }
  ]
}

Ensure there are exactly 3 days. Include warm-up, main, and cooldown exercises for each active day.
If it's a rest day, leave the "exercises" array empty.
Output ONLY raw JSON. No markdown or conversational text.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq Fetch Error:", response.status, errorText);
      throw new Error('Failed to fetch from Groq: ' + errorText);
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    let cleanContent = aiContent.replace(/```json\n?|\n?```/gi, '').trim();
    
    // Extract everything between the first '{' and the last '}'
    const firstBrace = cleanContent.indexOf('{');
    const lastBrace = cleanContent.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
      cleanContent = cleanContent.substring(firstBrace, lastBrace + 1);
    }

    let parsedPlan;
    try {
      parsedPlan = (new Function('return ' + cleanContent))();
      if (!parsedPlan || !Array.isArray(parsedPlan.schedule)) {
        throw new Error("Missing schedule array");
      }
    } catch (e) {
      console.error("JSON Parse Error. Using fallback plan.", e);
      // Fallback plan if AI completely fails or truncates
      parsedPlan = {
        schedule: [
          {
            day: 1,
            focus: "Full Body Foundation",
            exercises: [
              { name: "Push-ups", sets: 3, reps: 15 },
              { name: "Bodyweight Squats", sets: 3, reps: 20 },
              { name: "Plank", sets: 3, reps: 60 }
            ]
          },
          {
            day: 2,
            focus: "Cardio & Core",
            exercises: [
              { name: "Jumping Jacks", sets: 4, reps: 30 },
              { name: "Crunches", sets: 3, reps: 20 },
              { name: "Mountain Climbers", sets: 3, reps: 20 }
            ]
          },
          {
            day: 3,
            focus: "Rest and Recovery",
            exercises: []
          }
        ]
      };
    }

    let scheduleData = parsedPlan?.schedule || [];
    
    // Duplicate 7-day schedule to create a full 30-day plan
    if (scheduleData.length > 0) {
      let expandedSchedule = [];
      for (let i = 0; i < 30; i++) {
        const sourceDay = scheduleData[i % scheduleData.length];
        expandedSchedule.push({
          ...sourceDay,
          day: i + 1
        });
      }
      scheduleData = expandedSchedule;
    }
    const allDbExercises = await import('../models/Exercise.js').then(m => m.default.find({}).lean());
    
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
