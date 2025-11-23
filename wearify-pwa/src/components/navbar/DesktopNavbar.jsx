import { ShoppingCart, User, Home, Users } from 'lucide-react';
import Logo from '../common/Logo';

export default function DesktopNavbar({
    currentPage,
    onNavigate,
    cartItemCount = 0
}) {
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'men', label: "Men's Fashion", icon: Users },
        { id: 'women', label: "Women's Fashion", icon: Users },
        { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="hidden md:block bg-white shadow-md border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => onNavigate('home')}
                    >
                        <Logo size="sm" />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isActive
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>

                                    {/* Badge for cart */}
                                    {item.badge > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-badge">
                                            {item.badge > 99 ? '99+' : item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}