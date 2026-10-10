import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  Info,
  Wind,
  Compass,
  Repeat,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';

export default function ExerciseDemonstrationPlayer({ exercise, index = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullDetails, setShowFullDetails] = useState(index === 0);

  if (!exercise) return null;

  const {
    exerciseId = '',
    name = 'Gentle Mobility Exercise',
    mediaType = 'youtube_search',
    demonstrationUrl = '',
    thumbnailUrl = '',
    durationText = '',
    startingPosition = '',
    movementDirection = '',
    repsOrDuration = '',
    breathingGuidance = '',
    stopSigns = '',
    instructions = [],
    precautions = '',
    youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' proper form physical therapy demonstration')}`
  } = exercise;

  const hasDirectVideo = mediaType === 'video' && demonstrationUrl && !videoError;
  const hasAnimation = mediaType === 'animation' && demonstrationUrl;

  // Construct auto-play embed URL with mute parameter
  const embedSrc = hasDirectVideo
    ? `${demonstrationUrl}?autoplay=1&mute=${isMuted ? '1' : '0'}&rel=0&modestbranding=1&playsinline=1`
    : '';

  return (
    <div className="bg-zinc-950/80 border border-white/10 hover:border-fit-primary/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* 1. Header: Exercise Index, Title, and Media Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-fit-primary/20 border border-fit-primary/40 text-fit-primary font-black text-xs flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              {index + 1}
            </span>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white group-hover:text-fit-primary transition-colors leading-snug">
                {name}
              </h4>
              {repsOrDuration && (
                <span className="text-[11px] font-bold text-teal-400 flex items-center gap-1 mt-0.5">
                  <Repeat size={11} /> {repsOrDuration}
                </span>
              )}
            </div>
          </div>

          {/* Media Availability Badge */}
          {hasDirectVideo || hasAnimation ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-black text-emerald-400 uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm">
              <Play size={10} fill="currentColor" /> Verified Demo
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[10px] font-black text-blue-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <ExternalLink size={10} /> Video Guide
            </span>
          )}
        </div>

        {/* 2. Visual Demonstration Player / Card */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 my-3 shadow-inner">
          {hasDirectVideo ? (
            isPlaying ? (
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={embedSrc}
                  title={`${name} demonstration`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                />
                
                {/* Overlay Controls */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white/90 text-xs transition-colors backdrop-blur-sm"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white/90 text-xs transition-colors backdrop-blur-sm flex items-center gap-1"
                    title="Close Video"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            ) : (
              // Thumbnail Poster with Glowing Play Button
              <div className="relative w-full h-full cursor-pointer overflow-hidden group/thumb" onClick={() => setIsPlaying(true)}>
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={`${name} form thumbnail`}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-80"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 flex items-center justify-center" />
                )}

                {/* Dark Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-fit-primary text-black flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.6)] group-hover/thumb:scale-110 transition-transform">
                    <Play size={24} fill="black" className="ml-0.5" />
                  </div>
                </div>

                {/* Duration & Quality Chip */}
                {durationText && (
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 border border-white/10 text-[10px] font-bold text-zinc-300 backdrop-blur-sm">
                    {durationText}
                  </div>
                )}
                
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-fit-primary/20 text-fit-primary border border-fit-primary/30 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                  Click to Play
                </div>
              </div>
            )
          ) : hasAnimation ? (
            // Animation or GIF
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={demonstrationUrl}
                alt={`${name} animation`}
                className="w-full h-full object-contain"
                onError={() => setVideoError(true)}
              />
            </div>
          ) : (
            // Fallback: Direct YouTube Search Player Card
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 to-black">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-2 shadow-lg">
                <Play size={20} fill="currentColor" />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">{name}</h5>
              <p className="text-[11px] text-zinc-400 max-w-xs mb-3">
                Watch verified clinical form and physical therapist demonstration.
              </p>
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-red-600/20"
              >
                <span>Watch Exercise Demonstration</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* 3. Action Link if Video Available */}
        {(hasDirectVideo || hasAnimation) && (
          <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 mb-3">
            <span className="flex items-center gap-1 text-zinc-400">
              <Info size={12} className="text-teal-400" /> Physical therapy reference form
            </span>
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fit-primary hover:underline font-semibold flex items-center gap-1 transition-colors"
            >
              Watch on YouTube <ExternalLink size={11} />
            </a>
          </div>
        )}

        {/* 4. Core Movement Execution Guide (Starting Position & Direction) */}
        <div className="space-y-2 mt-2">
          {startingPosition && (
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300">
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1 mb-0.5">
                <Compass size={11} /> Starting Position
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">{startingPosition}</p>
            </div>
          )}

          {movementDirection && (
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-0.5">
                <CheckCircle2 size={11} /> Movement Direction
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">{movementDirection}</p>
            </div>
          )}
        </div>

        {/* 5. Breathing & Warning Cues */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {breathingGuidance && (
            <div className="p-2 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-cyan-200">
              <span className="font-bold flex items-center gap-1 text-cyan-300 mb-0.5">
                <Wind size={11} /> Breathing
              </span>
              <p className="leading-tight text-cyan-200/90">{breathingGuidance}</p>
            </div>
          )}

          {stopSigns && (
            <div className="p-2 rounded-xl bg-red-950/20 border border-red-500/20 text-[11px] text-red-200">
              <span className="font-bold flex items-center gap-1 text-red-400 mb-0.5">
                <AlertTriangle size={11} /> Stop If
              </span>
              <p className="leading-tight text-red-200/90">{stopSigns}</p>
            </div>
          )}
        </div>

        {/* 6. Expandable Step-by-Step Instructions */}
        {instructions && instructions.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowFullDetails(!showFullDetails)}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-white/5 text-xs font-bold text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>{showFullDetails ? 'Hide Step-by-Step Instructions' : 'View Step-by-Step Instructions'}</span>
              <span className="text-[10px] text-fit-primary">
                {showFullDetails ? '▲' : '▼'}
              </span>
            </button>

            {showFullDetails && (
              <div className="mt-2.5 p-3 rounded-2xl bg-black/60 border border-white/5 space-y-1.5 animate-in fade-in duration-200">
                {instructions.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="w-4 h-4 rounded-full bg-zinc-800 text-fit-primary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}

                {precautions && (
                  <div className="pt-2 mt-2 border-t border-white/5 text-[11px] text-amber-400 font-semibold flex items-start gap-1.5">
                    <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                    <span>{precautions}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
