import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Target, Flame, Activity, User, Activity as ActivityIcon, Dumbbell } from 'lucide-react';
import MuscularBodySelect from './MuscularBodySelect.jsx';
import { workoutApi } from '../../services/api.js';
import { useUser } from '../../context/UserContext.jsx';

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
    daysPerWeek: 3,
    duration: 45,
    split: 'Full Body',
    targetAreas: []
  });

  const toggleArrayItem = (key, value) => {
    setFormData(prev => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(i => i !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const toggleTargetArea = (area) => {
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
    if (step === 1 && !formData.goal) return alert("Please select a goal.");
    if (step === 3 && formData.equipment.length === 0) return alert("Please select at least one equipment.");
    if (step < 4) setStep(step + 1);
    else generateAIPlan();
  };

  const generateAIPlan = async () => {
    setLoading(true);
    try {
      // Create a payload for the AI plan generation
      const payload = {
        ...formData,
        targetAreas: formData.targetAreas.length === 0 ? ['fullbody'] : formData.targetAreas
      };
      
      // Call the API
      await workoutApi.generateAIPlan(payload);
      
      // Refresh user to get the newly generated plan from MongoDB
      if (typeof refreshUser === 'function') {
        await refreshUser();
      }
      
      setLoading(false);
      navigate('/fitness');
    } catch (err) {
      console.error("Failed to generate plan", err);
      // We do not want to set a black screen on error, just alert and stop loading.
      alert("Something went wrong generating your AI plan. Please check your inputs and try again.\nError: " + (err.message || 'Unknown Error'));
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2196f3]/10 to-purple-500/10 opacity-50" />
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-zinc-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-[#2196f3] rounded-full border-t-transparent animate-spin" />
            <ActivityIcon size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2196f3] animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-2">FitKart AI is working...</h2>
          <p className="text-zinc-400 text-sm">Analyzing your profile and generating a hyper-personalized 30-Day Workout Plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col">
      {/* Progress Bar */}
      <div className="h-1.5 bg-zinc-900 w-full">
        <div 
          className="h-full bg-[#2196f3] transition-all duration-500 ease-out" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between sticky top-0 z-10 bg-[#121212]/80 backdrop-blur-md">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
        ) : <div className="w-10" />}
        <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Step {step} of 4</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">
        
        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight">What's your main fitness goal?</h2>
            <p className="text-zinc-400 text-sm mb-8">Let us know what you want to achieve so we can tailor your 30-day program.</p>
            
            <div className="space-y-4">
              {[
                { id: 'Lose Weight', label: 'Lose Weight', desc: 'Burn fat and get leaner', icon: Flame },
                { id: 'Build Muscle', label: 'Build Muscle', desc: 'Increase muscle mass and size', icon: Target },
                { id: 'Get Fit', label: 'Get Fit', desc: 'Improve stamina and overall health', icon: Activity },
                { id: 'Build Strength', label: 'Build Strength', desc: 'Lift heavier and get stronger', icon: Dumbbell }
              ].map(goal => (
                <div 
                  key={goal.id}
                  onClick={() => updateForm('goal', goal.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                    formData.goal === goal.id ? 'border-[#2196f3] bg-[#2196f3]/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.goal === goal.id ? 'bg-[#2196f3] text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    <goal.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{goal.label}</h3>
                    <p className={`text-xs ${formData.goal === goal.id ? 'text-[#2196f3]' : 'text-zinc-500'}`}>{goal.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Stats */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight">Tell us about yourself</h2>
            <p className="text-zinc-400 text-sm mb-8">This helps our AI calculate your calorie burn and intensity level.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">Gender</label>
                <div className="flex bg-zinc-900 p-1 rounded-xl">
                  {['Male', 'Female'].map(g => (
                    <button 
                      key={g} 
                      onClick={() => updateForm('gender', g)}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.gender === g ? 'bg-[#2196f3] text-black shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">Experience Level</label>
                <div className="flex bg-zinc-900 p-1 rounded-xl">
                  {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                    <button 
                      key={lvl} 
                      onClick={() => updateForm('level', lvl)}
                      className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${formData.level === lvl ? 'bg-[#2196f3] text-black shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <label className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Age</label>
                  <div className="flex items-end gap-1 border-b border-zinc-700 pb-2">
                    <input type="number" value={formData.age} onChange={e => updateForm('age', e.target.value)} className="bg-transparent text-3xl font-extrabold text-white w-full outline-none p-0" />
                    <span className="text-zinc-500 font-bold mb-1">yrs</span>
                  </div>
                </div>
                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <label className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Weight</label>
                  <div className="flex items-end gap-1 border-b border-zinc-700 pb-2">
                    <input type="number" value={formData.weight} onChange={e => updateForm('weight', e.target.value)} className="bg-transparent text-3xl font-extrabold text-white w-full outline-none p-0" />
                    <span className="text-zinc-500 font-bold mb-1">kg</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <label className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Height</label>
                <div className="flex items-end gap-1 border-b border-zinc-700 pb-2">
                  <input type="number" value={formData.height} onChange={e => updateForm('height', e.target.value)} className="bg-transparent text-3xl font-extrabold text-white w-full outline-none p-0" />
                  <span className="text-zinc-500 font-bold mb-1">cm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Equipment */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight">What equipment do you have?</h2>
            <p className="text-zinc-400 text-sm mb-6">Select all that apply.</p>
            
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4">
              {['Full Gym', 'Dumbbells', 'Barbell', 'Machines', 'Resistance Bands', 'Bodyweight', 'Home'].map(eq => (
                <button
                  key={eq}
                  onClick={() => toggleArrayItem('equipment', eq)}
                  className={`p-4 rounded-xl border text-left font-bold transition-all ${
                    formData.equipment.includes(eq)
                      ? 'border-[#2196f3] bg-[#2196f3]/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Training Details & Target Areas */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col overflow-y-auto hide-scrollbar pb-6">
            <h2 className="text-3xl font-extrabold mb-2 leading-tight">Training Details</h2>
            <p className="text-zinc-400 text-sm mb-6">Finalize your plan parameters.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Days / Week</label>
                  <select 
                    value={formData.daysPerWeek} 
                    onChange={e => updateForm('daysPerWeek', Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white font-bold outline-none"
                  >
                    {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} Days</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Duration</label>
                  <select 
                    value={formData.duration} 
                    onChange={e => updateForm('duration', Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white font-bold outline-none"
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Training Split</label>
                <select 
                  value={formData.split} 
                  onChange={e => updateForm('split', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white font-bold outline-none"
                >
                  <option value="Full Body">Full Body (Recommended for Beginners)</option>
                  <option value="Push/Pull/Legs">Push / Pull / Legs (PPL)</option>
                  <option value="Upper/Lower">Upper / Lower</option>
                  <option value="Bro Split">Body Part Split (Bro Split)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Target Muscles (Optional)</label>
                <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 flex justify-center items-center h-64">
                  <MuscularBodySelect selectedParts={formData.targetAreas} togglePart={toggleTargetArea} />
                </div>
                <div className="mt-2 text-center text-zinc-500 text-xs">Tap body to focus specific areas</div>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="mt-8 pt-4 pb-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={step === 1 && !formData.goal}
            className={`w-full py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all ${
              (step === 1 && !formData.goal) ? 'bg-zinc-800 text-zinc-600' : 'bg-[#2196f3] text-white hover:bg-[#1976d2] shadow-[0_0_20px_rgba(33,150,243,0.3)]'
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
