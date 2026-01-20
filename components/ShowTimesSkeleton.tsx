'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowTimesSkeleton() {
    return (
        <div className="space-y-8">
            {/* Date Filter Tabs Skeleton */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 px-2 border-b border-gray-200 scrollbar-hide">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="min-w-[80px] h-[84px] rounded-xl shrink-0 bg-gray-200" />
                ))}
            </div>

            {/* Movies Grid Skeleton */}
            <div className="grid grid-cols-1 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        {/* Movie Info Section */}
                        <div className="md:w-1/4 space-y-4">
                            <Skeleton className="h-8 w-3/4 bg-gray-200" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded bg-gray-200" />
                                <Skeleton className="h-6 w-24 rounded bg-gray-200" />
                            </div>
                            <div className="space-y-2 pt-1">
                                <Skeleton className="h-4 w-full bg-gray-200" />
                                <Skeleton className="h-4 w-5/6 bg-gray-200" />
                                <Skeleton className="h-4 w-4/6 bg-gray-200" />
                            </div>
                        </div>

                        {/* Showtimes Section */}
                        <div className="md:w-3/4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 space-y-6">
                            {/* Fake Hall Group 1 */}
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-32 bg-gray-200" />
                                <div className="flex flex-wrap gap-3 ">
                                    {[1, 2, 3, 4].map((j) => (
                                        <Skeleton key={j} className="w-28 h-[60px] rounded-lg bg-gray-200" />
                                    ))}
                                </div>
                            </div>
                            {/* Fake Hall Group 2 */}
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-40 bg-gray-200" />
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2].map((j) => (
                                        <Skeleton key={j} className="w-28 h-[60px] rounded-lg bg-gray-200" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
