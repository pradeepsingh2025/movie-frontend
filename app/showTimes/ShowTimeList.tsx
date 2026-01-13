'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShowTime, Movie, Hall } from '@/lib/types';

// Helper to format ISO duration (PT2H30M -> 2h 30m)
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 'N/A';
  const h = match[1] ? `${match[1]}h` : '';
  const m = match[2] ? `${match[2]}m` : '';
  return `${h} ${m}`.trim();
}

// Helper to format 24h time to 12h AM/PM
function formatTime(timeStr: string) {
  const [hour, minute] = timeStr.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
}

interface ShowtimesListProps {
  initialShowtimes: ShowTime[];
}

export default function ShowtimesList({ initialShowtimes }: ShowtimesListProps) {
  const [selectedDate, setSelectedDate] = useState<string>(''); // '' = All dates

  // 1. Get unique dates for the filter tabs
  const uniqueDates = useMemo(() => {
    const dates = new Set(initialShowtimes.map((s) => s.showDate));
    return Array.from(dates).sort();
  }, [initialShowtimes]);

  // Set default date to today (first available) if not set
  if (!selectedDate && uniqueDates.length > 0) {
    setSelectedDate(uniqueDates[0]);
  }

  // 2. Filter and Group Data
  const groupedMovies = useMemo(() => {
    // A. Filter by Status and Date
    const activeShows = initialShowtimes.filter((show) => {
      const isScheduled = show.status === 'SCHEDULED';
      const isDateMatch = show.showDate === selectedDate;
      return isScheduled && isDateMatch;
    });

    // B. Group by Movie ID
    const groups: Record<number, { movie: Movie; halls: Record<number, { hallName: string; shows: ShowTime[] }> }> = {};

    activeShows.forEach((show) => {
      if (!groups[show.movie.id]) {
        groups[show.movie.id] = {
          movie: show.movie,
          halls: {}, // Nested grouping by Hall
        };
      }

      const hallId = show.hall.id;
      if (!groups[show.movie.id].halls[hallId]) {
        groups[show.movie.id].halls[hallId] = {
          hallName: show.hall.name, // Assuming hall object has a name
          shows: [],
        };
      }
      
      groups[show.movie.id].halls[hallId].shows.push(show);
    });

    // C. Sort shows by start time within halls
    Object.values(groups).forEach(group => {
       Object.values(group.halls).forEach(hallGroup => {
          hallGroup.shows.sort((a, b) => a.startTime.localeCompare(b.startTime));
       });
    });

    return Object.values(groups);
  }, [initialShowtimes, selectedDate]);

  return (
    <div className="space-y-8">
      {/* Date Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-2 px-2 border-b border-gray-200">
        {uniqueDates.map((date) => {
          const dateObj = new Date(date);
          const isSelected = selectedDate === date;
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center min-w-[80px] px-4 py-2 rounded-xl transition-all ${
                isSelected
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-xs font-medium uppercase opacity-80">
                {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-lg font-bold">
                {dateObj.toLocaleDateString('en-US', { day: 'numeric' })}
              </span>
              <span className="text-xs opacity-80">
                 {dateObj.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Movies Grid */}
      {groupedMovies.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No shows available for this date.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {groupedMovies.map(({ movie, halls }) => (
            <div
              key={movie.id}
              className="flex flex-col md:flex-row gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-shadow"
            >
              {/* Movie Info Section */}
              <div className="md:w-1/4 space-y-3">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {movie.title}
                </h2>
                <div className="flex flex-wrap gap-2 text-sm items-center text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {formatDuration(movie.duration)}
                  </span>
                  <span>•</span>
                  <span className='text-black'>{movie.genres.map(g => g.name).join('/')}</span> {/* Assuming Genre exists */}
                </div>
                {movie.description && (
                   <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                     {movie.description}
                   </p>
                )}
              </div>

              {/* Showtimes Section */}
              <div className="md:w-3/4 border-t md:border-t-0 md:border-l flex flex-row flex-wrap items-center border-gray-200 pt-2 md:pl-6 space-x-6 space-y-2">
                {Object.values(halls).map((hallGroup: any) => (
                  <div key={hallGroup.hallName}>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <span>📍 {hallGroup.hallName}</span>
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {hallGroup.shows.map((show: ShowTime) => (
                        <Link
                          key={show.id}
                          href={`/showTimes/${show.id}`}
                          className="group relative flex flex-col items-center justify-center w-28 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all active:scale-95"
                        >
                          <span className="text-lg font-bold tracking-tight">
                            {formatTime(show.startTime)}
                          </span>
                          {/* Optional: Show End Time on Hover or small text */}
                          <span className="text-[10px] opacity-70">
                             Until {formatTime(show.endTime)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}