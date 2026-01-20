'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesSkeleton() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950">
            {/* Full Page Background Gradient Effect (Matching page.tsx) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10 p-8 mt-10">
                <div className="max-w-7xl mx-auto">
                    {/* Title and Subtitle Skeleton */}
                    <div className="mb-8 space-y-4">
                        <Skeleton className="h-12 w-64 bg-slate-800" />
                        <Skeleton className="h-6 w-96 bg-slate-800/50" />
                    </div>

                    {/* Movies Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden"
                            >
                                {/* Poster Aspect Ratio 4/3 */}
                                <div className="relative aspect-4/3 bg-slate-800/50">
                                    <Skeleton className="w-full h-full bg-slate-800" />
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Title */}
                                    <Skeleton className="h-8 w-3/4 bg-slate-800" />

                                    {/* Meta (Year, Genres, Duration) */}
                                    <div className="flex gap-2">
                                        <Skeleton className="h-4 w-12 bg-slate-800" />
                                        <Skeleton className="h-4 w-24 bg-slate-800" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full bg-slate-800" />
                                        <Skeleton className="h-4 w-2/3 bg-slate-800" />
                                    </div>

                                    {/* Footer (Button and Rating) */}
                                    <div className="flex items-center justify-between pt-2">
                                        <Skeleton className="h-8 w-20 rounded-full bg-slate-700" />
                                        <Skeleton className="h-6 w-12 bg-slate-800" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
