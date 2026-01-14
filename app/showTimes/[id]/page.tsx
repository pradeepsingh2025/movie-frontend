// app/showTimes/[id]/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import SeatMap from '@/components/SeatMap';
import { apiFetch } from '@/lib/apiClient';
import { Seat, ShowTime } from '@/lib/types';
import { div } from 'motion/react-m';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ShowtimePage({ params }: PageProps) {
  const { id } = use(params);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [show, setShow] = useState<ShowTime>();
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Added loading state for better UX
    setLoading(true);
    apiFetch(`/api/showtimes/${id}/seats`, {
      method: 'GET',
    })
      .then((data) => {
        setSeats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load seats", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true)
    apiFetch(`/api/show-times/${id}`, {
      method: 'GET',
    })
      .then((data) => {
        setShow(data);
        setLoading(false);
      }).catch((err) => {
        console.error("Failed to load show", err);
        setLoading(false);
      });
  }, [id])


  function toggleSeat(seatId: number) {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((x) => x !== seatId)
        : [...prev, seatId]
    );
  }

  async function book() {
    if (selected.length === 0) return;

    try {
      await apiFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          show_id: id,
          seat_ids: selected,
        }),
      });
      alert('Reservation successful!');
      // Ideally redirect to a success page or clear selection here
      setSelected([]);
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  }

  return (
    // Dark Theme Container
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">

      {/* Header */}
      <header className="py-2 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-light tracking-wide">Select Seats for {show?.movie.title}{`'s`} {show?.day.toUpperCase()} Show</h1>
          <p className="text-gray-400 text-[12px]"><span className='text-red-700 tracking-widest border-r border-gray-600 pr-1 font-semibold'>{show?.hall.type}</span><span className='pl-1'>{show?.startTime} {'-'} {show?.endTime}</span></p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-5 px-2 overflow-y-auto">
        {loading ? (
          <div className="text-center text-gray-500 mt-20 animate-pulse">Loading theater map...</div>
        ) : (
          seats.length !== 0 ? (<SeatMap seats={seats} selected={selected} toggle={toggleSeat} movie={show ? show?.movie.title : ''} />) : (<div className='text-center text-gray-500 mt-20 animate-pulse'>No Show Available</div>)
        )}
      </main>

      {/* Bottom Sticky Booking Bar */}
      <div className="bg-gray-800 border-t border-white/10 p-4 sticky bottom-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Selection Summary */}
          <div>
            <p className="text-sm text-gray-400">
              {selected.length} {selected.length === 1 ? 'seat' : 'seats'} selected
            </p>
            <p className="text-xl font-semibold">
              {/* Mock Price Calculation - Assuming $12 per ticket */}
              ${selected.length * 12}.00
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={book}
            disabled={selected.length === 0}
            className={`
                    px-8 py-3 rounded-lg font-medium transition-all
                    ${selected.length > 0
                ? 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'}
                `}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}