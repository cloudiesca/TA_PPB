import { AlertCircle } from 'lucide-react';

export default function ErrorState({
    error,
    onRetry
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-red-100 rounded-full p-6 mb-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-600 text-center max-w-md mb-6">
                {error || 'Failed to load data. Please try again.'}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}