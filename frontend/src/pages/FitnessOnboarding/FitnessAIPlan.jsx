import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar as CalendarIcon, CheckCircle2, Play, Lock, Info, Activity } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext.jsx';
import FitnessDayModal from './FitnessDayModal.jsx';

export default function FitnessAIPlan({ fitnessPlan }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();
  const { startWorkout, activeWorkout } = useWorkout();

  if (!fitnessPlan || !fitnessPlan.onboarded) {
    return (
      <div className="bg-gradient-to-br from-zinc-900 to-[#121212] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles size={200} className="text-[#2196f3]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#2196f3] text-black text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">New</span>
            <h3 className="text-2xl font-extrabold text-white">AI 30-Day Program</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Generate a hyper-personalized 30-day workout calendar tailored exactly to your body type, goals, and target muscle groups.
          </p>
          <button 
            onClick={() => navigate('/fitness/onboarding')}
            className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <Sparkles size={18} />
            Generate My Plan
          </button>
        </div>

        <div className="relative z-10 w-full md:w-auto flex-shrink-0 grid grid-cols-3 gap-2 opacity-80 pointer-events-none">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`w-12 h-12 rounded-lg border flex items-center justify-center ${i === 5 ? 'border-[#2196f3] bg-[#2196f3]/10 text-[#2196f3]' : 'border-zinc-800 bg-zinc-900/50 text-zinc-600'}`}>
              <span className="text-xs font-bold">{i}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render the calendar
  // Calculate current day based on Indian Standard Time (Asia/Kolkata) calendar day difference
  const getISTDayStart = (date) => {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const parts = formatter.formatToParts(d);
    const m = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const y = parts.find(p => p.type === 'year').value;
    // Return midnight UTC just for easy day difference math
    return new Date(`${y}-${m}-${day}T00:00:00Z`);
  };

  const completedDays = (fitnessPlan.schedule || []).filter(s => s.isCompleted).map(s => s.day);
  const maxCompletedDay = completedDays.length > 0 ? Math.max(...completedDays) : 0;
  const nextIncompleteDay = (fitnessPlan.schedule || []).find(s => !s.isCompleted)?.day || 30;

  let calendarDay = 1;
  if (fitnessPlan.planGeneratedAt) {
    const startIST = getISTDayStart(fitnessPlan.planGeneratedAt);
    const todayIST = getISTDayStart(new Date());
    const diffDays = Math.floor((todayIST - startIST) / (1000 * 60 * 60 * 24));
    calendarDay = Math.min(30, Math.max(1, diffDays + 1));
  } else {
    calendarDay = nextIncompleteDay;
  }

  // Calculate currentDay taking into account:
  // 1. Active ongoing workout session
  // 2. Completed workout progress (e.g. if Day 8 is completed, current is Day 9)
  // 3. Calendar days elapsed
  let currentDay = calendarDay;
  if (activeWorkout?.planDay) {
    currentDay = activeWorkout.planDay;
  } else if (maxCompletedDay > 0) {
    currentDay = Math.min(30, Math.max(calendarDay, maxCompletedDay + 1));
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
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon size={20} className="text-[#2196f3]" />
            Your 30-Day Plan
          </h3>
          <div className="text-xs font-bold text-[#2196f3] uppercase tracking-wider bg-[#2196f3]/10 px-3 py-1 rounded-full border border-[#2196f3]/20">
            Day {currentDay} / 30
          </div>
          {isCurrentDayActive && (
            <span className="text-[11px] font-black text-fit-primary bg-fit-primary/10 border border-fit-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Activity size={12} /> IN PROGRESS
            </span>
          )}
        </div>
        
        {/* Quick Continue Button */}
        {currentDayData && currentDayData.exercises.length > 0 && (
          <button 
            onClick={() => handleStartDay(currentDayData)}
            className={`px-5 py-2 rounded-full text-sm font-extrabold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg ${
              isCurrentDayActive
                ? 'bg-fit-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.35)] animate-pulse'
                : 'bg-[#2196f3] text-black shadow-[0_0_15px_rgba(33,150,243,0.3)]'
            }`}
          >
            {isCurrentDayActive ? `Resume Day ${currentDay}` : `Start Day ${currentDay}`} <Play size={14} fill="currentColor" />
          </button>
        )}
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
          const isPast = day.day < currentDay;
          const isToday = day.day === currentDay;
          const isFuture = day.day > currentDay;
          const isRest = !day.exercises || day.exercises.length === 0;
          const canView = !isRest;

          return (
            <div 
              key={day.day}
              onClick={() => canView && handleStartDay(day)}
              className={`snap-start flex-shrink-0 w-64 rounded-2xl p-5 border flex flex-col transition-all relative overflow-hidden ${
                canView ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''
              } ${
                isThisDayActive
                  ? 'bg-gradient-to-b from-fit-primary/15 to-zinc-900/90 border-fit-primary shadow-[0_0_20px_rgba(34,197,94,0.25)]'
                  : day.isCompleted
                  ? 'bg-zinc-900/90 border-emerald-500/40 hover:border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.06)]'
                  : isToday && !isRest
                  ? 'bg-gradient-to-b from-[#2196f3]/15 to-zinc-900/90 border-[#2196f3] shadow-[0_0_20px_rgba(33,150,243,0.15)]'
                  : isPast && !isRest
                  ? 'bg-zinc-900/80 border-amber-500/30 hover:border-amber-500/50'
                  : isRest
                  ? 'bg-zinc-900/40 border-zinc-800/80 opacity-60'
                  : 'bg-zinc-900/30 border-zinc-800/50 opacity-80'
              }`}
            >
              {isThisDayActive ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-fit-primary/20 border border-fit-primary/40 px-2 py-0.5 rounded-full text-fit-primary text-[10px] font-black animate-pulse">
                  <Activity size={12} /> IN PROGRESS
                </div>
              ) : day.isCompleted ? (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-400 text-[10px] font-bold">
                  <CheckCircle2 size={12} /> COMPLETED
                </div>
              ) : isPast && !day.isCompleted && !isRest ? (
                <div className="absolute top-4 right-4 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  MISSED
                </div>
              ) : isFuture ? (
                <div className="absolute top-4 right-4 text-[10px] font-semibold text-zinc-500">
                  DAY {day.day}
                </div>
              ) : null}

              <div className="mb-4">
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  isThisDayActive ? 'text-fit-primary' : day.isCompleted ? 'text-emerald-400' : isToday ? 'text-[#2196f3]' : 'text-zinc-500'
                }`}>
                  Day {day.day}
                </div>
                <h4 className="text-lg font-extrabold text-white leading-tight">
                  {day.focus}
                </h4>
              </div>

              <div className="mt-auto">
                <div className="text-sm text-zinc-400 mb-4">
                  {isRest ? 'Take a break and recover.' : `${day.exercises.length} Exercises`}
                </div>

                {isRest ? (
                  <button 
                    disabled 
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-zinc-800/40 text-zinc-500 cursor-default"
                  >
                    Rest Day
                  </button>
                ) : isThisDayActive ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-1.5 bg-fit-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse hover:scale-[1.02] transition-all"
                  >
                    <Play size={14} fill="currentColor" /> Resume Workout
                  </button>
                ) : day.isCompleted ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shadow-sm"
                  >
                    <CheckCircle2 size={14} /> View Completed
                  </button>
                ) : isToday ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-[#2196f3] text-white hover:bg-[#1976d2] shadow-md transition-all hover:scale-[1.02]"
                  >
                    <Play size={14} fill="currentColor" /> Start Day {day.day}
                  </button>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartDay(day); }}
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
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
          onClose={() => setSelectedDay(null)} 
        />
      )}
    </div>
  );
}
