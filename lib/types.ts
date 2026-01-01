export type Role = 'user' | 'admin';

export interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  role: Role;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  releaseYear?: number;
  description?: string;
  duration?: string; // e.g. "PT2H15M" or number of minutes
  rating?: number;
  posterImage?: string;
  genres?: Genre[];
}

export type ShowStatus = 'SCHEDULED' | 'CANCELLED' | 'FINISHED';

export interface TimeSlot {
  id: number;
  name: string;
  start_time: string; // timestamp or ISO
  duration: string; // interval string or minutes
}

export interface ShowTime {
  id: number;
  slot_id: number;
  movie_id: number;
  show_date: string; // ISO date/time
  status: ShowStatus;
  movie?: Movie;
  slot?: TimeSlot;
}

export type SeatStatus = 'AVAILABLE'|'RESERVED'|'BROKEN';

export interface Seat {
  id: number;
  seat: string; // "A1"
  status: SeatStatus;
}

export interface Reservation {
  id: number;
  user_id: number;
  show_id: number;
  seats?: Seat[];
  created_at?: string;
}