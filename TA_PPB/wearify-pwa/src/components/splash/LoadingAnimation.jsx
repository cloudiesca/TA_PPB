export default function LoadingAnimation({ fadeIn, progress }) {
    return (
        <div
            className={`w-full max-w-xs transition-all duration-1000 delay-500 ${!fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
        >
            {/* Progress bar */}
            <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
            </div>

            {/* Progress text */}
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 font-medium">
                    Loading... {progress}%
                </p>
            </div>
        </div>
    );
}