import { ShoppingBag, Shirt, Watch } from 'lucide-react';

export default function FloatingElements({ fadeOut }) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Floating icons */}
            <div className="absolute top-1/4 left-1/4 animate-bounce-slow">
                <ShoppingBag className="w-8 h-8 text-blue-400 opacity-30" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <Shirt className="w-10 h-10 text-purple-400 opacity-30" />
            </div>
            <div className="absolute bottom-1/3 left-1/3 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <Watch className="w-9 h-9 text-pink-400 opacity-30" />
            </div>
        </div>
    );
}