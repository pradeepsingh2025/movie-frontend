"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";
import { Movie } from "@/lib/types";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[60rem] rounded-md flex flex-col antialiased bg-slate-950 dark:bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={movies}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    releaseYear: 2010,
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform inception—implanting an idea into a target's subconscious.",
    duration: "PT2H28M",
    rating: 8.8,
    genre: "Science Fiction",
    posterImage:
      "https://images.unsplash.com/photo-1502136969935-8d07106eb41a?w=400&h=600&fit=crop",
    trailerURL: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    genres: [],
    showTimes: [],
  },
  {
    id: 2,
    title: "The Dark Knight",
    releaseYear: 2008,
    description:
      "Batman faces his greatest psychological and physical challenge yet when the Joker unleashes chaos on Gotham City.",
    duration: "PT2H32M",
    rating: 9.0,
    genre: "Action",
    posterImage:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    trailerURL: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    genres: [],
    showTimes: [],
  },
  {
    id: 3,
    title: "Interstellar",
    releaseYear: 2014,
    description:
      "A group of astronauts travels through a wormhole in search of a new home for humanity as Earth becomes uninhabitable.",
    duration: "PT2H49M",
    rating: 8.6,
    genre: "Adventure",
    posterImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    trailerURL: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    genres: [],
    showTimes: [],
  },
  {
    id: 4,
    title: "The Matrix",
    releaseYear: 1999,
    description:
      "A hacker discovers the reality he lives in is a simulated world and joins a rebellion against its controllers.",
    duration: "PT2H16M",
    rating: 8.7,
    genre: "Science Fiction",
    posterImage:
      "https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?w=400&h=600&fit=crop",
    trailerURL: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    genres: [],
    showTimes: [],
  },
  {
    id: 5,
    title: "Gladiator",
    releaseYear: 2000,
    description:
      "A betrayed Roman general rises as a gladiator to seek vengeance against the corrupt emperor who murdered his family.",
    duration: "PT2H35M",
    rating: 8.5,
    genre: "Drama",
    posterImage:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
    trailerURL: "https://www.youtube.com/watch?v=owK1qxDselE",
    genres: [],
    showTimes: [],
  },
];

