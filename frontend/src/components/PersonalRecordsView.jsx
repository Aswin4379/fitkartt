import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';

export default function PersonalRecordsView({ prData }) {
  if (!prData || Object.keys(prData).length === 0) {
    return (
      <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 text-center shadow-card">
        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Trophy className="text-amber-500" size={24} />
        </div>
        <h3 className="text-lg font-bold text-fit-text mb-1">Personal Records</h3>
        <p className="text-fit-muted text-sm">Complete workouts and log your weights to see your PRs here.</p>
      </div>
    );
  }

  // Handle both legacy format (number) and new rich object format
  const parsedPRs = Object.entries(prData).map(([exercise, data]) => {
    let weight = 0;
    let oneRepMax = 0;
    let date = '';
    
    if (typeof data === 'number') {
      weight = data;
    } else if (data && typeof data === 'object') {
      weight = data.weight?.value || 0;
      oneRepMax = data.oneRepMax?.value || 0;
      date = data.weight?.date ? new Date(data.weight.date).toLocaleDateString() : '';
    }
    
    return { exercise, weight, oneRepMax, date };
  }).filter(pr => pr.weight > 0);

  if (parsedPRs.length === 0) {
    return (
      <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 text-center shadow-card">
        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Trophy className="text-amber-500" size={24} />
        </div>
        <h3 className="text-lg font-bold text-fit-text mb-1">No personal records yet</h3>
        <p className="text-fit-muted text-sm">Complete workouts and log your weights to see your PRs here.</p>
      </div>
    );
  }

  // Sort PRs by weight
  const sortedPRs = parsedPRs.sort((a, b) => b.weight - a.weight);

  return (
    <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 shadow-card relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
          <Trophy className="text-amber-500" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-fit-text">Personal Records</h3>
          <p className="text-xs font-bold text-fit-muted uppercase tracking-widest">All-Time Bests</p>
        </div>
      </div>

      <div className="space-y-3 relative z-10 max-h-64 overflow-y-auto hide-scrollbar">
        {sortedPRs.map((pr, idx) => {
          let icon = <Medal size={16} className="text-fit-muted" />;
          if (idx === 0) icon = <Crown size={18} className="text-amber-500" />;
          if (idx === 1) icon = <Medal size={16} className="text-fit-text/80" />;
          if (idx === 2) icon = <Medal size={16} className="text-amber-700 dark:text-amber-600" />;

          return (
            <div key={pr.exercise} className="bg-fit-surface2/70 border border-fit-border rounded-2xl p-3 px-4 flex items-center justify-between transition-colors hover:border-fit-primary/40">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-fit-surface flex items-center justify-center border border-fit-border shadow-sm">
                    {icon}
                  </div>
                  <span className="text-fit-text font-bold truncate max-w-[150px] sm:max-w-[200px]">{pr.exercise}</span>
                </div>
                {pr.date && <span className="text-[10px] text-fit-muted ml-11 mt-0.5">{pr.date}</span>}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-end gap-1">
                  <span className="text-amber-500 font-black text-xl">{pr.weight}</span>
                  <span className="text-fit-muted font-bold text-sm mb-0.5">kg</span>
                </div>
                {pr.oneRepMax > 0 && (
                  <span className="text-[10px] text-fit-muted font-bold tracking-wide">1RM: {pr.oneRepMax} kg</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
