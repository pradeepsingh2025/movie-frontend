// components/SeatMap.tsx
'use client';

import { Seat } from '@/lib/types';
import { Armchair } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  selected: number[];
  toggle: (id: number) => void,
  movie: string;
}

export default function SeatMap({ seats, selected, toggle, movie }: SeatMapProps) {
  // 1. Group seats by Row (e.g., "A", "B", "C")
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.seat.charAt(0);
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    acc[row].sort((a, b) =>
      parseInt(a.seat.slice(1)) - parseInt(b.seat.slice(1))
    );
    return acc;
  }, {} as Record<string, Seat[]>);

  // 2. Create Pairs: [['A', 'B'], ['C', 'D'], ['E']]
  const allRows = Object.keys(seatsByRow).sort();
  const rowPairs: string[][] = [];

  for (let i = 0; i < allRows.length; i += 2) {
    if (i + 1 < allRows.length) {
      rowPairs.push([allRows[i], allRows[i + 1]]);
    } else {
      rowPairs.push([allRows[i]]);
    }
  }

  // Helper to render a single strip of seats
  const renderSeatStrip = (rowLabel: string) => (
    <div className="flex gap-1 md:gap-3 items-center">
  {seatsByRow[rowLabel].map((seat) => {
    const isSelected = selected.includes(seat.id);
    // Major Fix: Disable interaction if the seat is inactive, damaged, OR already booked
    const isUnavailable = seat.status === 'INACTIVE' || 
                         seat.status === 'DAMAGED' || 
                         seat.status === 'BOOKED';

    return (
      <button
        key={seat.id}
        disabled={isUnavailable}
        onClick={() => toggle(seat.id)}
        className={`
          group relative flex flex-col items-center justify-center 
          p-0.5 md:p-1 transition-all duration-200
          ${isUnavailable ? 'opacity-30 cursor-not-allowed' : 'hover:-translate-y-1 cursor-pointer'}
        `}
      >
        <Armchair
          className={`
            w-5 h-5 md:w-8 md:h-8
            transition-colors duration-300
            ${isSelected ? 'text-green-400 fill-green-400/20' : 'text-gray-500 hover:text-white'}
            ${isUnavailable ? 'text-gray-700' : ''}
          `}
          strokeWidth={1.5}
        />

        {/* Tooltip */}
        <span className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs bg-white text-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 font-bold shadow-lg">
          {seat.seat}
        </span>
      </button>
    );
  })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto overflow-x-clip my-5 flex flex-col items-center">

      {/* --- SCREEN VISUAL --- */}
      <div className="w-full mt-8 mb-5 md:mb-10 md:mt-16 px-4 perspective-[500px]">
        <div className="relative group">
          <div className="h-8 md:h-12 w-3/4 md:w-2/3 mx-auto bg-gradient-to-b from-black/70 to-transparent 
                    border-t border-black/60 rounded-[50%] blur-[1px]
                    transform rotate-x-[-20deg] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] 
                    cursor-pointer transition-all duration-300 hover:shadow-[0_-15px_40px_rgba(255,255,255,0.15)]"
          />

          {/* Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    group-hover:translate-y-0 translate-y-2
                    pointer-events-none z-50">
            <div className="relative">
              {/* Tooltip content */}
              <div className="bg-linear-to-br from-white/20 to-white/40 text-white text-xs md:text-sm
                        px-4 py-2.5 rounded-lg shadow-xl
                        border border-white/10
                        backdrop-blur-sm
                        whitespace-nowrap">
                <span className="font-medium tracking-widest">{movie} Playing</span>
              </div>

              {/* Tooltip arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full
                        w-0 h-0 
                        border-l-[6px] border-l-transparent
                        border-r-[6px] border-r-transparent
                        border-t-[6px] border-t-gray-800">
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-[8px] md:text-[10px] tracking-[0.5em] mt-2">SCREEN</div>
      </div>

      {/* --- SEAT LAYOUT --- */}
      <div className="w-full pt-10 overflow-x-auto pb-10  px-2 md:px-8 hide-scrollbar">
        <div className="min-w-max mx-auto flex flex-col gap-2 md:gap-3">

          {rowPairs.map((pair, index) => {
            const isPair = pair.length === 2;

            if (isPair) {
              // RENDER SIDE-BY-SIDE (Row A & Row B)
              const [leftRow, rightRow] = pair;
              return (
                <div key={index} className="flex justify-center gap-4 sm:gap-6 md:gap-12 items-center">

                  {/* Left Block (Row A) - Horizontal */}
                  <div>
                    {renderSeatStrip(leftRow)}
                  </div>

                  {/* Right Block (Row B) - Horizontal */}
                  <div>
                    {renderSeatStrip(rightRow)}
                  </div>

                </div>
              );
            } else {
              // RENDER CENTER (Odd last row, e.g. Row E)
              const [centerRow] = pair;
              return (
                <div key={index} className="flex justify-center mt-2 md:mt-4">
                  {renderSeatStrip(centerRow)}
                </div>
              );
            }
          })}

        </div>
      </div>

      {/* --- LEGEND --- */}
      <div className="flex gap-4 md:gap-8 text-lg md:text-[20px] my-10 md:mb-15 text-gray-400">
        <div className="flex items-center justify-cente gap-1.5">
          <Armchair className="w-4 h-4 md:w-6 md:h-6 text-gray-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center justify-cente gap-1.5">
          <Armchair className="w-4 h-4 md:w-6 md:h-6 text-green-400 fill-green-400/20" />
          <span>Selected</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Armchair className="w-4 h-4 md:w-6 md:h-6 text-gray-700 opacity-50" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}