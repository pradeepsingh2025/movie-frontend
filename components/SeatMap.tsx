'use client';

import { Seat } from '@/lib/types';

export default function SeatMap({
  seats,
  selected,
  toggle
}: {
  seats: Seat[];
  selected: number[];
  toggle: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {seats.map(seat => (
        <button
          key={seat.id}
          disabled={seat.status === 'RESERVED'}
          onClick={() => toggle(seat.id)}
          className={`p-2 border
            ${seat.status === 'RESERVED' ? 'bg-gray-400' : ''}
            ${selected.includes(seat.id) ? 'bg-green-500' : ''}
          `}
        >
          {seat.seat}
        </button>
      ))}
    </div>
  );
}
