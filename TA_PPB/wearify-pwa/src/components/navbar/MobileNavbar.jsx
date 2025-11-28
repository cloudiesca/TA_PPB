// // src/components/navbar/MobileNavbar.jsx - FIXED
// import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

// const MobileNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
//     const navItems = [
//         { id: 'home', label: 'Home', icon: Home },
//         { id: 'men', label: 'Men', icon: ShoppingBag },
//         { id: 'women', label: 'Women', icon: ShoppingBag },
//         { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
//         { id: 'profile', label: 'Profile', icon: User }
//     ];

//     return (
//         <nav id="desktop-nav" className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
//             <div className="grid grid-cols-5 gap-1 px-2 py-3">
//                 {navItems.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = currentPage === item.id;

//                     return (
//                         <button
//                             key={item.id}
//                             onClick={() => onNavigate(item.id)}
//                             className={`relative flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${isActive
//                                 ? 'bg-sky-600 text-white'
//                                 : 'text-slate-600 hover:bg-slate-100'
//                                 }`}
//                         >
//                             <Icon className="w-6 h-6" />
//                             <span className="text-xs font-bold">{item.label}</span>

//                             {/* Badge for Cart */}
//                             {item.badge > 0 && (
//                                 <span className="absolute top-1 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                                     {item.badge}
//                                 </span>
//                             )}
//                         </button>
//                     );
//                 })}
//             </div>
//         </nav>
//     );
// };

// export default MobileNavbar;

// src/components/navbar/MobileNavbar.jsx
import { useEffect } from 'react';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

const MobileNavbar = ({ currentPage, onNavigate, cartItemCount }) => {

    useEffect(() => {
        const nav = document.getElementById("mobile-nav");
        if (nav) {
            document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
        }
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'men', label: 'Men', icon: ShoppingBag },
        { id: 'women', label: 'Women', icon: ShoppingBag },
        { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
        <nav
            id="mobile-nav"
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50"
        >
            <div className="grid grid-cols-5 gap-1 px-2 py-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-all
                            ${isActive ? 'text-sky-600 font-bold' : 'text-slate-600'}
                            `}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-semibold">{item.label}</span>

                            {item.badge > 0 && (
                                <span className="absolute top-1 right-3 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileNavbar;
