import Link from 'next/link';
import { ShowTime } from '@/lib/types';

const url = process.env.NEXT_PUBLIC_API_URL;

function formatDuration(isoDuration: string): string {
  // Parse ISO 8601 duration format (e.g., "PT2H28M")
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return isoDuration; // Return original if parsing fails

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 && hours === 0) parts.push(`${seconds}s`); // Only show seconds if no hours

  return parts.length > 0 ? parts.join(' ') : '0m';
}

async function getShowtimes(): Promise<ShowTime[]> {
  const res = await fetch(`${url}/api/show-times`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch showtimes: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function ShowtimesPage() {
  try {
    const showtimes = await getShowtimes();

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">All Showtimes</h1>

        {showtimes.length === 0 ? (
          <p className="text-gray-500">No showtimes available.</p>
        ) : (
          <div className="grid gap-6">
            {showtimes.map(show => (
              <div
                key={show.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow bg-white"
              >
                <div className="flex justify-between items-start gap-4">
                  {/* Left Side - Showtime Details */}
                  <div className="flex-1 space-y-4">
                    {/* Movie Information */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {show.movie?.title || `Movie ID: ${show.movie_id}`}
                      </h2>
                      {show.movie?.releaseYear && (
                        <p className="text-gray-600 text-lg">
                          Release Year: {show.movie.releaseYear}
                        </p>
                      )}
                      {show.movie?.description && (
                        <p className="text-gray-700 mt-2 line-clamp-2">
                          {show.movie.description}
                        </p>
                      )}
                    </div>

                    {/* Show Date and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-t border-b border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Show Date
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(show.showDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            show.status === 'SCHEDULED'
                              ? 'bg-green-100 text-green-800'
                              : show.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {show.status}
                        </span>
                      </div>
                    </div>

                    {/* Time Slot Information */}
                    {show.timeSlot && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Time Slot Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                          {show.timeSlot.day && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Day
                              </p>
                              <p className="text-base font-semibold text-gray-900">
                                {show.timeSlot.day}
                              </p>
                            </div>
                          )}

                          {show.timeSlot.timeSlot && (
                            <>
                              {show.timeSlot.timeSlot.name && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Slot Name
                                  </p>
                                  <p className="text-base font-semibold text-gray-900">
                                    {show.timeSlot.timeSlot.name}
                                  </p>
                                </div>
                              )}

                              {show.timeSlot.timeSlot.start_time && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Start Time
                                  </p>
                                  <p className="text-base font-semibold text-gray-900">
                                    {show.timeSlot.timeSlot.start_time}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        {show.movie?.duration && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                              Duration
                            </p>
                            <p className="text-base font-semibold text-gray-900">
                              {formatDuration(show.movie.duration)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!show.timeSlot && show.movie?.duration && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Duration
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {formatDuration(show.movie.duration)}
                        </p>
                      </div>
                    )}

                    {/* Additional IDs (for debugging/admin purposes) */}
                    <div className="text-xs text-gray-400 space-x-4 pt-2 border-t border-gray-100">
                      <span>Showtime ID: {show.id}</span>
                      <span>•</span>
                      <span>Slot ID: {show.slot_id}</span>
                      <span>•</span>
                      <span>Movie ID: {show.movie_id}</span>
                    </div>
                  </div>

                  {/* Right Side - Book Button */}
                  <div className="shrink-0">
                    <Link
                      href={`/showTimes/${show.id}`}
                      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold inline-block whitespace-nowrap"
                    >
                      Book Seats
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error: {error.message || 'Failed to load showtimes'}</p>
      </div>
    );
  }
}

