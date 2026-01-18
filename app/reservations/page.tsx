'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { Reservation } from '@/lib/types';
import { apiFetch } from '@/lib/apiClient'; // Assuming you have this

// Helper to format "PT3H" or "PT2H30M"
function formatDuration(pt: string) {
  const hours = pt.match(/(\d+)H/)?.[1];
  const minutes = pt.match(/(\d+)M/)?.[1];
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  if (minutes) return `${minutes}m`;
  return pt;
}

// Helper to format Date "2026-02-01" -> "Sun, Feb 1"
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Helper to format Time "08:40:00" -> "8:40 AM"
function formatTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    apiFetch('/api/reservations/my-reservations') 
      .then(setReservations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white/50">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <header className="mb-8">
          <h1 className="text-3xl font-light tracking-wide">My Tickets</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your bookings</p>
        </header>

        {reservations.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Ticket className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No active reservations found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((res, idx) => (
              <TicketCard key={idx} reservation={res} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function TicketCard({ reservation }: { reservation: Reservation }) {
  const { show_time, reservation_seats } = reservation;
  const { movie, hall } = show_time;
  
  const totalPrice = show_time.price * reservation_seats.length;

  return (
    <div className="relative group bg-neutral-800 rounded-2xl overflow-hidden border-x-0 border-white/5 shadow-2xl hover:border-white/20 transition-all duration-300">
      
      <div className="flex flex-col sm:flex-row">
        
        {/* LEFT: Poster Image */}
        <div className="relative w-full sm:w-32 h-48 sm:h-auto shrink-0">
          <Image 
            src={movie.posterImage} 
            alt={movie.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-neutral-800" />
        </div>

        {/* RIGHT: Content Details */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          
          {/* Header: Title & Rating */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 leading-tight">{movie.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">
                  {movie.genres?.[0]?.name  || 'Movie'}{'/'}{movie.genres?.[1]?.name}
                </span>
                <span>•</span>
                <span>{formatDuration(movie.duration)}</span>
              </div>
            </div>
            <div className="text-yellow-500 font-bold text-lg">
              ★ {movie.rating}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{formatDate(show_time.showDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{formatTime(show_time.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{hall.name} - {hall.code}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Ticket className="w-4 h-4 text-gray-500" />
              <span>{reservation_seats.length} Tickets</span>
            </div>
          </div>

          {/* Footer: Seats & Total */}
          <div className="pt-4 border-t border-white/10 flex items-end justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Seats</p>
              <div className="flex flex-wrap gap-1">
                {reservation_seats.map(seat => (
                  <span key={seat.id} className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-xs font-mono font-medium">
                    {seat.seat}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Paid</p>
              <p className="text-xl font-semibold text-white">₹{totalPrice}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative "Tear" Lines (Optional - makes it look like a ticket) */}
      <div className="absolute top-1/2 -left-2 w-5 h-5 bg-neutral-900 rounded-full sm:block hidden" />
      <div className="absolute top-1/2 -right-2 w-5 h-5 bg-neutral-900 rounded-full sm:block hidden" />
    </div>
  );
}