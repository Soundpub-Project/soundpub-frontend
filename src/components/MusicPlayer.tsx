import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  ChevronUp, ChevronDown, Music, X
} from 'lucide-react';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    isExpanded,
    progress,
    duration,
    volume,
    togglePlay,
    toggleExpand,
    setVolume,
    seekTo,
    nextTrack,
    prevTrack,
  } = useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className={cn(
          'fixed z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 transition-all duration-300',
          isExpanded 
            ? 'inset-0 rounded-none' 
            : 'bottom-0 left-0 right-0 rounded-t-2xl'
        )}
      >
        {isExpanded ? (
          // Expanded view
          <div className="h-full flex flex-col p-6 md:p-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm text-muted-foreground">Now Playing</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpand}
                className="rounded-full"
              >
                <ChevronDown className="w-6 h-6" />
              </Button>
            </div>

            {/* Cover Art */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl"
              >
                {currentTrack.cover_url ? (
                  <img
                    src={currentTrack.cover_url}
                    alt={currentTrack.album}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                    <Music className="w-24 h-24 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-1">{currentTrack.title}</h2>
              <p className="text-muted-foreground">{currentTrack.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Slider
                value={[progress]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seekTo(value[0])}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTrack}
                className="rounded-full"
              >
                <SkipBack className="w-6 h-6" />
              </Button>
              
              <Button
                variant="hero"
                size="lg"
                onClick={togglePlay}
                className="w-16 h-16 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTrack}
                className="rounded-full"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <VolumeX className="w-5 h-5 text-muted-foreground" />
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0] / 100)}
                className="w-32"
              />
              <Volume2 className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        ) : (
          // Mini player
          <div className="px-4 py-3">
            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
              <div
                className="h-full bg-gradient-primary transition-all"
                style={{ width: `${(progress / (duration || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Cover */}
              <button
                onClick={toggleExpand}
                className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 group"
              >
                {currentTrack.cover_url ? (
                  <img
                    src={currentTrack.cover_url}
                    alt={currentTrack.album}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ChevronUp className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Track info */}
              <div className="flex-1 min-w-0" onClick={toggleExpand}>
                <h3 className="font-semibold truncate">{currentTrack.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTrack}
                  className="hidden sm:flex"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="hero"
                  size="icon"
                  onClick={togglePlay}
                  className="rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTrack}
                  className="hidden sm:flex"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
