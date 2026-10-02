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
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [sessRes, routRes] = await Promise.all([
        workoutApi.getSessions().catch(() => []),
        workoutApi.getCustomRoutines().catch(() => [])
      ]);
      setSessions(sessRes);
      setCustomRoutines(routRes);
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
      exercises: routine?.exercises?.map(e => ({
        exerciseId: e.exerciseId || e.id,
        name: e.name,
        target: e.target,
        sets: Array(e.defaultSets || 3).fill(null).map(() => ({ reps: e.defaultReps || 10, weight: e.defaultWeight || 0, isCompleted: false }))
      })) || [],
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
      return savedSession;
    } catch (error) {
      console.error('Failed to save workout session', error);
      throw error;
    }
  };

  const cancelWorkout = () => {
    if (window.confirm('Are you sure you want to cancel this workout? Data will not be saved.')) {
      setActiveWorkout(null);
      setWorkoutStartTime(null);
    }
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    setActiveWorkout(prev => {
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
      const updated = { ...prev };
      const ex = updated.exercises[exerciseIndex];
      const newSets = [...ex.sets];
      newSets[setIndex] = { ...newSets[setIndex], isCompleted: !newSets[setIndex].isCompleted };
      ex.sets = newSets;
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
          target: exercise.target,
          sets: Array(exercise.defaultSets || 3).fill(null).map(() => ({ reps: exercise.defaultReps || 10, weight: exercise.defaultWeight || 0, isCompleted: false }))
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
    addExerciseToActive,
    removeExerciseFromActive
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};
