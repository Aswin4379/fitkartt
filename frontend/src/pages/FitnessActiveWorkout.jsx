import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle, Plus, X, ChevronLeft, ChevronRight, Save, Clock, Trash2, StopCircle } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { exerciseApi } from '../services/api.js';

export default function FitnessActiveWorkout() {
  const navigate = useNavigate();
  const { activeWorkout, workoutStartTime, endWorkout, cancelWorkout, updateSet, toggleSetComplete, addExerciseToActive, removeExerciseFromActive } = useWorkout();

  const [duration, setDuration] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercisesDb, setExercisesDb] = useState([]);
  const [showAddExercise, setShowAddExercise] = useState(false);
  
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
    if (!isResting || restTimer <= 0) {
      setIsResting(false);
      return;
    }
    const interval = setInterval(() => {
      setRestTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  useEffect(() => {
    // Load exercise DB for adding
    exerciseApi.getExercises({ limit: 50 }).then(data => setExercisesDb(data.exercises || data)).catch(console.error);
  }, []);

  if (!activeWorkout) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
            <StopCircle size={40} className="text-zinc-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Active Workout</h2>
          <p className="text-zinc-400 mb-6">Start a new workout or pick a routine from the library.</p>
          <button onClick={() => navigate('/fitness')} className="bg-fit-primary text-black px-6 py-3 rounded-full font-bold hover:bg-green-500 transition-colors">
            Go to Gym Dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleCompleteSet = (exIndex, setIndex) => {
    toggleSetComplete(exIndex, setIndex);
    const isNowCompleted = !activeWorkout.exercises[exIndex].sets[setIndex].isCompleted;
    if (isNowCompleted) {
      setRestTimer(60); // Default 60s rest
      setIsResting(true);
    }
  };

  const handleFinish = async () => {
    const isAllDone = activeWorkout.exercises.every(ex => ex.sets.every(s => s.isCompleted));
    if (!isAllDone) {
      if (!window.confirm("You have incomplete sets. Finish workout anyway?")) return;
    }
    try {
      await endWorkout();
      navigate('/fitness');
    } catch (err) {
      alert("Failed to save workout");
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">{activeWorkout.name}</h1>
          <div className="text-fit-primary font-mono text-sm flex items-center gap-1">
            <Clock size={14} /> {formatTime(duration)}
          </div>
        </div>
        <button onClick={handleFinish} className="bg-fit-primary text-black px-4 py-1.5 rounded-full font-bold text-sm">
          Finish
        </button>
      </div>

      {/* Rest Timer Float */}
      {isResting && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-fit-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-bounce">
          <div className="font-mono text-xl font-bold">{formatTime(restTimer)}</div>
          <button onClick={() => setIsResting(false)} className="text-zinc-400 hover:text-white">Skip</button>
        </div>
      )}

      {/* Workout Content */}
      <div className="flex-1 p-4 pb-32 max-w-3xl mx-auto w-full space-y-6">
        
        {activeWorkout.exercises.map((ex, exIndex) => (
          <div key={exIndex} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-zinc-800 bg-black/20">
              <div>
                <h3 className="font-bold text-lg text-fit-primary">{ex.name}</h3>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{ex.target}</span>
              </div>
              <button onClick={() => removeExerciseFromActive(exIndex)} className="text-zinc-600 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">
                <div>Set</div>
                <div>kg</div>
                <div>Reps</div>
                <div>Done</div>
              </div>

              {ex.sets.map((set, setIndex) => (
                <div key={setIndex} className={`grid grid-cols-4 gap-2 items-center text-center p-2 rounded-lg transition-colors ${set.isCompleted ? 'bg-fit-primary/10' : 'hover:bg-zinc-800'}`}>
                  <div className="font-bold text-zinc-400">{setIndex + 1}</div>
                  
                  <input
                    type="number"
                    value={set.weight === 0 ? '' : set.weight}
                    placeholder="0"
                    onChange={(e) => updateSet(exIndex, setIndex, 'weight', Number(e.target.value))}
                    disabled={set.isCompleted}
                    className="w-full bg-black border border-zinc-700 rounded p-1 text-center font-mono text-white focus:border-fit-primary disabled:opacity-50"
                  />
                  
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(exIndex, setIndex, 'reps', Number(e.target.value))}
                    disabled={set.isCompleted}
                    className="w-full bg-black border border-zinc-700 rounded p-1 text-center font-mono text-white focus:border-fit-primary disabled:opacity-50"
                  />
                  
                  <button
                    onClick={() => handleCompleteSet(exIndex, setIndex)}
                    className={`mx-auto w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                      set.isCompleted ? 'bg-fit-primary text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={() => {
                  const newSets = [...ex.sets, { reps: ex.sets[ex.sets.length-1]?.reps || 10, weight: ex.sets[ex.sets.length-1]?.weight || 0, isCompleted: false }];
                  activeWorkout.exercises[exIndex].sets = newSets;
                  updateSet(exIndex, newSets.length - 1, 'reps', newSets[newSets.length-1].reps); // trigger re-render hack
                }}
                className="w-full py-2 mt-2 border border-dashed border-zinc-700 text-zinc-400 rounded-lg text-sm font-semibold hover:border-zinc-500 hover:text-white transition-colors"
              >
                + Add Set
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setShowAddExercise(true)}
          className="w-full py-4 bg-black border-2 border-dashed border-fit-primary/30 text-fit-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-fit-primary/10 transition-colors"
        >
          <Plus size={20} /> Add Exercise
        </button>

        <div className="flex justify-center mt-8">
           <button onClick={cancelWorkout} className="text-red-500/70 hover:text-red-500 text-sm font-semibold underline underline-offset-4">Cancel Workout</button>
        </div>

      </div>

      {/* Add Exercise Modal */}
      {showAddExercise && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Select Exercise</h2>
            <button onClick={() => setShowAddExercise(false)} className="p-2 bg-zinc-900 rounded-full"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pb-20">
            {exercisesDb.map(ex => (
              <div key={ex._id} onClick={() => { addExerciseToActive(ex); setShowAddExercise(false); }} className="p-4 bg-zinc-900 rounded-xl flex justify-between items-center cursor-pointer hover:border-fit-primary border border-transparent">
                <div>
                  <h4 className="font-bold">{ex.name}</h4>
                  <p className="text-xs text-zinc-400 uppercase">{ex.target}</p>
                </div>
                <Plus className="text-fit-primary" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
