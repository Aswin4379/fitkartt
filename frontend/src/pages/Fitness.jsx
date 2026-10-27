import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Activity, Calendar, TrendingUp, Plus, Clock, CheckCircle, Search, Dumbbell, Sparkles, HeartPulse, ArrowRight } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { useUser } from '../context/UserContext.jsx';

import FitnessAIPlan from './FitnessOnboarding/FitnessAIPlan.jsx';
import MuscleRecoveryView from '../components/MuscleRecoveryView.jsx';
import PersonalRecordsView from '../components/PersonalRecordsView.jsx';
import { exerciseLibrary } from '../data/workouts.js';

export default function Fitness() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { sessions, activeWorkout, loadUserData, loading, startWorkout, cancelWorkout } = useWorkout();

  useEffect(() => {
    loadUserData();
  }, []);

  // Compute analytics
  const today = new Date();
  const thisWeekSessions = sessions.filter(s => {
    const sDate = new Date(s.startTime);
    return (today - sDate) / (1000 * 60 * 60 * 24) <= 7;
  });

  const totalCaloriesThisWeek = thisWeekSessions.reduce((sum, s) => sum + s.caloriesBurned, 0);
  const totalDurationThisWeek = thisWeekSessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  const totalWorkouts = sessions.length;

  return (
    <AppLayout showFooter>
      <PageHeader 
        title="Fitness Gym" 
        subtitle="Track, build, and conquer your workouts"
      />

      <div className="max-w-7xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* AI Workout Plan Section */}
        <FitnessAIPlan fitnessPlan={user?.fitnessStats?.fitnessPlan} />
        
        {/* Active Workout Banner (Visible when workout in progress) */}
        {activeWorkout && (
          <div className="bg-gradient-to-r from-fit-primary to-emerald-600 rounded-2xl p-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity size={24} className="animate-pulse" />
                Workout in Progress
              </h2>
              <p className="text-sm font-medium mt-1 opacity-90">{activeWorkout.name}</p>
              {activeWorkout.exercises && activeWorkout.exercises.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-black/80">
                  <span className="bg-black/15 px-2.5 py-0.5 rounded-full">
                    {activeWorkout.exercises.filter(ex => ex.sets?.every(s => s.isCompleted)).length} of {activeWorkout.exercises.length} Exercises Done
                  </span>
                  <span>•</span>
                  <span>
                    Exercise {(activeWorkout.currentExerciseIndex || 0) + 1}: {activeWorkout.exercises[activeWorkout.currentExerciseIndex || 0]?.name || ''}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <button 
                onClick={async () => {
                  await cancelWorkout();
                }}
                className="bg-black/20 hover:bg-black/30 text-black border border-black/20 px-4 py-2 rounded-full font-semibold text-sm transition-colors"
                title="Discard active workout"
              >
                Discard
              </button>
              <button 
                onClick={() => navigate('/fitness/active')}
                className="bg-black text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-md"
              >
                Resume <Play size={16} fill="white" />
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions: Quick Start, 134 Workouts Portal, Routines, BodyCare AI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => {
              if (activeWorkout && activeWorkout.exercises && activeWorkout.exercises.length > 0) {
                navigate('/fitness/active');
              } else {
                const defaultQuickExercises = [
                  exerciseLibrary.find(e => e.id === 'standard-pushup' || e.id === 'dumbbell-push-ups'),
                  exerciseLibrary.find(e => e.id === 'dumbbell-squats' || e.id === 'bodyweight-squat'),
                  exerciseLibrary.find(e => e.id === 'dumbbell-bicep-curls'),
                  exerciseLibrary.find(e => e.id === 'plank')
                ].filter(Boolean);

                const finalExercises = defaultQuickExercises.length > 0 ? defaultQuickExercises : exerciseLibrary.slice(0, 4);

                startWorkout({ 
                  name: 'Full Body Quick Session', 
                  exercises: finalExercises 
                });
                navigate('/fitness/active');
              }
            }}
            className="bg-fit-surface border border-fit-border rounded-2xl p-5 text-left hover:border-fit-primary transition-all group relative overflow-hidden shadow-card"
          >
            <div className="absolute -right-10 -top-10 text-fit-muted/10 group-hover:text-fit-primary/20 group-hover:rotate-12 transition-all">
              <Activity size={110} />
            </div>
            <h3 className="text-lg font-bold text-fit-text mb-1">Quick Start</h3>
            <p className="text-fit-muted text-xs mb-4">Start an empty workout and log sets & reps on the fly.</p>
            <div className="flex items-center text-fit-primary font-semibold text-xs mt-auto">
              Start Freely <Play size={14} className="ml-1.5" />
            </div>
          </button>

          <button 
            onClick={() => navigate('/workouts')}
            className="bg-fit-surface border border-fit-border rounded-2xl p-5 text-left hover:border-amber-400 transition-all group relative overflow-hidden flex flex-col shadow-card hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 text-amber-400/10 group-hover:text-amber-400/25 group-hover:scale-110 transition-all">
              <Dumbbell size={110} />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-lg font-bold text-fit-text">134 Workouts Portal</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-[9px] font-black text-amber-400 uppercase tracking-wider">
                134 HD
              </span>
            </div>
            <p className="text-fit-muted text-xs mb-4">Complete 134 exercises, AI routine generator & PR logs.</p>
            <div className="flex items-center text-amber-400 font-semibold text-xs mt-auto">
              Open 134 Workouts <ArrowRight size={14} className="ml-1.5" />
            </div>
          </button>

          <button 
            onClick={() => navigate('/fitness/routines')}
            className="bg-fit-surface border border-fit-border rounded-2xl p-5 text-left hover:border-blue-500 transition-all group relative overflow-hidden flex flex-col shadow-card"
          >
            <div className="absolute -right-10 -top-10 text-fit-muted/10 group-hover:text-blue-500/20 group-hover:rotate-12 transition-all">
              <Calendar size={110} />
            </div>
            <h3 className="text-lg font-bold text-fit-text mb-1">Routines</h3>
            <p className="text-fit-muted text-xs mb-4">Browse pre-built split programs or build custom routines.</p>
            <div className="flex items-center text-blue-500 font-semibold text-xs mt-auto">
              Browse Plans <Plus size={14} className="ml-1.5" />
            </div>
          </button>

          <button 
            onClick={() => navigate('/fitness/bodycare')}
            className="bg-fit-surface border border-fit-border rounded-2xl p-5 text-left hover:border-teal-400 transition-all group relative overflow-hidden flex flex-col shadow-card hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 text-teal-400/10 group-hover:text-teal-400/25 group-hover:scale-110 transition-all">
              <HeartPulse size={110} />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-lg font-bold text-fit-text">BodyCare AI</h3>
              <span className="px-2 py-0.5 rounded-full bg-teal-400/20 border border-teal-400/30 text-[9px] font-black text-teal-400 uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles size={9} /> AI Care
              </span>
            </div>
            <p className="text-fit-muted text-xs mb-4">Interactive pain assessment & physical therapy recovery.</p>
            <div className="flex items-center text-teal-400 font-semibold text-xs mt-auto">
              Assess Body <Sparkles size={14} className="ml-1.5" />
            </div>
          </button>
        </div>

        {/* Muscle & PRs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MuscleRecoveryView recoveryData={user?.fitnessStats?.muscleRecovery} />
          <PersonalRecordsView prData={user?.fitnessStats?.workoutPRs} />
        </div>

        {/* Analytics Section */}
        <div className="bg-fit-surface border border-fit-border rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-bold text-fit-text mb-6 flex items-center gap-2">
            <TrendingUp className="text-fit-primary" /> 
            Weekly Analytics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-fit-surface2 border border-fit-border p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-fit-text">{thisWeekSessions.length}</div>
              <div className="text-xs text-fit-muted font-semibold uppercase tracking-wider mt-1">Workouts</div>
            </div>
            <div className="bg-fit-surface2 border border-fit-border p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-500">{totalCaloriesThisWeek}</div>
              <div className="text-xs text-fit-muted font-semibold uppercase tracking-wider mt-1">Kcal Burned</div>
            </div>
            <div className="bg-fit-surface2 border border-fit-border p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-500">{Math.round(totalDurationThisWeek / 60)}</div>
              <div className="text-xs text-fit-muted font-semibold uppercase tracking-wider mt-1">Minutes</div>
            </div>
          </div>
        </div>

        {/* Recent History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-fit-text">Recent History</h3>
            <button onClick={() => navigate('/fitness/history')} className="text-sm font-medium text-fit-primary hover:underline">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="text-fit-muted text-center py-4">Loading history...</div>
            ) : sessions.length === 0 ? (
              <div className="bg-fit-surface border border-fit-border rounded-xl p-6 text-center">
                <p className="text-fit-muted mb-2">No workouts recorded yet.</p>
                <button onClick={() => navigate('/fitness/routines')} className="text-sm text-fit-primary font-medium">Find a routine to get started</button>
              </div>
            ) : (
              sessions.slice(0, 3).map((session, idx) => (
                <div key={idx} className="bg-fit-surface border border-fit-border rounded-xl p-4 flex items-center justify-between hover:bg-fit-surface2 cursor-pointer transition-colors" onClick={() => navigate(`/fitness/history/${session._id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="bg-fit-surface2 p-3 rounded-lg border border-fit-border">
                      <CheckCircle className="text-fit-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-fit-text">{session.name}</h4>
                      <p className="text-xs text-fit-muted flex items-center gap-2 mt-1">
                        <span>{new Date(session.startTime).toLocaleDateString()}</span>
                        &bull;
                        <span>{Math.round(session.durationSeconds / 60)} min</span>
                        &bull;
                        <span>{session.exercises.length} exercises</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-fit-text">{session.caloriesBurned}</div>
                    <div className="text-xs text-fit-muted">kcal</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
