import { Skeleton } from "@/components/ui/skeleton";
import ShowTimesSkeleton from "@/components/ShowTimesSkeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-10 w-64 bg-gray-200" />
                    <Skeleton className="h-5 w-96 bg-gray-200" />
                </div>

                <ShowTimesSkeleton />
            </div>
        </div>
    );
}
