'use client';

import React, { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  youtubeUrl: string;
  thumbnail: string;
}

interface YouTubeTrailerPlayerProps {
  movies?: Movie[];
}

const YouTubeTrailerPlayer: React.FC<YouTubeTrailerPlayerProps> = ({ movies: propMovies }) => {
  // Example movie data with YouTube trailer links
  const defaultMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      youtubeUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "The Dark Knight",
      youtubeUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Interstellar",
      youtubeUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop"
    }
  ];

  const movies = propMovies || defaultMovies;
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube embed URL
  const getEmbedUrl = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Movie Trailers</h1>
        
        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="relative">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-gray-400 text-sm mt-1">Click to watch trailer</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedMovie && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <div 
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedMovie.title} - Trailer</h2>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="text-white hover:text-red-500 text-3xl font-bold"
                  aria-label="Close trailer"
                >
                  ×
                </button>
              </div>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  src={getEmbedUrl(selectedMovie.youtubeUrl) || ''}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedMovie.title}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeTrailerPlayer;