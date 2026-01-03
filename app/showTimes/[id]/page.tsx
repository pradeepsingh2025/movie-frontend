'use client';

import { use, useEffect, useState } from 'react';
import SeatMap from '@/components/SeatMap';
import { apiFetch } from '@/lib/apiClient';
import { Seat } from '@/lib/types';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ShowtimePage({ params }: PageProps) {
  const { id } = use(params);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    apiFetch(`/api/seats?show_id=${id}`)
      .then(setSeats);
  }, [id]);

  function toggleSeat(id: number) {
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );
  }

  async function book() {
    await apiFetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        show_id: id,
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
