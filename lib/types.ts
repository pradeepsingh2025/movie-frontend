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
  releaseYear: number;
  description: string;
  duration: string; // e.g. "PT2H15M" or number of minutes
  rating: number;
  posterImage: string;
  trailerURL: string,
  genre: string,
  genres: Genre[],
  showTimes: ShowTime[];
}

export type ShowStatus = 'SCHEDULED' | 'CANCELLED' | 'FINISHED' | 'FILLING' | 'FULL';


export interface ShowTime {
  id: number;
  slot_id: number;
  movie_id: number;
  startTime: string,
  endTime: string,
  showDate: string; // ISO date/time
  day: string,
  status: ShowStatus;
  movie: Movie;
  hall: Hall;
}

export interface Hall{
  id: number,
  capacity: number,
  type: string,
  name: string,
  code: string,
}

export type SeatStatus = 'Active' | 'Inactive' | 'Damaged';

export interface Seat {
  id: number;
  seat: string; // "A1"
  showId: number,
  hallId: number,
  status: SeatStatus;
}

export interface Reservation {
  id: number;
  user_id: number;
  show_id: number;
  seats?: Seat[];
  created_at?: string;
}