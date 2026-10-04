import React from 'react';
import { Activity, Battery, BatteryCharging, BatteryFull, BatteryMedium } from 'lucide-react';

export default function MuscleRecoveryView({ recoveryData }) {
  if (!recoveryData) return null;

  const getStatusColor = (val) => {
    if (val >= 80) return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
    if (val >= 50) return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]';
    return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
  };

  const getTextColor = (val) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getBatteryIcon = (val) => {
    if (val >= 90) return <BatteryFull size={16} />;
    if (val >= 50) return <BatteryMedium size={16} />;
    return <Battery size={16} />;
  };

  const allMuscles = [
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 
    'abs', 'glutes', 'quads', 'hamstrings', 'calves'
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-fit-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-fit-primary/10 flex items-center justify-center border border-fit-primary/20">
          <Activity className="text-fit-primary" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-white">Muscle Recovery</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Real-time status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {allMuscles.map(muscle => {
          const val = recoveryData[muscle] ?? 100; // Default 100%
          
          return (
            <div key={muscle} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 transition-colors hover:border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold capitalize text-sm">{muscle}</span>
                <span className={`text-xs font-extrabold flex items-center gap-1 ${getTextColor(val)}`}>
                  {getBatteryIcon(val)} {val}%
                </span>
              </div>
              
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
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
