import React from 'react';
import { Sparkles, Shield, AlertCircle, Clock, Activity, Zap, Check } from 'lucide-react';
import { BODY_PARTS_METADATA } from './InteractiveBodySelector.jsx';

const PAIN_TYPES = [
  'Dull Ache',
  'Sharp / Stabbing',
  'Stiffness & Tightness',
  'Burning Sensation',
  'Throbbing Pain',
  'Tingling & Numbness',
  'Muscle Spasm / Knot',
  'Deep Soreness'
];

const ONSET_OPTIONS = [
  'Just today (Few hours)',
  '2 - 3 days ago',
  '1 - 2 weeks ago',
  'Over 1 month (Chronic)'
];

const ADDITIONAL_SYMPTOMS_LIST = [
  'Swelling / Inflammation',
  'Reduced Range of Motion',
  'Radiating down arm / leg',
  'Muscle Weakness',
  'Popping / Clicking Sound',
  'Morning Stiffness',
  'Numbness / Pins & Needles',
  'Tender to Touch'
];

export default function BodyCareQuestionnaire({
  selectedPart,
  formData,
  setFormData,
  onSubmit,
  loading
}) {
  const metadata = selectedPart ? BODY_PARTS_METADATA[selectedPart] : null;

  const handlePainTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, painType: type }));
  };

  const handleOnsetSelect = (onset) => {
    setFormData(prev => ({ ...prev, onset }));
  };

  const handleSeverityChange = (val) => {
    setFormData(prev => ({ ...prev, severity: Number(val) }));
  };

  const toggleAdditionalSymptom = (sym) => {
    setFormData(prev => {
      const exists = prev.additionalSymptoms.includes(sym);
      return {
        ...prev,
        additionalSymptoms: exists
          ? prev.additionalSymptoms.filter(s => s !== sym)
          : [...prev.additionalSymptoms, sym]
      };
    });
  };

  const getSeverityColor = (sev) => {
    if (sev <= 3) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (sev <= 6) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  const getSeverityLabel = (sev) => {
    if (sev <= 3) return 'Mild Discomfort';
    if (sev <= 6) return 'Moderate Pain';
    if (sev <= 8) return 'Severe Pain';
    return 'Very Severe / Intense';
  };

  if (!selectedPart) {
    return (
      <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[360px] shadow-xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 animate-pulse">
          <Activity size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Select a Body Area First</h3>
        <p className="text-zinc-400 text-sm max-w-sm">
          Tap an area on the interactive body illustration (or choose a quick-select chip) to begin your tailored assessment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md"
    >
      {/* Selected Area Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-400 font-black">Selected Area</span>
          <h2 className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
            {metadata?.name || selectedPart}
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 capitalize">
          {metadata?.view || 'Anterior'} View
        </span>
      </div>

      {/* 1. Pain / Discomfort Type */}
      <div>
        <label className="block text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">
          <Zap size={16} className="text-teal-400" />
          1. What type of pain or discomfort are you experiencing?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PAIN_TYPES.map((type) => {
            const active = formData.painType === type;
            return (
              <button
                type="button"
                key={type}
                onClick={() => handlePainTypeSelect(type)}
                className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border ${
                  active
                    ? 'bg-gradient-to-r from-fit-primary/20 to-teal-500/20 border-fit-primary text-white shadow-md shadow-fit-primary/10'
                    : 'bg-black/40 border-white/5 text-zinc-300 hover:border-white/20 hover:text-white'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Onset / Duration */}
      <div>
        <label className="block text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">
          <Clock size={16} className="text-teal-400" />
          2. When did it start?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ONSET_OPTIONS.map((opt) => {
            const active = formData.onset === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => handleOnsetSelect(opt)}
                className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border ${
                  active
                    ? 'bg-gradient-to-r from-fit-primary/20 to-teal-500/20 border-fit-primary text-white shadow-md shadow-fit-primary/10'
                    : 'bg-black/40 border-white/5 text-zinc-300 hover:border-white/20 hover:text-white'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Pain Severity Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-white flex items-center gap-1.5">
            <Activity size={16} className="text-teal-400" />
            3. How severe is the pain?
          </label>
          <span className={`px-3 py-1 rounded-full text-xs font-black border ${getSeverityColor(formData.severity)}`}>
            Level {formData.severity}/10 &bull; {getSeverityLabel(formData.severity)}
          </span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
          <input
            type="range"
            min="1"
            max="10"
            value={formData.severity}
            onChange={(e) => handleSeverityChange(e.target.value)}
            className="w-full accent-fit-primary cursor-pointer h-2 bg-zinc-800 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-bold mt-2">
            <span>1 (Very Mild)</span>
            <span>5 (Moderate)</span>
            <span>10 (Unbearable)</span>
          </div>
        </div>
      </div>

      {/* 4. Injury / Trauma Question */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white flex items-center gap-1.5">
            <AlertCircle size={16} className="text-teal-400" />
            4. Was there a specific injury or sudden trauma?
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isInjury: false, injuryDetails: '' }))}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !formData.isInjury
                  ? 'bg-zinc-800 text-white border border-white/20'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isInjury: true }))}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                formData.isInjury
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {formData.isInjury && (
          <div className="pt-2 animate-in fade-in duration-200">
            <input
              type="text"
              placeholder="e.g. Slipped on stairs, felt a pop while bench pressing, twisted ankle while running"
              value={formData.injuryDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, injuryDetails: e.target.value }))}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-400 outline-none"
            />
          </div>
        )}
      </div>

      {/* 5. Additional Associated Symptoms */}
      <div>
        <label className="block text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">
          <Shield size={16} className="text-teal-400" />
          5. Are any other symptoms present?
        </label>
        <div className="flex flex-wrap gap-2">
          {ADDITIONAL_SYMPTOMS_LIST.map((sym) => {
            const active = formData.additionalSymptoms.includes(sym);
            return (
              <button
                type="button"
                key={sym}
                onClick={() => toggleAdditionalSymptom(sym)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  active
                    ? 'bg-fit-primary text-black border-fit-primary font-black shadow-md shadow-fit-primary/20'
                    : 'bg-black/40 border-white/5 text-zinc-300 hover:border-white/20'
                }`}
              >
                {active && <Check size={13} strokeWidth={3} />}
                {sym}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. User's Own Words Description */}
      <div>
        <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <Sparkles size={16} className="text-teal-400" />
          6. Describe your symptoms in your own words (optional)
        </label>
        <textarea
          rows={3}
          placeholder="e.g. It hurts more when I sit down or bend forward, but feels a bit better when I walk around. Started after my deadlift workout..."
          value={formData.userDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, userDescription: e.target.value }))}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-fit-primary outline-none transition-colors"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="consent-checkbox"
          checked={formData.consentGiven}
          onChange={(e) => setFormData(prev => ({ ...prev, consentGiven: e.target.checked }))}
          className="w-4 h-4 rounded accent-fit-primary bg-zinc-800 border-zinc-700 cursor-pointer"
        />
        <label htmlFor="consent-checkbox" className="text-xs text-zinc-400 cursor-pointer select-none">
          Save this assessment to my private FitKart profile to track my recovery history.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !selectedPart}
        className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-fit-primary via-emerald-400 to-teal-400 text-black shadow-lg shadow-fit-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Analyzing with Groq AI...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate BodyCare AI Guidance
          </>
        )}
      </button>
    </form>
  );
}
