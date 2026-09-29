import { useState, useEffect } from 'react'
import { Play, ExternalLink, Dumbbell, Film, Image as ImageIcon, RefreshCw, Zap, Sparkles } from 'lucide-react'

/**
 * ExerciseVideoPlayer — Multi-visual player supporting:
 * 1. Inline HD Video Demo with overlay play button & fallback links
 * 2. Dynamic 2-Phase Motion Guide (Auto-switching Start ⇄ Peak Contraction)
 * 3. Side-by-side Start & Finish Step Photos
 */
export default function ExerciseVideoPlayer({ videoUrl, imageUrl, image2Url, gifUrl, name, target }) {
  const [activeTab, setActiveTab] = useState('video') // 'video' | 'gif' | 'photos'
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [motionFrame, setMotionFrame] = useState(0) // 0 = start, 1 = peak
  const [isMotionPlaying, setIsMotionPlaying] = useState(true)
  const [imgError, setImgError] = useState(false)
  const [img2Error, setImg2Error] = useState(false)

  // Auto-cycle between Start and Peak pose for the motion guide
  useEffect(() => {
    if (activeTab !== 'gif' || !isMotionPlaying) return

    const interval = setInterval(() => {
      setMotionFrame((prev) => (prev === 0 ? 1 : 0))
    }, 1200)

    return () => clearInterval(interval)
  }, [activeTab, isMotionPlaying])

  const getEmbedUrl = (url) => {
    if (!url) return null
    const embedMatch = url.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]+)/)
    if (embedMatch) return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}?autoplay=1&rel=0`
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
    if (watchMatch) return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`
    return url
  }

  const getWatchUrl = (url) => {
    if (!url) return '#'
    const embedMatch = url.match(/(?:embed\/)([a-zA-Z0-9_-]+)/)
    if (embedMatch) return `https://www.youtube.com/watch?v=${embedMatch[1]}`
    return url
  }

  const getThumbnailUrl = (url) => {
    if (!url) return null
    const embedMatch = url.match(/(?:embed\/)([a-zA-Z0-9_-]+)/)
    if (embedMatch) return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`
    return null
  }

  const embedUrl = getEmbedUrl(videoUrl)
  const watchUrl = getWatchUrl(videoUrl)
  const hasVideo = !!embedUrl
  const ytThumbnail = getThumbnailUrl(videoUrl)
  const primaryImg = imageUrl || ytThumbnail
  const peakImg = image2Url || imageUrl

  return (
    <div className="space-y-3">
      {/* Visual Mode Selector Tabs */}
      <div className="flex bg-fit-surface2 p-1 rounded-xl border border-fit-border/60 text-xs shadow-sm">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'video' ? 'bg-fit-primary text-fit-bg shadow-sm font-extrabold' : 'text-fit-muted hover:text-fit-text'
          }`}
        >
          <Film size={13} /> Video Demo
        </button>
        <button
          onClick={() => setActiveTab('gif')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'gif' ? 'bg-fit-primary text-fit-bg shadow-sm font-extrabold' : 'text-fit-muted hover:text-fit-text'
          }`}
        >
          <RefreshCw size={13} className={activeTab === 'gif' && isMotionPlaying ? 'animate-spin' : ''} /> Motion Guide
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'photos' ? 'bg-fit-primary text-fit-bg shadow-sm font-extrabold' : 'text-fit-muted hover:text-fit-text'
          }`}
        >
          <ImageIcon size={13} /> Step Photos
        </button>
      </div>

      {/* Main Display Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-fit-surface border border-fit-border/80 shadow-inner">
        {/* TAB 1: VIDEO DISPLAY */}
        {activeTab === 'video' && (
          videoLoaded && embedUrl ? (
            <iframe
              src={embedUrl}
              title={name}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 w-full h-full">
              {!imgError && primaryImg ? (
                <img
                  src={primaryImg}
                  alt={name}
                  className="w-full h-full object-cover filter brightness-95"
                  onError={() => {
                    if (ytThumbnail && primaryImg !== ytThumbnail) {
                      setImgError(false)
                    } else {
                      setImgError(true)
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-fit-surface2 via-fit-surface to-fit-bg flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-fit-primary/10 border border-fit-primary/30 flex items-center justify-center text-fit-primary mb-2">
                    <Dumbbell size={24} />
                  </div>
                  <span className="text-xs font-bold text-fit-text">{name}</span>
                  {target && <span className="text-[10px] text-fit-primary mt-1 font-semibold">{target}</span>}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-fit-bg/80 via-fit-bg/30 to-transparent" />
              {hasVideo && (
                <button
                  onClick={() => setVideoLoaded(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center group"
                  aria-label={`Play ${name} demonstration`}
                >
                  <div className="w-16 h-16 rounded-full bg-fit-primary/95 flex items-center justify-center shadow-glow group-hover:scale-110 group-hover:bg-fit-primary transition-all duration-300">
                    <Play size={24} fill="currentColor" className="text-fit-bg ml-1" />
                  </div>
                  <span className="mt-2.5 text-[11px] font-black text-white bg-fit-bg/90 px-3.5 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-sm">
                    Tap to Play HD Demo Video
                  </span>
                </button>
              )}
            </div>
          )
        )}

        {/* TAB 2: DYNAMIC 2-PHASE MOTION GUIDE */}
        {activeTab === 'gif' && (
          <div className="absolute inset-0 w-full h-full bg-fit-surface2 flex items-center justify-center relative overflow-hidden">
            <img
              src={motionFrame === 0 ? primaryImg : peakImg}
              alt={`${name} phase ${motionFrame + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={() => {
                if (motionFrame === 1) setMotionFrame(0)
              }}
            />
            
            {/* Overlay indicators */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-fit-bg/85 backdrop-blur-sm border border-fit-primary/30 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-fit-primary animate-ping" />
              <span className="text-[10px] font-black text-fit-primary uppercase tracking-wider">
                {motionFrame === 0 ? 'Phase 1: Starting Pose' : 'Phase 2: Peak Contraction'}
              </span>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <button
                onClick={() => setIsMotionPlaying(!isMotionPlaying)}
                className="bg-fit-bg/85 hover:bg-fit-bg text-fit-text text-[10px] font-bold px-2.5 py-1 rounded-lg border border-fit-border shadow-sm flex items-center gap-1 backdrop-blur-sm"
              >
                {isMotionPlaying ? 'Pause Loop' : 'Play Loop'}
              </button>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-fit-border">
              <div
                className="h-full bg-fit-primary transition-all duration-300"
                style={{ width: motionFrame === 0 ? '50%' : '100%' }}
              />
            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP START & FINISH PHOTOS */}
        {activeTab === 'photos' && (
          <div className="absolute inset-0 w-full h-full flex bg-fit-surface2 divide-x divide-fit-border">
            <div className="flex-1 h-full relative overflow-hidden group">
              <img
                src={primaryImg}
                alt={`${name} Start Pose`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-fit-bg/90 backdrop-blur-sm text-fit-primary px-2 py-0.5 rounded border border-fit-primary/40 shadow-sm">
                1. Start Pose
              </span>
            </div>
            <div className="flex-1 h-full relative overflow-hidden group">
              <img
                src={peakImg}
                alt={`${name} Peak Form`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-fit-bg/90 backdrop-blur-sm text-fit-accent px-2 py-0.5 rounded border border-fit-accent/40 shadow-sm">
                2. Peak Form
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info & YouTube Watch Link */}
      <div className="flex items-center justify-between text-[10px] text-fit-muted px-1">
        <span className="font-semibold flex items-center gap-1 text-fit-text/80">
          <Sparkles size={11} className="text-fit-primary" />
          {activeTab === 'video' && (hasVideo ? (videoLoaded ? 'Playing inline HD demo video' : 'Tap play above to view movement demo') : 'Standard motion demo')}
          {activeTab === 'gif' && 'Dynamic start-to-peak movement animation'}
          {activeTab === 'photos' && 'Side-by-side Start and Peak contraction form'}
        </span>
        {hasVideo && (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-fit-primary hover:underline font-bold bg-fit-primary/10 px-2 py-0.5 rounded border border-fit-primary/20"
          >
            Open in YouTube <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  )
}
