import { Movie, ShowTime } from '@/lib/types';

const url = process.env.NEXT_PUBLIC_API_URL

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`${url}/api/movies/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movie: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function getShowtimes(id: string): Promise<ShowTime[]> {
  const res = await fetch(`${url}/api/show-times/movie/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch showtimes: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default async function MovieDetail({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovie(id);
  const showtimes = await getShowtimes(id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p>{movie.description}</p>

      <h2 className="mt-4 font-semibold">Showtimes</h2>
      <ul>
        {showtimes.map(show => (
          <li key={show.id}>
            <a href={`/showTimes/${show.id}`} className="underline">
              {new Date(show.showDate).toLocaleString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
