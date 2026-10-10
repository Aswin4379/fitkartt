import React, { useState } from 'react';
import { Check } from 'lucide-react';
import muscularBodyImg from '../../assets/muscular_body.jpg';

export default function MuscularBodySelect({ selectedParts, togglePart }) {
  // Approximate hitboxes for the body parts based on a symmetrical front-view standing muscular figure
  const bodyParts = [
    { id: 'chest', label: 'Chest', top: '18%', left: '35%', width: '30%', height: '12%' },
    { id: 'abs', label: 'Core / Abs', top: '30%', left: '40%', width: '20%', height: '18%' },
    { id: 'arms', label: 'Arms', top: '22%', left: '20%', width: '15%', height: '30%', isLeft: true }, // Left arm
    { id: 'arms', label: 'Arms', top: '22%', left: '65%', width: '15%', height: '30%', isRight: true }, // Right arm
    { id: 'legs', label: 'Legs', top: '50%', left: '30%', width: '40%', height: '40%' },
    { id: 'fullbody', label: 'Full Body', top: '5%', left: '35%', width: '30%', height: '10%' }, // Head area for full body toggle
  ];

  return (
    <div className="relative w-full max-w-[210px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-[0_0_25px_rgba(33,150,243,0.15)] group select-none">
      {/* Background Image */}
      <img 
        src={muscularBodyImg} 
        alt="Muscular Body Form" 
        className="w-full h-full object-cover object-top opacity-80"
      />
      
      {/* Subtle overlay to make it look like a scanner */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(33,150,243,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(33,150,243,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />

      {/* Hitboxes */}
      {bodyParts.map((part, idx) => {
        const isSelected = selectedParts.includes(part.id);
        
        return (
          <div
            key={`${part.id}-${idx}`}
            onClick={() => togglePart(part.id)}
            className={`absolute cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center
              ${isSelected 
                ? 'bg-[#2196f3]/40 border-2 border-[#2196f3] shadow-[0_0_20px_rgba(33,150,243,0.6)]' 
                : 'bg-transparent border-2 border-transparent hover:border-white/30 hover:bg-white/5'}
            `}
            style={{
              top: part.top,
              left: part.left,
              width: part.width,
              height: part.height,
              // Adjust rounded corners based on the part for better fit
              borderRadius: part.id === 'abs' ? '30px' : part.id === 'chest' ? '50px 50px 20px 20px' : '50px'
            }}
          >
            {/* Show label only on the first instance of a part (e.g. left arm) */}
            {(!part.isRight && isSelected) && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#2196f3]/50 flex items-center gap-1 shadow-lg z-10 pointer-events-none scale-in animate-in zoom-in">
                <Check size={12} className="text-[#2196f3]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{part.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
