"use client"
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { Movie } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Convert duration from ISO 8601 format (PT2H15M) to readable format
  const formatDuration = (dur?: string) => {
    if (!dur) return '';

    // If it's already a number, assume it's minutes
    if (typeof dur === 'number') {
      const hours = Math.floor(dur / 60);
      const minutes = dur % 60;
      return `${hours}h ${minutes}m`;
    }

    // Parse ISO 8601 duration format
    const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (match) {
      const hours = match[1] || '0';
      const minutes = match[2] || '0';
      return `${hours}h ${minutes}m`;
    }

    return dur;
  };

  return (
    <Card className="w-full py-0 bg-black/50 border-2 border-slate-200/50 overflow-hidden hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {movie.posterImage ? (
          <img
            src={movie.posterImage}
            alt={movie.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-slate-500 mb-2 line-clamp-1">{movie.title}</h3>

        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 flex-wrap">
          {movie.releaseYear && <span>{movie.releaseYear}</span>}
          {movie.genres && movie.genres.length > 0 && (
            <>
              <span>•</span>
              <span className="line-clamp-1">{movie.genres.slice(0, 2).map(g => g.name).join(' | ')}</span>
            </>
          )}
          {movie.duration && (
            <>
              <span>•</span>
              <span>{formatDuration(movie.duration)}</span>
            </>
          )}
        </div>

        {movie.description && (
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">{movie.description}</p>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/movies/${movie.id}`}
            className="bg-slate-600 cursor-pointer hover:bg-slate-700 text-white font-semibold rounded-full px-3 py-1"
          >
            Tickets
          </Link>

          {movie.rating !== undefined && (
            <div className="flex items-center gap-1 text-white">
              <Star className="w-5 h-5 fill-white" />
              <span className="text-lg font-semibold">{movie.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function MoviesPage() {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await apiFetch('/api/movies', {
          method: 'GET',
        });
        setMovies(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Background Gradient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading movies...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Background Gradient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-lg">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-pink-500 hover:bg-pink-600"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Full Page Background Gradient Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 p-8 mt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white/80 mb-2">Show is on...</h1>
          <p className="text-white/80 text-lg mb-8">Discover the latest movies in theaters</p>

          {movies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/80 text-xl">No movies available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}