import { useState, useEffect, useCallback, useMemo } from 'react';
import { CatalogRelease, CatalogApiResponse } from '@/types/catalog';

const CATALOG_API = "https://opkvvdgnhhopkkeaokzo.supabase.co/functions/v1/get-catalog-tracks";
const CATALOG_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wa3Z2ZGduaGhvcGtrZWFva3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjM5NDUsImV4cCI6MjA4MzU5OTk0NX0.UqDBz7xZYR5GluL7t3gItuJuWZipI9xlwt32KEIZrsc";

const ITEMS_PER_PAGE = 12;

interface UseCatalogOptions {
  searchQuery: string;
  genreFilter: string;
  yearFilter: string;
  releaseTypeFilter: string;
}

export const useCatalog = ({ searchQuery, genreFilter, yearFilter, releaseTypeFilter }: UseCatalogOptions) => {
  const [allReleases, setAllReleases] = useState<CatalogRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const fetchReleases = useCallback(async () => {
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

      const json: CatalogApiResponse = await response.json();
      console.log('Catalog API response:', json);
      
      if (json.success && Array.isArray(json.data)) {
        setAllReleases(json.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error('Error fetching catalog:', err);
      setError('Gagal memuat katalog. Silakan coba lagi.');
      setAllReleases([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, genreFilter, yearFilter, releaseTypeFilter]);

  // Get unique genres, years, and release types for filters
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(allReleases.map(r => r.genre).filter(Boolean) as string[])];
    return uniqueGenres.sort();
  }, [allReleases]);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(allReleases.map(r => r.release_date?.split('-')[0]).filter(Boolean))];
    return uniqueYears.sort().reverse();
  }, [allReleases]);

  const releaseTypes = useMemo(() => {
    const uniqueTypes = [...new Set(allReleases.map(r => r.release_type).filter(Boolean))];
    return uniqueTypes;
  }, [allReleases]);

  // Filtered releases
  const filteredReleases = useMemo(() => {
    return allReleases.filter(release => {
      const matchesSearch = searchQuery === "" || 
        release.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.artist_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.tracks?.some(t => t.title?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = genreFilter === "all" || release.genre === genreFilter;
      const matchesYear = yearFilter === "all" || release.release_date?.startsWith(yearFilter);
      const matchesType = releaseTypeFilter === "all" || release.release_type === releaseTypeFilter;
      
      return matchesSearch && matchesGenre && matchesYear && matchesType;
    });
  }, [allReleases, searchQuery, genreFilter, yearFilter, releaseTypeFilter]);

  // Paginated releases for infinite scroll
  const displayedReleases = useMemo(() => {
    return filteredReleases.slice(0, displayCount);
  }, [filteredReleases, displayCount]);

  const hasMore = displayCount < filteredReleases.length;

  const loadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredReleases.length));
  }, [filteredReleases.length]);

  return {
    releases: displayedReleases,
    allReleases: filteredReleases,
    isLoading,
    error,
    genres,
    years,
    releaseTypes,
    hasMore,
    loadMore,
    totalCount: filteredReleases.length,
    refetch: fetchReleases,
  };
};
