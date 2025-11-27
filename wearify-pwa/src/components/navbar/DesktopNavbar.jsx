// // import { ShoppingCart, User, Home, Users } from 'lucide-react';
// // import Logo from '../common/Logo';

// // export default function DesktopNavbar({
// //     currentPage,
// //     onNavigate,
// //     cartItemCount = 0
// // }) {
// //     const navItems = [
// //         { id: 'home', label: 'Home', icon: Home },
// //         { id: 'men', label: "Men's Fashion", icon: Users },
// //         { id: 'women', label: "Women's Fashion", icon: Users },
// //         { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
// //         { id: 'profile', label: 'Profile', icon: User },
// //     ];

// //     return (
// //         <nav className="hidden md:block bg-white shadow-md border-b border-slate-200 sticky top-0 z-40">
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                 <div className="flex justify-between items-center h-16">
// //                     {/* Logo */}
// //                     <div
// //                         className="flex-shrink-0 cursor-pointer"
// //                         onClick={() => onNavigate('home')}
// //                     >
// //                         <Logo size="sm" />
// //                     </div>

// //                     {/* Navigation Links */}
// //                     <div className="flex items-center space-x-8">
// //                         {navItems.map((item) => {
// //                             const Icon = item.icon;
// //                             const isActive = currentPage === item.id;

// //                             return (
// //                                 <button
// //                                     key={item.id}
// //                                     onClick={() => onNavigate(item.id)}
// //                                     className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isActive
// //                                             ? 'text-primary-600 bg-primary-50'
// //                                             : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
// //                                         }`}
// //                                 >
// //                                     <Icon className="w-5 h-5" />
// //                                     <span>{item.label}</span>

// //                                     {/* Badge for cart */}
// //                                     {item.badge > 0 && (
// //                                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-badge">
// //                                             {item.badge > 99 ? '99+' : item.badge}
// //                                         </span>
// //                                     )}
// //                                 </button>
// //                             );
// //                         })}
// //                     </div>
// //                 </div>
// //             </div>
// //         </nav>
// //     );
// // }

// // src/components/navbar/DesktopNavbar.jsx - FIXED
// import { Home, ShoppingBag, User, ShoppingCart } from 'lucide-react';
// import Logo from '../common/Logo';

// const DesktopNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
//     const navItems = [
//         { id: 'home', label: 'Home', icon: Home },
//         { id: 'men', label: "Men's Fashion", icon: ShoppingBag },
//         { id: 'women', label: "Women's Fashion", icon: ShoppingBag },
//         { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
//         { id: 'profile', label: 'Profile', icon: User }
//     ];

//     return (
//         <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
//             <div className="max-w-7xl mx-auto px-8">
//                 <div className="flex items-center justify-between h-20">
//                     {/* Logo
//                     <button
//                         onClick={() => onNavigate('home')}
//                         className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//                     >
//                         <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center">
//                             <span className="text-white font-black text-xl">W</span>
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-black text-slate-900">WEARIFY</h1>
//                             <p className="text-xs text-slate-500 font-medium">Fashion Store</p>
//                         </div>
//                     </button> */}

//                     {/* Navigation */}
//                     <div className="flex items-center gap-3">
//                         {navItems.map((item) => {
//                             const Icon = item.icon;
//                             const isActive = currentPage === item.id;

//                             return (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => onNavigate(item.id)}
//                                     className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${isActive
//                                         ? 'bg-sky-600 text-white shadow-lg'
//                                         : 'text-slate-700 hover:bg-slate-100'
//                                         }`}
//                                 >
//                                     <Icon className="w-5 h-5" />
//                                     <span>{item.label}</span>

//                                     {/* Badge for Cart */}
//                                     {item.badge > 0 && (
//                                         <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                                             {item.badge}
//                                         </span>
//                                     )}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default DesktopNavbar;

// // src/components/navbar/DesktopNavbar.jsx - WITH LOGO IMPORT
// import { Home, ShoppingBag, User, ShoppingCart } from 'lucide-react';
// import logo from '../../assets/logo.png'; // IMPORT LOGO

// const DesktopNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
//     const navItems = [
//         { id: 'home', label: 'Home', icon: Home },
//         { id: 'men', label: "Men's Fashion", icon: ShoppingBag },
//         { id: 'women', label: "Women's Fashion", icon: ShoppingBag },
//         { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
//         { id: 'profile', label: 'Profile', icon: User }
//     ];

//     return (
//         <nav id="desktop-nav" className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
//             <div className="max-w-7xl mx-auto px-8">
//                 <div className="flex items-center justify-between h-20">
//                     {/* Logo */}
//                     <button
//                         onClick={() => onNavigate('home')}
//                         className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//                     >
//                         {/* Logo Image */}
//                         <img
//                             src={logo}
//                             alt="Wearify Logo"
//                             className="w-12 h-12 object-contain"
//                         />

//                         {/* Text */}
//                         <div>
//                             <h1 className="text-2xl font-black text-slate-900">WEARIFY</h1>
//                             <p className="text-xs text-slate-500 font-medium">Fashion Store</p>
//                         </div>
//                     </button>

//                     {/* Navigation */}
//                     <div className="flex items-center gap-3">
//                         {navItems.map((item) => {
//                             const Icon = item.icon;
//                             const isActive = currentPage === item.id;

//                             return (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => onNavigate(item.id)}
//                                     className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${isActive
//                                         ? 'bg-sky-600 text-white shadow-lg'
//                                         : 'text-slate-700 hover:bg-slate-100'
//                                         }`}
//                                 >
//                                     <Icon className="w-5 h-5" />
//                                     <span>{item.label}</span>

//                                     {/* Badge for Cart */}
//                                     {item.badge > 0 && (
//                                         <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                                             {item.badge}
//                                         </span>
//                                     )}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default DesktopNavbar;

// src/components/navbar/DesktopNavbar.jsx
import { useEffect } from "react";
import { Home, ShoppingBag, User, ShoppingCart } from 'lucide-react';
import logo from '../../assets/logo.png';

const DesktopNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
    useEffect(() => {
        const nav = document.getElementById("desktop-nav");
        if (nav) {
            document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
        }
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'men', label: "Men's Fashion", icon: ShoppingBag },
        { id: 'women', label: "Women's Fashion", icon: ShoppingBag },
        { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
        <nav id="desktop-nav" className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-20">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <img src={logo} alt="Wearify Logo" className="w-12 h-12 object-contain" />
                        <div>
                            <h1 className="text-2xl font-black text-slate-900">WEARIFY</h1>
                            <p className="text-xs text-slate-500 font-medium">Fashion Store</p>
                        </div>
                    </button>

                    <div className="flex items-center gap-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all 
                                    ${isActive ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>

                                    {item.badge > 0 && (
                                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {item.badge}
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
};

export default DesktopNavbar;
