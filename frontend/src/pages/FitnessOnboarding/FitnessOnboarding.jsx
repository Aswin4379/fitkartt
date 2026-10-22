import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Target, Flame, Activity, User, Activity as ActivityIcon, Dumbbell } from 'lucide-react';
import MuscularBodySelect from './MuscularBodySelect.jsx';
import { workoutApi, authApi } from '../../services/api.js';
import { useUser } from '../../context/UserContext.jsx';
import { exerciseLibrary } from '../../data/workouts.js';

// Resilient localized 30-day program generator in case remote API is deploying or unreachable
function generateFallbackPlan(formData) {
  const goal = formData.goal || 'Build Muscle';
  const targetAreas = formData.targetAreas && formData.targetAreas.length > 0 ? formData.targetAreas : ['fullbody'];
  const daysPerWeek = Math.min(6, Math.max(2, Number(formData.daysPerWeek) || 4));
  const duration = Number(formData.duration) || 45;
  const split = formData.split || 'Full Body';
  const level = formData.level || 'Intermediate';
  const restStyle = formData.restStyle || 'consecutive';

  // Active workout days distribution across a 7-day week
  const getActiveDaysMap = () => {
    if (Array.isArray(formData.workoutDays) && formData.workoutDays.length > 0) {
      return [1, 2, 3, 4, 5, 6, 7].map(d => formData.workoutDays.includes(d));
    }
    if (restStyle === 'spread' || restStyle === 'midweek') {
      switch (daysPerWeek) {
        case 2: return [true, false, false, true, false, false, false];
        case 3: return [true, false, true, false, true, false, false];
        case 4: return [true, true, false, true, true, false, false];
        case 5: return [true, true, false, true, true, true, false];
        case 6: return [true, true, true, true, true, true, false];
        default: return [true, true, false, true, true, false, false];
      }
    }
    // Consecutive default: Days 1 to daysPerWeek are all Gym, remaining are Rest (no vittu vittu rest)
    return [1, 2, 3, 4, 5, 6, 7].map(d => d <= daysPerWeek);
  };

  const activeDaysMap = getActiveDaysMap();
  const normSplit = String(split || '').toLowerCase();
  let splitFoci = [];

  if (normSplit.includes('upper') && normSplit.includes('lower')) {
    splitFoci = [
      { focus: 'Upper Body Strength & Power', target: ['Chest', 'Back', 'Shoulders', 'Arms'] },
      { focus: 'Lower Body Quads & Hamstrings', target: ['Legs', 'Core'] },
      { focus: 'Upper Body Hypertrophy & Arms', target: ['Chest', 'Back', 'Arms'] },
      { focus: 'Lower Body Glutes & Calves', target: ['Legs', 'Core'] },
      { focus: 'Upper & Core Functional Density', target: ['Shoulders', 'Arms', 'Core'] },
      { focus: 'Full Body Athletic Conditioning', target: ['Full Body', 'Legs', 'Core'] }
    ];
  } else if (normSplit.includes('push') || normSplit.includes('pull')) {
    splitFoci = [
      { focus: 'Push: Chest, Shoulders & Triceps', target: ['Chest', 'Shoulders', 'Arms'] },
      { focus: 'Pull: Back, Rear Delts & Biceps', target: ['Back', 'Arms'] },
      { focus: 'Legs: Quads, Hamstrings & Calves', target: ['Legs', 'Core'] },
      { focus: 'Push: Incline Chest & Overhead Press', target: ['Chest', 'Shoulders', 'Arms'] },
      { focus: 'Pull: Lat Width & Bicep Peak', target: ['Back', 'Arms'] },
      { focus: 'Legs & Core Power', target: ['Legs', 'Core'] }
    ];
  } else if (normSplit.includes('bro') || normSplit.includes('part')) {
    splitFoci = [
      { focus: 'Chest & Tricep Hypertrophy', target: ['Chest', 'Arms'] },
      { focus: 'Back & Bicep Thickness', target: ['Back', 'Arms'] },
      { focus: 'Shoulders & Trap Sculpting', target: ['Shoulders'] },
      { focus: 'Legs & Lower Body Dominance', target: ['Legs'] },
      { focus: 'Arms & Abdominal Core', target: ['Arms', 'Core'] },
      { focus: 'Functional Mobility & Conditioning', target: ['Core', 'Full Body'] }
    ];
  } else {
    // Full Body default
    splitFoci = [
      { focus: 'Full Body Compound Strength', target: ['Chest', 'Back', 'Legs'] },
      { focus: 'Full Body Hypertrophy & Stamina', target: ['Legs', 'Shoulders', 'Arms'] },
      { focus: 'Full Body Functional Core & Power', target: ['Full Body', 'Core', 'Back'] },
      { focus: 'Full Body Muscular Density', target: ['Chest', 'Legs', 'Arms'] },
      { focus: 'Full Body Athletic Conditioning', target: ['Legs', 'Back', 'Core'] },
      { focus: 'Full Body Power & Mobility', target: ['Full Body'] }
    ];
  }

  const goalConfig = {
    'Build Strength': { sets: 4, reps: '5-8 reps', rest: 90, weight: 'Heavy / Strength load' },
    'Build Muscle': { sets: 3, reps: '8-12 reps', rest: 60, weight: 'Moderate-Heavy' },
    'Lose Weight': { sets: 3, reps: '12-15 reps', rest: 45, weight: 'High Burn / Fast cadence' },
    'Get Fit': { sets: 3, reps: '10-12 reps', rest: 60, weight: 'Moderate / Functional' }
  }[goal] || { sets: 3, reps: '10-12 reps', rest: 60, weight: 'Moderate' };

  const defaultPool = exerciseLibrary.length > 0 ? exerciseLibrary : [];
  let activeIdx = 0;
  const sevenDaySchedule = [];

  for (let day = 1; day <= 7; day++) {
    const isActive = activeDaysMap[day - 1];
    if (!isActive) {
      sevenDaySchedule.push({
        day,
        focus: 'Rest & Active Recovery',
        estimatedDuration: 0,
        exercises: []
      });
    } else {
      const dayConfig = splitFoci[activeIdx % splitFoci.length];
      activeIdx++;

      const matchingPool = defaultPool.filter(ex => {
        return dayConfig.target.some(t => 
          (ex.target && ex.target.toLowerCase().includes(t.toLowerCase())) ||
          (ex.categories && ex.categories.some(c => c.toLowerCase().includes(t.toLowerCase())))
        );
      });

      const poolToUse = matchingPool.length >= 4 ? matchingPool : defaultPool;
      const dayExercises = [];
      const numExercises = duration >= 60 ? 6 : (duration >= 45 ? 5 : 4);

      for (let e = 0; e < numExercises; e++) {
        const sourceEx = poolToUse[(activeIdx * 2 + e) % poolToUse.length] || {
          name: 'Compound Exercise',
          target: 'Full Body'
        };

        const isWarmup = e === 0;
        const isCooldown = e === numExercises - 1;

        dayExercises.push({
          name: sourceEx.name || 'Exercise',
          type: isWarmup ? 'warm-up' : (isCooldown ? 'cooldown' : 'main'),
          sets: isWarmup || isCooldown ? 2 : goalConfig.sets,
          reps: isWarmup ? '30-45 secs' : (isCooldown ? 'Stretching / 60s' : goalConfig.reps),
          recommendedWeight: isWarmup || isCooldown ? 'Bodyweight' : (sourceEx.defaultWeight || goalConfig.weight),
          restTime: isWarmup || isCooldown ? 30 : goalConfig.rest,
          targetMuscles: sourceEx.target ? [sourceEx.target] : dayConfig.target,
          difficulty: level || sourceEx.level || 'Intermediate',
          equipment: sourceEx.equipment || 'None',
          reason: isWarmup ? 'Prepares joints and nervous system' : (isCooldown ? 'Aids recovery and reduces soreness' : `Targets ${sourceEx.target || 'target muscles'} for ${goal}`),
          gifUrl: sourceEx.gifUrl || '',
          videoUrl: sourceEx.videoUrl || '',
          instructions: sourceEx.instructions || [
            'Maintain a tight core and neutral spine.',
            'Execute reps with controlled cadence.',
            'Breathe rhythmically throughout the set.'
          ],
          secondary: sourceEx.secondary || '',
          formTips: sourceEx.formTips || 'Control the eccentric portion of every rep.',
          commonMistakes: sourceEx.commonMistakes || 'Avoid bouncing or using excessive momentum.'
        });
      }

      sevenDaySchedule.push({
        day,
        focus: dayConfig.focus,
        estimatedDuration: duration,
        exercises: dayExercises
      });
    }
  }

  // Expand across 30 days with progressive overload phases
  const schedule = [];
  for (let i = 0; i < 30; i++) {
    const weekNum = Math.floor(i / 7) + 1;
    const dayInWeek = i % 7;
    const sourceDay = sevenDaySchedule[dayInWeek];
    const isRest = !sourceDay.exercises || sourceDay.exercises.length === 0;

    let progressiveFocus = sourceDay.focus;
    if (!isRest) {
      if (weekNum === 1) progressiveFocus = `${sourceDay.focus} (Phase 1: Foundation)`;
      else if (weekNum === 2) progressiveFocus = `${sourceDay.focus} (Phase 2: Volume Progression)`;
      else if (weekNum === 3) progressiveFocus = `${sourceDay.focus} (Phase 3: Peak Intensity)`;
      else if (weekNum === 4) progressiveFocus = `${sourceDay.focus} (Phase 4: Hypertrophy Overload)`;
      else progressiveFocus = `${sourceDay.focus} (Phase 5: Strength Consolidation)`;
    }

    schedule.push({
      day: i + 1,
      focus: progressiveFocus,
      estimatedDuration: isRest ? 0 : (sourceDay.estimatedDuration || duration),
      exercises: isRest ? [] : sourceDay.exercises.map(ex => ({ ...ex })),
      isCompleted: false
    });
  }

  return {
    onboarded: true,
    goal,
    targetAreas,
    level,
    equipment: formData.equipment || ['Full Gym'],
    daysPerWeek,
    duration,
    split,
    planGeneratedAt: new Date().toISOString(),
    schedule
  };
}

export default function FitnessOnboarding() {
  const navigate = useNavigate();
  const { refreshUser, setUser } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    goal: '',
    level: 'Beginner',
    gender: 'Male',
    weight: 70,
    height: 175,
    age: 25,
    equipment: [],
    daysPerWeek: 4,
    duration: 45,
    split: 'Push/Pull/Legs',
    restStyle: 'consecutive',
    workoutDays: [1, 2, 3, 4],
    targetAreas: []
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleDaysPerWeekChange = (n) => {
    const num = Number(n);
    const newDays = Array.from({ length: num }, (_, i) => i + 1);
    setFormData(prev => ({
      ...prev,
      daysPerWeek: num,
      workoutDays: newDays,
      restStyle: 'consecutive'
    }));
  };

  const toggleDayPill = (dayNum) => {
    setFormData(prev => {
      const currentDays = Array.isArray(prev.workoutDays) && prev.workoutDays.length > 0
        ? [...prev.workoutDays]
        : Array.from({ length: prev.daysPerWeek }, (_, i) => i + 1);

      let updated;
      if (currentDays.includes(dayNum)) {
        if (currentDays.length <= 2) return prev; // Keep at least 2 active days
        updated = currentDays.filter(d => d !== dayNum);
      } else {
        if (currentDays.length >= 6) return prev; // Keep at most 6 active days
        updated = [...currentDays, dayNum].sort((a, b) => a - b);
      }
      return {
        ...prev,
        workoutDays: updated,
        daysPerWeek: updated.length,
        restStyle: 'custom'
      };
    });
  };

  const toggleArrayItem = (key, value) => {
    setErrorMsg('');
    setFormData(prev => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(i => i !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const updateForm = (key, value) => {
    setErrorMsg('');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleTargetArea = (area) => {
    setErrorMsg('');
    setFormData(prev => {
      let newAreas;
      if (area === 'fullbody') {
        newAreas = ['fullbody'];
      } else {
        newAreas = prev.targetAreas.filter(a => a !== 'fullbody');
        if (newAreas.includes(area)) {
          newAreas = newAreas.filter(a => a !== area);
        } else {
          newAreas.push(area);
        }
      }
      return { ...prev, targetAreas: newAreas };
    });
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    if (step === 1 && !formData.goal) return setErrorMsg("Please select a goal.");
    if (step === 3 && formData.equipment.length === 0) return setErrorMsg("Please select at least one equipment.");
    if (step < 4) setStep(step + 1);
    else generateAIPlan();
  };

  const generateAIPlan = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Create a payload for the AI plan generation
      const payload = {
        ...formData,
        targetAreas: formData.targetAreas.length === 0 ? ['fullbody'] : formData.targetAreas
      };
      
      let generatedPlan = null;

      try {
        // Attempt backend API call first
        generatedPlan = await workoutApi.generateAIPlan(payload);
      } catch (apiErr) {
        console.warn("[FitnessOnboarding] Backend API error, activating localized fallback generator:", apiErr.message);
        // Fallback generator to guarantee user is never blocked by a 404 or backend downtime
        generatedPlan = generateFallbackPlan(payload);

        // Update local user state immediately
        try {
          const raw = localStorage.getItem('fitkart_user');
          const localUser = raw ? JSON.parse(raw) : {};
          const updatedUser = {
            ...localUser,
            fitnessStats: {
              ...(localUser.fitnessStats || {}),
              fitnessPlan: generatedPlan
            }
          };
          localStorage.setItem('fitkart_user', JSON.stringify(updatedUser));
          if (typeof setUser === 'function') {
            setUser(updatedUser);
          }
        } catch (storageErr) {
          console.error("Storage update error:", storageErr);
        }

        // Persist fallback plan to MongoDB on the user account
        try {
          await authApi.updateProfile({
            fitnessStats: {
              fitnessPlan: generatedPlan
            }
          });
        } catch (cloudErr) {
          console.warn("[FitnessOnboarding] Cloud sync notice:", cloudErr.message);
        }
      }
      
      // Attempt to refresh user from MongoDB
      if (typeof refreshUser === 'function') {
        try { await refreshUser(); } catch (rErr) {}
      }
      
      setLoading(false);
      navigate('/fitness');
    } catch (err) {
      console.error("Failed to generate plan", err);
      // Even if any uncaught error occurs, provide the fallback plan and proceed!
      const fallback = generateFallbackPlan(formData);
      try {
        const raw = localStorage.getItem('fitkart_user');
        const localUser = raw ? JSON.parse(raw) : {};
        const updatedUser = {
          ...localUser,
          fitnessStats: {
            ...(localUser.fitnessStats || {}),
            fitnessPlan: fallback
          }
        };
        localStorage.setItem('fitkart_user', JSON.stringify(updatedUser));
        if (typeof setUser === 'function') {
          setUser(updatedUser);
        }
        await authApi.updateProfile({
          fitnessStats: {
            fitnessPlan: fallback
          }
        }).catch(() => {});
      } catch (e) {}
      setLoading(false);
      navigate('/fitness');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fit-bg flex flex-col items-center justify-center p-6 text-fit-text font-sans relative overflow-hidden transition-colors duration-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-fit-primary/10 to-blue-500/10 opacity-50" />
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-fit-border rounded-full" />
            <div className="absolute inset-0 border-4 border-fit-primary rounded-full border-t-transparent animate-spin" />
            <ActivityIcon size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fit-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-fit-text">Calibrating Training Protocol...</h2>
          <p className="text-fit-muted text-sm">Analyzing your physical parameters & generating your precision 30-Day Training Plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fit-bg text-fit-text font-sans flex flex-col transition-colors duration-200">
      {/* Progress Bar */}
      <div className="h-1.5 bg-fit-surface2 w-full">
        <div 
          className="h-full bg-fit-primary transition-all duration-500 ease-out shadow-sm" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 z-10 bg-fit-bg/85 backdrop-blur-md border-b border-fit-border/40">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 text-fit-muted hover:text-fit-text transition-colors">
            <ChevronLeft size={24} />
          </button>
        ) : <div className="w-10" />}
        <span className="text-fit-muted font-bold text-xs uppercase tracking-widest">Step {step} of 4</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-4 sm:px-6 py-4 flex flex-col max-w-md mx-auto w-full min-h-0 overflow-y-auto hide-scrollbar">
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold">
            {errorMsg}
          </div>
        )}
        
        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight text-fit-text">What's your main fitness goal?</h2>
            <p className="text-fit-muted text-sm mb-8">Let us know what you want to achieve so we can tailor your 30-day program.</p>
            
            <div className="space-y-4">
              {[
                { id: 'Lose Weight', label: 'Lose Weight', desc: 'Burn fat and get leaner', icon: Flame },
                { id: 'Build Muscle', label: 'Build Muscle', desc: 'Increase muscle mass and size', icon: Target },
                { id: 'Get Fit', label: 'Get Fit', desc: 'Improve stamina and overall health', icon: Activity },
                { id: 'Build Strength', label: 'Build Strength', desc: 'Lift heavier and get stronger', icon: Dumbbell }
              ].map(goal => {
                const isSelected = formData.goal === goal.id;
                return (
                  <div 
                    key={goal.id}
                    onClick={() => updateForm('goal', goal.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 shadow-sm ${
                      isSelected 
                        ? 'border-fit-primary bg-fit-primary/10 shadow-glow' 
                        : 'border-fit-border bg-fit-surface hover:border-fit-primary/50 hover:bg-fit-surface2/60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-fit-primary text-white' : 'bg-fit-surface2 text-fit-muted'
                    }`}>
                      <goal.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-fit-text">{goal.label}</h3>
                      <p className={`text-xs ${isSelected ? 'text-fit-primary font-semibold' : 'text-fit-muted'}`}>{goal.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Stats */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight text-fit-text">Tell us about yourself</h2>
            <p className="text-fit-muted text-sm mb-8">This helps our AI calculate your calorie burn and intensity level.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-3">Gender</label>
                <div className="flex bg-fit-surface2 p-1 rounded-xl border border-fit-border">
                  {['Male', 'Female'].map(g => (
                    <button 
                      key={g} 
                      onClick={() => updateForm('gender', g)}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        formData.gender === g 
                          ? 'bg-fit-primary text-white shadow-sm' 
                          : 'text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-3">Experience Level</label>
                <div className="flex bg-fit-surface2 p-1 rounded-xl border border-fit-border">
                  {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                    <button 
                      key={lvl} 
                      onClick={() => updateForm('level', lvl)}
                      className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                        formData.level === lvl 
                          ? 'bg-fit-primary text-white shadow-sm' 
                          : 'text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-fit-surface p-4 rounded-2xl border border-fit-border shadow-sm">
                  <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-2">Age</label>
                  <div className="flex items-end gap-1 border-b border-fit-border pb-2">
                    <input 
                      type="number" 
                      value={formData.age} 
                      onChange={e => updateForm('age', e.target.value)} 
                      className="bg-transparent text-3xl font-extrabold text-fit-text w-full outline-none p-0" 
                    />
                    <span className="text-fit-muted font-bold mb-1">yrs</span>
                  </div>
                </div>
                <div className="bg-fit-surface p-4 rounded-2xl border border-fit-border shadow-sm">
                  <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-2">Weight</label>
                  <div className="flex items-end gap-1 border-b border-fit-border pb-2">
                    <input 
                      type="number" 
                      value={formData.weight} 
                      onChange={e => updateForm('weight', e.target.value)} 
                      className="bg-transparent text-3xl font-extrabold text-fit-text w-full outline-none p-0" 
                    />
                    <span className="text-fit-muted font-bold mb-1">kg</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-fit-surface p-4 rounded-2xl border border-fit-border shadow-sm">
                <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-2">Height</label>
                <div className="flex items-end gap-1 border-b border-fit-border pb-2">
                  <input 
                    type="number" 
                    value={formData.height} 
                    onChange={e => updateForm('height', e.target.value)} 
                    className="bg-transparent text-3xl font-extrabold text-fit-text w-full outline-none p-0" 
                  />
                  <span className="text-fit-muted font-bold mb-1">cm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Equipment */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight text-fit-text">What equipment do you have?</h2>
            <p className="text-fit-muted text-sm mb-6">Select all that apply.</p>
            
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4">
              {['Full Gym', 'Dumbbells', 'Barbell', 'Machines', 'Resistance Bands', 'Bodyweight', 'Home'].map(eq => {
                const isSelected = formData.equipment.includes(eq);
                return (
                  <button
                    key={eq}
                    onClick={() => toggleArrayItem('equipment', eq)}
                    className={`p-4 rounded-xl border text-left font-bold transition-all shadow-sm ${
                      isSelected
                        ? 'border-fit-primary bg-fit-primary/10 text-fit-text font-black ring-1 ring-fit-primary'
                        : 'border-fit-border bg-fit-surface text-fit-muted hover:border-fit-border/80 hover:text-fit-text'
                    }`}
                  >
                    {isSelected && <span className="text-fit-primary mr-1.5">✓</span>}
                    {eq}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Training Details & Target Areas */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 leading-tight text-fit-text">Training Details</h2>
              <p className="text-fit-muted text-xs sm:text-sm">Finalize your plan parameters.</p>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-1.5">Days / Week</label>
                  <select 
                    value={formData.daysPerWeek} 
                    onChange={e => handleDaysPerWeekChange(e.target.value)}
                    className="w-full bg-fit-surface border border-fit-border rounded-xl p-3 text-fit-text font-bold outline-none text-sm shadow-sm"
                  >
                    {[2,3,4,5,6].map(n => <option key={n} value={n} className="bg-fit-surface text-fit-text">{n} Days</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-1.5">Duration</label>
                  <select 
                    value={formData.duration} 
                    onChange={e => updateForm('duration', Number(e.target.value))}
                    className="w-full bg-fit-surface border border-fit-border rounded-xl p-3 text-fit-text font-bold outline-none text-sm shadow-sm"
                  >
                    <option value={30} className="bg-fit-surface text-fit-text">30 mins</option>
                    <option value={45} className="bg-fit-surface text-fit-text">45 mins</option>
                    <option value={60} className="bg-fit-surface text-fit-text">60 mins</option>
                    <option value={90} className="bg-fit-surface text-fit-text">90 mins</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-fit-muted text-xs font-bold uppercase tracking-wider mb-1.5">Training Split</label>
                <select 
                  value={formData.split} 
                  onChange={e => updateForm('split', e.target.value)}
                  className="w-full bg-fit-surface border border-fit-border rounded-xl p-3 text-fit-text font-bold outline-none text-sm shadow-sm"
                >
                  <option value="Full Body" className="bg-fit-surface text-fit-text">Full Body (Recommended for Beginners)</option>
                  <option value="Push/Pull/Legs" className="bg-fit-surface text-fit-text">Push / Pull / Legs (PPL)</option>
                  <option value="Upper/Lower" className="bg-fit-surface text-fit-text">Upper / Lower</option>
                  <option value="Bro Split" className="bg-fit-surface text-fit-text">Body Part Split (Bro Split)</option>
                </select>
              </div>

              {/* Weekly Schedule & Rest Days Pattern */}
              <div className="bg-fit-surface rounded-2xl p-4 border border-fit-border shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-fit-muted text-xs font-bold uppercase tracking-wider">Weekly Schedule Preview</label>
                  <span className="text-[11px] font-extrabold text-fit-primary bg-fit-primary/10 px-2.5 py-0.5 rounded-full border border-fit-primary/20">
                    {formData.daysPerWeek} Workouts • {7 - formData.daysPerWeek} Rest Days
                  </span>
                </div>

                {/* Pattern Toggle for 3, 4, 5 days */}
                {(formData.daysPerWeek >= 3 && formData.daysPerWeek <= 5) && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        const num = formData.daysPerWeek;
                        setFormData(prev => ({
                          ...prev,
                          workoutDays: Array.from({ length: num }, (_, i) => i + 1),
                          restStyle: 'consecutive'
                        }));
                      }}
                      className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                        formData.restStyle !== 'spread' && formData.restStyle !== 'midweek' && formData.restStyle !== 'custom'
                          ? 'border-fit-primary bg-fit-primary/10 text-fit-text ring-1 ring-fit-primary shadow-sm'
                          : 'border-fit-border bg-fit-surface2/60 text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 font-extrabold text-xs">
                        {(formData.restStyle !== 'spread' && formData.restStyle !== 'midweek' && formData.restStyle !== 'custom') && <span className="text-fit-primary">✓</span>}
                        <span>Days 1–{formData.daysPerWeek} Workout</span>
                      </div>
                      <p className="text-[11px] font-normal text-fit-muted">Continuous gym, rest grouped at end</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        let spreadDays = [1, 2, 4, 5];
                        if (formData.daysPerWeek === 5) spreadDays = [1, 2, 4, 5, 6];
                        if (formData.daysPerWeek === 3) spreadDays = [1, 3, 5];
                        setFormData(prev => ({
                          ...prev,
                          workoutDays: spreadDays,
                          restStyle: 'spread'
                        }));
                      }}
                      className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                        formData.restStyle === 'spread' || formData.restStyle === 'midweek'
                          ? 'border-fit-primary bg-fit-primary/10 text-fit-text ring-1 ring-fit-primary shadow-sm'
                          : 'border-fit-border bg-fit-surface2/60 text-fit-muted hover:text-fit-text'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 font-extrabold text-xs">
                        {(formData.restStyle === 'spread' || formData.restStyle === 'midweek') && <span className="text-fit-primary">✓</span>}
                        <span>Rest in between</span>
                      </div>
                      <p className="text-[11px] font-normal text-fit-muted">Midweek recovery breaks</p>
                    </button>
                  </div>
                )}

                {/* Interactive 7-Day Pill Strip */}
                <div className="grid grid-cols-7 gap-1 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7].map(d => {
                    const activeList = Array.isArray(formData.workoutDays) && formData.workoutDays.length > 0
                      ? formData.workoutDays
                      : Array.from({ length: formData.daysPerWeek }, (_, i) => i + 1);
                    const isGym = activeList.includes(d);

                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDayPill(d)}
                        title={`Click to set Day ${d} as ${isGym ? 'Rest' : 'Gym'}`}
                        className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center border transition-all cursor-pointer active:scale-95 ${
                          !isGym
                            ? 'bg-fit-surface2/80 border-fit-border/60 text-fit-muted hover:border-fit-muted'
                            : 'border-fit-primary bg-fit-primary/15 text-fit-primary font-black shadow-sm ring-1 ring-fit-primary/30 hover:bg-fit-primary/25'
                        }`}
                      >
                        <span className="text-[10px] font-bold opacity-75">D{d}</span>
                        <span className="text-[10px] font-extrabold uppercase mt-0.5">
                          {isGym ? 'Gym' : 'Rest'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-fit-muted text-center pt-0.5">
                  💡 Tap any day pill to toggle between <span className="text-fit-primary font-bold">Gym</span> and <span className="text-fit-muted font-bold">Rest</span>.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-fit-muted text-xs font-bold uppercase tracking-wider">Target Muscles (Optional)</label>
                  {formData.targetAreas.length > 0 && (
                    <span className="text-xs font-bold text-fit-primary bg-fit-primary/10 px-2.5 py-0.5 rounded-full border border-fit-primary/30">
                      {formData.targetAreas.length} selected
                    </span>
                  )}
                </div>

                <div className="bg-fit-surface rounded-2xl p-4 border border-fit-border flex flex-col items-center shadow-card">
                  <div className="w-full flex justify-center py-2">
                    <MuscularBodySelect selectedParts={formData.targetAreas} togglePart={toggleTargetArea} />
                  </div>
                  <div className="mt-2 text-center text-fit-muted text-xs mb-3">
                    Tap body areas or select quick chips below:
                  </div>
                  {/* Quick Select Muscle Pills for easy mobile finger tapping */}
                  <div className="flex flex-wrap gap-1.5 justify-center w-full">
                    {[
                      { id: 'fullbody', label: 'Full Body' },
                      { id: 'chest', label: 'Chest' },
                      { id: 'arms', label: 'Arms' },
                      { id: 'abs', label: 'Core / Abs' },
                      { id: 'legs', label: 'Legs' }
                    ].map(part => {
                      const isSel = formData.targetAreas.includes(part.id);
                      return (
                        <button
                          key={part.id}
                          type="button"
                          onClick={() => toggleTargetArea(part.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSel
                              ? 'bg-fit-primary text-white shadow-md scale-105'
                              : 'bg-fit-surface2 text-fit-muted hover:text-fit-text border border-fit-border'
                          }`}
                        >
                          {isSel && '✓ '}
                          {part.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="mt-6 mb-6 pb-8 shrink-0">
          <button
            type="button"
            onClick={handleNext}
            disabled={step === 1 && !formData.goal}
            className={`w-full py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              (step === 1 && !formData.goal) 
                ? 'bg-fit-surface2 text-fit-muted/50 cursor-not-allowed border border-fit-border' 
                : 'bg-fit-primary text-white hover:bg-fit-primary-dark shadow-md hover:shadow-glow'
            }`}
          >
            {step === 4 ? 'Generate AI Plan' : 'Continue'} 
            {step < 4 && <ChevronRight size={20} />}
          </button>
        </div>

      </div>
    </div>
  );
}
