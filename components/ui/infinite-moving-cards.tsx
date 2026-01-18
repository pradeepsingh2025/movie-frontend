// components/ui/infinite-moving-cards.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { Star, Clock, Play } from "lucide-react";
import Image from "next/image";

// Helper to format minutes into "2h 32m"
const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m > 0 ? ` ${m}m` : ""}`;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Movie[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        // Added a subtle mask for a fade-out effect at the edges
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item.id}
            // --- MAIN CARD CONTAINER ---
            // Fixed width, dark background, rounded corners, border
            className="group relative w-[300px] shrink-0 rounded-xl border border-gray-800 bg-[#0f172a] overflow-hidden transition-transform hover:scale-[1.02]"
          >
            {/* --- POSTER IMAGE & RATING --- */}
            <div className="relative h-[200px] w-full">
              <img
                src={item.posterImage}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              {/* Add a subtle gradient overlay to make text pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-sm font-bold text-yellow-400 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-5">
              {/* Title and Year */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-bold text-white line-clamp-1" title={item.title}>
                  {item.title}
                </h3>
                <span className="shrink-0 rounded-md border border-gray-700 px-2 py-0.5 text-xs font-medium text-gray-400">
                  {item.releaseYear}
                </span>
              </div>

              {/* Duration and Genre */}
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(Number(item.duration))}</span>
                </div>
                <span className="text-gray-600">|</span>
                <span className="truncate">{item.genre}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {/* Primary Action: Book Tickets */}
                <button className="w-full rounded-lg bg-[#d90416] py-3 font-bold text-white transition-colors hover:bg-[#bb0313]">
                  Book Tickets
                </button>

                {/* Secondary Action: Watch Trailer */}
                <a
                  href={item.trailerURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-transparent py-3 font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch Trailer
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};