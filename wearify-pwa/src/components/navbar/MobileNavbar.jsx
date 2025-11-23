import { Home, Users, ShoppingCart, User } from 'lucide-react';

export default function MobileNavbar({
    currentPage,
    onNavigate,
    cartItemCount = 0
}) {
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'men', label: 'Men', icon: Users },
        { id: 'women', label: 'Women', icon: Users },
        { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50 shadow-lg">
            <div className="flex items-center justify-around max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`relative flex flex-col items-center py-2 px-3 transition-all duration-200 rounded-lg ${isActive ? 'text-primary-600' : 'text-slate-400'
                                }`}
                        >
                            <Icon
                                className="w-6 h-6 mb-1"
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-xs font-medium">{item.label}</span>

                            {/* Badge for cart */}
                            {item.badge > 0 && (
                                <span className="absolute top-0 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-badge">
                                    {item.badge > 99 ? '99+' : item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}