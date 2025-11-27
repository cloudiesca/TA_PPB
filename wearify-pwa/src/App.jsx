// import { useState } from 'react';
// import { useCart } from './hooks/useCart';

// // Pages
// import SplashScreen from './pages/SplashScreen';
// import HomePage from './pages/HomePage';
// import MenPage from './pages/MenPage';
// import WomenPage from './pages/WomenPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import ProfilePage from './pages/ProfilePage';

// // Components
// import DesktopNavbar from './components/navbar/DesktopNavbar';
// import MobileNavbar from './components/navbar/MobileNavbar';

// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const { itemCount } = useCart();

//   const handleSplashComplete = () => {
//     setShowSplash(false);
//   };

//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//     setSelectedProductId(null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleProductClick = (productId) => {
//     setSelectedProductId(productId);
//     setCurrentPage('product-detail');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleBack = () => {
//     setSelectedProductId(null);
//     setCurrentPage('home');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleBackToCart = () => {
//     setCurrentPage('cart');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleCheckout = () => {
//     setCurrentPage('checkout');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleOrderSuccess = () => {
//     setCurrentPage('home');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Show splash screen
//   if (showSplash) {
//     return <SplashScreen onComplete={handleSplashComplete} />;
//   }

//   // Render current page
//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return (
//           <HomePage
//             onNavigate={handleNavigation}
//             onProductClick={handleProductClick}
//           />
//         );

//       case 'men':
//         return <MenPage onProductClick={handleProductClick} />;

//       case 'women':
//         return <WomenPage onProductClick={handleProductClick} />;

//       case 'product-detail':
//         return (
//           <ProductDetailPage
//             productId={selectedProductId}
//             onBack={handleBack}
//           />
//         );

//       case 'cart':
//         return (
//           <CartPage
//             onBack={handleBack}
//             onCheckout={handleCheckout}
//           />
//         );

//       case 'checkout':
//         return (
//           <CheckoutPage
//             onBack={handleBackToCart}
//             onSuccess={handleOrderSuccess}
//           />
//         );

//       case 'profile':
//         return <ProfilePage />;

//       default:
//         return (
//           <HomePage
//             onNavigate={handleNavigation}
//             onProductClick={handleProductClick}
//           />
//         );
//     }
//   };

//   // Show navbar only for main pages (not for product detail, cart, checkout)
//   const showNavbar = !['product-detail', 'cart', 'checkout'].includes(currentPage);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Desktop Navbar */}
//       {showNavbar && (
//         <DesktopNavbar
//           currentPage={currentPage}
//           onNavigate={handleNavigation}
//           cartItemCount={itemCount}
//         />
//       )}

//       {/* Main Content */}
//       <main className="min-h-screen">
//         {renderPage()}
//       </main>

//       {/* Mobile Navbar */}
//       {showNavbar && (
//         <MobileNavbar
//           currentPage={currentPage}
//           onNavigate={handleNavigation}
//           cartItemCount={itemCount}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.jsx - FIXED VERSION
import { useState } from 'react';
import { useEffect } from "react";
import { useCart } from './hooks/useCart';

// Pages
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

// Components
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { itemCount } = useCart();

  useEffect(() => {
    const updateNavHeight = () => {
      const desktop = document.getElementById("desktop-nav");
      const mobile = document.getElementById("mobile-nav");

      const height = desktop?.offsetHeight || mobile?.offsetHeight || 0;

      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);


  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedProductId(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCart = () => {
    setCurrentPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigation}
            onProductClick={handleProductClick}
          />
        );

      case 'men':
        return <MenPage onProductClick={handleProductClick} />;

      case 'women':
        return <WomenPage onProductClick={handleProductClick} />;

      case 'product-detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={handleBack}
          />
        );

      case 'cart':
        return (
          <CartPage
            onBack={handleBack}
            onCheckout={handleCheckout}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage
            onBack={handleBackToCart}
            onSuccess={handleOrderSuccess}
          />
        );

      case 'profile':
        // FIXED: Pass onNavigate prop to ProfilePage
        return <ProfilePage onNavigate={handleNavigation} />;

      default:
        return (
          <HomePage
            onNavigate={handleNavigation}
            onProductClick={handleProductClick}
          />
        );
    }
  };

  // Show navbar only for main pages (not for product detail, cart, checkout)
  const showNavbar = !['product-detail', 'cart', 'checkout'].includes(currentPage);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Navbar */}
      {showNavbar && (
        <DesktopNavbar
          currentPage={currentPage}
          onNavigate={handleNavigation}
          cartItemCount={itemCount}
        />
      )}

      {/* Main Content */}
      <main className="mt-[var(--nav-height)] mb-[70px] md:mb-0">
        {renderPage()}
      </main>


      {/* Mobile Navbar */}
      {showNavbar && (
        <MobileNavbar
          currentPage={currentPage}
          onNavigate={handleNavigation}
          cartItemCount={itemCount}
        />
      )}


    </div>
  );
}

export default App;