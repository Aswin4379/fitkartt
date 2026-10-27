import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar as CalendarIcon, CheckCircle2, Play, Lock, Info, Activity, RotateCcw, AlertTriangle, X, Clock } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import FitnessDayModal from './FitnessDayModal.jsx';

export default function FitnessAIPlan({ fitnessPlan }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const { startWorkout, activeWorkout, cancelWorkout } = useWorkout();
  const { user, resetFitnessPlan } = useUser();

  if (!fitnessPlan || !fitnessPlan.onboarded) {
    return (
      <div className="bg-gradient-to-br from-fit-surface via-fit-surface to-fit-surface2 border border-fit-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-card">
        <div className="absolute -right-20 -top-20 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <Sparkles size={200} className="text-fit-primary" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-600 text-white dark:bg-[#2196f3] dark:text-black text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">New</span>
            <h3 className="text-2xl font-extrabold text-fit-text">AI 30-Day Program</h3>
          </div>
          <p className="text-fit-muted text-sm leading-relaxed mb-6">
            Generate a hyper-personalized 30-day workout calendar tailored exactly to your body type, goals, and target muscle groups.
          </p>
          <button 
            onClick={() => navigate('/fitness/onboarding')}
            className="bg-fit-primary hover:bg-fit-primary-dark text-white font-extrabold px-6 py-3 rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-md hover:shadow-glow cursor-pointer"
          >
            <Sparkles size={18} />
            Generate My Plan
          </button>
        </div>

        <div className="relative z-10 w-full md:w-auto flex-shrink-0 grid grid-cols-3 gap-2 opacity-90 pointer-events-none">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div 
              key={i} 
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                i === 5 
                  ? 'border-blue-500 bg-blue-500/15 text-blue-600 dark:text-blue-400 font-black shadow-sm ring-2 ring-blue-500/20' 
                  : 'border-fit-border bg-fit-surface2/80 text-fit-muted font-bold'
              }`}
            >
              <span className="text-xs">{i}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Helper to check if a date string/object is today in local time
  const isDateToday = (dateValue) => {
    if (!dateValue) return false;
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return false;
      const today = new Date();
      return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      );
    } catch {
      return false;
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const completedScheduleDays = (fitnessPlan.schedule || []).filter(s => s.isCompleted);
  const completedDays = completedScheduleDays.map(s => s.day);
  const maxCompletedDay = completedDays.length > 0 ? Math.max(...completedDays) : 0;
  const nextIncompleteDay = (fitnessPlan.schedule || []).find(s => !s.isCompleted)?.day || 30;

  // Determine if a plan workout (or any workout) was completed today
  const dayCompletedToday = completedScheduleDays.find(s => isDateToday(s.completedAt));
  const hasWorkoutLoggedToday = Boolean(
    dayCompletedToday ||
    (user?.fitnessStats?.activity?.workoutsCompletedToday > 0 && user?.fitnessStats?.activity?.lastUpdatedDate === todayStr) ||
    (user?.fitnessStats?.workoutStats?.lastWorkoutDate === todayStr) ||
    (user?.fitnessStats?.workoutLogs?.[0] && (
      isDateToday(user.fitnessStats.workoutLogs[0].completedAt) ||
      user.fitnessStats.workoutLogs[0].date === todayStr
    ))
  );

  const isTodayWorkoutDone = Boolean(maxCompletedDay > 0 && (dayCompletedToday || hasWorkoutLoggedToday));
  const todayDoneDay = dayCompletedToday?.day || maxCompletedDay;

  // Determine currentDay
  let currentDay = nextIncompleteDay;
  if (activeWorkout?.planDay) {
    currentDay = activeWorkout.planDay;
  } else if (isTodayWorkoutDone) {
    currentDay = todayDoneDay;
  }

  const currentDayData = fitnessPlan.schedule?.find(s => s.day === currentDay);
  const isCurrentDayActive = Boolean(
    activeWorkout && (
      (activeWorkout.planDay === currentDay) ||
      (activeWorkout.name && activeWorkout.name.toLowerCase().includes(`day ${currentDay}:`))
    )
  );

  const handleStartDay = (dayData) => {
    if (!dayData?.exercises || dayData.exercises.length === 0) return; // Rest day
    setSelectedDay(dayData);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-xl font-bold text-fit-text flex items-center gap-2">
            <CalendarIcon size={20} className="text-[#2196f3]" />
            Your 30-Day Plan
          </h3>

          {isTodayWorkoutDone ? (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs font-black text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 size={13} /> Day {todayDoneDay} Done Today
              </div>
              <span className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-1">
                <Clock size={11} /> Next: Day {todayDoneDay + 1} Tomorrow
              </span>
            </div>
          ) : (
            <div className="text-xs font-bold text-[#2196f3] uppercase tracking-wider bg-[#2196f3]/10 px-3 py-1 rounded-full border border-[#2196f3]/20">
              Day {currentDay} / 30
            </div>
          )}

          {isCurrentDayActive && (
            <span className="text-[11px] font-black text-fit-primary bg-fit-primary/10 border border-fit-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Activity size={12} /> IN PROGRESS
            </span>
          )}
        </div>
        
        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-2 rounded-full text-xs font-bold border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Cancel or reset this 30-day plan"
          >
            <RotateCcw size={13} />
            <span>Cancel Plan</span>
          </button>

          {isCurrentDayActive ? (
            <button 
              onClick={() => handleStartDay(currentDayData)}
              className="px-5 py-2 rounded-full text-sm font-extrabold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg bg-fit-primary text-white shadow-glow animate-pulse"
            >
              Resume Day {currentDay} <Play size={14} fill="currentColor" />
            </button>
          ) : isTodayWorkoutDone ? (
            <button 
              onClick={() => handleStartDay(fitnessPlan.schedule?.find(s => s.day === todayDoneDay))}
              className="px-5 py-2 rounded-full text-sm font-extrabold hover:scale-105 transition-all flex items-center justify-center gap-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 shadow-sm"
              title="Today's workout completed! Click to view summary"
            >
              <CheckCircle2 size={16} /> Today Completed 🎉 (Rest Day)
            </button>
          ) : currentDayData && currentDayData.exercises.length > 0 ? (
            <button 
              onClick={() => handleStartDay(currentDayData)}
              className="px-5 py-2 rounded-full text-sm font-extrabold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg bg-[#2196f3] text-white shadow-md"
            >
              Start Day {currentDay} <Play size={14} fill="currentColor" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Horizontal Scroll Calendar */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {fitnessPlan.schedule?.map((day) => {
          const isThisDayActive = Boolean(
            activeWorkout && (
              (activeWorkout.planDay === day.day) ||
              (activeWorkout.name && activeWorkout.name.toLowerCase().includes(`day ${day.day}:`))
            )
          );
          
          const isCompleted = day.isCompleted;
          const isCompletedToday = isCompleted && isTodayWorkoutDone && day.day === todayDoneDay;
          const isScheduledForTomorrow = isTodayWorkoutDone && day.day === todayDoneDay + 1;
          const isTodayToWorkOut = !isTodayWorkoutDone && day.day === currentDay;
          const isPast = day.day < currentDay;
          const isFuture = day.day > currentDay;
          const isRest = !day.exercises || day.exercises.length === 0;
          const canView = !isRest;

          return (
            <div 
              key={day.day}
              onClick={() => canView && handleStartDay(day)}
              className={`snap-start flex-shrink-0 w-64 rounded-2xl p-5 border flex flex-col transition-all relative overflow-hidden shadow-card ${
                canView ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''
              } ${
                isThisDayActive
                  ? 'bg-gradient-to-b from-fit-primary/15 to-fit-surface border-fit-primary shadow-glow'
                  : isCompleted
                  ? 'bg-fit-surface border-emerald-500/40 hover:border-emerald-500/70 shadow-sm'
                  : isScheduledForTomorrow
                  ? 'bg-fit-surface/90 border-blue-500/30 hover:border-blue-500/60'
                  : isTodayToWorkOut && !isRest
                  ? 'bg-gradient-to-b from-[#2196f3]/15 to-fit-surface border-[#2196f3]'
                  : isPast && !isRest
                  ? 'bg-fit-surface border-amber-500/30 hover:border-amber-500/50'
                  : isRest
                  ? 'bg-fit-surface2/60 border-fit-border/60 opacity-70'
                  : 'bg-fit-surface/80 border-fit-border opacity-90'
              }`}
            >
              {isThisDayActive ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-fit-primary/20 border border-fit-primary/40 px-2 py-0.5 rounded-full text-fit-primary text-[10px] font-black animate-pulse">
                  <Activity size={12} /> IN PROGRESS
                </div>
              ) : isCompletedToday ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full text-emerald-500 text-[10px] font-black shadow-sm">
                  <CheckCircle2 size={12} /> COMPLETED TODAY
                </div>
              ) : isCompleted ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-500 text-[10px] font-bold">
                  <CheckCircle2 size={12} /> COMPLETED
                </div>
              ) : isScheduledForTomorrow ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full text-blue-500 text-[10px] font-bold">
                  <Clock size={11} /> TOMORROW
                </div>
              ) : isPast && !day.isCompleted && !isRest ? (
                <div className="absolute top-4 right-4 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  MISSED
                </div>
              ) : isFuture ? (
                <div className="absolute top-4 right-4 text-[10px] font-semibold text-fit-muted">
                  DAY {day.day}
                </div>
              ) : null}

              <div className="mb-4">
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  isThisDayActive ? 'text-fit-primary' : isCompleted ? 'text-emerald-500' : isScheduledForTomorrow ? 'text-blue-500' : isTodayToWorkOut ? 'text-[#2196f3]' : 'text-fit-muted'
                }`}>
                  Day {day.day}
                </div>
                <h4 className="text-lg font-extrabold text-fit-text leading-tight">
                  {day.focus}
                </h4>
              </div>

              <div className="mt-auto">
                <div className="text-sm text-fit-muted mb-4">
                  {isRest ? 'Take a break and recover.' : `${day.exercises.length} Exercises`}
                </div>

                {isRest ? (
                  <button 
                    disabled 
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-fit-surface2/70 text-fit-muted border border-fit-border/40 cursor-default"
                  >
                    Rest Day
                  </button>
                ) : isThisDayActive ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-1.5 bg-fit-primary text-white shadow-glow animate-pulse hover:scale-[1.02] transition-all"
                  >
                    <Play size={14} fill="currentColor" /> Resume Workout
                  </button>
                ) : isCompleted ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shadow-sm"
                  >
                    <CheckCircle2 size={14} /> View Completed
                  </button>
                ) : isScheduledForTomorrow ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-fit-surface2 hover:bg-fit-border text-fit-text border border-blue-500/30 hover:border-blue-500/60 transition-colors"
                  >
                    <Info size={14} className="text-blue-500" /> Scheduled Tomorrow
                  </button>
                ) : isTodayToWorkOut ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-[#2196f3] text-white hover:bg-[#1976d2] shadow-md transition-all hover:scale-[1.02]"
                  >
                    <Play size={14} fill="currentColor" /> Start Day {day.day}
                  </button>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-fit-surface2 hover:bg-fit-border text-fit-text border border-fit-border transition-colors"
                  >
                    <Info size={14} /> View Workout
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <FitnessDayModal 
          dayData={selectedDay} 
          isTodayWorkoutDone={isTodayWorkoutDone}
          todayDoneDay={todayDoneDay}
          onClose={() => setSelectedDay(null)} 
        />
      )}

      {/* Cancel Plan Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-fit-surface border border-fit-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-fit-text space-y-5">
            <button
              onClick={() => !isResetting && setShowResetConfirm(false)}
              className="absolute top-4 right-4 text-fit-muted hover:text-fit-text p-1.5 rounded-lg hover:bg-fit-surface2 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-fit-text">Cancel 30-Day Plan?</h4>
                <p className="text-xs text-fit-muted">Reset current schedule and start fresh</p>
              </div>
            </div>

            <p className="text-sm text-fit-muted leading-relaxed">
              Are you sure you want to cancel your current 30-day program? You can immediately generate a fresh AI plan customized to your exact schedule (e.g. 5 days/week), split, and equipment.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                disabled={isResetting}
                onClick={async () => {
                  setIsResetting(true);
                  try {
                    if (activeWorkout?.planDay) {
                      await cancelWorkout();
                    }
                    await resetFitnessPlan();
                    setShowResetConfirm(false);
                    navigate('/fitness/onboarding');
                  } finally {
                    setIsResetting(false);
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold bg-fit-primary hover:bg-fit-primary-dark text-white flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles size={15} />
                {isResetting ? 'Resetting...' : 'Cancel & Create New Plan'}
              </button>

              <button
                disabled={isResetting}
                onClick={async () => {
                  setIsResetting(true);
                  try {
                    if (activeWorkout?.planDay) {
                      await cancelWorkout();
                    }
                    await resetFitnessPlan();
                    setShowResetConfirm(false);
                  } finally {
                    setIsResetting(false);
                  }
                }}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition-all cursor-pointer text-center"
              >
                {isResetting ? 'Resetting...' : 'Cancel Plan Only'}
              </button>
            </div>

            <button
              disabled={isResetting}
              onClick={() => setShowResetConfirm(false)}
              className="w-full text-center text-xs font-semibold text-fit-muted hover:text-fit-text transition-colors py-1 cursor-pointer"
            >
              Keep Current Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
