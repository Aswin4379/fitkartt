import React, { createContext, useContext, useState, useEffect } from 'react';
import { workoutApi } from '../services/api.js';
import { useUser } from './UserContext.jsx';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const { user } = useUser();
  
  // Active workout session state
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  
  // Persisted data
  const [sessions, setSessions] = useState([]);
  const [customRoutines, setCustomRoutines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setSessions([]);
      setCustomRoutines([]);
      setActiveWorkout(null);
      setWorkoutStartTime(null);
    }
  }, [user]);

  // Sync active workout to DB whenever it changes
  useEffect(() => {
    if (activeWorkout) {
      const timeout = setTimeout(() => {
        workoutApi.saveActiveSession(activeWorkout).catch(err => console.error('Failed to sync active session', err));
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (activeWorkout === null && user && !loading) {
      workoutApi.clearActiveSession().catch(() => {});
    }
  }, [activeWorkout]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [sessRes, routRes, activeRes] = await Promise.all([
        workoutApi.getSessions().catch(() => []),
        workoutApi.getCustomRoutines().catch(() => []),
        workoutApi.getActiveSession().catch(() => null)
      ]);
      setSessions(sessRes);
      setCustomRoutines(routRes);
      if (activeRes) {
        setActiveWorkout(activeRes);
        setWorkoutStartTime(new Date(activeRes.startTime || Date.now()));
      }
    } catch (err) {
      console.error('Failed to load workout data', err);
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = (routine) => {
    // routine can be a template, a custom routine, or an empty object for a free workout
    const newWorkout = {
      ...(routine?._id || routine?.id ? { routineId: routine?._id || routine?.id } : {}),
      name: routine?.name || routine?.title || 'Freestyle Workout',
      startTime: new Date().toISOString(),
      exercises: routine?.exercises?.map(e => {
        const pr = user?.fitnessStats?.workoutPRs?.[e.name];
        const prevWeight = typeof pr === 'number' ? pr : (pr?.weight?.value || 0);
        return {
          exerciseId: e.exerciseId || e.id,
          name: e.name,
          targetMuscles: e.targetMuscles || e.target || [],
          restTime: e.restTime || 60,
          gifUrl: e.gifUrl || e.mediaUrl || '',
          videoUrl: e.videoUrl || '',
          instructions: e.instructions || [],
          equipment: e.equipment || '',
          secondary: e.secondary || '',
          level: e.level || '',
          formTips: e.formTips || '',
          commonMistakes: e.commonMistakes || '',
          sets: e.sets || Array(e.defaultSets || 3).fill(null).map(() => ({ reps: e.defaultReps || 10, weight: prevWeight || e.defaultWeight || 0, duration: 0, isCompleted: false }))
        };
      }) || [],
    };
    setActiveWorkout(newWorkout);
    setWorkoutStartTime(new Date());
  };

  const endWorkout = async (notes = '') => {
    if (!activeWorkout) return;
    
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime - workoutStartTime) / 1000);
    
    // Calculate simple calories (approx 5-8 kcal per min of weightlifting)
    const caloriesBurned = Math.round((durationSeconds / 60) * 6); 
    
    const sessionData = {
      ...activeWorkout,
      startTime: workoutStartTime,
      endTime,
      durationSeconds,
      caloriesBurned,
      isCompleted: true,
      notes
    };

    try {
      const savedSession = await workoutApi.saveSession(sessionData);
      setSessions([savedSession, ...sessions]);
      setActiveWorkout(null);
      setWorkoutStartTime(null);
      await workoutApi.clearActiveSession();
      return savedSession;
    } catch (error) {
      console.error('Failed to save workout session', error);
      throw error;
    }
  };

  const cancelWorkout = async () => {
    setActiveWorkout(null);
    setWorkoutStartTime(null);
    await workoutApi.clearActiveSession();
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const ex = updated.exercises[exerciseIndex];
      const newSets = [...ex.sets];
      newSets[setIndex] = { ...newSets[setIndex], [field]: value };
      ex.sets = newSets;
      return updated;
    });
  };

  const toggleSetComplete = (exerciseIndex, setIndex) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const ex = updated.exercises[exerciseIndex];
      const newSets = [...ex.sets];
      newSets[setIndex] = { ...newSets[setIndex], isCompleted: !newSets[setIndex].isCompleted };
      ex.sets = newSets;
      return updated;
    });
  };
  
  const addSetToActive = (exerciseIndex) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const ex = updated.exercises[exerciseIndex];
      // Clone last set's values or use defaults
      const lastSet = ex.sets.length > 0 ? ex.sets[ex.sets.length - 1] : { weight: 0, reps: 0, duration: 0 };
      ex.sets = [...ex.sets, { weight: lastSet.weight, reps: lastSet.reps, duration: lastSet.duration, isCompleted: false }];
      return updated;
    });
  };

  const removeSetFromActive = (exerciseIndex, setIndex) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const ex = updated.exercises[exerciseIndex];
      if (ex.sets.length <= 1) return prev; // Don't remove last set
      ex.sets = ex.sets.filter((_, idx) => idx !== setIndex);
      return updated;
    });
  };

  const addExerciseToActive = (exercise) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: [...prev.exercises, {
          exerciseId: exercise.id || exercise._id,
          name: exercise.name,
          targetMuscles: exercise.targetMuscles || exercise.target || [],
          gifUrl: exercise.gifUrl || exercise.mediaUrl || '',
          videoUrl: exercise.videoUrl || '',
          instructions: exercise.instructions || [],
          equipment: exercise.equipment || '',
          secondary: exercise.secondary || '',
          level: exercise.level || '',
          formTips: exercise.formTips || '',
          commonMistakes: exercise.commonMistakes || '',
          sets: Array(exercise.defaultSets || 3).fill(null).map(() => ({ reps: exercise.defaultReps || 10, weight: exercise.defaultWeight || 0, duration: 0, isCompleted: false }))
        }]
      };
    });
  };

  const removeExerciseFromActive = (exerciseIndex) => {
    setActiveWorkout(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated.exercises = updated.exercises.filter((_, idx) => idx !== exerciseIndex);
      return updated;
    });
  };

  const value = {
    sessions,
    customRoutines,
    loading,
    activeWorkout,
    workoutStartTime,
    loadUserData,
    startWorkout,
    endWorkout,
    cancelWorkout,
    updateSet,
    toggleSetComplete,
    addSetToActive,
    removeSetFromActive,
    addExerciseToActive,
    removeExerciseFromActive
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};
