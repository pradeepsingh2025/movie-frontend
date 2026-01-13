import { ShowTime } from '@/lib/types';
import { apiFetch } from '@/lib/apiClient';
import ShowtimesList from './ShowTimeList';

async function getShowtimes(): Promise<ShowTime[]> {
  try {
    const res = await apiFetch(`/api/show-times`, {
      method: 'GET',
      // Ensure we don't cache stale showtimes
      cache: 'no-store', 
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch shows", error);
    return [];
  }
}

export default async function ShowtimesPage() {
  const showtimes = await getShowtimes();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 font-sans">Movie Schedule</h1>
          <p className="text-gray-500 mt-2">Find available showtimes and book your tickets.</p>
        </div>

        {/* We pass the raw data to the Client Component 
          which handles grouping, filtering, and interaction 
        */}
        <ShowtimesList initialShowtimes={showtimes} />
      </div>
    </div>
  );
}