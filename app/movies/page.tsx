"use client"
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { Movie } from '@/lib/types';
 

export default function MoviesPage() {
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
      <div className="p-8">
        <p>Loading movies...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        movies.map(movie => (
          <div key={movie.id} className="border p-4">
            <h3 className="font-bold">{movie.title}</h3>
            <p>{movie.releaseYear}</p>
          </div>
        ))
      )}
    </div>
  );
}
