export default function TitleSection({ fadeIn }) {
    return (
        <div
            className={`text-center mb-8 transition-all duration-1000 delay-300 ${!fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
        >
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
                WEARIFY
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
                Modern Fashion Store
            </p>
            <p className="text-sm text-slate-500 mt-2">
                Discover Your Style
            </p>
        </div>
    );
}