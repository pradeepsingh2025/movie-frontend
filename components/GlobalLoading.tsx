'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-40 px-6 py-4 bg-gray-950 backdrop-blur-md border-b border-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-32" />
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-9 w-20 rounded-lg" />
                        <Skeleton className="h-9 w-24 rounded-lg bg-red-900/20" />
                    </div>
                    <Skeleton className="md:hidden h-6 w-6" />
                </div>
            </header>

            <main className="min-h-screen">
                <section className="container mx-auto px-4 py-6 md:py-10">
                    {/* Hero Skeleton */}
                    <div className="max-w-7xl mx-auto mb-12 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
                        <div className="px-6 py-12 md:px-10 md:py-20">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="flex-1 w-full space-y-6">
                                    <Skeleton className="h-6 w-24 bg-red-900/20" />
                                    <Skeleton className="h-12 md:h-16 w-3/4" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <Skeleton className="h-12 w-36 rounded-full bg-red-900/20" />
                                        <Skeleton className="h-12 w-36 rounded-full" />
                                    </div>
                                </div>
                                <div className="w-64 md:w-80 lg:w-96 shrink-0">
                                    <Skeleton className="w-full aspect-4/3 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Skeleton */}
                    <div className="max-w-7xl mx-auto mb-8">
                        <Skeleton className="h-8 w-48 mb-6 border-l-4 border-red-600 pl-4 bg-transparent" />
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-800">
                            <Skeleton className="h-10 w-full md:w-1/3 rounded-lg" />
                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
                                <Skeleton className="h-9 w-16 rounded-full" />
                                <Skeleton className="h-9 w-20 rounded-full" />
                                <Skeleton className="h-9 w-24 rounded-full" />
                                <Skeleton className="h-9 w-16 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Movie Grid Skeleton */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
                                <Skeleton className="h-[200px] w-full" />
                                <div className="p-5 flex flex-col grow space-y-4">
                                    <div className="flex justify-between items-start">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-5 w-10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="mt-auto pt-4 space-y-3">
                                        <Skeleton className="h-10 w-full rounded-lg bg-red-900/20" />
                                        <Skeleton className="h-10 w-full rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
