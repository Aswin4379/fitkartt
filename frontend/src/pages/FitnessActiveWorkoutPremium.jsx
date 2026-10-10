import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Play, Pause, CheckCircle, Plus, X, ChevronLeft, ChevronRight, Clock, Trash2, StopCircle, Check, Activity, Dumbbell, SkipForward, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { exerciseLibrary } from '../data/workouts.js';

import { useWorkout } from '../context/WorkoutContext.jsx';
import ActiveWorkoutMuscleView from './ActiveWorkoutMuscleView.jsx';

export default function FitnessActiveWorkoutPremium({ onSwitchTheme }) {
  const navigate = useNavigate();
  const { activeWorkout, workoutStartTime, endWorkout, cancelWorkout, updateSet, toggleSetComplete, removeExerciseFromActive, sessions, addSetToActive, addExerciseToActive } = useWorkout();

  const [duration, setDuration] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [completedSession, setCompletedSession] = useState(null);

  // Auto-populate foundational exercises if active workout has 0 exercises
  useEffect(() => {
    if (activeWorkout && (!activeWorkout.exercises || activeWorkout.exercises.length === 0)) {
      const defaultQuickExercises = [
        exerciseLibrary.find(e => e.id === 'standard-pushup' || e.id === 'dumbbell-push-ups'),
        exerciseLibrary.find(e => e.id === 'dumbbell-squats' || e.id === 'bodyweight-squat'),
        exerciseLibrary.find(e => e.id === 'dumbbell-bicep-curls'),
        exerciseLibrary.find(e => e.id === 'plank')
      ].filter(Boolean);

      const exercisesToAdd = defaultQuickExercises.length > 0 ? defaultQuickExercises : exerciseLibrary.slice(0, 4);
      exercisesToAdd.forEach(ex => addExerciseToActive(ex));
    }
  }, [activeWorkout]);
  
  // Timer for workout duration
  useEffect(() => {
    if (!workoutStartTime) return;
    const interval = setInterval(() => {
      setDuration(Math.floor((new Date() - workoutStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [workoutStartTime]);

  // Rest Timer logic
  useEffect(() => {
    if (!isResting || restTimer <= 0) {
      setIsResting(false);
      setIsTimerPaused(false);
      return;
    }
    if (isTimerPaused) return;
    
    const interval = setInterval(() => {
      setRestTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting, restTimer, isTimerPaused]);


  if (showSummary && completedSession) {
    return (
      <div className="min-h-screen bg-black w-full">
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-fit-primary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={48} className="text-fit-primary" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight text-center">Workout Complete!</h2>
          <p className="text-zinc-400 mb-8 text-center text-lg">Great job! Here is your summary.</p>
          
          <div className="bg-zinc-900 rounded-3xl p-6 w-full mb-8 border border-zinc-800 shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 p-4 rounded-2xl text-center">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Duration</div>
                <div className="text-2xl font-black text-white">{Math.round((completedSession.durationSeconds || 0)/60)} min</div>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl text-center">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Volume</div>
                <div className="text-2xl font-black text-white">{(completedSession.totalVolume || 0).toLocaleString()} kg</div>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl text-center">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Exercises</div>
                <div className="text-2xl font-black text-white">{completedSession.exercises?.length || 0}</div>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl text-center">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Calories</div>
                <div className="text-2xl font-black text-amber-500">{completedSession.caloriesBurned || 0}</div>
              </div>
            </div>
            
            {completedSession.prsHit && completedSession.prsHit.length > 0 && (
              <div className="mt-4 bg-fit-primary/10 p-4 rounded-2xl border border-fit-primary/30 text-center">
                <div className="text-fit-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  🎉 New Personal Records
                </div>
                <div className="text-white font-bold text-sm">
                  {completedSession.prsHit.join(', ')}
                </div>
              </div>
            )}
          </div>
          
          <button onClick={() => navigate('/fitness')} className="w-full bg-white text-black py-4 rounded-2xl font-extrabold text-lg hover:bg-zinc-200 transition-colors shadow-lg">
            Back to Fitness
          </button>
        </div>
      </div>
    );
  }

  if (!activeWorkout) {
    return (
      <div className="min-h-screen bg-black w-full">
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-zinc-800/50">
            <StopCircle size={48} className="text-zinc-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">No Active Workout</h2>
          <p className="text-zinc-400 mb-8 max-w-sm text-lg">Pick a routine from the library to begin tracking.</p>
          <button onClick={() => navigate('/fitness')} className="bg-gradient-to-r from-fit-primary to-emerald-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            Go to Gym Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!activeWorkout.exercises || activeWorkout.exercises.length === 0) {
    return (
      <div className="min-h-screen bg-black w-full flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-fit-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-bold">Preparing Workout Exercises...</p>
        </div>
      </div>
    );
  }

  const currentExercise = activeWorkout.exercises[currentExerciseIndex] || activeWorkout.exercises[0];
  if (!currentExercise) return null;

  console.log('--- EXERCISE RENDER TRACE ---');
  console.log('EXERCISE NAME:', currentExercise.name);
  console.log('VIDEO URL:', currentExercise.videoUrl);
  console.log('GIF URL:', currentExercise.gifUrl);
  console.log('MEDIA URL:', currentExercise.mediaUrl);
  console.log('ALL KEYS:', Object.keys(currentExercise));
  console.log('-----------------------------');

  const handleCompleteSet = (setIndex) => {
    toggleSetComplete(currentExerciseIndex, setIndex);
    const isNowCompleted = !currentExercise.sets[setIndex].isCompleted;
    if (isNowCompleted) {
      setRestTimer(currentExercise.restTime || 60);
      setIsResting(true);
      setIsTimerPaused(false);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < activeWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsResting(false);
    }
  };


  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setIsResting(false);
    }
  };

  
  const handleFinish = async () => {
    // Check if any exercises have incomplete sets
    const hasIncomplete = activeWorkout.exercises.some(ex => ex.sets.some(s => !s.isCompleted));
    if (hasIncomplete) {
      setShowFinishConfirm(true);
      return;
    }

    await executeFinish();
  };

  const executeFinish = async () => {
    try {
      setSaveError('');
      const session = await endWorkout();
      setCompletedSession(session);
      setShowSummary(true);
      setShowFinishConfirm(false);
    } catch (err) {
      setSaveError(`Failed to save workout: ${err.message || 'Unknown error'}`);
      setShowFinishConfirm(false);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const allSetsCompleted = currentExercise.sets.every(s => s.isCompleted);
  const totalCompletedSets = activeWorkout.exercises.reduce((sum, ex) => sum + ex.sets.filter(s => s.isCompleted).length, 0);
  const totalSets = activeWorkout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const progressPercent = Math.round((totalCompletedSets / totalSets) * 100) || 0;

  const getExerciseType = (ex) => {
    const name = ex.name?.toLowerCase() || '';
    if (['plank', 'sit', 'hold', 'stretch', 'child', 'circle', 'pose'].some(w => name.includes(w))) return 'time';
    if (ex.equipment?.toLowerCase() === 'bodyweight') return 'bodyweight';
    return 'weighted';
  };

  const getPrevString = (exName, setIndex, type) => {
    const lastSession = sessions.find(s => s.exercises.some(e => e.name === exName));
    if (lastSession) {
      const pastEx = lastSession.exercises.find(e => e.name === exName);
      if (pastEx && pastEx.sets && pastEx.sets[setIndex]) {
         const pastSet = pastEx.sets[setIndex];
         if (type === 'weighted') return `${pastSet.weight}kg × ${pastSet.reps}`;
         if (type === 'bodyweight') return `${pastSet.reps} reps`;
         if (type === 'time') return `${pastSet.duration || pastSet.reps} sec`;
      }
    }
    return '—';
  };

  const VERIFIED_EXERCISE_VIDEOS = {
    'jumping jacks': 'https://www.youtube.com/embed/uLVt6u15L98',
    'dumbbell floor press': 'https://www.youtube.com/embed/6J_qDTZZ0AM',
    'dumbbell push-ups': 'https://www.youtube.com/embed/VrSGEXrwZAc',
    'dumbbell push ups': 'https://www.youtube.com/embed/VrSGEXrwZAc',
    'dumbbell push-up': 'https://www.youtube.com/embed/VrSGEXrwZAc',
    'dumbbell squats': 'https://www.youtube.com/embed/r9gqv3WF90I',
    'dumbbell squat': 'https://www.youtube.com/embed/r9gqv3WF90I',
    'dumbbell bicep curls': 'https://www.youtube.com/embed/3OZ2MT_5r3Q',
    'dumbbell bicep curl': 'https://www.youtube.com/embed/3OZ2MT_5r3Q',
    'standing calf raises': 'https://www.youtube.com/embed/hPA98_r-6e4',
    'standing calf raise': 'https://www.youtube.com/embed/hPA98_r-6e4',
    'arm circles': 'https://www.youtube.com/embed/hne3nHGXPRM',
    'dumbbell incline press (using step/chair)': 'https://www.youtube.com/embed/DnV3R4vp3K0',
    'dumbbell incline press': 'https://www.youtube.com/embed/DnV3R4vp3K0',
    'incline dumbbell press': 'https://www.youtube.com/embed/DnV3R4vp3K0',
    'dumbbell flyes': 'https://www.youtube.com/embed/auTPCuLVjbA',
    'dumbbell flys': 'https://www.youtube.com/embed/auTPCuLVjbA',
    'dumbbell lunges': 'https://www.youtube.com/embed/xn8OY4SkX8Y',
    'dumbbell lunge': 'https://www.youtube.com/embed/xn8OY4SkX8Y',
    'dumbbell overhead tricep extension': 'https://www.youtube.com/embed/Ml9QzVI-pBQ',
    'seated overhead dumbbell tricep extension': 'https://www.youtube.com/embed/Ml9QzVI-pBQ',
    'overhead dumbbell tricep extension': 'https://www.youtube.com/embed/Ml9QzVI-pBQ',
    "child's pose": 'https://www.youtube.com/embed/eqVMAPM00DM',
    'childs pose': 'https://www.youtube.com/embed/eqVMAPM00DM'
  };

  const getVideoUrl = (ex) => {
    if (!ex) return '';
    const cleanName = (ex.name || '').toLowerCase().trim();
    if (VERIFIED_EXERCISE_VIDEOS[cleanName]) {
      return VERIFIED_EXERCISE_VIDEOS[cleanName];
    }
    const dbMatch = exerciseLibrary.find(e => (e.name || '').toLowerCase().trim() === cleanName);
    if (dbMatch && dbMatch.videoUrl) {
      return dbMatch.videoUrl;
    }
    return ex.videoUrl || '';
  };

  const getEmbedUrl = (rawUrl) => {
    if (!rawUrl) return null;
    let videoId = '';
    if (rawUrl.includes('youtube.com/embed/')) {
      videoId = rawUrl.split('youtube.com/embed/')[1].split('?')[0];
    } else if (rawUrl.includes('youtube.com/watch?v=')) {
      videoId = rawUrl.split('v=')[1].split('&')[0];
    } else if (rawUrl.includes('youtu.be/')) {
      videoId = rawUrl.split('youtu.be/')[1].split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
  };

  const getWatchUrl = (ex, embedUrl) => {
    if (embedUrl) {
      const videoId = embedUrl.split('embed/')[1]?.split('?')[0];
      if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return `https://www.youtube.com/results?search_query=${encodeURIComponent((ex?.name || '') + ' exercise proper form tutorial')}`;
  };


  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative overflow-hidden">
      
      {/* Background */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/fitkartt/workout-bg.jpg')` }}
      />
      <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-[2px] pointer-events-none -z-10" />
      <div className="fixed top-0 left-0 w-full h-96 bg-fit-primary/10 blur-[120px] pointer-events-none -z-10 mix-blend-screen" />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex-shrink-0 flex items-center justify-center border border-white/10">
              <Activity className="text-fit-primary animate-pulseSlow" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-snug text-white line-clamp-2">{activeWorkout.name}</h1>
              <div className="text-fit-primary font-mono text-xs sm:text-sm flex items-center gap-1.5 opacity-90 mt-0.5">
                <Clock size={13} /> {formatTime(duration)}
                <span className="text-zinc-500 mx-1">|</span>
                <span className="text-amber-400">{progressPercent}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button 
              onClick={() => setShowDiscardConfirm(true)} 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-white/10"
              title="Discard Workout"
            >
              <X size={18} />
            </button>
            <button onClick={onSwitchTheme} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10" title="Switch Theme">
              <Smartphone size={18} />
            </button>
            <button onClick={handleFinish} className="bg-white text-black px-4 sm:px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Finish
            </button>
          </div>
        </div>

        {/* Pinned Bottom Progress Bar */}
        <div className="w-full h-1 bg-zinc-900 overflow-hidden">
          <div className="h-full bg-fit-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {saveError && (
        <div className="mx-4 mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl">
          <p className="text-red-400 text-sm font-bold">{saveError}</p>
        </div>
      )}

      {/* Main Focus Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-6 pb-32">
        
        {/* Left Col: Media & Muscles */}
        <div className="md:w-5/12 flex flex-col gap-6">
          {/* Exact Exercise Video Demonstration */}
          {(() => {
            const rawVidUrl = getVideoUrl(currentExercise);
            const currentEmbedUrl = getEmbedUrl(rawVidUrl);
            const currentWatchUrl = getWatchUrl(currentExercise, currentEmbedUrl);

            return (
              <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <Play size={14} className="text-fit-primary" /> Video Demonstration
                  </h3>
                  <a 
                    href={currentWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-fit-primary hover:underline flex items-center gap-1.5 transition-colors"
                  >
                    Watch on YouTube <ExternalLink size={12} />
                  </a>
                </div>
                
                <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-black border border-white/5 flex items-center justify-center">
                  {currentEmbedUrl ? (
                    <iframe
                      key={currentEmbedUrl}
                      src={currentEmbedUrl}
                      title={`${currentExercise.name} Video Demonstration`}
                      className="w-full h-full border-0 rounded-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                        <Play size={24} className="opacity-40" />
                      </div>
                      <p className="text-zinc-400 text-sm font-medium">Video demonstration unavailable</p>
                      <a
                        href={currentWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
                      >
                        <Play size={14} fill="currentColor" /> Watch on YouTube
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 text-xs">
                  <span className="text-zinc-400">
                    Exercise: <span className="text-white font-bold">{currentExercise.name}</span>
                  </span>
                  <a
                    href={currentWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Open in YouTube <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })()}
          
          {/* Exercise Details */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-white/10 text-sm">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Info size={16} className="text-fit-primary" /> Details & Instructions
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Equipment</div>
                <div className="text-white font-semibold">{currentExercise.equipment || 'Bodyweight'}</div>
              </div>
              <div>
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Difficulty</div>
                <div className="text-white font-semibold">{currentExercise.level || currentExercise.difficulty || 'Intermediate'}</div>
              </div>
            </div>
            
            {currentExercise.instructions && currentExercise.instructions.length > 0 && (
              <div>
                {Array.isArray(currentExercise.instructions) ? (
                  <ol className="list-decimal pl-4 space-y-2 text-zinc-300">
                    {currentExercise.instructions.map((inst, i) => (
                      <li key={i} className="leading-relaxed">{inst}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-zinc-300 leading-relaxed">{currentExercise.instructions}</p>
                )}
              </div>
            )}
            
            {currentExercise.commonMistakes && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                <div className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                  <AlertTriangle size={14} /> Common Mistakes
                </div>
                <p className="text-red-300/80 leading-relaxed">{currentExercise.commonMistakes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Sets & Tracking */}
        <div className="md:w-7/12 flex flex-col gap-4">
          {/* Quick Exercise Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {activeWorkout.exercises.map((ex, idx) => {
              const isCurrent = idx === currentExerciseIndex;
              const isAllDone = ex.sets?.every(s => s.isCompleted);
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentExerciseIndex(idx)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-fit-primary text-black shadow-lg shadow-fit-primary/25 scale-[1.02]'
                      : isAllDone
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                  }`}
                >
                  <span className="opacity-70">{idx + 1}.</span>
                  <span className="max-w-[120px] truncate">{ex.name}</span>
                  {isAllDone && <Check size={12} strokeWidth={3} className={isCurrent ? 'text-black' : 'text-emerald-400'} />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-start bg-zinc-900/60 backdrop-blur-md rounded-3xl p-6 border border-white/10">
            <div>
              <div className="text-fit-primary font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                Exercise {currentExerciseIndex + 1} of {activeWorkout.exercises.length}
                {currentExercise.type && (
                  <span className={`px-2 py-0.5 rounded text-[10px] ${currentExercise.type === 'warm-up' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {currentExercise.type}
                  </span>
                )}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentExercise.name + ' exercise tutorial')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors flex items-center gap-3 group inline-flex"
                  title="Watch tutorials on YouTube"
                >
                  {currentExercise.name}
                  <div className="bg-red-500/10 p-2 rounded-full group-hover:bg-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all">
                    <Play size={20} fill="currentColor" className="text-red-500 group-hover:text-white transition-colors" />
                  </div>
                </a>
              </div>
              {currentExercise.reason && <p className="text-zinc-400 text-sm mt-3 border-l-2 border-fit-primary pl-3">{currentExercise.reason}</p>}
            </div>
          </div>

          {/* Sets Tracker */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex-1">
            
            <div className={`grid ${getExerciseType(currentExercise) === 'weighted' ? 'grid-cols-[1fr_2fr_2fr_2fr_1fr]' : 'grid-cols-[1fr_2fr_3fr_1fr]'} gap-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest text-center px-2 mb-4`}>
              <div>Set</div>
              <div>Prev</div>
              {getExerciseType(currentExercise) === 'weighted' && <div>KG</div>}
              {getExerciseType(currentExercise) !== 'time' && <div>Reps</div>}
              {getExerciseType(currentExercise) === 'time' && <div>Duration</div>}
              <div><Check size={14} className="mx-auto" /></div>
            </div>



            
            <div className="space-y-3">
              {currentExercise.sets.map((set, setIndex) => {
                const type = getExerciseType(currentExercise);
                const isWeighted = type === 'weighted';
                const isTime = type === 'time';
                const isBodyweight = type === 'bodyweight';
                
                const canComplete = isWeighted ? (set.weight > 0 && set.reps > 0) : 
                                    isTime ? (set.duration > 0) : 
                                    isBodyweight ? (set.reps > 0) : true;
                
                return (
                  <div key={setIndex} className={`grid ${isWeighted ? 'grid-cols-[1fr_2fr_2fr_2fr_1fr]' : 'grid-cols-[1fr_2fr_3fr_1fr]'} gap-3 items-center text-center p-3 rounded-2xl transition-all duration-300 ${set.isCompleted ? 'bg-fit-primary/10 border border-fit-primary/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-black/50 border border-white/5'}`}>
                    
                    <div className={`font-bold ${set.isCompleted ? 'text-fit-primary' : 'text-zinc-500'}`}>
                      {setIndex + 1}
                    </div>
                    
                    <div className="text-zinc-500 text-xs font-semibold">
                      {getPrevString(currentExercise.name, setIndex, type)}
                    </div>
                    
                    {isWeighted && (
                    <div className="relative">
                      <input
                        type="number"
                        value={set.weight || ''}
                        placeholder="KG"
                        onChange={(e) => updateSet(currentExerciseIndex, setIndex, 'weight', Number(e.target.value))}
                        disabled={set.isCompleted}
                        className={`w-full bg-zinc-800/80 border rounded-xl py-3 text-center font-mono text-white text-lg font-bold transition-colors outline-none
                          ${set.isCompleted ? 'border-transparent text-white/80 bg-transparent' : 'border-zinc-700 focus:border-fit-primary focus:bg-black'}
                        `}
                      />
                    </div>
                    )}
                    
                    {(isWeighted || isBodyweight) && (
                    <div className="relative">
                      <input
                        type="number"
                        value={set.reps || ''}
                        placeholder="Reps"
                        onChange={(e) => updateSet(currentExerciseIndex, setIndex, 'reps', Number(e.target.value))}
                        disabled={set.isCompleted}
                        className={`w-full bg-zinc-800/80 border rounded-xl py-3 text-center font-mono text-white text-lg font-bold transition-colors outline-none
                          ${set.isCompleted ? 'border-transparent text-white/80 bg-transparent' : 'border-zinc-700 focus:border-fit-primary focus:bg-black'}
                        `}
                      />
                    </div>
                    )}

                    {isTime && (
                    <div className="relative">
                      <input
                        type="number"
                        value={set.duration || ''}
                        placeholder="Sec"
                        onChange={(e) => updateSet(currentExerciseIndex, setIndex, 'duration', Number(e.target.value))}
                        disabled={set.isCompleted}
                        className={`w-full bg-zinc-800/80 border rounded-xl py-3 text-center font-mono text-white text-lg font-bold transition-colors outline-none
                          ${set.isCompleted ? 'border-transparent text-white/80 bg-transparent' : 'border-zinc-700 focus:border-fit-primary focus:bg-black'}
                        `}
                      />
                    </div>
                    )}
                    
                    <button
                      onClick={() => canComplete && handleCompleteSet(setIndex)}
                      disabled={!canComplete && !set.isCompleted}
                      className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform active:scale-90 ${
                        set.isCompleted 
                          ? 'bg-fit-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                          : canComplete 
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                            : 'bg-zinc-900/50 text-zinc-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {set.isCompleted ? <Check size={24} strokeWidth={3} /> : <CheckCircle size={24} />}
                    </button>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={() => addSetToActive(currentExerciseIndex)}
              className="mt-4 w-full border border-dashed border-white/20 py-3 rounded-2xl text-zinc-400 font-bold hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2 mb-8"
            >
              <Plus size={16} /> Add Set
            </button>
            
{/* Navigation inside tracker to keep it close */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
              <button 
                onClick={handlePrevExercise}
                disabled={currentExerciseIndex === 0}
                className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  currentExerciseIndex === 0 ? 'bg-zinc-900/50 text-zinc-600 opacity-50' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                <ChevronLeft size={20} /> Prev
              </button>
              
              {currentExerciseIndex === activeWorkout.exercises.length - 1 ? (
                <button 
                  onClick={handleFinish}
                  disabled={!allSetsCompleted}
                  className={`flex-[2] py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all ${
                    !allSetsCompleted ? 'bg-zinc-900/50 text-zinc-600 border border-white/5' : 'bg-fit-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-[1.02]'
                  }`}
                >
                  Review Workout <CheckCircle size={20} />
                </button>
              ) : (
                <button 
                  onClick={handleNextExercise}
                  disabled={!allSetsCompleted}
                  className={`flex-[2] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    !allSetsCompleted ? 'bg-zinc-900/50 text-zinc-600 border border-white/5' : 'bg-[#2196f3] text-white shadow-[0_0_20px_rgba(33,150,243,0.3)] hover:bg-[#1976d2] hover:scale-[1.02]'
                  }`}
                >
                  Next Exercise <ChevronRight size={20} />
                </button>
              )}
            </div>
            
            {!allSetsCompleted && currentExerciseIndex !== activeWorkout.exercises.length - 1 && (
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="text-xs font-bold text-amber-500/70 flex items-center gap-1.5">
                  <AlertTriangle size={12} /> Complete all sets to continue
                </div>
                <button onClick={handleNextExercise} className="text-xs font-bold text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                  Skip <SkipForward size={12} />
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Global Rest Timer Overlay */}
      {isResting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
            <h3 className="text-fit-primary font-extrabold tracking-widest uppercase mb-8">Rest Time</h3>
            
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                 <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                 <circle cx="128" cy="128" r="120" stroke="#22c55e" strokeWidth="8" fill="none" 
                   strokeDasharray={2 * Math.PI * 120} 
                   strokeDashoffset={(2 * Math.PI * 120) * (1 - restTimer / (currentExercise.restTime || 60))}
                   className="transition-all duration-1000 ease-linear"
                 />
               </svg>
               <div className="text-7xl font-black text-white font-mono tracking-tighter">
                 {restTimer}
               </div>
               <div className="absolute bottom-16 text-zinc-500 font-bold tracking-widest text-sm uppercase">Seconds</div>
            </div>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsTimerPaused(!isTimerPaused)} 
                className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
              >
                {isTimerPaused ? <><Play size={18} /> Resume</> : <><Pause size={18} /> Pause</>}
              </button>
              <button 
                onClick={() => setIsResting(false)} 
                className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
              >
                Skip <SkipForward size={18} />
              </button>
            </div>
            
            <button 
              onClick={() => setRestTimer(prev => prev + 30)} 
              className="mt-4 text-zinc-400 font-bold text-sm hover:text-white transition-colors"
            >
              +30s
            </button>
          </div>
        </div>
      )}

      {/* Finish Confirmation Modal (Custom In-App Modal) */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowFinishConfirm(false)} />
          <div className="bg-zinc-900 border border-white/10 p-6 sm:p-8 rounded-3xl relative z-10 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <StopCircle size={32} className="text-amber-400" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2">Finish Workout Early?</h3>
            <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
              You still have incomplete sets. You can save your completed exercises now, or continue your workout.
            </p>
            
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-6 text-left text-xs text-zinc-400 space-y-2">
              <div className="flex justify-between text-zinc-300 font-semibold">
                <span>Completed Sets:</span>
                <span className="text-fit-primary font-bold">{totalCompletedSets} / {totalSets} sets</span>
              </div>
              <div className="flex justify-between text-zinc-300 font-semibold">
                <span>Elapsed Time:</span>
                <span className="text-white font-mono">{formatTime(duration)}</span>
              </div>
              <div className="flex justify-between text-zinc-300 font-semibold">
                <span>Workout Progress:</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={executeFinish} 
                className="w-full bg-gradient-to-r from-fit-primary to-emerald-400 text-black py-3.5 rounded-xl font-black text-sm hover:opacity-95 transition-all shadow-lg shadow-fit-primary/20 flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} /> Yes, Finish & Save Workout
              </button>
              <button 
                onClick={() => setShowFinishConfirm(false)} 
                className="w-full bg-zinc-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-colors"
              >
                Resume Workout
              </button>
              <button 
                onClick={() => {
                  setShowFinishConfirm(false);
                  setShowDiscardConfirm(true);
                }} 
                className="w-full text-zinc-500 hover:text-red-400 py-2 font-semibold text-xs transition-colors"
              >
                Discard Workout Without Saving
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Confirmation Modal (Custom In-App Modal) */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDiscardConfirm(false)} />
          <div className="bg-zinc-900 border border-red-500/20 p-6 sm:p-8 rounded-3xl relative z-10 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-400">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Discard Workout?</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to cancel this workout? Unsaved sets and timer records will be lost.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={async () => {
                  setShowDiscardConfirm(false);
                  await cancelWorkout();
                  navigate('/fitness');
                }} 
                className="w-full bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-600/20"
              >
                Discard Session
              </button>
              <button 
                onClick={() => setShowDiscardConfirm(false)} 
                className="w-full bg-zinc-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-colors"
              >
                Continue Training
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
