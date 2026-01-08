'use client';
import { apiFetch } from '@/lib/apiClient';
import { Movie, ShowTime } from '@/lib/types';
import { use, useEffect, useState } from 'react';

const url = process.env.NEXT_PUBLIC_API_URL

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMovie(id: string): Promise<Movie> {
  const data = await apiFetch(`/api/movies/${id}`, {
    method: 'GET',
  });
  return data;
}

async function getShowtimes(id: string): Promise<ShowTime[]> {
  const res = await fetch(`/api/show-times/movie/${id}`, {
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

export default function MovieDetail({ params }: PageProps) {
  const { id } = use(params);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<ShowTime[]>([]);
  useEffect(() => {
    getMovie(id).then(setMovie).catch((error: any) => {
      console.error('Error fetching movie:', error);
    });
    getShowtimes(id).then(setShowtimes).catch((error: any) => {
      console.error('Error fetching showtimes:', error);
    });
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{movie?.title}</h1>
      <p>{movie?.description || 'No description available'}</p>

      <h2 className="mt-4 font-semibold">Showtimes</h2>
      <ul>
        {showtimes.length > 0 ? showtimes.map(show => (
          <li key={show.id}>
            <a href={`/showTimes/${show.id}`} className="underline">
              {new Date(show.showDate).toLocaleString()}
            </a>
          </li>
        )) : <li>No showtimes available</li>}
      </ul>
    </div>
  );
}
