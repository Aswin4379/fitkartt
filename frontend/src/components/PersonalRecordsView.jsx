import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Medal, 
  Crown, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight,
  Flame,
  Zap,
  Calendar
} from 'lucide-react';

export default function PersonalRecordsView({ prData }) {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  // Handle both legacy format (number) and new rich object format
  const parsedPRs = prData && typeof prData === 'object' 
    ? Object.entries(prData).map(([exercise, data]) => {
        let weight = 0;
        let oneRepMax = 0;
        let date = '';
        let reps = 0;
        
        if (typeof data === 'number') {
          weight = data;
        } else if (data && typeof data === 'object') {
          weight = data.weight?.value || 0;
          oneRepMax = data.oneRepMax?.value || 0;
          reps = data.reps?.value || 0;
          date = data.weight?.date ? new Date(data.weight.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : '';
        }
        
        return { exercise, weight, oneRepMax, reps, date };
      }).filter(pr => pr.weight > 0)
    : [];

  const sortedPRs = parsedPRs.sort((a, b) => b.weight - a.weight);

  return (
    <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 shadow-card relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
            <Trophy className="text-amber-500" size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-fit-text">Personal Records (PR)</h3>
              {sortedPRs.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-500 uppercase tracking-wider">
                  {sortedPRs.length} PRs Hit
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-fit-muted">
              Your all-time peak weight lifted per exercise
            </p>
          </div>
        </div>

        {/* Info Toggle Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
            showInfo 
              ? 'bg-amber-500 text-black border-amber-500 shadow-sm' 
              : 'bg-fit-surface2 text-fit-muted hover:text-fit-text border-fit-border hover:border-amber-500/40'
          }`}
          title="Click to understand PR and 1RM calculation"
        >
          <HelpCircle size={14} />
          <span className="hidden sm:inline">What is PR?</span>
          {showInfo ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Expandable "How PRs Work" Guide */}
      {showInfo && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-fit-surface2/90 to-fit-surface border border-amber-500/30 text-xs text-fit-text space-y-3 relative z-10 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-amber-500 text-sm pb-1 border-b border-fit-border/50">
            <Trophy size={15} /> Understanding Personal Records & 1RM
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-amber-500 flex items-center gap-1.5">
                <Crown size={14} /> 1. Heavy Lift (kg)
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                The highest weight you have ever logged for a completed set for that exercise.
              </p>
            </div>

            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-blue-400 flex items-center gap-1.5">
                <Zap size={14} /> 2. Est. 1-Rep Max (1RM)
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                Calculated using sports science (Epley formula). Predicts the maximum weight you can lift for 1 single rep!
              </p>
            </div>

            <div className="bg-fit-surface/80 p-3 rounded-xl border border-fit-border flex flex-col gap-1">
              <div className="font-bold text-emerald-500 flex items-center gap-1.5">
                <Flame size={14} /> 3. Automatic Updates
              </div>
              <p className="text-fit-muted leading-relaxed text-[11px]">
                Log heavier weights or more reps in any workout, and FitKart automatically celebrates and saves your new PR.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-fit-text text-[11px] flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500 shrink-0" />
            <span><strong>How to beat records:</strong> Add just <strong>+1 rep</strong> or <strong>+2.5 kg</strong> to your next workout session!</span>
          </div>
        </div>
      )}

      {/* Main Content: Either Empty State or PR List */}
      {sortedPRs.length === 0 ? (
        <div className="bg-fit-surface2/50 border border-dashed border-fit-border rounded-2xl p-6 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 text-amber-500">
            <Trophy size={28} />
          </div>
          <h4 className="text-base font-extrabold text-fit-text mb-1">No Personal Records Yet</h4>
          <p className="text-fit-muted text-xs max-w-sm mx-auto mb-4 leading-relaxed">
            Personal Records track your peak weight lifted. As soon as you log workout sets with weights (kg) and reps, your trophies will appear here!
          </p>
          <button
            onClick={() => navigate('/fitness/routines')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-fit-primary text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Start Workout to Set PRs <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="space-y-3 relative z-10 max-h-80 overflow-y-auto pr-1 hide-scrollbar">
          {sortedPRs.map((pr, idx) => {
            let icon = <Medal size={16} className="text-fit-muted" />;
            let badgeBg = "bg-fit-surface border-fit-border";
            let rankText = `#${idx + 1}`;
            
            if (idx === 0) {
              icon = <Crown size={18} className="text-amber-500" />;
              badgeBg = "bg-amber-500/15 border-amber-500/30 text-amber-500";
              rankText = "👑 #1 Best Lift";
            } else if (idx === 1) {
              icon = <Medal size={16} className="text-slate-300" />;
              badgeBg = "bg-slate-400/15 border-slate-400/30 text-slate-300";
              rankText = "🥈 #2";
            } else if (idx === 2) {
              icon = <Medal size={16} className="text-amber-700 dark:text-amber-600" />;
              badgeBg = "bg-amber-700/15 border-amber-700/30 text-amber-600";
              rankText = "🥉 #3";
            }

            return (
              <div 
                key={pr.exercise} 
                className={`border rounded-2xl p-3.5 flex items-center justify-between transition-all hover:scale-[1.01] ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-amber-500/5 to-fit-surface2/80 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.06)]' 
                    : 'bg-fit-surface2/70 border-fit-border hover:border-fit-primary/40'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${badgeBg}`}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-fit-text font-black text-sm truncate">{pr.exercise}</span>
                        {idx === 0 && (
                          <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-500 text-[9px] font-black uppercase">
                            Peak
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-fit-muted">
                        <span className="text-[10px] font-bold text-amber-500/90">{rankText}</span>
                        {pr.date && (
                          <>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1 text-[10px]">
                              <Calendar size={10} /> {pr.date}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 pl-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-fit-muted uppercase tracking-wider">Peak:</span>
                    <span className="text-amber-500 font-black text-xl tracking-tight">{pr.weight}</span>
                    <span className="text-fit-muted font-bold text-xs">kg</span>
                  </div>
                  {pr.oneRepMax > 0 && (
                    <span className="text-[10px] text-fit-muted font-bold tracking-wide mt-0.5 bg-fit-surface/80 px-2 py-0.5 rounded-full border border-fit-border">
                      Est. 1RM: <strong className="text-fit-text font-black">{pr.oneRepMax} kg</strong>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
