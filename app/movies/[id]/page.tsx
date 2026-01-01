import { Movie, ShowTime } from '@/lib/types';

const url = process.env.NEXT_PUBLIC_API_URL

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`${url}/api/movies/${id}`);
  return res.json();
}

async function getShowtimes(id: string): Promise<ShowTime[]> {
  const res = await fetch(`${url}/api/show-times?movieId=${id}`);
  return res.json();
}

export default async function MovieDetail({ params }: any) {
  const movie = await getMovie(params.id);
  const showtimes = await getShowtimes(params.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p>{movie.description}</p>

      <h2 className="mt-4 font-semibold">Showtimes</h2>
      <ul>
        {showtimes.map(show => (
          <li key={show.id}>
            <a href={`/showtimes/${show.id}`} className="underline">
              {new Date(show.show_date).toLocaleString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
