import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Activity, CheckCircle, TrendingUp } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';

export default function FitnessHistory() {
  const navigate = useNavigate();
  const { sessions, loading } = useWorkout();

  const calculateVolume = (session) => {
    let vol = 0;
    session.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.isCompleted) {
          vol += (set.reps * (set.weight || 0));
        }
      });
    });
    return vol;
  };

  return (
    <AppLayout showFooter>
      <PageHeader 
        title="Workout History" 
        subtitle="Review your past performances"
        backButton={true}
        onBack={() => navigate('/fitness')}
      />

      <div className="max-w-3xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {loading ? (
          <div className="text-zinc-500 text-center py-10">Loading history...</div>
        ) : sessions.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center flex flex-col items-center">
            <Calendar className="text-zinc-600 mb-4" size={40} />
            <p className="text-zinc-400 font-medium mb-4">No workouts recorded yet.</p>
            <button onClick={() => navigate('/fitness')} className="bg-fit-primary text-black px-6 py-2 rounded-full font-bold">
              Start your first workout
            </button>
          </div>
        ) : (
          sessions.map(session => (
            <div key={session._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-fit-primary transition-colors">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-fit-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-fit-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{session.name}</h3>
                    <p className="text-xs text-zinc-400">{new Date(session.startTime).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 grid grid-cols-3 gap-4 border-b border-zinc-800">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1"><Clock size={14}/> <span className="text-xs uppercase font-bold tracking-wider">Time</span></div>
                  <div className="font-bold text-white">{Math.round(session.durationSeconds / 60)} min</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1"><Activity size={14}/> <span className="text-xs uppercase font-bold tracking-wider">Volume</span></div>
                  <div className="font-bold text-blue-500">{calculateVolume(session)} kg</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1"><TrendingUp size={14}/> <span className="text-xs uppercase font-bold tracking-wider">Exercises</span></div>
                  <div className="font-bold text-amber-500">{session.exercises.length}</div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Exercise Breakdown</h4>
                {session.exercises.map((ex, idx) => {
                  const completedSets = ex.sets.filter(s => s.isCompleted);
                  const bestSet = [...completedSets].sort((a,b) => (b.weight*b.reps) - (a.weight*a.reps))[0];
                  
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white">{completedSets.length}x</span>
                        <span className="text-zinc-400 ml-2">{ex.name}</span>
                      </div>
                      <div className="text-sm text-zinc-500 font-mono">
                        {bestSet ? `${bestSet.weight}kg x ${bestSet.reps}` : 'No sets completed'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

      </div>
    </AppLayout>
  );
}
