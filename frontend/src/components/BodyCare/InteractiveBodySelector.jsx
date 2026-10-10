import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Info } from 'lucide-react';

export const BODY_PARTS_METADATA = {
  // Front View
  'neck': { id: 'neck', name: 'Neck & Cervical Spine', view: 'front', commonIssues: ['Stiffness', 'Whiplash', 'Nerve pinch'] },
  'shoulders': { id: 'shoulders', name: 'Shoulders (Deltoids / Rotator Cuff)', view: 'front', commonIssues: ['Impingement', 'Rotator cuff strain', 'Bursitis'] },
  'chest': { id: 'chest', name: 'Chest (Pectorals & Ribs)', view: 'front', commonIssues: ['Costochondritis', 'Pec strain', 'Intercostal tension'] },
  'abdomen': { id: 'abdomen', name: 'Abdomen & Core', view: 'front', commonIssues: ['Rectus strain', 'Hernia discomfort', 'Oblique cramp'] },
  'biceps': { id: 'biceps', name: 'Upper Arms (Biceps)', view: 'front', commonIssues: ['Bicep tendonitis', 'Muscle pull'] },
  'elbows': { id: 'elbows', name: 'Elbows (Inner / Golfer\'s)', view: 'front', commonIssues: ['Medial epicondylitis', 'Joint stiffness'] },
  'wrists-hands': { id: 'wrists-hands', name: 'Wrists & Hands', view: 'front', commonIssues: ['Carpal tunnel', 'Sprain', 'Tendonitis'] },
  'hips-groin': { id: 'hips-groin', name: 'Hips & Groin', view: 'front', commonIssues: ['Groin pull', 'Hip flexor strain', 'Labral discomfort'] },
  'quads': { id: 'quads', name: 'Thighs (Quadriceps)', view: 'front', commonIssues: ['Quad strain', 'Muscle contusion'] },
  'knees': { id: 'knees', name: 'Knees (Patella / Joint)', view: 'front', commonIssues: ['Runner\'s knee', 'Meniscus irritation', 'Patellar tendonitis'] },
  'shins-ankles': { id: 'shins-ankles', name: 'Shins & Ankles', view: 'front', commonIssues: ['Shin splints', 'Ankle sprain'] },
  'feet': { id: 'feet', name: 'Feet & Toes', view: 'front', commonIssues: ['Plantar fasciitis', 'Arch pain'] },

  // Back View
  'upper-back': { id: 'upper-back', name: 'Upper Back & Shoulder Blades', view: 'back', commonIssues: ['Rhomboid spasm', 'Thoracic stiffness', 'Trap tightness'] },
  'triceps': { id: 'triceps', name: 'Triceps / Rear Arm', view: 'back', commonIssues: ['Tricep tendonitis', 'Overuse strain'] },
  'elbows-back': { id: 'elbows-back', name: 'Outer Elbows (Tennis Elbow)', view: 'back', commonIssues: ['Lateral epicondylitis', 'Olecranon irritation'] },
  'lower-back': { id: 'lower-back', name: 'Lower Back (Lumbar)', view: 'back', commonIssues: ['Lumbar strain', 'SI joint dysfunction', 'Sciatica'] },
  'glutes': { id: 'glutes', name: 'Glutes & Piriformis', view: 'back', commonIssues: ['Piriformis syndrome', 'Gluteal tendinopathy'] },
  'hamstrings': { id: 'hamstrings', name: 'Hamstrings (Back of Thigh)', view: 'back', commonIssues: ['Hamstring strain', 'Tightness'] },
  'calves': { id: 'calves', name: 'Calves (Gastrocnemius)', view: 'back', commonIssues: ['Calf cramp', 'Muscle tear', 'Tightness'] },
  'achilles-heels': { id: 'achilles-heels', name: 'Achilles Tendon & Heels', view: 'back', commonIssues: ['Achilles tendonitis', 'Heel spur pain'] },
};

export default function InteractiveBodySelector({ selectedPart, onSelectPart, view, onViewChange }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  const activeMetadata = selectedPart ? BODY_PARTS_METADATA[selectedPart] : null;

  // Filter parts for quick-select chips according to current view
  const currentViewParts = Object.values(BODY_PARTS_METADATA).filter(p => p.view === view || p.id === 'neck');

  const isSelected = (id) => selectedPart === id;
  const isHovered = (id) => hoveredPart === id;

  const getPartFill = (id) => {
    if (isSelected(id)) return 'rgba(34, 197, 94, 0.75)'; // vibrant fit-primary
    if (isHovered(id)) return 'rgba(45, 212, 191, 0.55)'; // glowing teal
    return 'rgba(255, 255, 255, 0.08)'; // subtle dark glass
  };

  const getPartStroke = (id) => {
    if (isSelected(id)) return '#22c55e';
    if (isHovered(id)) return '#2dd4bf';
    return 'rgba(255, 255, 255, 0.22)';
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* View Switcher Controls */}
      <div className="flex items-center justify-between w-full max-w-md mb-4 bg-zinc-900/90 border border-white/10 rounded-2xl p-1.5 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => onViewChange('front')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            view === 'front'
              ? 'bg-gradient-to-r from-fit-primary to-emerald-400 text-black shadow-lg shadow-fit-primary/25'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Anterior (Front View)
        </button>
        <button
          type="button"
          onClick={() => onViewChange('back')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            view === 'back'
              ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg shadow-teal-400/25'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Posterior (Back View)
        </button>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-sm aspect-[1/1.65] bg-gradient-to-b from-zinc-900/80 via-black/90 to-zinc-950 rounded-3xl border border-white/10 shadow-2xl p-4 flex items-center justify-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-fit-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hover/Selection Live Indicator Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none z-10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-fit-primary animate-ping" />
            {view === 'front' ? 'FRONT VIEW' : 'BACK VIEW'}
          </span>
          {(hoveredPart || selectedPart) && (
            <span className="px-2.5 py-1 rounded-full bg-zinc-800/90 border border-white/15 text-fit-primary font-black text-xs shadow-md">
              {BODY_PARTS_METADATA[hoveredPart || selectedPart]?.name}
            </span>
          )}
        </div>

        {/* The Vector Body Illustration SVG */}
        <svg
          viewBox="0 0 300 480"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Anatomical Silhouette Reference */}
          <g opacity="0.15" stroke="#ffffff" strokeWidth="1" fill="none">
            {/* Spine reference axis */}
            <line x1="150" y1="50" x2="150" y2="280" strokeDasharray="3 3" />
            {/* Shoulder axis */}
            <line x1="85" y1="95" x2="215" y2="95" strokeDasharray="2 2" />
            {/* Hip axis */}
            <line x1="105" y1="210" x2="195" y2="210" strokeDasharray="2 2" />
            {/* Knee axis */}
            <line x1="110" y1="330" x2="190" y2="330" strokeDasharray="2 2" />
          </g>

          {/* HEAD & CRANIAL BASE */}
          <path
            d="M 132 20 C 132 10, 168 10, 168 20 C 172 35, 165 52, 150 56 C 135 52, 128 35, 132 20 Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />

          {view === 'front' ? (
            /* ============================================================== */
            /*                       FRONT ANATOMY ZONES                     */
            /* ============================================================== */
            <g id="front-body-zones">
              {/* NECK */}
              <path
                id="zone-neck"
                d="M 141 55 L 159 55 L 163 78 L 137 78 Z"
                fill={getPartFill('neck')}
                stroke={getPartStroke('neck')}
                strokeWidth={isSelected('neck') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('neck')}
                onMouseEnter={() => setHoveredPart('neck')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* SHOULDERS */}
              <path
                id="zone-shoulders"
                d="M 137 78 L 92 88 C 76 92, 70 108, 72 120 L 88 120 C 92 104, 105 96, 128 92 Z M 163 78 L 208 88 C 224 92, 230 108, 228 120 L 212 120 C 208 104, 195 96, 172 92 Z"
                fill={getPartFill('shoulders')}
                stroke={getPartStroke('shoulders')}
                strokeWidth={isSelected('shoulders') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('shoulders')}
                onMouseEnter={() => setHoveredPart('shoulders')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* CHEST */}
              <path
                id="zone-chest"
                d="M 128 92 L 172 92 L 180 140 C 160 146, 140 146, 120 140 Z"
                fill={getPartFill('chest')}
                stroke={getPartStroke('chest')}
                strokeWidth={isSelected('chest') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('chest')}
                onMouseEnter={() => setHoveredPart('chest')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* BICEPS / ARMS */}
              <path
                id="zone-biceps"
                d="M 72 120 L 88 120 L 84 165 L 66 165 Z M 228 120 L 212 120 L 216 165 L 234 165 Z"
                fill={getPartFill('biceps')}
                stroke={getPartStroke('biceps')}
                strokeWidth={isSelected('biceps') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('biceps')}
                onMouseEnter={() => setHoveredPart('biceps')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* ELBOWS */}
              <path
                id="zone-elbows"
                d="M 66 165 L 84 165 L 82 188 L 63 188 Z M 234 165 L 216 165 L 218 188 L 237 188 Z"
                fill={getPartFill('elbows')}
                stroke={getPartStroke('elbows')}
                strokeWidth={isSelected('elbows') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('elbows')}
                onMouseEnter={() => setHoveredPart('elbows')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* WRISTS & HANDS */}
              <path
                id="zone-wrists-hands"
                d="M 63 188 L 82 188 L 78 245 C 72 258, 56 250, 58 240 Z M 237 188 L 218 188 L 222 245 C 228 258, 244 250, 242 240 Z"
                fill={getPartFill('wrists-hands')}
                stroke={getPartStroke('wrists-hands')}
                strokeWidth={isSelected('wrists-hands') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('wrists-hands')}
                onMouseEnter={() => setHoveredPart('wrists-hands')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* ABDOMEN */}
              <path
                id="zone-abdomen"
                d="M 120 140 C 140 146, 160 146, 180 140 L 176 195 C 160 200, 140 200, 124 195 Z"
                fill={getPartFill('abdomen')}
                stroke={getPartStroke('abdomen')}
                strokeWidth={isSelected('abdomen') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('abdomen')}
                onMouseEnter={() => setHoveredPart('abdomen')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* HIPS & GROIN */}
              <path
                id="zone-hips-groin"
                d="M 124 195 C 140 200, 160 200, 176 195 L 186 235 L 150 248 L 114 235 Z"
                fill={getPartFill('hips-groin')}
                stroke={getPartStroke('hips-groin')}
                strokeWidth={isSelected('hips-groin') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('hips-groin')}
                onMouseEnter={() => setHoveredPart('hips-groin')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* THIGHS / QUADS */}
              <path
                id="zone-quads"
                d="M 114 235 L 148 248 L 143 315 L 110 315 Z M 186 235 L 152 248 L 157 315 L 190 315 Z"
                fill={getPartFill('quads')}
                stroke={getPartStroke('quads')}
                strokeWidth={isSelected('quads') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('quads')}
                onMouseEnter={() => setHoveredPart('quads')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* KNEES */}
              <path
                id="zone-knees"
                d="M 110 315 L 143 315 L 141 345 L 112 345 Z M 190 315 L 157 315 L 159 345 L 188 345 Z"
                fill={getPartFill('knees')}
                stroke={getPartStroke('knees')}
                strokeWidth={isSelected('knees') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('knees')}
                onMouseEnter={() => setHoveredPart('knees')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* SHINS & ANKLES */}
              <path
                id="zone-shins-ankles"
                d="M 112 345 L 141 345 L 138 425 L 114 425 Z M 188 345 L 159 345 L 162 425 L 186 425 Z"
                fill={getPartFill('shins-ankles')}
                stroke={getPartStroke('shins-ankles')}
                strokeWidth={isSelected('shins-ankles') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('shins-ankles')}
                onMouseEnter={() => setHoveredPart('shins-ankles')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* FEET */}
              <path
                id="zone-feet"
                d="M 114 425 L 138 425 L 142 455 C 130 460, 110 460, 108 450 Z M 186 425 L 162 425 L 158 455 C 170 460, 190 460, 192 450 Z"
                fill={getPartFill('feet')}
                stroke={getPartStroke('feet')}
                strokeWidth={isSelected('feet') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('feet')}
                onMouseEnter={() => setHoveredPart('feet')}
                onMouseLeave={() => setHoveredPart(null)}
              />
            </g>
          ) : (
            /* ============================================================== */
            /*                       BACK ANATOMY ZONES                      */
            /* ============================================================== */
            <g id="back-body-zones">
              {/* NECK (POSTERIOR) */}
              <path
                id="zone-neck-back"
                d="M 141 55 L 159 55 L 165 80 L 135 80 Z"
                fill={getPartFill('neck')}
                stroke={getPartStroke('neck')}
                strokeWidth={isSelected('neck') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('neck')}
                onMouseEnter={() => setHoveredPart('neck')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* UPPER BACK & TRAPS */}
              <path
                id="zone-upper-back"
                d="M 135 80 L 165 80 L 210 92 L 182 152 C 160 156, 140 156, 118 152 L 90 92 Z"
                fill={getPartFill('upper-back')}
                stroke={getPartStroke('upper-back')}
                strokeWidth={isSelected('upper-back') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('upper-back')}
                onMouseEnter={() => setHoveredPart('upper-back')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* TRICEPS */}
              <path
                id="zone-triceps"
                d="M 90 92 L 72 120 L 68 165 L 86 165 L 94 130 Z M 210 92 L 228 120 L 232 165 L 214 165 L 206 130 Z"
                fill={getPartFill('triceps')}
                stroke={getPartStroke('triceps')}
                strokeWidth={isSelected('triceps') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('triceps')}
                onMouseEnter={() => setHoveredPart('triceps')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* POSTERIOR ELBOWS */}
              <path
                id="zone-elbows-back"
                d="M 68 165 L 86 165 L 84 190 L 65 190 Z M 232 165 L 214 165 L 216 190 L 235 190 Z"
                fill={getPartFill('elbows-back')}
                stroke={getPartStroke('elbows-back')}
                strokeWidth={isSelected('elbows-back') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('elbows-back')}
                onMouseEnter={() => setHoveredPart('elbows-back')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* LOWER BACK (LUMBAR) */}
              <path
                id="zone-lower-back"
                d="M 118 152 C 140 156, 160 156, 182 152 L 180 205 C 160 210, 140 210, 120 205 Z"
                fill={getPartFill('lower-back')}
                stroke={getPartStroke('lower-back')}
                strokeWidth={isSelected('lower-back') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('lower-back')}
                onMouseEnter={() => setHoveredPart('lower-back')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* GLUTES */}
              <path
                id="zone-glutes"
                d="M 120 205 C 140 210, 160 210, 180 205 L 188 245 C 170 255, 155 255, 150 250 C 145 255, 130 255, 112 245 Z"
                fill={getPartFill('glutes')}
                stroke={getPartStroke('glutes')}
                strokeWidth={isSelected('glutes') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('glutes')}
                onMouseEnter={() => setHoveredPart('glutes')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* HAMSTRINGS */}
              <path
                id="zone-hamstrings"
                d="M 112 245 L 148 252 L 143 320 L 110 320 Z M 188 245 L 152 252 L 157 320 L 190 320 Z"
                fill={getPartFill('hamstrings')}
                stroke={getPartStroke('hamstrings')}
                strokeWidth={isSelected('hamstrings') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('hamstrings')}
                onMouseEnter={() => setHoveredPart('hamstrings')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* CALVES */}
              <path
                id="zone-calves"
                d="M 110 320 L 143 320 L 138 415 L 113 415 Z M 190 320 L 157 320 L 162 415 L 187 415 Z"
                fill={getPartFill('calves')}
                stroke={getPartStroke('calves')}
                strokeWidth={isSelected('calves') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('calves')}
                onMouseEnter={() => setHoveredPart('calves')}
                onMouseLeave={() => setHoveredPart(null)}
              />

              {/* ACHILLES & HEELS */}
              <path
                id="zone-achilles-heels"
                d="M 113 415 L 138 415 L 136 455 L 115 455 Z M 187 415 L 162 415 L 164 455 L 185 455 Z"
                fill={getPartFill('achilles-heels')}
                stroke={getPartStroke('achilles-heels')}
                strokeWidth={isSelected('achilles-heels') ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectPart('achilles-heels')}
                onMouseEnter={() => setHoveredPart('achilles-heels')}
                onMouseLeave={() => setHoveredPart(null)}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Quick Select Accessibility Pills (for mobile/one-tap navigation) */}
      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-2 px-1 text-xs text-zinc-400 font-bold uppercase tracking-wider">
          <span>Tap Area or Select Below</span>
          <span className="text-zinc-500 font-normal">({view === 'front' ? 'Front body' : 'Back body'})</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {currentViewParts.map((part) => {
            const active = selectedPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => onSelectPart(part.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-fit-primary text-black shadow-md shadow-fit-primary/25 scale-[1.02]'
                    : 'bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {active && <CheckCircle2 size={13} className="text-black" />}
                {part.name.split('(')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
