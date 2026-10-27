import React, { useState } from 'react';
import { 
  Activity, 
  Battery, 
  BatteryFull, 
  BatteryMedium, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  Clock,
  Flame
} from 'lucide-react';

export default function MuscleRecoveryView({ recoveryData }) {
  const [showInfo, setShowInfo] = useState(false);
  const safeData = recoveryData || {};

  const allMuscles = [
    { key: 'chest', label: 'Chest', group: 'Upper' },
    { key: 'back', label: 'Back & Lats', group: 'Upper' },
    { key: 'shoulders', label: 'Shoulders', group: 'Upper' },
    { key: 'biceps', label: 'Biceps', group: 'Arms' },
    { key: 'triceps', label: 'Triceps', group: 'Arms' },
    { key: 'forearms', label: 'Forearms', group: 'Arms' },
    { key: 'abs', label: 'Abs & Core', group: 'Core' },
    { key: 'glutes', label: 'Glutes', group: 'Lower' },
    { key: 'quads', label: 'Quads', group: 'Lower' },
    { key: 'hamstrings', label: 'Hamstrings', group: 'Lower' },
    { key: 'calves', label: 'Calves', group: 'Lower' },
  ];

  const getStatusColor = (val) => {
    if (val >= 80) return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]';
    if (val >= 50) return 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]';
    return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]';
  };

  const getTextColor = (val) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBadgeStyle = (val) => {
    if (val >= 80) return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    if (val >= 50) return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
  };

  const getStatusText = (val) => {
    if (val >= 80) return 'Ready to Train';
    if (val >= 50) return 'Recovering';
    return 'Needs Rest';
  };

  const getBatteryIcon = (val) => {
    if (val >= 90) return <BatteryFull size={15} />;
    if (val >= 50) return <BatteryMedium size={15} />;
    return <Battery size={15} />;
  };

  // Calculate overall statistics
  const values = allMuscles.map(m => safeData[m.key] ?? 100);
  const avgRecovery = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
  const readyCount = values.filter(v => v >= 80).length;
  const recoveringCount = values.filter(v => v >= 50 && v < 80).length;
  const fatiguedCount = values.filter(v => v < 50).length;

  return (
    <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 shadow-card relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-72 h-72 bg-fit-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-fit-primary/10 flex items-center justify-center border border-fit-primary/20 shrink-0">
            <Activity className="text-fit-primary" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-fit-text">Muscle Recovery</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-wider">
                {avgRecovery}% Ready
              </span>
            </div>
            <p className="text-xs font-medium text-fit-muted">
              Live muscle readiness & fatigue tracker
            </p>
          </div>
        </div>

        {/* Info Toggle Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
            showInfo 
              ? 'bg-fit-primary text-black border-fit-primary shadow-sm' 
              : 'bg-fit-surface2 text-fit-muted hover:text-fit-text border-fit-border hover:border-fit-primary/40'
          }`}
          title="Click to learn how muscle recovery is calculated"
        >
          <HelpCircle size={14} />
          <span className="hidden sm:inline">How It Works</span>
          {showInfo ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Expandable "How It Works" Guide */}
      {showInfo && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-fit-surface2/90 to-fit-surface border border-fit-primary/30 text-xs text-fit-text space-y-3 relative z-10 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-fit-primary text-sm pb-1 border-b border-fit-border/50">
            <Zap size={15} /> How Muscle Recovery & Readiness Works
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-emerald-500 flex items-center gap-1.5">
                <BatteryFull size={14} /> 1. Fresh / 100% Ready
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                Muscles start at 100% when fully rested. They have maximum strength capacity for today's workout.
              </p>
            </div>

            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-amber-500 flex items-center gap-1.5">
                <Flame size={14} /> 2. Workout Fatigue
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                When you log completed sets in workouts, target muscles fatigue (~5% per set) as fibers undergo stress.
              </p>
            </div>

            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-blue-400 flex items-center gap-1.5">
                <Clock size={14} /> 3. Natural Healing (+2%/hr)
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                Rest & sleep rebuild muscle tissue, regenerating readiness at +2% per hour back to 100%.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-fit-primary/10 border border-fit-primary/20 text-fit-text text-[11px] flex items-center gap-2">
            <Sparkles size={14} className="text-fit-primary shrink-0" />
            <span><strong>Training Tip:</strong> Always prioritize training your <strong>green (ready)</strong> muscles. Let yellow/red muscles rest to grow stronger!</span>
          </div>
        </div>
      )}

      {/* Overall Readiness Recommendation Banner */}
      <div className={`mb-5 p-3.5 rounded-2xl border relative z-10 flex items-center justify-between gap-3 ${
        avgRecovery >= 80 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : avgRecovery >= 50 
            ? 'bg-amber-500/10 border-amber-500/30' 
            : 'bg-rose-500/10 border-rose-500/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            avgRecovery >= 80 ? 'bg-emerald-500/20 text-emerald-500' : avgRecovery >= 50 ? 'bg-amber-500/20 text-amber-500' : 'bg-rose-500/20 text-rose-500'
          }`}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="text-sm font-black text-fit-text flex items-center gap-2">
              {avgRecovery >= 80 ? (
                <>🟢 All Muscles Rested & Ready for Training</>
              ) : (
                <>🟡 {readyCount} Muscles Ready &bull; {recoveringCount + fatiguedCount} Recovering</>
              )}
            </div>
            <p className="text-xs text-fit-muted mt-0.5">
              {avgRecovery >= 80 
                ? 'Your body is at peak recovery. You can train full-body or any muscle group today with full strength!'
                : 'Focus your session today on your green (rested) muscles while fatigued muscles regenerate.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1 py-1 text-[11px] font-bold text-fit-muted relative z-10 border-b border-fit-border/40 pb-3">
        <span className="text-xs text-fit-text font-black uppercase tracking-wider">Muscle Readiness:</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            80-100% Ready
          </span>
          <span className="flex items-center gap-1.5 text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            50-79% Recovering
          </span>
          <span className="flex items-center gap-1.5 text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            &lt;50% Needs Rest
          </span>
        </div>
      </div>

      {/* Grid of 11 Muscles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {allMuscles.map(m => {
          const val = safeData[m.key] ?? 100;
          
          return (
            <div 
              key={m.key} 
              className="bg-fit-surface2/70 border border-fit-border rounded-2xl p-3.5 flex flex-col gap-2 transition-all hover:border-fit-primary/40 hover:bg-fit-surface2/90"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-fit-text font-bold capitalize text-sm">{m.label}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${getBadgeStyle(val)}`}>
                    {getStatusText(val)}
                  </span>
                </div>
                <span className={`text-xs font-black flex items-center gap-1 ${getTextColor(val)}`}>
                  {getBatteryIcon(val)} {val}%
                </span>
              </div>
              
              <div className="w-full h-2 bg-fit-border/60 rounded-full overflow-hidden p-[0.5px]">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${getStatusColor(val)}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
