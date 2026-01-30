import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  genreFilter: string;
  onGenreChange: (value: string) => void;
  yearFilter: string;
  onYearChange: (value: string) => void;
  releaseTypeFilter: string;
  onReleaseTypeChange: (value: string) => void;
  genres: string[];
  years: string[];
  releaseTypes: string[];
}

const getReleaseTypeLabel = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'single': return 'Single';
    case 'ep': return 'EP';
    case 'album': return 'Album';
    default: return type;
  }
};

export const CatalogFilters = ({
  searchQuery,
  onSearchChange,
  genreFilter,
  onGenreChange,
  yearFilter,
  onYearChange,
  releaseTypeFilter,
  onReleaseTypeChange,
  genres,
  years,
  releaseTypes,
}: CatalogFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Cari rilisan, artis, atau lagu..." 
          className="pl-10 bg-card border-border/50"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Release Type Filter */}
      <Select value={releaseTypeFilter} onValueChange={onReleaseTypeChange}>
        <SelectTrigger className="w-full md:w-36 bg-card">
          <SelectValue placeholder="Tipe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Tipe</SelectItem>
          {releaseTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {getReleaseTypeLabel(type)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Genre Filter */}
      <Select value={genreFilter} onValueChange={onGenreChange}>
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
      
      {/* Year Filter */}
      <Select value={yearFilter} onValueChange={onYearChange}>
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
    </div>
  );
};
