'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { Reservation } from '@/lib/types';

export default function MyReservations() {
  const [data, setData] = useState<Reservation[]>([]);

  useEffect(() => {
    apiFetch('/api/reservations/my-reservations')
      .then(setData);
  }, []);

  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">My Reservations</h1>
      {data.map(r => (
        <div key={r.id} className="border p-2 mt-2">
          Reservation #{r.id}
        </div>
      ))}
    </div>
  );
}
