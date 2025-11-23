export default function BackgroundPattern({ fadeOut }) {
    return (
        <div
            className={`absolute inset-0 transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-20 w-36 h-36 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
    );
}