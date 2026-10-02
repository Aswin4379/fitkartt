import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Clock, Dumbbell, ArrowRight } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { workoutApi } from '../services/api.js';

export default function FitnessRoutines() {
  const navigate = useNavigate();
  const { customRoutines, startWorkout } = useWorkout();
  
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workoutApi.getWorkouts()
      .then(res => setTemplates(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStartRoutine = (routine) => {
    startWorkout(routine);
    navigate('/fitness/active');
  };

  return (
    <AppLayout showFooter>
      <PageHeader 
        title="Workout Library" 
        subtitle="Select a pre-built plan or create your own"
        backButton={true}
        onBack={() => navigate('/fitness')}
      />

      <div className="max-w-7xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-6 space-y-8">
        
        {/* Custom Routines Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">My Routines</h2>
            <button 
              onClick={() => navigate('/fitness/builder')}
              className="text-fit-primary font-semibold text-sm flex items-center gap-1 hover:underline"
            >
              <Plus size={16} /> New Routine
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customRoutines.length === 0 ? (
              <div className="col-span-full bg-zinc-900 border border-zinc-800 border-dashed rounded-xl p-8 text-center">
                <Dumbbell className="mx-auto text-zinc-500 mb-2" size={32} />
                <p className="text-zinc-400">You haven't created any custom routines yet.</p>
                <button 
                  onClick={() => navigate('/fitness/builder')}
                  className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm font-semibold hover:bg-zinc-700 transition-colors"
                >
                  Create Custom Routine
                </button>
              </div>
            ) : (
              customRoutines.map(routine => (
                <div key={routine._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-fit-primary transition-colors">
                  <h3 className="font-bold text-lg text-white mb-1">{routine.name}</h3>
                  <p className="text-sm text-zinc-400 mb-4 flex items-center gap-2">
                    <Clock size={14} /> {routine.exercises.length} exercises
                  </p>
                  <button 
                    onClick={() => handleStartRoutine(routine)}
                    className="w-full bg-fit-primary/10 text-fit-primary font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-fit-primary hover:text-black transition-colors"
                  >
                    Start Workout <Play size={16} fill="currentColor" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Templates Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Recommended Plans</h2>
          {loading ? (
            <div className="text-zinc-500">Loading templates...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <div key={template._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500 transition-colors flex flex-col">
                  {template.thumbnail && (
                    <img src={template.thumbnail} alt={template.title} className="w-full h-32 object-cover" />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-white mb-1">{template.title}</h3>
                    <p className="text-xs text-blue-500 font-bold mb-2 uppercase">{template.category} • {template.level}</p>
                    <p className="text-sm text-zinc-400 mb-4 flex items-center gap-2 flex-1">
                      <Clock size={14} /> {template.duration} mins &bull; {template.exercises.length} exercises
                    </p>
                    <button 
                      onClick={() => handleStartRoutine(template)}
                      className="w-full bg-zinc-800 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                    >
                      Start Routine <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </AppLayout>
  );
}
