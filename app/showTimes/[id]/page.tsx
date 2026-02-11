// app/showTimes/[id]/page.tsx
'use client';

import { use, useState } from 'react';
import SeatMap from '@/components/SeatMap';
import { apiFetch } from '@/lib/apiClient';
import { Seat, ShowTime } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { BookingSuccessModal } from '@/components/BookingSuccessModal';
import BookingSkeleton from '@/components/BookingSkeleton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ShowtimePage({ params }: PageProps) {
  const { user } = useAuth();
  // const router = useRouter(); // router not used for redirecting anymore, handled by middleware or expected auth state, but kept if needed. actually user used it for auth redirect.
  const router = useRouter();

  const { id } = use(params);
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<number[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Redirect if not authenticated
  if (!user && typeof window !== 'undefined') { // basic client-side check, ideally middleware
    const redirectTo = encodeURIComponent(window.location.pathname);
    router.push(`/auth/login?redirect=${redirectTo}`);
  }

  const { data: seats = [], isLoading: isLoadingSeats } = useQuery<Seat[]>({
    queryKey: ['seats', id],
    queryFn: () => apiFetch(`/api/showtimes/${id}/seats`, { method: 'GET' }),
    enabled: !!id,
  });

  const { data: show, isLoading: isLoadingShow } = useQuery<ShowTime>({
    queryKey: ['showtime', id],
    queryFn: () => apiFetch(`/api/show-times/${id}`, { method: 'GET' }),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: async () => {
      return apiFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          show_time_id: id,
          user_id: user?.id,
          seatreservation_seats_id: selected,
        }),
      });
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      setSelected([]);
      queryClient.invalidateQueries({ queryKey: ['seats', id] });
    },
    onError: (error) => {
      console.error("Failed to book seats", error);
      // Optionally show an error toast here
    }
  });

  function toggleSeat(seatId: number) {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((x) => x !== seatId)
        : [...prev, seatId]
    );
  }

  const handleBook = () => {
    if (selected.length === 0 || !user) return;
    bookingMutation.mutate();
  };

  const loading = isLoadingSeats || isLoadingShow;

  return (
    // Dark Theme Container
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">

      {/* Header */}
      {loading ? (<BookingSkeleton />) : (
        <>
          <header className="py-2 px-4 border-b border-white/10">
            <div className="max-w-4xl mx-auto">
              {show?.movie.title ? (<h1 className="text-xl font-light tracking-wide">Select Seats for {show?.movie.title}{`'s`} {show?.day.toUpperCase()} Show</h1>) : (<h1 className="text-xl font-light tracking-wide">No Show Available</h1>)}
              {show?.hall.type ? (<p className="text-gray-400 text-[12px]"><span className='text-red-700 tracking-widest border-r border-gray-600 pr-1 font-semibold'>{show?.hall.type}</span><span className='pl-1'>{show?.startTime} {'-'} {show?.endTime}</span></p>) : (null)}
            </div>
          </header>

          <main className="flex-1 py-5 px-2 overflow-y-auto">
            {seats.length !== 0 ? (<SeatMap seats={seats} selected={selected} toggle={toggleSeat} movie={show ? show?.movie.title : ''} />) : (<div className='text-center text-gray-500 mt-20 animate-pulse'>No Show Available</div>)}
          </main>
        </>)
      }

      {/* Bottom Sticky Booking Bar */}
      <div className="bg-neutral-900 backdrop-blur-2xl border-t border-white/10 p-4 sticky bottom-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Selection Summary */}
          <div>
            <p className="text-sm text-gray-400">
              {selected.length} {selected.length === 1 ? 'seat' : 'seats'} selected
            </p>
            <p className="text-xl font-semibold">
              {/* Mock Price Calculation - Assuming $12 per ticket */}
              ₹ {selected.length * (show?.price ?? 1)}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBook}
            disabled={selected.length === 0 || bookingMutation.isPending}
            className={`
                    px-8 py-3 rounded-lg font-medium transition-all
                    ${selected.length > 0 && !bookingMutation.isPending
                ? 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'}
                `}
          >
            {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>

      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
