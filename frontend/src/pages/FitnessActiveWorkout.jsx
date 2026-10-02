import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, CheckCircle, Plus, X, ChevronLeft, ChevronRight, Save, Clock, Trash2, StopCircle, Check, Activity } from 'lucide-react';
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
    exerciseApi.getExercises({ limit: 100 }).then(data => setExercisesDb(data.exercises || data)).catch(console.error);
  }, []);

  if (!activeWorkout) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-zinc-800/50">
            <StopCircle size={48} className="text-zinc-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">No Active Workout</h2>
          <p className="text-zinc-400 mb-8 max-w-sm text-lg">Start a new workout or pick a routine from the library to begin tracking.</p>
          <button onClick={() => navigate('/fitness')} className="bg-gradient-to-r from-fit-primary to-emerald-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]">
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
      setShowFinishConfirm(true);
      return;
    }
    await executeFinish();
  };

  const executeFinish = async () => {
    try {
      setSaveError('');
      await endWorkout();
      navigate('/fitness');
    } catch (err) {
      setSaveError(`Failed to save workout: ${err.message || 'Unknown error'}`);
      setShowFinishConfirm(false);
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
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="fixed top-0 left-0 w-full h-96 bg-fit-primary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-3/4 h-96 bg-emerald-900/20 blur-[150px] pointer-events-none -z-10" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">
            <Activity className="text-fit-primary animate-pulseSlow" size={20} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight leading-tight text-white">{activeWorkout.name}</h1>
            <div className="text-fit-primary font-mono text-sm flex items-center gap-1.5 opacity-90">
              <Clock size={13} /> {formatTime(duration)}
            </div>
          </div>
        </div>
        <button onClick={handleFinish} className="bg-white text-black px-5 py-2 rounded-full font-extrabold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Finish
        </button>
      </div>

      {/* Error Toast */}
      {saveError && (
        <div className="mx-4 mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <p className="text-red-400 text-sm font-bold">{saveError}</p>
          <button onClick={() => setSaveError('')} className="text-red-400 hover:text-red-300">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Rest Timer Float */}
      {isResting && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-md border border-fit-primary/50 text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center gap-4 animate-floatUp">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-fit-primary animate-ping" />
            <span className="text-zinc-300 text-sm font-semibold">Resting</span>
          </div>
          <div className="font-mono text-2xl font-bold tracking-tight text-fit-primary">{formatTime(restTimer)}</div>
          <button onClick={() => setIsResting(false)} className="ml-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Workout Content */}
      <div className="flex-1 p-4 pb-32 max-w-3xl mx-auto w-full space-y-6 relative z-10 mt-2">
        
        {activeWorkout.exercises.map((ex, exIndex) => (
          <div key={exIndex} className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all hover:border-white/20">
            
            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/5">
              {/* Exercise Thumbnail */}
              {ex.gifUrl || ex.imageUrl ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img src={ex.gifUrl || ex.imageUrl} alt={ex.name} className="w-full h-full object-cover opacity-80" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Activity className="text-zinc-500" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-lg text-white truncate">{ex.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-fit-primary/10 text-fit-primary text-[10px] uppercase tracking-widest font-bold">
                    {ex.target}
                  </span>
                </div>
              </div>

              <button onClick={() => removeExerciseFromActive(exIndex)} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_2fr_2fr_1fr] gap-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest text-center px-2">
                <div>Set</div>
                <div>kg</div>
                <div>Reps</div>
                <div>Done</div>
              </div>

              <div className="space-y-2">
                {ex.sets.map((set, setIndex) => (
                  <div key={setIndex} className={`grid grid-cols-[1fr_2fr_2fr_1fr] gap-3 items-center text-center p-2 rounded-2xl transition-all duration-300 ${set.isCompleted ? 'bg-fit-primary/5 border border-fit-primary/20' : 'bg-black/40 border border-transparent hover:border-white/5'}`}>
                    
                    <div className={`font-bold ${set.isCompleted ? 'text-fit-primary' : 'text-zinc-500'}`}>
                      {setIndex + 1}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={set.weight === 0 ? '' : set.weight}
                        placeholder="0"
                        onChange={(e) => updateSet(exIndex, setIndex, 'weight', Number(e.target.value))}
                        disabled={set.isCompleted}
                        className={`w-full bg-zinc-800/50 border rounded-xl py-2.5 text-center font-mono text-white text-lg font-bold transition-colors outline-none
                          ${set.isCompleted ? 'border-transparent text-white/50 bg-transparent' : 'border-zinc-700/50 focus:border-fit-primary focus:bg-zinc-800 focus:shadow-[0_0_15px_rgba(34,197,94,0.15)]'}
                        `}
                      />
                    </div>
                    
                    <div className="relative">
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSet(exIndex, setIndex, 'reps', Number(e.target.value))}
                        disabled={set.isCompleted}
                        className={`w-full bg-zinc-800/50 border rounded-xl py-2.5 text-center font-mono text-white text-lg font-bold transition-colors outline-none
                          ${set.isCompleted ? 'border-transparent text-white/50 bg-transparent' : 'border-zinc-700/50 focus:border-fit-primary focus:bg-zinc-800 focus:shadow-[0_0_15px_rgba(34,197,94,0.15)]'}
                        `}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleCompleteSet(exIndex, setIndex)}
                      className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform active:scale-90 ${
                        set.isCompleted 
                          ? 'bg-fit-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                          : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {set.isCompleted ? <Check size={20} strokeWidth={3} /> : <CheckCircle size={20} />}
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  const newSets = [...ex.sets, { reps: ex.sets[ex.sets.length-1]?.reps || 10, weight: ex.sets[ex.sets.length-1]?.weight || 0, isCompleted: false }];
                  activeWorkout.exercises[exIndex].sets = newSets;
                  updateSet(exIndex, newSets.length - 1, 'reps', newSets[newSets.length-1].reps); 
                }}
                className="w-full py-3 mt-4 bg-white/5 border border-dashed border-white/10 text-zinc-300 rounded-xl text-sm font-bold hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Set
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setShowAddExercise(true)}
          className="w-full py-5 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/10 text-white rounded-3xl font-extrabold text-lg flex items-center justify-center gap-2 hover:border-fit-primary/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fit-primary group-hover:text-black transition-colors">
            <Plus size={18} />
          </div>
          Add Exercise
        </button>

        <div className="flex justify-center mt-12 mb-6">
           <button 
             onClick={() => {
               if(window.confirm("Are you sure you want to cancel this workout? Data will be lost.")) {
                 cancelWorkout();
               }
             }} 
             className="text-red-500/60 hover:text-red-500 text-sm font-semibold tracking-wide transition-colors"
           >
             Cancel Workout
           </button>
        </div>

      </div>

      {/* Premium Finish Confirmation Modal */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 mx-auto">
              <CheckCircle size={32} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-center text-white mb-2">Incomplete Sets</h3>
            <p className="text-zinc-400 text-center text-sm mb-8 leading-relaxed">
              You still have sets that aren't marked as done. Are you sure you want to finish this workout anyway?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 py-3.5 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={executeFinish}
                className="flex-1 py-3.5 bg-amber-500 text-black rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                Finish Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Exercise Premium Modal */}
      {showAddExercise && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-0 sm:p-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#0a0a0c] sm:rounded-3xl flex-1 flex flex-col overflow-hidden sm:border border-white/10 relative">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Exercise Library</h2>
                <p className="text-zinc-400 text-sm mt-1">Tap an exercise to add it to your workout.</p>
              </div>
              <button onClick={() => setShowAddExercise(false)} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <X size={20} className="text-white"/>
              </button>
            </div>
            
            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {exercisesDb.map(ex => (
                <div 
                  key={ex._id} 
                  onClick={() => { addExerciseToActive(ex); setShowAddExercise(false); }} 
                  className="p-3 bg-zinc-900/40 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-zinc-800 border border-transparent hover:border-white/10 transition-all group"
                >
                  {/* Small Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-black overflow-hidden relative">
                    {ex.gifUrl || ex.imageUrl ? (
                      <img src={ex.gifUrl || ex.imageUrl} alt={ex.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Activity size={20} className="text-zinc-600" /></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base truncate">{ex.name}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-fit-primary/10 text-fit-primary text-[10px] uppercase tracking-widest font-bold mt-1">
                      {ex.target}
                    </span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-fit-primary group-hover:text-black transition-colors mr-2">
                    <Plus size={20} />
                  </div>
                </div>
              ))}
              
              {exercisesDb.length === 0 && (
                <div className="text-center py-20 text-zinc-500">
                  <Activity size={40} className="mx-auto mb-4 opacity-50" />
                  <p>Loading exercises...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
