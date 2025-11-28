export default function Footer({ fadeOut, fadeIn }) {
    return (
        <div
            className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1000 delay-700 ${!fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                } ${fadeOut ? 'opacity-0' : ''}`}
        >
            <p className="text-xs sm:text-sm text-slate-500">
                © 2025 Wearify. All rights reserved.
            </p>
        </div>
    );
}