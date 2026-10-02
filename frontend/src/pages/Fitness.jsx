import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Activity, Calendar, TrendingUp, Plus, Clock, CheckCircle, Search, Dumbbell } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { useUser } from '../context/UserContext.jsx';

export default function Fitness() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { sessions, activeWorkout, loadUserData, loading, startWorkout } = useWorkout();

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
        
        {/* Active Workout Banner */}
        {activeWorkout ? (
          <div className="bg-gradient-to-r from-fit-primary to-emerald-600 rounded-2xl p-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-black flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity size={24} className="animate-pulse" />
                Workout in Progress
              </h2>
              <p className="text-sm font-medium mt-1 opacity-90">{activeWorkout.name}</p>
            </div>
            <button 
              onClick={() => navigate('/fitness/active')}
              className="mt-4 sm:mt-0 bg-black text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              Resume <Play size={16} fill="white" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => {
                startWorkout({ name: 'Freestyle Workout', exercises: [] });
                navigate('/fitness/active');
              }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-fit-primary transition-colors group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all">
                <Activity size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quick Start</h3>
              <p className="text-zinc-400 text-sm mb-4">Start an empty workout and track as you go.</p>
              <div className="flex items-center text-fit-primary font-semibold text-sm mt-auto">
                Start Freely <Play size={16} className="ml-2" />
              </div>
            </button>

            <button 
              onClick={() => navigate('/fitness/routines')}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-blue-500 transition-colors group relative overflow-hidden flex flex-col"
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all">
                <Calendar size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Routines</h3>
              <p className="text-zinc-400 text-sm mb-4">Select a pre-built plan or your custom routine.</p>
              <div className="flex items-center text-blue-500 font-semibold text-sm mt-auto">
                Browse Plans <Plus size={16} className="ml-2" />
              </div>
            </button>

            <button 
              onClick={() => navigate('/fitness/library')}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-amber-500 transition-colors group relative overflow-hidden flex flex-col"
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 group-hover:-rotate-12 transition-all">
                <Dumbbell size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exercises</h3>
              <p className="text-zinc-400 text-sm mb-4">Learn proper form with our extensive library.</p>
              <div className="flex items-center text-amber-500 font-semibold text-sm mt-auto">
                Search DB <Search size={16} className="ml-2" />
              </div>
            </button>
          </div>
        )}

        {/* Analytics Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-fit-primary" /> 
            Weekly Analytics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{thisWeekSessions.length}</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">Workouts</div>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-500">{totalCaloriesThisWeek}</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">Kcal Burned</div>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-500">{Math.round(totalDurationThisWeek / 60)}</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">Minutes</div>
            </div>
          </div>
        </div>

        {/* Recent History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Recent History</h3>
            <button onClick={() => navigate('/fitness/history')} className="text-sm font-medium text-fit-primary hover:underline">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="text-zinc-500 text-center py-4">Loading history...</div>
            ) : sessions.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <p className="text-zinc-400 mb-2">No workouts recorded yet.</p>
                <button onClick={() => navigate('/fitness/routines')} className="text-sm text-fit-primary font-medium">Find a routine to get started</button>
              </div>
            ) : (
              sessions.slice(0, 3).map((session, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800/80 cursor-pointer transition-colors" onClick={() => navigate(`/fitness/history/${session._id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-800 p-3 rounded-lg">
                      <CheckCircle className="text-fit-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{session.name}</h4>
                      <p className="text-xs text-zinc-400 flex items-center gap-2 mt-1">
                        <span>{new Date(session.startTime).toLocaleDateString()}</span>
                        &bull;
                        <span>{Math.round(session.durationSeconds / 60)} min</span>
                        &bull;
                        <span>{session.exercises.length} exercises</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{session.caloriesBurned}</div>
                    <div className="text-xs text-zinc-500">kcal</div>
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
