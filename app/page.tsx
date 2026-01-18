import MovieDashboard from '../components/MovieDashboard';
import { Movie } from '../lib/types';
import { apiFetch } from '@/lib/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getMovies(): Promise<Movie[]> {
  try {
  const res = await apiFetch(`/api/movies`, {
    method: 'GET',
    cache: 'no-store'
  });
  if (!res) throw new Error('Failed to fetch');
  return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const movies = await getMovies();

  // Logic to pick a featured movie (e.g., Highest Rated)
  const featuredMovie = movies.length > 0
    ? movies.reduce((prev, current) => (prev.rating > current.rating) ? prev : current)
    : null;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* Container */}
      <section className="container mx-auto px-4 py-6 md:py-10">
        <MovieDashboard
          initialMovies={movies}
          featuredMovie={featuredMovie}
        />
      </section>
    </main>
  );
}