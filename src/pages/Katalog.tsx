import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music, Loader2, Shuffle } from "lucide-react";
import { useCatalog } from "@/hooks/useCatalog";
import { ReleaseCard } from "@/components/catalog/ReleaseCard";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { InfiniteScrollTrigger } from "@/components/catalog/InfiniteScrollTrigger";
import { useMusicPlayer, Track } from "@/contexts/MusicPlayerContext";
import { Button } from "@/components/ui/button";

const Katalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [releaseTypeFilter, setReleaseTypeFilter] = useState<string>("all");
  const { shufflePlay, isShuffleMode } = useMusicPlayer();

  const {
    releases,
    allReleases,
    isLoading,
    error,
    genres,
    years,
    releaseTypes,
    hasMore,
    loadMore,
    totalCount,
  } = useCatalog({
    searchQuery,
    genreFilter,
    yearFilter,
    releaseTypeFilter,
  });

  // Convert all tracks from all releases to player tracks format
  const allTracks = useMemo((): Track[] => {
    return allReleases.flatMap(release => 
      release.tracks?.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist_name || release.artist_name,
        album: release.title,
        cover_url: release.cover_url,
        audio_url: track.audio_url,
        genre: track.genre || release.genre || undefined,
        release_year: release.release_date?.split('-')[0],
      })) || []
    );
  }, [allReleases]);

  const handleShufflePlay = () => {
    if (allTracks.length > 0) {
      shufflePlay(allTracks);
    }
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
          >
            <CatalogFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              genreFilter={genreFilter}
              onGenreChange={setGenreFilter}
              yearFilter={yearFilter}
              onYearChange={setYearFilter}
              releaseTypeFilter={releaseTypeFilter}
              onReleaseTypeChange={setReleaseTypeFilter}
              genres={genres}
              years={years}
              releaseTypes={releaseTypes}
            />
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Memuat katalog...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-destructive mb-4">{error}</p>
            </motion.div>
          )}

          {/* Shuffle Play Button */}
          {!isLoading && allTracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <Button
                onClick={handleShufflePlay}
                size="lg"
                className="gap-2 px-8"
                variant={isShuffleMode ? "default" : "outline"}
              >
                <Shuffle className="w-5 h-5" />
                Shuffle Play ({allTracks.length} lagu)
              </Button>
            </motion.div>
          )}

          {/* Katalog Grid */}
          {!isLoading && releases.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {releases.map((release, index) => (
                  <ReleaseCard 
                    key={release.id} 
                    release={release} 
                    index={index} 
                  />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                hasMore={hasMore}
              />

              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8 text-muted-foreground"
              >
                Menampilkan {releases.length} dari {totalCount} rilisan
              </motion.div>
            </>
          )}

          {/* Empty State */}
          {!isLoading && releases.length === 0 && !error && (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Katalog;
