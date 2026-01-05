import Link from 'next/link';
import { Movie } from '@/lib/types';

const url = process.env.NEXT_PUBLIC_API_URL

async function getMovies(): Promise<Movie[]> {
  const res = await fetch(`${url}/api/movies`, {
    cache: 'no-store',
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

export default async function HomePage() {
  const movies = await getMovies();


  return (
    <main>
      {/* HERO SECTION */}
      <section className="bg-black text-white py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎬 Book Movie Tickets Online
        </h1>
        <p className="text-lg opacity-80 mb-6">
          Choose your favorite movie, select your seats, enjoy the show.
        </p>

        <Link
          href="/movies"
          className="inline-block bg-red-600 px-6 py-3 rounded text-white font-semibold"
        >
          Browse Movies
        </Link>
      </section>

      {/* NOW SHOWING */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6">
          Now Showing
        </h2>

        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map(movie => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="border rounded hover:shadow-lg transition p-3"
              >
                <div className="h-48 bg-gray-200 mb-3 flex items-center justify-center">
                  {movie.posterImage ? (
                    <img
                      src={movie.posterImage}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-600">
                  {movie.releaseYear || '—'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
