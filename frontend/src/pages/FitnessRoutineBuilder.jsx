import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, X, Trash2, Dumbbell } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useWorkout } from '../context/WorkoutContext.jsx';
import { workoutApi, exerciseApi } from '../services/api.js';

export default function FitnessRoutineBuilder() {
  const navigate = useNavigate();
  const { loadUserData } = useWorkout();
  
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [exercisesDb, setExercisesDb] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    exerciseApi.getExercises({ limit: 100 })
      .then(data => setExercisesDb(data.exercises || data))
      .catch(console.error);
  }, []);

  const handleAddExercise = (ex) => {
    setSelectedExercises([
      ...selectedExercises, 
      {
        exerciseId: ex._id || ex.id,
        name: ex.name,
        target: ex.target,
        defaultSets: ex.defaultSets || 3,
        defaultReps: ex.defaultReps || 10,
        defaultWeight: ex.defaultWeight || 0
      }
    ]);
    setShowAddModal(false);
  };

  const handleRemove = (index) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...selectedExercises];
    updated[index][field] = Number(value);
    setSelectedExercises(updated);
  };

  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async () => {
    setErrorMsg('');
    if (!name.trim()) return setErrorMsg('Please enter a routine name');
    if (selectedExercises.length === 0) return setErrorMsg('Please add at least one exercise');
    
    setIsSaving(true);
    try {
      await workoutApi.saveCustomRoutine({
        name,
        exercises: selectedExercises.map((ex, idx) => ({ ...ex, order: idx }))
      });
      await loadUserData(); // Refresh global state
      navigate('/fitness/routines');
    } catch (err) {
      setErrorMsg('Failed to save routine. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout showFooter>
      <PageHeader 
        title="Routine Builder" 
        subtitle="Create your ultimate custom workout"
        backButton={true}
        onBack={() => navigate('/fitness/routines')}
      />

      <div className="max-w-3xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-2xl text-red-400 font-bold text-sm">
            {errorMsg}
          </div>
        )}

        {/* Name Input */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase">Routine Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Push Day Heavy"
            className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white text-lg font-bold focus:border-fit-primary outline-none"
          />
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Exercises</h2>
            <span className="text-sm text-zinc-400 font-bold bg-zinc-900 px-3 py-1 rounded-full">{selectedExercises.length}</span>
          </div>

          {selectedExercises.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center flex flex-col items-center">
              <Dumbbell className="text-zinc-600 mb-4" size={40} />
              <p className="text-zinc-400 font-medium mb-4">No exercises added yet.</p>
            </div>
          ) : (
            selectedExercises.map((ex, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative group">
                <button 
                  onClick={() => handleRemove(index)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <h3 className="font-bold text-lg text-fit-primary pr-8">{ex.name}</h3>
                <p className="text-xs text-zinc-500 uppercase font-bold mb-4">{ex.target}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">Sets</label>
                    <input type="number" value={ex.defaultSets} onChange={e => handleUpdate(index, 'defaultSets', e.target.value)} className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-center text-white focus:border-fit-primary font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">Reps</label>
                    <input type="number" value={ex.defaultReps} onChange={e => handleUpdate(index, 'defaultReps', e.target.value)} className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-center text-white focus:border-fit-primary font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">Weight (kg)</label>
                    <input type="number" value={ex.defaultWeight} onChange={e => handleUpdate(index, 'defaultWeight', e.target.value)} className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-center text-white focus:border-fit-primary font-mono" />
                  </div>
                </div>
              </div>
            ))
          )}

          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full py-4 bg-black border-2 border-dashed border-fit-primary/30 text-fit-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-fit-primary/10 transition-colors"
          >
            <Plus size={20} /> Add Exercise
          </button>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-fit-primary text-black font-black text-lg py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Routine'} <Save size={20} />
        </button>

      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col p-4 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">Select Exercise</h2>
            <button onClick={() => setShowAddModal(false)} className="p-2 bg-zinc-800 rounded-full text-white"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pb-20">
            {exercisesDb.map(ex => (
              <div key={ex._id} onClick={() => handleAddExercise(ex)} className="p-4 bg-zinc-900 rounded-xl flex justify-between items-center cursor-pointer hover:border-fit-primary border border-transparent transition-colors">
                <div>
                  <h4 className="font-bold text-white text-lg">{ex.name}</h4>
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">{ex.target}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-fit-primary/20 flex items-center justify-center">
                  <Plus className="text-fit-primary" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
