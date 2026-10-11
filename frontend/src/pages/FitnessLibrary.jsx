import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Dumbbell, ChevronRight, X } from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { exerciseApi } from '../services/api.js';
import ExerciseVideoPlayer from '../components/ExerciseVideoPlayer.jsx';

export default function FitnessLibrary() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTarget, setFilterTarget] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const targets = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs', 'Cardio'];

  useEffect(() => {
    exerciseApi.getExercises({ limit: 100 })
      .then(data => setExercises(data.exercises || data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget = filterTarget === 'All' || ex.target?.toLowerCase() === filterTarget.toLowerCase();
    return matchesSearch && matchesTarget;
  });

  return (
    <AppLayout showFooter>
      <PageHeader 
        title="Exercise Library" 
        subtitle="Learn proper form and technique"
        backButton={true}
        onBack={() => navigate('/fitness')}
      />

      <div className="max-w-5xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-6">
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fit-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search exercises..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-fit-surface border border-fit-border rounded-2xl pl-12 pr-4 py-3 text-fit-text focus:border-fit-primary outline-none shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide shrink-0">
            {targets.map(t => (
              <button 
                key={t}
                onClick={() => setFilterTarget(t)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${filterTarget === t ? 'bg-fit-primary text-white shadow-sm' : 'bg-fit-surface text-fit-muted hover:text-fit-text border border-fit-border'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-fit-muted text-center py-10">Loading library...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">
            <Dumbbell className="mx-auto text-fit-muted mb-4 opacity-50" size={48} />
            <p className="text-fit-muted">No exercises found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(ex => (
              <div 
                key={ex._id || ex.id} 
                onClick={() => setSelectedExercise(ex)}
                className="bg-fit-surface border border-fit-border rounded-xl overflow-hidden hover:border-fit-primary transition-colors cursor-pointer group shadow-card"
              >
                <div className="h-32 bg-fit-surface2 relative">
                  {ex.imageUrl ? (
                    <img 
                      src={ex.imageUrl} 
                      alt={ex.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      onError={(e) => {
                        if (ex.image2Url && e.target.src !== ex.image2Url) {
                          e.target.src = ex.image2Url
                        } else {
                          const ytId = ex.videoUrl?.match(/(?:embed\/|v=)([a-zA-Z0-9_-]+)/)?.[1]
                          if (ytId && !e.target.src.includes('img.youtube.com')) {
                            e.target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-fit-muted">
                      <Dumbbell size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 -mt-10 relative z-10">
                  <span className="inline-block px-2 py-1 bg-fit-surface border border-fit-border rounded-md text-[10px] font-bold text-fit-primary uppercase tracking-wider mb-2 shadow-sm">
                    {ex.target}
                  </span>
                  <h3 className="font-bold text-lg text-fit-text group-hover:text-fit-primary transition-colors">{ex.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-fit-muted">
                    <span>{ex.equipment || 'Bodyweight'}</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-3xl mx-auto min-h-screen flex flex-col bg-fit-surface border-x border-fit-border shadow-2xl">
            <div className="sticky top-0 z-10 bg-fit-surface/90 backdrop-blur-md p-4 flex justify-between items-center border-b border-fit-border">
              <h2 className="text-xl font-bold text-fit-text">{selectedExercise.name}</h2>
              <button onClick={() => setSelectedExercise(null)} className="p-2 bg-fit-surface2 rounded-full text-fit-text hover:bg-fit-border"><X size={20}/></button>
            </div>
            
            <div className="p-4 space-y-6 pb-20">
              {/* Media */}
              <div className="rounded-2xl overflow-hidden bg-black w-full border border-fit-border">
                 {selectedExercise.videoUrl || selectedExercise.imageUrl ? (
                   <ExerciseVideoPlayer 
                     videoUrl={selectedExercise.videoUrl} 
                     imageUrl={selectedExercise.imageUrl}
                     image2Url={selectedExercise.image2Url}
                     gifUrl={selectedExercise.gifUrl}
                     name={selectedExercise.name}
                     target={selectedExercise.target}
                   />
                 ) : (
                   <div className="aspect-video flex items-center justify-center border border-fit-border rounded-2xl">
                     <Dumbbell className="text-fit-muted" size={64} />
                   </div>
                 )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-fit-primary/10 text-fit-primary rounded-lg text-sm font-bold uppercase">{selectedExercise.target}</div>
                <div className="px-3 py-1 bg-fit-surface2 text-fit-muted border border-fit-border rounded-lg text-sm">{selectedExercise.equipment || 'Bodyweight'}</div>
                <div className="px-3 py-1 bg-fit-surface2 text-fit-muted border border-fit-border rounded-lg text-sm">{selectedExercise.level || 'All Levels'}</div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-bold text-lg text-fit-text mb-3">How to Perform</h3>
                {selectedExercise.instructions && selectedExercise.instructions.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-2 text-fit-text/90">
                    {selectedExercise.instructions.map((step, idx) => (
                      <li key={idx} className="pl-2 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-fit-muted">Detailed instructions coming soon.</p>
                )}
              </div>

              {/* Tips & Mistakes */}
              {(selectedExercise.formTips || selectedExercise.commonMistakes) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedExercise.formTips && (
                    <div className="bg-fit-surface2 border border-fit-border p-4 rounded-xl">
                      <h4 className="font-bold text-fit-primary mb-2">Form Tips</h4>
                      <p className="text-sm text-fit-muted">{selectedExercise.formTips}</p>
                    </div>
                  )}
                  {selectedExercise.commonMistakes && (
                    <div className="bg-fit-surface2 border border-fit-border p-4 rounded-xl">
                      <h4 className="font-bold text-red-500 mb-2">Common Mistakes</h4>
                      <p className="text-sm text-fit-muted">{selectedExercise.commonMistakes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
