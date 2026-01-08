export type Role = 'USER' | 'ADMIN';

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
  start_time: string; // time string in HH:MM:SS format (e.g., "09:00:00")
}

export interface DayTimeSlot {
  id: number;
  day: string;
  time_slot_id: number;
  timeSlot?: TimeSlot;
}


export interface ShowTime {
  id: number;
  slot_id: number;
  movie_id: number;
  showDate: string; // ISO date/time
  status: ShowStatus;
  movie?: Movie;
  timeSlot?: DayTimeSlot;
}

export type SeatStatus = 'Active' | 'Inactive' | 'Damaged';

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