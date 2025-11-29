// // src/components/navbar/DesktopNavbar.jsx
// import { useEffect, useState } from "react";
// import { Home, ShoppingBag, User, ShoppingCart } from "lucide-react";
// import logo from "../../assets/logo.png";

// const DesktopNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   useEffect(() => {
//     const nav = document.getElementById("desktop-nav");
//     if (nav) {
//       document.documentElement.style.setProperty(
//         "--nav-height",
//         `${nav.offsetHeight}px`
//       );
//     }
//   }, []);

//   const navItems = [
//     { id: "home", label: "Home", icon: Home },
//     { id: "men", label: "Men's Fashion", icon: ShoppingBag },
//     { id: "women", label: "Women's Fashion", icon: ShoppingBag },
//     { id: "cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount },
//     { id: "profile", label: "Profile", icon: User },
//   ];

//   const getNavItemStyle = (isActive, isHovered) => {
//     if (isActive) {
//       return styles.navItemActive;
//     }
//     if (isHovered) {
//       return { ...styles.navItem, ...styles.navItemHover };
//     }
//     return styles.navItem;
//   };

//   return (
//     <nav id="desktop-nav" style={styles.navbar}>
//       <div style={styles.container}>
//         <div style={styles.content}>
//           {/* Logo */}
//           <button
//             onClick={() => onNavigate("home")}
//             style={styles.logoButton}
//             onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
//             onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//           >
//             <img src={logo} alt="Wearify Logo" style={styles.logoImage} />
//             <div>
//               <h1 style={styles.logoTitle}>WEARIFY</h1>
//               <p style={styles.logoSubtitle}>Fashion Store</p>
//             </div>
//           </button>

//           {/* Navigation Items */}
//           <div style={styles.navItemsContainer}>
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentPage === item.id;
//               const isHovered = hoveredItem === item.id;

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => onNavigate(item.id)}
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                   style={getNavItemStyle(isActive, isHovered)}
//                 >
//                   <Icon style={styles.navIcon} />
//                   <span>{item.label}</span>

//                   {/* Badge */}
//                   {item.badge > 0 && (
//                     <span style={styles.badge}>{item.badge}</span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // ============================================
// // STYLES - Semua styling dipisahkan di bawah
// // ============================================

// const styles = {
//   // Navbar Container
//   navbar: {
//     display: "none",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     borderBottom: "1px solid #e2e8f0",
//     zIndex: 50,
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//   },

//   // Container
//   container: {
//     maxWidth: "1280px",
//     margin: "0 auto",
//     padding: "0 2rem",
//   },

//   // Content
//   content: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     height: "5rem",
//   },

//   // Logo Button
//   logoButton: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.75rem",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//     transition: "opacity 0.3s",
//     padding: 0,
//   },
//   logoImage: {
//     width: "3rem",
//     height: "3rem",
//     objectFit: "contain",
//   },
//   logoTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "900",
//     color: "#0f172a",
//     margin: 0,
//     textAlign: "left",
//   },
//   logoSubtitle: {
//     fontSize: "0.75rem",
//     color: "#64748b",
//     fontWeight: "500",
//     margin: 0,
//     textAlign: "left",
//   },

//   // Navigation Items Container
//   navItemsContainer: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.75rem",
//   },

//   // Navigation Item (Default)
//   navItem: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//     padding: "0.75rem 1.25rem",
//     borderRadius: "0.75rem",
//     fontWeight: "600",
//     fontSize: "0.875rem",
//     transition: "all 0.3s",
//     color: "#334155",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//   },
//   navItemHover: {
//     backgroundColor: "#f1f5f9",
//   },

//   // Navigation Item (Active)
//   navItemActive: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//     padding: "0.75rem 1.25rem",
//     borderRadius: "0.75rem",
//     fontWeight: "600",
//     fontSize: "0.875rem",
//     backgroundColor: "#0284c7",
//     color: "white",
//     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     border: "none",
//     cursor: "pointer",
//     transition: "all 0.3s",
//   },

//   // Nav Icon
//   navIcon: {
//     width: "1.25rem",
//     height: "1.25rem",
//   },

//   // Badge
//   badge: {
//     position: "absolute",
//     top: "-0.25rem",
//     right: "-0.25rem",
//     width: "1.5rem",
//     height: "1.5rem",
//     backgroundColor: "#ef4444",
//     color: "white",
//     fontSize: "0.75rem",
//     fontWeight: "700",
//     borderRadius: "9999px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };

// // Inject CSS untuk responsive dan media queries
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   @media (min-width: 768px) {
//     #desktop-nav {
//       display: block !important;
//     }
//   }

//   @media (max-width: 767px) {
//     #desktop-nav {
//       display: none !important;
//     }
//   }
// `;
// document.head.appendChild(styleSheet);

// export default DesktopNavbar;


// src/components/navbar/DesktopNavbar.jsx - Responsive Version
import { useEffect, useState } from "react";
import { Home, ShoppingBag, User, ShoppingCart } from "lucide-react";
import logo from "../../assets/logo.png";

const DesktopNavbar = ({ currentPage, onNavigate, cartItemCount }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("desktop-nav");
    if (nav) {
      document.documentElement.style.setProperty(
        "--nav-height",
        `${nav.offsetHeight}px`
      );
    }

    // Handle scroll for navbar shadow
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "men", label: "Men's Fashion", icon: ShoppingBag },
    { id: "women", label: "Women's Fashion", icon: ShoppingBag },
    { id: "cart", label: "Cart", icon: ShoppingCart, badge: cartItemCount },
    { id: "profile", label: "Profile", icon: User },
  ];

  const getNavItemStyle = (isActive, isHovered) => {
    if (isActive) {
      return styles.navItemActive;
    }
    if (isHovered) {
      return { ...styles.navItem, ...styles.navItemHover };
    }
    return styles.navItem;
  };

  return (
    <nav
      id="desktop-nav"
      style={{
        ...styles.navbar,
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            style={styles.logoButton}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            aria-label="Wearify Home"
          >
            <img src={logo} alt="Wearify Logo" style={styles.logoImage} />
            <div>
              <h1 style={styles.logoTitle}>WEARIFY</h1>
              <p style={styles.logoSubtitle}>Fashion Store</p>
            </div>
          </button>

          {/* Navigation Items */}
          <div style={styles.navItemsContainer}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={getNavItemStyle(isActive, isHovered)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon style={styles.navIcon} aria-hidden="true" />
                  <span className="nav-label">{item.label}</span>

                  {/* Badge */}
                  {item.badge > 0 && (
                    <span style={styles.badge} aria-label={`${item.badge} items in cart`}>
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

// ============================================
// STYLES - Responsive Design
// ============================================

const styles = {
  // Navbar Container
  navbar: {
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    zIndex: 50,
    transition: 'all 0.3s ease',
  },

  // Container
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1rem",
  },

  // Content
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "4.5rem",
  },

  // Logo Button
  logoButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.3s",
    padding: 0,
  },
  logoImage: {
    width: "2.5rem",
    height: "2.5rem",
    objectFit: "contain",
  },
  logoTitle: {
    fontSize: "1.25rem",
    fontWeight: "900",
    color: "#0f172a",
    margin: 0,
    textAlign: "left",
  },
  logoSubtitle: {
    fontSize: "0.7rem",
    color: "#64748b",
    fontWeight: "500",
    margin: 0,
    textAlign: "left",
  },

  // Navigation Items Container
  navItemsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  // Navigation Item (Default)
  navItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: "600",
    fontSize: "0.875rem",
    transition: "all 0.3s",
    color: "#334155",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  navItemHover: {
    backgroundColor: "#f1f5f9",
  },

  // Navigation Item (Active)
  navItemActive: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: "600",
    fontSize: "0.875rem",
    backgroundColor: "#0284c7",
    color: "white",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
  },

  // Nav Icon
  navIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },

  // Badge
  badge: {
    position: "absolute",
    top: "-0.25rem",
    right: "-0.25rem",
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "700",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

// Inject CSS untuk responsive dan media queries
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Desktop Navbar - Show on tablet and above */
  @media (min-width: 768px) {
    #desktop-nav {
      display: block !important;
    }
    
    #desktop-nav .container {
      padding: 0 1.5rem;
    }
    
    #desktop-nav .content {
      height: 4.5rem;
    }
  }
  
  /* Hide on mobile */
  @media (max-width: 767px) {
    #desktop-nav {
      display: none !important;
    }
  }
  
  /* Large Tablet - Adjust spacing */
  @media (min-width: 768px) and (max-width: 1023px) {
    #desktop-nav .nav-label {
      display: none;
    }
    
    #desktop-nav button[aria-label] {
      padding: 0.75rem !important;
    }
    
    #desktop-nav .navItemsContainer {
      gap: 0.25rem;
    }
  }
  
  /* Desktop - Show full labels */
  @media (min-width: 1024px) {
    #desktop-nav .nav-label {
      display: inline;
    }
    
    #desktop-nav .container {
      padding: 0 2rem;
    }
    
    #desktop-nav .content {
      height: 5rem;
    }
  }
  
  /* Large Desktop */
  @media (min-width: 1280px) {
    #desktop-nav button[aria-label] {
      padding: 0.75rem 1.25rem !important;
    }
    
    #desktop-nav .navItemsContainer {
      gap: 0.75rem;
    }
  }
  
  /* Hover effects */
  #desktop-nav button:hover {
    transform: translateY(-1px);
  }
  
  #desktop-nav button:active {
    transform: translateY(0);
  }
  
  /* Safe area for notch devices */
  @supports (padding: max(0px)) {
    #desktop-nav {
      padding-left: max(0px, env(safe-area-inset-left));
      padding-right: max(0px, env(safe-area-inset-right));
    }
  }
`;
document.head.appendChild(styleSheet);

export default DesktopNavbar;