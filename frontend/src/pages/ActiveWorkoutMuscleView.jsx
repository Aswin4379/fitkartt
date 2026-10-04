import React from 'react';
import { Activity } from 'lucide-react';
import muscularBodyImg from '../assets/muscular_body.jpg';

// Precise anatomical hitboxes that overlay the exact muscle shape
const MUSCLE_OVERLAYS = {
  chest: [{ top: '18%', left: '35%', width: '30%', height: '12%', borderRadius: '40px 40px 20px 20px' }],
  abs: [{ top: '30%', left: '42%', width: '16%', height: '18%', borderRadius: '30px' }],
  core: [{ top: '30%', left: '42%', width: '16%', height: '18%', borderRadius: '30px' }],
  shoulders: [
    { top: '16%', left: '28%', width: '10%', height: '9%', borderRadius: '50px 20px 20px 50px' },
    { top: '16%', left: '62%', width: '10%', height: '9%', borderRadius: '20px 50px 50px 20px' }
  ],
  delts: [
    { top: '16%', left: '28%', width: '10%', height: '9%', borderRadius: '50px 20px 20px 50px' },
    { top: '16%', left: '62%', width: '10%', height: '9%', borderRadius: '20px 50px 50px 20px' }
  ],
  biceps: [
    { top: '24%', left: '24%', width: '8%', height: '12%', borderRadius: '40px 20px 20px 40px' },
    { top: '24%', left: '68%', width: '8%', height: '12%', borderRadius: '20px 40px 40px 20px' }
  ],
  arms: [
    { top: '24%', left: '24%', width: '8%', height: '12%', borderRadius: '40px 20px 20px 40px' },
    { top: '24%', left: '68%', width: '8%', height: '12%', borderRadius: '20px 40px 40px 20px' }
  ],
  triceps: [
    { top: '24%', left: '16%', width: '7%', height: '14%', borderRadius: '30px' },
    { top: '24%', left: '77%', width: '7%', height: '14%', borderRadius: '30px' }
  ],
  forearms: [
    { top: '38%', left: '12%', width: '7%', height: '14%', borderRadius: '20px' },
    { top: '38%', left: '81%', width: '7%', height: '14%', borderRadius: '20px' }
  ],
  quads: [
    { top: '50%', left: '33%', width: '14%', height: '22%', borderRadius: '50px 50px 20px 20px' },
    { top: '50%', left: '53%', width: '14%', height: '22%', borderRadius: '50px 50px 20px 20px' }
  ],
  legs: [
    { top: '50%', left: '33%', width: '14%', height: '22%', borderRadius: '50px 50px 20px 20px' },
    { top: '50%', left: '53%', width: '14%', height: '22%', borderRadius: '50px 50px 20px 20px' }
  ],
  calves: [
    { top: '75%', left: '35%', width: '12%', height: '15%', borderRadius: '30px' },
    { top: '75%', left: '53%', width: '12%', height: '15%', borderRadius: '30px' }
  ],
  lats: [
    { top: '25%', left: '62%', width: '18%', height: '15%', borderRadius: '20px' },
    { top: '25%', left: '20%', width: '18%', height: '15%', borderRadius: '20px' }
  ],
  back: [{ top: '20%', left: '35%', width: '30%', height: '30%', borderRadius: '30px' }],
  traps: [{ top: '12%', left: '38%', width: '24%', height: '8%', borderRadius: '40px' }],
  glutes: [{ top: '45%', left: '40%', width: '20%', height: '15%', borderRadius: '40px' }],
  hamstrings: [{ top: '60%', left: '40%', width: '20%', height: '15%', borderRadius: '30px' }]
};

export default function ActiveWorkoutMuscleView({ primaryMuscles = [], secondaryMuscles = [] }) {
  const primaries = Array.isArray(primaryMuscles) ? primaryMuscles : (typeof primaryMuscles === 'string' ? primaryMuscles.split(',').map(s=>s.trim()) : []);
  const secondaries = Array.isArray(secondaryMuscles) ? secondaryMuscles : (typeof secondaryMuscles === 'string' ? secondaryMuscles.split(',').map(s=>s.trim()) : []);
  
  const allMuscles = [...primaries.map(m => ({ name: m, type: 'primary' })), ...secondaries.map(m => ({ name: m, type: 'secondary' }))];

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 shadow-inner group">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] z-10 pointer-events-none" />
      
      {/* High contrast body image to allow mix-blend-mode to catch shadows/highlights */}
      <img 
        src={muscularBodyImg} 
        alt="Muscular Anatomy" 
        className="absolute inset-0 w-full h-full object-cover object-top opacity-70 grayscale contrast-[1.4] brightness-125"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Muscle Highlights */}
      {allMuscles.map((m, idx) => {
        const lower = m.name.toLowerCase();
        let shapes = [];
        for (const [key, val] of Object.entries(MUSCLE_OVERLAYS)) {
          if (lower.includes(key)) {
            shapes = val;
            break;
          }
        }
        
        const isPrimary = m.type === 'primary';
        
        return shapes.map((shape, sIdx) => (
          <div key={`${m.name}-${idx}-${sIdx}`} className="absolute z-20" style={{ top: shape.top, left: shape.left, width: shape.width, height: shape.height }}>
            {/* The actual anatomical tint overlay using blend modes */}
            <div 
              className={`absolute inset-0 animate-in fade-in duration-700 ${isPrimary ? 'bg-red-600' : 'bg-orange-500'}`}
              style={{
                borderRadius: shape.borderRadius,
                mixBlendMode: 'color-burn', // Burns the color into the muscle grooves
                opacity: isPrimary ? 0.95 : 0.6
              }}
            />
            {/* Soft inner glow to boost the highlight */}
            <div 
              className={`absolute inset-0 animate-pulse ${isPrimary ? 'bg-red-500' : 'bg-orange-400'}`}
              style={{
                borderRadius: shape.borderRadius,
                mixBlendMode: 'overlay', // Enhances the 3D highlights of the muscle
                opacity: 0.6
              }}
            />
            
            {/* Label only on the first shape instance */}
            {sIdx === 0 && (
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded backdrop-blur-md border text-[9px] font-black uppercase tracking-widest whitespace-nowrap z-30 shadow-xl ${isPrimary ? 'text-red-100 border-red-500/80 bg-red-900/60' : 'text-orange-100 border-orange-500/80 bg-orange-900/60'}`}>
                {m.name} {isPrimary ? '(PRI)' : '(SEC)'}
              </div>
            )}
          </div>
        ));
      })}

      {allMuscles.length === 0 && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-zinc-600">
          <Activity size={32} className="mb-2 opacity-50" />
          <p className="text-xs font-bold uppercase tracking-widest">Full Body Focus</p>
        </div>
      )}
    </div>
  );
}
