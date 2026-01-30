import { motion } from "framer-motion";
import { Music, Play, Pause, Disc, ChevronDown, ChevronUp, User, Calendar } from "lucide-react";
import { useState } from "react";
import { CatalogRelease, CatalogTrack } from "@/types/catalog";
import { useMusicPlayer, Track } from "@/contexts/MusicPlayerContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReleaseCardProps {
  release: CatalogRelease;
  index: number;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getReleaseTypeLabel = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'single': return 'Single';
    case 'ep': return 'EP';
    case 'album': return 'Album';
    default: return type || 'Single';
  }
};

const getReleaseTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'single': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'ep': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'album': return 'bg-green-500/20 text-green-400 border-green-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const ReleaseCard = ({ release, index }: ReleaseCardProps) => {
  const [showTracks, setShowTracks] = useState(false);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useMusicPlayer();

  const handlePlayTrack = (track: CatalogTrack, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    const playerTrack: Track = {
      id: track.id,
      title: track.title,
      artist: track.artist_name || release.artist_name,
      album: release.title,
      cover_url: release.cover_url,
      audio_url: track.audio_url,
      genre: track.genre || release.genre || undefined,
      release_year: release.release_date?.split('-')[0],
    };
    
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(playerTrack);
    }
  };

  const handlePlayFirstTrack = () => {
    if (release.tracks?.length > 0) {
      handlePlayTrack(release.tracks[0]);
    }
  };

  const isTrackPlaying = (trackId: string) => {
    return currentTrack?.id === trackId && isPlaying;
  };

  const isReleaseActive = release.tracks?.some(t => t.id === currentTrack?.id);
  const trackCount = release.tracks?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={cn(
        "group bg-card border rounded-2xl overflow-hidden transition-all duration-300",
        isReleaseActive 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border/50 hover:border-primary/50'
      )}
    >
      {/* Cover & Main Info */}
      <div 
        className="relative cursor-pointer"
        onClick={handlePlayFirstTrack}
      >
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          {release.cover_url ? (
            <img
              src={release.cover_url}
              alt={release.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Music className="w-16 h-16 text-primary/50" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
            isReleaseActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}>
            <div className={cn(
              "w-16 h-16 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-110",
              isReleaseActive && isPlaying && 'animate-pulse'
            )}>
              {isReleaseActive && isPlaying ? (
                <Pause className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              )}
            </div>
          </div>

          {/* Release Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={cn("border", getReleaseTypeColor(release.release_type))}>
              {getReleaseTypeLabel(release.release_type)}
            </Badge>
          </div>

          {/* Track Count Badge (for albums/EPs) */}
          {trackCount > 1 && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-black/60 text-white border-0">
                {trackCount} lagu
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Release Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {release.title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <User className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{release.artist_name}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{new Date(release.release_date).toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {release.genre && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              {release.genre}
            </Badge>
          )}
        </div>

        {/* Expandable Track List (for albums/EPs) */}
        {trackCount > 1 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTracks(!showTracks);
              }}
              className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-2">
                <Disc className="w-4 h-4" />
                Lihat {trackCount} lagu
              </span>
              {showTracks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showTracks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 space-y-1 max-h-48 overflow-y-auto"
              >
                {release.tracks.map((track, idx) => (
                  <div
                    key={track.id}
                    onClick={(e) => handlePlayTrack(track, e)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors text-sm",
                      currentTrack?.id === track.id 
                        ? 'bg-primary/20 text-primary' 
                        : 'hover:bg-muted/50'
                    )}
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      {isTrackPlaying(track.id) ? (
                        <Pause className="w-4 h-4 text-primary" />
                      ) : currentTrack?.id === track.id ? (
                        <Play className="w-4 h-4 text-primary" />
                      ) : (
                        <span className="text-muted-foreground">{idx + 1}</span>
                      )}
                    </div>
                    <span className="flex-1 line-clamp-1">{track.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
