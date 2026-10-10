import React from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Flame,
  Snowflake,
  Activity,
  Ban,
  Pill,
  Apple,
  Stethoscope,
  ChevronRight,
  Info,
  RotateCcw
} from 'lucide-react';
import ExerciseDemonstrationPlayer from './ExerciseDemonstrationPlayer.jsx';

export default function BodyCareResults({
  bodyPart,
  symptoms,
  guidance,
  onReset
}) {
  if (!guidance) return null;

  const isRedFlag = guidance.isRedFlag || guidance.medicalConsultation?.urgency === 'Emergency';

  const getUrgencyBadge = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'emergency':
        return {
          bg: 'bg-red-500/20 text-red-400 border-red-500/40',
          label: 'Immediate Emergency Care Needed'
        };
      case 'prompt':
        return {
          bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
          label: 'Prompt Doctor Evaluation (24 - 48 Hours)'
        };
      default:
        return {
          bg: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
          label: 'Routine Consultation If Unresolved (1 - 2 Weeks)'
        };
    }
  };

  const urgencyStyle = getUrgencyBadge(guidance.medicalConsultation?.urgency);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. CRITICAL RED-FLAG ALERT BANNER (If symptoms suggest potential emergency) */}
      {isRedFlag && (
        <div className="bg-gradient-to-r from-red-950/80 via-red-900/60 to-black border-2 border-red-500/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(239,68,68,0.35)] relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle size={32} className="animate-pulse" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-red-500 text-black font-black text-xs uppercase tracking-wider inline-block mb-2">
                Urgent Warning Signs Detected
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                Emergency Medical Evaluation Recommended
              </h3>
              <p className="text-red-200 text-sm leading-relaxed mb-4">
                {guidance.redFlagReason ||
                  guidance.medicalConsultation?.guidance ||
                  'Your reported symptoms indicate a potential high-risk medical condition requiring prompt physician assessment.'}
              </p>
              <div className="p-3.5 bg-black/60 rounded-xl border border-red-500/30 text-xs text-red-300 font-semibold">
                ⚠️ Do NOT attempt physical exercise, stretching, or massage while acute red-flag symptoms are present. Please contact emergency services or go to an urgent care clinic immediately.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Educational Disclaimer Card */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3 text-xs text-zinc-400 backdrop-blur-sm">
        <Info size={18} className="text-teal-400 shrink-0" />
        <p>
          <strong className="text-zinc-300">Educational Guidance Only:</strong> This guidance is generated dynamically by AI for fitness recovery and educational purposes. It is not a clinical diagnosis or medical prescription.
        </p>
      </div>

      {/* 3. Grid of Primary Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card A: Possible Explanations */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Possible Explanations</h4>
              <p className="text-xs text-zinc-500">Non-diagnostic possibilities to discuss with a provider</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {guidance.possibleExplanations?.map((exp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span className="capitalize">{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card B: Self-Care & Recovery Steps */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-fit-primary/10 border border-fit-primary/20 flex items-center justify-center text-fit-primary">
              <Activity size={20} />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Self-Care & Recovery</h4>
              <p className="text-xs text-zinc-500">Evidence-based home recovery guidelines</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {guidance.selfCareSuggestions?.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-fit-primary mt-2 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card C: Thermal Therapy (Ice vs Heat) */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              {guidance.thermalTherapy?.recommendation?.toLowerCase().includes('heat') ? (
                <Flame size={20} className="text-amber-400" />
              ) : (
                <Snowflake size={20} className="text-cyan-400" />
              )}
            </div>
            <div>
              <h4 className="text-base font-black text-white">Thermal Therapy (Ice vs Heat)</h4>
              <p className="text-xs text-zinc-500">Temperature application guidance</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {guidance.thermalTherapy?.recommendation || 'Thermal Recommendation'}
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {guidance.thermalTherapy?.instructions || 'Apply ice for acute swelling or heat for chronic tightness.'}
            </p>
          </div>
        </div>

        {/* Card D: Movements to Avoid */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Ban size={20} />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Movements to Avoid</h4>
              <p className="text-xs text-zinc-500">Activities that may aggravate this area</p>
            </div>
          </div>
          <ul className="space-y-2">
            {guidance.movementsToAvoid?.map((mov, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-200/90 bg-red-500/5 p-2 rounded-xl border border-red-500/10">
                <span className="text-red-400 font-bold">&times;</span>
                <span>{mov}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Gentle Movements & Mobility (With Verified Visual Demonstrations) */}
      <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Activity size={20} />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">Gentle Mobility & Exercises</h4>
              <p className="text-xs text-zinc-500">Safe, non-strenuous movements with verified video demonstrations</p>
            </div>
          </div>
          {guidance.gentleMovements && guidance.gentleMovements.length > 0 && (
            <span className="text-xs font-bold text-fit-primary bg-fit-primary/10 border border-fit-primary/20 px-3 py-1 rounded-full w-fit">
              {guidance.gentleMovements.length} Verified Demonstration{guidance.gentleMovements.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {guidance.gentleMovements && guidance.gentleMovements.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {guidance.gentleMovements.map((move, idx) => (
              <ExerciseDemonstrationPlayer key={move.exerciseId || idx} exercise={move} index={idx} />
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-xs text-zinc-400 flex items-center gap-3">
            <Info size={16} className="text-teal-400 shrink-0" />
            <span>No active movements are recommended at this stage. Prioritize resting and supporting the affected tissue.</span>
          </div>
        )}
      </div>

      {/* 5. Topical Relief & Nutritional Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topical Relief */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Pill size={20} />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Topical Relief Options</h4>
              <p className="text-xs text-zinc-500">Over-the-counter non-prescription soothers</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {guidance.topicalRelief?.suggestions?.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold">
                  {item}
                </span>
              ))}
            </div>
            {guidance.topicalRelief?.precautions && (
              <p className="text-[11px] text-zinc-400 p-2.5 rounded-xl bg-black/40 border border-white/5">
                <strong className="text-zinc-300">Precautions:</strong> {guidance.topicalRelief.precautions}
              </p>
            )}
          </div>
        </div>

        {/* Nutritional Recovery */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400">
              <Apple size={20} />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Nutritional Support</h4>
              <p className="text-xs text-zinc-500">Foods supporting anti-inflammatory recovery</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {guidance.nutritionRecovery?.foods?.map((food, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-lime-500/10 text-lime-300 border border-lime-500/20 text-xs font-bold">
                  {food}
                </span>
              ))}
            </div>
            {guidance.nutritionRecovery?.notes && (
              <p className="text-xs text-zinc-300">
                {guidance.nutritionRecovery.notes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 6. Medical Consultation Guidance */}
      <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Stethoscope size={20} />
          </div>
          <div>
            <h4 className="text-lg font-black text-white">When to Consult a Doctor</h4>
            <p className="text-xs text-zinc-500">Clinical threshold criteria</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-black border ${urgencyStyle.bg}`}>
            {urgencyStyle.label}
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guidance.medicalConsultation?.guidance}
          </p>
        </div>
      </div>

      {/* Reset Assessment Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm transition-colors border border-white/10 flex items-center gap-2"
        >
          <RotateCcw size={16} /> Assess Another Body Area
        </button>
      </div>
    </div>
  );
}
