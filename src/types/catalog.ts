export interface CatalogTrack {
  id: string;
  isrc: string;
  genre: string;
  title: string;
  clip_url: string | null;
  duration: number;
  audio_url: string;
  artist_name: string;
  explicit_lyrics: boolean;
}

export interface CatalogRelease {
  id: string;
  title: string;
  artist_name: string;
  cover_url: string;
  genre: string | null;
  release_type: 'single' | 'ep' | 'album';
  release_date: string;
  upc: string;
  tracks: CatalogTrack[];
}

export interface CatalogApiResponse {
  success: boolean;
  data: CatalogRelease[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}
