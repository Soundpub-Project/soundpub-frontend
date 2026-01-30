import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music, Search, Filter, Play, Loader2, Calendar, Disc, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicPlayer, Track } from "@/contexts/MusicPlayerContext";

interface CatalogTrack {
  id: string;
  title: string;
  artist_name: string;
  album_name: string;
  genre: string;
  release_year: string;
  cover_url: string;
  audio_url: string;
}

const CATALOG_API = "https://opkvvdgnhhopkkeaokzo.supabase.co/functions/v1/get-catalog-tracks";
const CATALOG_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wa3Z2ZGduaGhvcGtrZWFva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjM5NDUsImV4cCI6MjA4MzU5OTk0NX0.UqDBz7xZYR5GluL7t3gItuJuWZipI9xlwt32KEIZrsc";

const Katalog = () => {
  const [tracks, setTracks] = useState<CatalogTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(CATALOG_API, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CATALOG_ANON_KEY}`,
          'apikey': CATALOG_ANON_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Catalog data:', data);
      
      // Handle different response structures
      const trackList = Array.isArray(data) ? data : (data.tracks || data.data || []);
      setTracks(trackList);
    } catch (err) {
      console.error('Error fetching catalog:', err);
      setError('Gagal memuat katalog. Menggunakan data sample.');
      // Fallback to sample data
      setTracks([
        { 
          id: '1', 
          title: 'Perjalanan Malam', 
          artist_name: 'Indie Band', 
          album_name: 'Album Rock Indonesia', 
          genre: 'Rock', 
          release_year: '2024',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'
        },
        { 
          id: '2', 
          title: 'Cinta Pertama', 
          artist_name: 'Pop Artist', 
          album_name: 'Pop Hits Collection', 
          genre: 'Pop', 
          release_year: '2024',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0939c1.mp3'
        },
        { 
          id: '3', 
          title: 'Malam Sunyi', 
          artist_name: 'Jazz Ensemble', 
          album_name: 'Jazz Nusantara', 
          genre: 'Jazz', 
          release_year: '2023',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3'
        },
        { 
          id: '4', 
          title: 'Langkah Baru', 
          artist_name: 'Indie Stars', 
          album_name: 'Indie Vibes', 
          genre: 'Indie', 
          release_year: '2024',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b32e02f9.mp3'
        },
        { 
          id: '5', 
          title: 'Digital Dreams', 
          artist_name: 'Electronic Producer', 
          album_name: 'Electronic Dreams', 
          genre: 'Electronic', 
          release_year: '2023',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3'
        },
        { 
          id: '6', 
          title: 'Akustik Senja', 
          artist_name: 'Acoustic Artist', 
          album_name: 'Acoustic Sessions', 
          genre: 'Acoustic', 
          release_year: '2024',
          cover_url: '',
          audio_url: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3'
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique genres and years for filters
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(tracks.map(t => t.genre).filter(Boolean))];
    return uniqueGenres.sort();
  }, [tracks]);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(tracks.map(t => t.release_year).filter(Boolean))];
    return uniqueYears.sort().reverse();
  }, [tracks]);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      const matchesSearch = searchQuery === "" || 
        track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = genreFilter === "all" || track.genre === genreFilter;
      const matchesYear = yearFilter === "all" || track.release_year === yearFilter;
      
      return matchesSearch && matchesGenre && matchesYear;
    });
  }, [tracks, searchQuery, genreFilter, yearFilter]);

  const handlePlayTrack = (track: CatalogTrack) => {
    const playerTrack: Track = {
      id: track.id,
      title: track.title,
      artist: track.artist_name,
      album: track.album_name,
      cover_url: track.cover_url,
      audio_url: track.audio_url,
      genre: track.genre,
      release_year: track.release_year,
    };
    playTrack(playerTrack);
  };

  const isTrackPlaying = (trackId: string) => {
    return currentTrack?.id === trackId && isPlaying;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Katalog</span> Musik
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jelajahi koleksi musik yang telah didistribusikan melalui SoundPub ke seluruh platform digital dunia.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Cari musik, artis, atau album..." 
                className="pl-10 bg-card border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-full md:w-40 bg-card">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Genre</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full md:w-32 bg-card">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4 mb-8"
            >
              <p className="text-yellow-500 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Katalog Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group bg-card border rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    currentTrack?.id === track.id 
                      ? 'border-primary shadow-lg shadow-primary/20' 
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                  onClick={() => handlePlayTrack(track)}
                >
                  {/* Cover */}
                  <div className="relative w-full aspect-square rounded-xl mb-4 overflow-hidden">
                    {track.cover_url ? (
                      <img
                        src={track.cover_url}
                        alt={track.album_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Music className="w-16 h-16 text-primary/50" />
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      isTrackPlaying(track.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className={`w-16 h-16 rounded-full bg-primary flex items-center justify-center ${
                        isTrackPlaying(track.id) ? 'animate-pulse' : ''
                      }`}>
                        <Play className={`w-8 h-8 text-primary-foreground ${isTrackPlaying(track.id) ? '' : 'ml-1'}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Track Info */}
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {track.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <User className="w-3 h-3" />
                    <span className="line-clamp-1">{track.artist_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Disc className="w-3 h-3" />
                    <span className="line-clamp-1">{track.album_name}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {track.genre && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {track.genre}
                      </span>
                    )}
                    {track.release_year && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {track.release_year}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredTracks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tidak ada hasil</h3>
              <p className="text-muted-foreground">Coba ubah filter atau kata kunci pencarian</p>
            </motion.div>
          )}

          {/* Results Count */}
          {!isLoading && filteredTracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12 text-muted-foreground"
            >
              Menampilkan {filteredTracks.length} dari {tracks.length} musik
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Katalog;
