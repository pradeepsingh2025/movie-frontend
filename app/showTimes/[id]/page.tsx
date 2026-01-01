'use client';

import { useEffect, useState } from 'react';
import SeatMap from '@/components/SeatMap';
import { apiFetch } from '@/lib/apiClient';
import { Seat } from '@/lib/types';

export default function ShowtimePage({ params }: any) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    apiFetch(`/api/show-times/${params.id}/seats`)
      .then(setSeats);
  }, [params.id]);

  function toggleSeat(id: number) {
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );
  }

  async function book() {
    await apiFetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        show_id: params.id,
        seat_ids: selected,
      }),
    });
    alert('Reservation successful!');
  }

  return (
    <div className="p-8">
      <SeatMap seats={seats} selected={selected} toggle={toggleSeat} />

      <button
        onClick={book}
        className="mt-4 bg-black text-white p-2"
      >
        Confirm Booking
      </button>
    </div>
  );
}
