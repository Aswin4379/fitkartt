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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-fit-surface border border-fit-border rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-fit-border sticky top-0 bg-fit-surface z-10 rounded-t-3xl sm:rounded-t-3xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-fit-muted hover:text-fit-text bg-fit-surface2 border border-fit-border p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
          
          <div className="text-[#2196f3] font-bold text-xs uppercase tracking-widest mb-1">Day {dayData.day}</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-fit-text mb-4 pr-12">{dayData.focus}</h2>
          
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-fit-text bg-fit-surface2 px-3 py-1.5 rounded-lg border border-fit-border">
              <Clock size={16} className="text-amber-500" />
              <span className="font-bold">{dayData.estimatedDuration || 45} mins</span>
            </div>
            <div className="flex items-center gap-1.5 text-fit-text bg-fit-surface2 px-3 py-1.5 rounded-lg border border-fit-border">
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
              <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
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
                  {icon} <span className="text-fit-text capitalize">{title}</span>
                </h3>
                
                <div className="space-y-3">
                  {exercises.map((ex, i) => (
                    <div key={i} className="bg-fit-surface2/60 border border-fit-border rounded-2xl p-4 transition-colors hover:border-fit-primary/40 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-fit-text text-base sm:text-lg">{ex.name}</h4>
                        <div className="text-xs font-bold px-2 py-1 bg-fit-surface rounded-md text-fit-muted border border-fit-border">
                          {ex.sets} × {ex.reps}
                        </div>
                      </div>
                      
                      <p className="text-sm text-fit-muted mb-3">{ex.reason}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {ex.targetMuscles?.map(m => (
                          <span key={m} className="px-2 py-0.5 rounded text-rose-500 bg-rose-500/10 border border-rose-500/20">{m}</span>
                        ))}
                        {ex.equipment && (
                          <span className="px-2 py-0.5 rounded text-blue-500 bg-blue-500/10 border border-blue-500/20">{ex.equipment}</span>
                        )}
                        <span className="px-2 py-0.5 rounded text-amber-500 bg-amber-500/10 border border-amber-500/20">Rest: {ex.restTime}s</span>
                        <span className="px-2 py-0.5 rounded text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">Wt: {ex.recommendedWeight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-fit-border bg-fit-surface rounded-b-3xl">
          <button 
            onClick={handleStart}
            className={`w-full py-4 rounded-xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md ${
              isThisWorkoutActive
                ? 'bg-fit-primary text-white hover:scale-[1.02] shadow-glow animate-pulse'
                : dayData.isCompleted 
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/25'
                : 'bg-[#2196f3] text-white hover:scale-[1.02] hover:bg-[#1976d2]'
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
