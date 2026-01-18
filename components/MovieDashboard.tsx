'use client';

import { useState } from 'react';
import { Movie } from '../lib/types';
import Link from 'next/link';
import { Play, X, Clock } from 'lucide-react'; // Using Lucide icons as requested

// --- HELPER FUNCTIONS (Copied from your details page) ---
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getEmbedUrl = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};

const formatDuration = (dur?: string) => {
  if (!dur) return '';
  // If it's number (minutes)
  if (typeof dur === 'number') {
    const hours = Math.floor(dur / 60);
    const minutes = dur % 60;
    return `${hours}h ${minutes}m`;
  }
  // Parse PT2H30M
  const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (match) {
    const hours = match[1] || '0';
    const minutes = match[2] || '0';
    return `${hours}h ${minutes}m`;
  }
  return dur;
};

interface DashboardProps {
  initialMovies: Movie[];
  featuredMovie: Movie | null;
}

export default function MovieDashboard({ initialMovies, featuredMovie }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Modal State
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerTitle, setTrailerTitle] = useState<string | null>(null);

  const [showTrailer, setShowTrailer] = useState(false);

  // Filter Logic
  const allGenres = ['All', ...Array.from(new Set(initialMovies.flatMap(m => m.genres.map(g => g.name))))];

  const filteredMovies = initialMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genres.some(g => g.name === selectedGenre);
    return matchesSearch && matchesGenre;
  });

  // Handler to open modal
  const openTrailer = (url: string, title: string) => {
    setTrailerUrl(url);
    setTrailerTitle(title)
    setShowTrailer(true);
  };

  return (
    <div className="w-full">

      {/* --- HERO SECTION (Integrated here for interactivity) --- */}
      <section className="max-w-7xl mx-auto relative bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 mb-12 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>

        <div className="px-6 py-12 md:px-10 md:py-20 relative z-10">
          {featuredMovie ? (
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Text */}
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-block px-3 py-1 bg-red-600 text-xs font-bold uppercase tracking-wider rounded text-white mb-2">
                  Top Rated
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                  {featuredMovie.title}
                </h1>
                <p className="text-gray-300 text-lg md:text-xl line-clamp-3 max-w-2xl">
                  {featuredMovie.description || "Experience the best cinema has to offer."}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                  <Link
                    href={`/movies/${featuredMovie.id}`}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-transform hover:scale-105 shadow-lg shadow-red-600/30"
                  >
                    Get Tickets
                  </Link>

                  {featuredMovie.trailerURL && (
                    <button
                      onClick={() => openTrailer(featuredMovie.trailerURL, featuredMovie.title)}
                      className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold rounded-full transition-colors flex items-center gap-2"
                    >
                      <Play size={18} fill="currentColor" />
                      Watch Trailer
                    </button>
                  )}
                </div>
              </div>

              {/* Poster */}
              <div className="w-64 md:w-80 lg:w-96 flex-shrink-0 relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <img
                  src={featuredMovie.posterImage || '/placeholder-movie.png'}
                  alt={featuredMovie.title}
                  className="relative w-full h-auto rounded-xl shadow-2xl border border-gray-800 transform group-hover:-translate-y-2 transition-transform duration-500 object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">Loading Featured Movie...</div>
          )}
        </div>
      </section>

      {/* --- FILTER & DASHBOARD --- */}
      <div className="max-w-7xl mx-auto flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold border-l-4 border-red-600 pl-4">Now Showing</h2>
      </div>

      <div className=" max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {allGenres.slice(0, 7).map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* --- MOVIE GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-red-900/20 flex flex-col">
            <div className="relative h-[200px] w-full overflow-hidden bg-gray-800">
              <img
                src={movie.posterImage || '/placeholder-movie.png'}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 px-2 py-1 rounded-md flex items-center gap-1 font-bold shadow-sm border border-white/10">
                <span>★</span> {movie.rating?.toFixed(1) || 'N/A'}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white truncate pr-2" title={movie.title}>{movie.title}</h3>
                <span className="text-gray-400 text-sm border border-gray-700 px-1.5 rounded shrink-0">{movie.releaseYear}</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm mb-4 space-x-3">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {formatDuration(movie.duration)}
                </span>
                <span>|</span>
                <span className="truncate max-w-[120px] text-gray-300">{movie.genres.map(g => g.name).join(', ')}</span>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <Link href={`/movies/${movie.id}`} className="col-span-2 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors shadow-lg shadow-red-900/20">
                  Book Tickets
                </Link>

                {movie.trailerURL && (
                  <button
                    onClick={() => openTrailer(movie.trailerURL, movie.title)}
                    className="col-span-2 text-center text-sm border border-gray-600 cursor-pointer flex items-center justify-center gap-2 rounded-lg bg-transparent py-3 font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                  >
                    <Play size={14} fill='currentColor' /> Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- TRAILER MODAL (Exact Copy of Logic) --- */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{trailerTitle} - Trailer</h2>
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
                src={getEmbedUrl(trailerUrl) || ''}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}