export default function LoadingSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
            {/* Image Skeleton */}
            <div className="h-64 bg-slate-200"></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between">
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="flex justify-between items-end">
                    <div className="h-6 bg-slate-200 rounded w-24"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
}