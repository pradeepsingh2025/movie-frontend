'use client';
import { apiFetch } from '@/lib/apiClient';
import { Movie, ShowTime } from '@/lib/types';
import { use, useEffect, useState } from 'react';
import { Play, Calendar, Clock, X } from 'lucide-react';
import { form } from 'motion/react-m';

const url = process.env.NEXT_PUBLIC_API_URL;

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
  const res = await apiFetch(`/api/show-times/movie/${id}`, {
    method: 'GET',
  });
  if (!res) {
    throw new Error(`Failed to fetch showtimes`);
  }
  return res;
}

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to get YouTube embed URL
const getEmbedUrl = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};

export default function MovieDetail({ params }: PageProps) {
  const { id } = use(params);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<ShowTime[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getMovie(id).then(setMovie),
      getShowtimes(id).then(setShowtimes),
    ])
      .catch((error: any) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleBooking = (showtimeId: string | number) => {
    window.location.href = `/showTimes/${showtimeId}`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"></div>
        <img
          src={movie.posterImage || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=500&fit=crop'}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
        />

        <div className="relative w-full z-20 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.posterImage || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop'}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-wrap gap-4 mb-4 text-gray-300">
                  {movie.genres && (
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {movie.genres.map(g => g.name).join(' / ') || 'Mixed'}
                    </span>
                  )}
                  {movie.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {formatDuration(movie.duration)}
                    </span>
                  )}
                  {movie.rating && (
                    <span className="px-3 py-1  bg-black/70 backdrop-blur-md text-yellow-400 rounded-full text-sm font-semibold">
                      <span>★</span> {movie.rating}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-lg mb-6 max-w-3xl">
                  {movie.description || 'No description available'}
                </p>

                {movie.trailerURL && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 bg-red-600/70 hover:bg-red-700/70 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Play size={20} fill="white" />
                    Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Calendar size={30} />
          Available Shows
        </h2>

        {showtimes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showtimes.map((show) => (
              <div
                key={show.id}
                className="bg-slate-800 rounded-lg p-6 border border-gray-700 hover:border-gray-500 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl text-slate-400 font-semibold ">{(show.day.toUpperCase())}</p>
                    <p className="text-sm text-slate-400 font-bold ">
                      {new Date(show.showDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>

                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${show.status === 'SCHEDULED'
                        ? 'bg-green-600 text-white'
                        : show.status === 'FILLING'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                  >
                    {show.status?.toUpperCase() || 'AVAILABLE'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={16} />
                    <span className="font-semibold">Start:</span>
                    <span>{show.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={16} />
                    <span className="font-semibold">End:</span>
                    <span>{show.endTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(show.id)}
                  disabled={show.status === 'FULL' || show.status === 'CANCELLED' || show.status === 'COMPLETED'}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${show.status === 'FULL' || show.status === 'CANCELLED' || show.status === 'COMPLETED'
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                    }`}
                >
                  {show.status === 'FULL' ? 'Sold Out' : 'Book Tickets'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-xl text-gray-400">No showtimes available at the moment</p>
            <p className="text-gray-500 mt-2">Check back later for updates</p>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && movie.trailerURL && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{movie.title} - Trailer</h2>
              <button
                onClick={() => setShowTrailer(false)}
                className="text-white hover:text-red-500 transition-colors"
                aria-label="Close trailer"
              >
                <X size={32} />
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg bg-black">
              <iframe
                src={getEmbedUrl(movie.trailerURL) || ''}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${movie.title} Trailer`}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}