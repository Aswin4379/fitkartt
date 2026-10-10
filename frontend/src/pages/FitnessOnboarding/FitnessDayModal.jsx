import React from 'react';
import { X, Play, Clock, Target, Dumbbell, Flame, CheckCircle2, Activity, Snowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../../context/WorkoutContext.jsx';
import { useUser } from '../../context/UserContext.jsx';

export default function FitnessDayModal({ dayData, onClose }) {
  const navigate = useNavigate();
  const { startWorkout, activeWorkout } = useWorkout();
  const { user } = useUser();

  if (!dayData) return null;

  const isThisWorkoutActive = Boolean(
    activeWorkout && (
      (dayData.day && activeWorkout.planDay === dayData.day) ||
      (activeWorkout.name && activeWorkout.name.toLowerCase().includes(`day ${dayData.day}:`))
    )
  );

  const activeCompletedCount = isThisWorkoutActive && activeWorkout?.exercises
    ? activeWorkout.exercises.filter(ex => ex.sets?.every(s => s.isCompleted)).length
    : 0;

  const handleStart = () => {
    if (isThisWorkoutActive) {
      navigate('/fitness/active');
      return;
    }

    startWorkout({
      name: `Day ${dayData.day}: ${dayData.focus}`,
      planDay: dayData.day,
      exercises: (dayData.exercises || []).map(ex => {
        const pr = user?.fitnessStats?.workoutPRs?.[ex.name];
        const prevWeight = typeof pr === 'number' ? pr : (pr?.weight?.value || 0);
        return {
          id: ex.exerciseId || `ai-ex-${Math.random()}`,
          name: ex.name,
          type: ex.type || 'main',
          sets: Array(ex.sets || 3).fill(null).map(() => ({ reps: ex.reps || 10, weight: prevWeight, isCompleted: dayData.isCompleted || false })),
          recommendedWeight: ex.recommendedWeight || 'Bodyweight',
          restTime: ex.restTime || 60,
          targetMuscles: ex.targetMuscles || [],
          difficulty: ex.difficulty || 'Beginner',
          equipment: ex.equipment || 'None',
          reason: ex.reason || '',
          gifUrl: ex.gifUrl || '',
          videoUrl: ex.videoUrl || '',
          instructions: ex.instructions || [],
          secondary: ex.secondary || '',
          formTips: ex.formTips || '',
          commonMistakes: ex.commonMistakes || ''
        };
      })
    });
    navigate('/fitness/active');
  };

  const exerciseGroups = {
    'warm-up': (dayData.exercises || []).filter(e => e.type === 'warm-up'),
    'activation': (dayData.exercises || []).filter(e => e.type === 'activation'),
    'main': (dayData.exercises || []).filter(e => e.type === 'main' || !e.type),
    'cooldown': (dayData.exercises || []).filter(e => e.type === 'cooldown'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-[#121212] border border-zinc-800 rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 sticky top-0 bg-[#121212] z-10 rounded-t-3xl sm:rounded-t-3xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white bg-zinc-900 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
          
          <div className="text-[#2196f3] font-bold text-xs uppercase tracking-widest mb-1">Day {dayData.day}</div>
          <h2 className="text-3xl font-extrabold text-white mb-4 pr-12">{dayData.focus}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Clock size={16} className="text-amber-500" />
              <span className="font-bold">{dayData.estimatedDuration || 45} mins</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Dumbbell size={16} className="text-blue-500" />
              <span className="font-bold">{dayData.exercises.length} Exercises</span>
            </div>
            {isThisWorkoutActive && (
              <div className="flex items-center gap-1.5 text-fit-primary bg-fit-primary/10 px-3 py-1.5 rounded-lg border border-fit-primary/30 animate-pulse">
                <Activity size={16} />
                <span className="font-bold">In Progress ({activeCompletedCount}/{activeWorkout.exercises?.length || dayData.exercises.length} Done)</span>
              </div>
            )}
            {dayData.isCompleted && (
              <div className="flex items-center gap-1.5 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                <CheckCircle2 size={16} />
                <span className="font-bold">Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
          
          {Object.entries(exerciseGroups).map(([type, exercises]) => {
            if (exercises.length === 0) return null;
            
            let icon = <Target size={20} />;
            let title = "Main Workout";
            let color = "text-[#2196f3]";
            
            if (type === 'warm-up') { icon = <Flame size={20} />; title = "Warm-Up"; color = "text-amber-500"; }
            if (type === 'activation') { icon = <Activity size={20} />; title = "Muscle Activation"; color = "text-emerald-500"; }
            if (type === 'cooldown') { icon = <Snowflake size={20} />; title = "Cooldown"; color = "text-blue-400"; }

            return (
              <div key={type} className="space-y-4">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${color}`}>
                  {icon} <span className="text-white capitalize">{title}</span>
                </h3>
                
                <div className="space-y-3">
                  {exercises.map((ex, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 transition-colors hover:border-zinc-700">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-white text-lg">{ex.name}</h4>
                        <div className="text-xs font-bold px-2 py-1 bg-black rounded-md text-zinc-400 border border-zinc-800">
                          {ex.sets} × {ex.reps}
                        </div>
                      </div>
                      
                      <p className="text-sm text-zinc-400 mb-3">{ex.reason}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {ex.targetMuscles?.map(m => (
                          <span key={m} className="px-2 py-0.5 rounded text-rose-400 bg-rose-400/10">{m}</span>
                        ))}
                        {ex.equipment && (
                          <span className="px-2 py-0.5 rounded text-blue-400 bg-blue-400/10">{ex.equipment}</span>
                        )}
                        <span className="px-2 py-0.5 rounded text-amber-400 bg-amber-400/10">Rest: {ex.restTime}s</span>
                        <span className="px-2 py-0.5 rounded text-emerald-400 bg-emerald-400/10">Wt: {ex.recommendedWeight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-[#121212] rounded-b-3xl">
          <button 
            onClick={handleStart}
            className={`w-full py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all ${
              isThisWorkoutActive
                ? 'bg-fit-primary text-black hover:scale-[1.02] shadow-[0_0_25px_rgba(34,197,94,0.4)] animate-pulse'
                : dayData.isCompleted 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                : 'bg-[#2196f3] text-black hover:scale-[1.02] hover:bg-[#1976d2] shadow-[0_0_20px_rgba(33,150,243,0.3)]'
            }`}
          >
            {isThisWorkoutActive ? (
              <><Play fill="currentColor" size={20} /> Resume In-Progress Workout ({activeCompletedCount} of {activeWorkout.exercises?.length || dayData.exercises.length} Done)</>
            ) : dayData.isCompleted ? (
              'View / Re-do Workout'
            ) : (
              <><Play fill="currentColor" size={20} /> Start Workout Session</>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
