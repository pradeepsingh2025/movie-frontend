'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
            {/* Header Skeleton */}
            <header className="py-2 px-4 border-b border-white/10">
                <div className="max-w-4xl mx-auto space-y-2">
                    <Skeleton className="h-7 w-3/4 bg-neutral-800" />
                    <Skeleton className="h-4 w-1/2 bg-neutral-800" />
                </div>
            </header>

            {/* Main Content Area (Seat Map Skeleton) */}
            <main className="flex-1 py-5 px-2 overflow-y-auto flex items-center justify-center">
                <div className="w-full max-w-4xl space-y-8">
                    {/* Screen */}
                    <div className="w-3/4 mx-auto h-2 bg-neutral-800 rounded-full mb-12 shadow-[0_10px_30px_rgba(255,255,255,0.05)]" />

                    {/* Seeds Grid Simulation */}
                    <div className="flex flex-col gap-3 items-center opacity-50">
                        {Array.from({ length: 8 }).map((_, r) => (
                            <div key={r} className="flex gap-2">
                                {Array.from({ length: 12 }).map((_, c) => (
                                    <Skeleton key={`${r}-${c}`} className="w-8 h-8 rounded-t-lg bg-neutral-800" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
