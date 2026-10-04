import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle, Plus, X, ChevronLeft, ChevronRight, Save, Clock, Trash2, StopCircle, Check, Activity, Dumbbell, Smartphone } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { exerciseApi } from '../services/api.js';

export default function FitnessActiveWorkoutClassic({ onSwitchTheme }) {
  const navigate = useNavigate();
  const { activeWorkout, workoutStartTime, endWorkout, cancelWorkout, updateSet, toggleSetComplete, addExerciseToActive, removeExerciseFromActive } = useWorkout();

  const [duration, setDuration] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercisesDb, setExercisesDb] = useState([]);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  // Timer for workout duration
  useEffect(() => {
    if (!workoutStartTime) return;
    const interval = setInterval(() => {
      setDuration(Math.floor((new Date() - workoutStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [workoutStartTime]);

  // Rest Timer
  useEffect(() => {
    let interval;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    } else if (restTimer === 0) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // Fetch exercises for adding to workout
  useEffect(() => {
    if (showAddExercise && exercisesDb.length === 0) {
      const loadExercises = async () => {
        try {
          const data = await exerciseApi.getExercises({ limit: 100 });
          setExercisesDb(data.exercises || data);
        } catch (error) {
          console.error("Failed to load exercises", error);
        }
      };
      loadExercises();
    }
  }, [showAddExercise, exercisesDb.length]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCompleteSet = (exIndex, setIndex) => {
    toggleSetComplete(exIndex, setIndex);
    const exercise = activeWorkout.exercises[exIndex];
    if (!exercise.sets[setIndex].isCompleted) {
      // Starting rest timer (was just marked complete)
      setRestTimer(90); // 90 seconds default rest
      setIsResting(true);
    } else {
      setIsResting(false);
    }
  };

  const handleFinish = () => {
    const hasIncomplete = activeWorkout.exercises.some(ex => ex.sets.some(s => !s.isCompleted));
    if (hasIncomplete) {
      setShowFinishConfirm(true);
    } else {
      executeFinish();
    }
  };

  const executeFinish = async () => {
    try {
      setShowFinishConfirm(false);
      await endWorkout(duration);
      navigate('/fitness');
    } catch (err) {
      setSaveError(err.message || 'Failed to save workout. Please try again.');
    }
  };

  if (!activeWorkout) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-zinc-400 font-sans">
        No active workout.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 font-sans">
      {/* Top App Bar */}
      <div className="sticky top-0 z-40 bg-[#1e1e1e] border-b border-zinc-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Activity className="text-[#2196f3]" size={22} />
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">{activeWorkout.name}</h1>
            <div className="text-[#2196f3] text-sm flex items-center gap-1.5 font-medium">
              <Clock size={14} /> {formatTime(duration)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onSwitchTheme} className="text-zinc-400 hover:text-white p-2">
            <Smartphone size={20} />
          </button>
          <button 
            onClick={handleFinish} 
            className="bg-[#2196f3] text-white px-5 py-1.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#1976d2] transition-colors"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Error Toast */}
      {saveError && (
        <div className="mx-4 mt-4 p-3 bg-red-900/50 border border-red-500 rounded flex items-center justify-between">
          <p className="text-red-200 text-sm">{saveError}</p>
          <button onClick={() => setSaveError('')} className="text-red-300">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Exercises List */}
      <div className="p-4 space-y-4">
        {activeWorkout.exercises.map((ex, exIndex) => (
          <div key={`${ex.exerciseId}-${exIndex}`} className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-zinc-800 shadow-md">
            
            {/* Exercise Header */}
            <div className="flex items-center justify-between p-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Dumbbell size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white leading-tight">{ex.name}</h3>
                  <span className="text-[#2196f3] text-xs font-bold uppercase mt-0.5 block">{ex.target}</span>
                </div>
              </div>
              <button onClick={() => removeExerciseFromActive(exIndex)} className="p-2 text-zinc-500 hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Sets Table */}
            <div className="p-0">
              <div className="grid grid-cols-4 gap-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-4 py-2 border-b border-zinc-800/50 bg-[#161616]">
                <div className="text-center">Set</div>
                <div className="text-center">KG</div>
                <div className="text-center">Reps</div>
                <div className="text-center">Done</div>
              </div>

              {ex.sets.map((set, setIndex) => (
                <div 
                  key={setIndex} 
                  className={`grid grid-cols-4 gap-2 items-center px-4 py-2 border-b border-zinc-800/50 transition-colors ${set.isCompleted ? 'bg-[#2196f3]/10' : ''}`}
                >
                  <div className="text-center font-bold text-zinc-400">
                    {setIndex + 1}
                  </div>
                  <div className="text-center">
                    <input
                      type="number"
                      value={set.weight || ''}
                      onChange={(e) => updateSet(exIndex, setIndex, 'weight', Number(e.target.value))}
                      className="w-full bg-zinc-800 text-white text-center rounded py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#2196f3]"
                      placeholder="0"
                    />
                  </div>
                  <div className="text-center">
                    <input
                      type="number"
                      value={set.reps || ''}
                      onChange={(e) => updateSet(exIndex, setIndex, 'reps', Number(e.target.value))}
                      className="w-full bg-zinc-800 text-white text-center rounded py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#2196f3]"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleCompleteSet(exIndex, setIndex)}
                      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                        set.isCompleted ? 'bg-[#2196f3] text-white' : 'bg-zinc-700 text-zinc-400'
                      }`}
                    >
                      <Check size={18} strokeWidth={set.isCompleted ? 3 : 2} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-2">
                <button
                  onClick={() => {
                    const newSets = [...ex.sets, { reps: ex.sets[ex.sets.length-1]?.reps || 10, weight: ex.sets[ex.sets.length-1]?.weight || 0, isCompleted: false }];
                    activeWorkout.exercises[exIndex].sets = newSets;
                    updateSet(exIndex, newSets.length - 1, 'reps', newSets[newSets.length-1].reps); 
                  }}
                  className="w-full py-2 text-sm font-bold text-[#2196f3] hover:bg-[#2196f3]/10 rounded flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus size={16} /> Add Set
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddExercise(true)}
          className="w-full bg-[#1e1e1e] border border-[#2196f3]/30 text-[#2196f3] rounded-lg py-3 font-bold flex items-center justify-center gap-2 hover:bg-[#2196f3]/10 transition-colors shadow-sm"
        >
          <Plus size={18} /> Add Exercise
        </button>
      </div>

      {/* Rest Timer Overlay */}
      {isResting && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-[#2196f3] text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={20} />
            <div>
              <div className="text-xs font-bold uppercase opacity-80">Rest Time</div>
              <div className="text-lg font-bold">00:{restTimer.toString().padStart(2, '0')}</div>
            </div>
          </div>
          <button 
            onClick={() => setIsResting(false)} 
            className="text-white/80 hover:text-white uppercase text-xs font-bold tracking-wider"
          >
            Skip
          </button>
        </div>
      )}

      {/* Modals */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] w-full max-w-sm rounded-lg overflow-hidden shadow-2xl">
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2">Incomplete Workout</h3>
              <p className="text-zinc-400 text-sm">You have some incomplete sets. Are you sure you want to finish this workout anyway?</p>
            </div>
            <div className="flex border-t border-zinc-800">
              <button 
                onClick={() => setShowFinishConfirm(false)} 
                className="flex-1 py-3 text-zinc-400 font-bold border-r border-zinc-800 hover:bg-zinc-800/50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeFinish} 
                className="flex-1 py-3 text-[#2196f3] font-bold hover:bg-zinc-800/50 transition-colors"
              >
                Finish Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddExercise && (
        <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-zinc-800">
            <h2 className="text-lg font-bold text-white">Select Exercise</h2>
            <button onClick={() => setShowAddExercise(false)} className="text-zinc-400">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {exercisesDb.map((ex) => (
              <div 
                key={ex.id || ex._id} 
                onClick={() => {
                  addExerciseToActive(ex);
                  setShowAddExercise(false);
                }}
                className="flex items-center gap-3 p-3 border-b border-zinc-800/50 active:bg-zinc-800/50 cursor-pointer hover:bg-[#1e1e1e]"
              >
                <div className="w-12 h-12 rounded bg-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {ex.imageUrl ? (
                    <img src={ex.imageUrl} alt={ex.name} className="w-full h-full object-cover" />
                  ) : (
                    <Dumbbell size={20} className="text-zinc-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-medium">{ex.name}</h4>
                  <p className="text-[#2196f3] text-xs font-bold uppercase mt-0.5">{ex.target}</p>
                </div>
              </div>
            ))}

            {exercisesDb.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                <Dumbbell size={40} className="mx-auto mb-4 opacity-50" />
                <p>Loading exercises...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
