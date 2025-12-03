// // src/components/navbar/MobileNavbar.jsx
// import { useEffect } from 'react';
// import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

// const MobileNavbar = ({ currentPage, onNavigate, cartItemCount }) => {

//     useEffect(() => {
//         const nav = document.getElementById("mobile-nav");
//         if (nav) {
//             document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
//         }
//     }, []);

//     const navItems = [
//         { id: 'home', label: 'Home', icon: Home },
//         { id: 'men', label: 'Men', icon: ShoppingBag },
//         { id: 'women', label: 'Women', icon: ShoppingBag },
//         { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
//         { id: 'profile', label: 'Profile', icon: User }
//     ];

//     return (
//         <nav
//             id="mobile-nav"
//             className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50"
//         >
//             <div className="grid grid-cols-5 gap-1 px-2 py-3">
//                 {navItems.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = currentPage === item.id;

//                     return (
//                         <button
//                             key={item.id}
//                             onClick={() => onNavigate(item.id)}
//                             className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-all
//                             ${isActive ? 'text-sky-600 font-bold' : 'text-slate-600'}
//                             `}
//                         >
//                             <Icon className="w-6 h-6" />
//                             <span className="text-xs font-semibold">{item.label}</span>

//                             {item.badge > 0 && (
//                                 <span className="absolute top-1 right-3 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
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
        <nav id="mobile-nav" style={styles.navbar}>
            <div style={styles.container}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            style={{
                                ...styles.navItem,
                                ...(isActive ? styles.navItemActive : {})
                            }}
                        >
                            <Icon style={styles.icon} />
                            <span style={styles.label}>{item.label}</span>

                            {item.badge > 0 && (
                                <span style={styles.badge}>{item.badge}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

// ============================================
// STYLES
// ============================================

const styles = {
    navbar: {
        display: 'block',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e2e8f0',
        zIndex: 50,
        boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.25rem',
        padding: '0.75rem 0.5rem',
    },
    navItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.5rem',
        borderRadius: '0.75rem',
        transition: 'all 0.3s',
        color: '#64748b',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    navItemActive: {
        color: '#0284c7',
        fontWeight: '700',
    },
    icon: {
        width: '1.5rem',
        height: '1.5rem',
    },
    label: {
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    badge: {
        position: 'absolute',
        top: '0.25rem',
        right: '0.75rem',
        width: '1.25rem',
        height: '1.25rem',
        backgroundColor: '#ef4444',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '700',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

// Inject CSS untuk responsive
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Show on mobile only */
  @media (min-width: 768px) {
    #mobile-nav {
      display: none !important;
    }
  }
  
  /* Show on mobile and small tablets */
  @media (max-width: 767px) {
    #mobile-nav {
      display: block !important;
    }
  }
  
  /* Safe area for iPhone notch/home indicator */
  @supports (padding: max(0px)) {
    #mobile-nav {
      padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
    }
  }
`;
document.head.appendChild(styleSheet);

export default MobileNavbar;