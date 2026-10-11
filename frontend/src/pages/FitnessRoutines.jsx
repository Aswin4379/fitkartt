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
            <h2 className="text-xl font-bold text-fit-text">My Routines</h2>
            <button 
              onClick={() => navigate('/fitness/builder')}
              className="text-fit-primary font-semibold text-sm flex items-center gap-1 hover:underline"
            >
              <Plus size={16} /> New Routine
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customRoutines.length === 0 ? (
              <div className="col-span-full bg-fit-surface border border-fit-border border-dashed rounded-xl p-8 text-center shadow-card">
                <Dumbbell className="mx-auto text-fit-muted mb-2" size={32} />
                <p className="text-fit-muted">You haven't created any custom routines yet.</p>
                <button 
                  onClick={() => navigate('/fitness/builder')}
                  className="mt-4 px-4 py-2 bg-fit-surface2 text-fit-text rounded-lg text-sm font-semibold hover:bg-fit-surface border border-fit-border transition-colors shadow-sm"
                >
                  Create Custom Routine
                </button>
              </div>
            ) : (
              customRoutines.map(routine => (
                <div key={routine._id} className="bg-fit-surface border border-fit-border rounded-xl p-5 hover:border-fit-primary transition-colors shadow-card">
                  <h3 className="font-bold text-lg text-fit-text mb-1">{routine.name}</h3>
                  <p className="text-sm text-fit-muted mb-4 flex items-center gap-2">
                    <Clock size={14} /> {routine.exercises.length} exercises
                  </p>
                  <button 
                    onClick={() => handleStartRoutine(routine)}
                    className="w-full bg-fit-primary/10 text-fit-primary font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-fit-primary hover:text-white transition-colors"
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
          <h2 className="text-xl font-bold text-fit-text mb-4">Recommended Plans</h2>
          {loading ? (
            <div className="text-fit-muted">Loading templates...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <div key={template._id} className="bg-fit-surface border border-fit-border rounded-xl overflow-hidden hover:border-blue-500 transition-colors flex flex-col shadow-card">
                  {template.thumbnail && (
                    <img src={template.thumbnail} alt={template.title} className="w-full h-32 object-cover" />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-fit-text mb-1">{template.title}</h3>
                    <p className="text-xs text-blue-500 font-bold mb-2 uppercase">{template.category} • {template.level}</p>
                    <p className="text-sm text-fit-muted mb-4 flex items-center gap-2 flex-1">
                      <Clock size={14} /> {template.duration} mins &bull; {template.exercises.length} exercises
                    </p>
                    <button 
                      onClick={() => handleStartRoutine(template)}
                      className="w-full bg-fit-surface2 text-fit-text border border-fit-border font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-fit-primary hover:text-white transition-colors shadow-sm"
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
