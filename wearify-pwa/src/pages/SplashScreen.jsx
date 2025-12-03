// // // import { useState, useEffect } from 'react';
// // // import BackgroundPattern from '../components/splash/BackgroundPattern';
// // // import FloatingElements from '../components/splash/FloatingElements';
// // // import LogoContainer from '../components/splash/LogoContainer';
// // // import TitleSection from '../components/splash/TitleSection';
// // // import LoadingAnimation from '../components/splash/LoadingAnimation';
// // // import Footer from '../components/splash/Footer';

// // // export default function SplashScreen({ onComplete }) {
// // //     const [progress, setProgress] = useState(0);
// // //     const [isVisible, setIsVisible] = useState(true);
// // //     const [fadeIn, setFadeIn] = useState(false);
// // //     const [fadeOut, setFadeOut] = useState(false);

// // //     useEffect(() => {
// // //         // Fade in animation
// // //         setTimeout(() => {
// // //             setFadeIn(true);
// // //         }, 100);

// // //         // Progress bar animation
// // //         const interval = setInterval(() => {
// // //             setProgress((prev) => {
// // //                 if (prev >= 100) {
// // //                     clearInterval(interval);
// // //                     // Start fade out
// // //                     setTimeout(() => {
// // //                         setFadeOut(true);
// // //                         setTimeout(() => {
// // //                             setIsVisible(false);
// // //                             setTimeout(() => {
// // //                                 if (typeof onComplete === 'function') onComplete();
// // //                             }, 100);
// // //                         }, 600);
// // //                     }, 800);
// // //                     return 100;
// // //                 }
// // //                 const nextProgress = prev + 6;
// // //                 return nextProgress > 100 ? 100 : nextProgress;
// // //             });
// // //         }, 120);

// // //         return () => clearInterval(interval);
// // //     }, [onComplete]);

// // //     if (!isVisible) return null;

// // //     return (
// // //         <div
// // //             className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 transition-all duration-600 ease-out ${!fadeIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
// // //                 } ${fadeOut ? 'opacity-0 scale-105' : ''}`}
// // //         >
// // //             <BackgroundPattern fadeOut={fadeOut} />
// // //             <FloatingElements fadeOut={fadeOut} />

// // //             <div
// // //                 className={`relative z-10 flex flex-col items-center justify-center max-w-xs sm:max-w-lg w-full transition-all duration-800 ${!fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
// // //                     } ${fadeOut ? 'opacity-0 -translate-y-8' : ''}`}
// // //             >
// // //                 <LogoContainer />
// // //                 <TitleSection fadeIn={fadeIn} />
// // //                 <LoadingAnimation fadeIn={fadeIn} progress={progress} />
// // //             </div>

// // //             <Footer fadeOut={fadeOut} fadeIn={fadeIn} />
// // //         </div>
// // //     );
// // // }

// import { useState, useEffect, useRef } from 'react';
// import BackgroundPattern from '../components/splash/BackgroundPattern';
// import FloatingElements from '../components/splash/FloatingElements';
// import LogoContainer from '../components/splash/LogoContainer';
// import TitleSection from '../components/splash/TitleSection';
// import LoadingAnimation from '../components/splash/LoadingAnimation';
// import Footer from '../components/splash/Footer';

// export default function SplashScreen({ onComplete }) {
//     const [progress, setProgress] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);
//     const [fadeIn, setFadeIn] = useState(false);
//     const [fadeOut, setFadeOut] = useState(false);

//     // ✅ Use refs to track timers and prevent memory leaks
//     const timersRef = useRef([]);
//     const hasCompletedRef = useRef(false);

//     // ✅ Cleanup function
//     const clearAllTimers = () => {
//         timersRef.current.forEach(timer => clearTimeout(timer));
//         timersRef.current = [];
//     };

//     // ✅ Safe complete handler
//     const handleComplete = () => {
//         if (hasCompletedRef.current) return;
//         hasCompletedRef.current = true;

//         clearAllTimers();
//         if (typeof onComplete === 'function') {
//             onComplete();
//         }
//     };

//     useEffect(() => {
//         // Fade in animation
//         const fadeInTimer = setTimeout(() => {
//             setFadeIn(true);
//         }, 100);
//         timersRef.current.push(fadeInTimer);

//         // Progress bar animation
//         const progressInterval = setInterval(() => {
//             setProgress((prev) => {
//                 const increment = 8; // ✅ Lebih cepat dan smooth
//                 const nextProgress = prev + increment;

//                 // ✅ Cap at 100
//                 if (nextProgress >= 100) {
//                     clearInterval(progressInterval);

//                     // ✅ Simplified fade out sequence
//                     const fadeOutTimer = setTimeout(() => {
//                         setFadeOut(true);
//                     }, 500);
//                     timersRef.current.push(fadeOutTimer);

//                     const hideTimer = setTimeout(() => {
//                         setIsVisible(false);
//                     }, 1100); // 500ms + 600ms fade out
//                     timersRef.current.push(hideTimer);

//                     const completeTimer = setTimeout(() => {
//                         handleComplete();
//                     }, 1200);
//                     timersRef.current.push(completeTimer);

//                     return 100;
//                 }

//                 return nextProgress;
//             });
//         }, 100); // ✅ Faster interval

//         // ✅ Safety timeout - force complete after 5 seconds
//         const safetyTimer = setTimeout(() => {
//             if (!hasCompletedRef.current) {
//                 console.warn('Splash screen safety timeout triggered');
//                 setProgress(100);
//                 setFadeOut(true);

//                 setTimeout(() => {
//                     setIsVisible(false);
//                     handleComplete();
//                 }, 600);
//             }
//         }, 5000);
//         timersRef.current.push(safetyTimer);

//         // ✅ Cleanup on unmount
//         return () => {
//             clearAllTimers();
//             clearInterval(progressInterval);
//         };
//     }, []); // ✅ Remove onComplete from deps to prevent re-runs

//     if (!isVisible) return null;

//     return (
//         <div
//             className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 transition-all duration-600 ease-out ${!fadeIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
//                 } ${fadeOut ? 'opacity-0 scale-105' : ''}`}
//         >
//             <BackgroundPattern fadeOut={fadeOut} />
//             <FloatingElements fadeOut={fadeOut} />

//             <div
//                 className={`relative z-10 flex flex-col items-center justify-center max-w-xs sm:max-w-lg w-full transition-all duration-800 ${!fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
//                     } ${fadeOut ? 'opacity-0 -translate-y-8' : ''}`}
//             >
//                 <LogoContainer />
//                 <TitleSection fadeIn={fadeIn} />
//                 <LoadingAnimation fadeIn={fadeIn} progress={progress} />
//             </div>

//             <Footer fadeOut={fadeOut} fadeIn={fadeIn} />
//         </div>
//     );
// }

import { useState, useEffect, useRef } from 'react';
import logoImage from '../assets/logo.png';

export default function SplashScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const intervalRef = useRef(null);
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current);

                    setTimeout(() => setFadeOut(true), 200);
                    setTimeout(() => setIsVisible(false), 700);
                    setTimeout(() => {
                        if (!hasCompletedRef.current) {
                            hasCompletedRef.current = true;
                            if (onComplete) onComplete();
                        }
                    }, 800);

                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            style={{
                ...styles.container,
                opacity: fadeOut ? 0 : 1,
            }}
        >
            {/* Decorative Background */}
            <div style={styles.decorativeBlob1} />
            <div style={styles.decorativeBlob2} />
            <div style={styles.decorativeBlob3} />

            {/* Main Content */}
            <div style={styles.content}>
                {/* Logo */}
                <div style={styles.logoContainer}>
                    <div style={styles.logoGlow} />
                    <div style={styles.logoBox}>
                        <img src={logoImage} alt="Wearify Logo" style={styles.logo} />
                    </div>
                </div>

                {/* Brand Text */}
                <div style={styles.textContainer}>
                    <h1 style={styles.title}>Wearify</h1>
                    <p style={styles.subtitle}>Fashion Store</p>

                    <div style={styles.divider} />

                    <p style={styles.description}>Discover Your Style</p>
                </div>

                {/* Progress */}
                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <div
                            style={{
                                ...styles.progressFill,
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div style={styles.progressText}>
                        <span style={styles.progressLabel}>Menyiapkan...</span>
                        <span style={styles.progressPercent}>{progress}%</span>
                    </div>
                </div>

                {/* Loading dots */}
                {progress < 100 && (
                    <div style={styles.dotsContainer}>
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.dot,
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <div style={styles.footerDivider} />
                <p style={styles.footerText}>Versi 1.0 · © 2025 Wearify</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #eef2ff 0%, #f8f5ff 50%, #ffffff 100%)',
        transition: 'opacity 0.6s ease',
        overflow: 'hidden',
    },

    /* Soft-blur blobs */
    decorativeBlob1: {
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '420px',
        height: '420px',
        background: 'rgba(147, 197, 253, 0.5)',
        filter: 'blur(120px)',
        borderRadius: '50%',
    },
    decorativeBlob2: {
        position: 'absolute',
        bottom: '-15%',
        right: '-5%',
        width: '380px',
        height: '380px',
        background: 'rgba(216, 180, 254, 0.45)',
        filter: 'blur(120px)',
        borderRadius: '50%',
    },
    decorativeBlob3: {
        position: 'absolute',
        top: '40%',
        right: '20%',
        width: '260px',
        height: '260px',
        background: 'rgba(165, 243, 252, 0.4)',
        filter: 'blur(100px)',
        borderRadius: '50%',
    },

    content: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '28rem',
    },

    logoContainer: {
        position: 'relative',
        marginBottom: '2rem',
    },

    /* Stronger glow */
    logoGlow: {
        position: 'absolute',
        inset: '-1.5rem',
        background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
        borderRadius: '50%',
        filter: 'blur(2.4rem)',
        opacity: 0.25,
    },

    /* Glassmorphism box */
    logoBox: {
        backdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.65)',
        borderRadius: '1.5rem',
        padding: '1.6rem',
        boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
    },

    logo: {
        width: '7rem',
        height: '7rem',
        objectFit: 'contain',
    },

    textContainer: {
        textAlign: 'center',
        marginBottom: '3rem',
    },

    title: {
        fontSize: '3rem',
        fontWeight: 800,
        color: '#1e293b',
        letterSpacing: '-0.02em',
        margin: 0,
        marginBottom: '0.7rem',
    },

    subtitle: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#6366f1',
        margin: 0,
        marginBottom: '0.6rem',
    },

    divider: {
        width: '60px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
        margin: '0.8rem auto',
        borderRadius: 9999,
    },

    description: {
        fontSize: '0.9rem',
        color: '#64748b',
        margin: 0,
        opacity: 0.9,
    },

    progressContainer: {
        width: '100%',
        maxWidth: '22rem',
    },

    /* Thicker, glossy progress bar */
    progressBar: {
        height: '0.55rem',
        background: 'rgba(226, 232, 240, 0.8)',
        borderRadius: '9999px',
        overflow: 'hidden',
        marginBottom: '0.75rem',
        backdropFilter: 'blur(4px)',
    },

    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
        borderRadius: '9999px',
        transition: 'width 0.35s ease',
    },

    progressText: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.9rem',
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
    },

    progressLabel: {
        color: '#64748b',
    },

    progressPercent: {
        color: '#4f46e5',
        fontWeight: 700,
    },

    dotsContainer: {
        display: 'flex',
        gap: '0.4rem',
        marginTop: '1.4rem',
    },

    dot: {
        width: '0.55rem',
        height: '0.55rem',
        borderRadius: '50%',
        backgroundColor: '#818cf8',
        animation: 'dotBounce 1s infinite ease-in-out',
    },

    footer: {
        position: 'absolute',
        bottom: '1.4rem',
        width: '100%',
        textAlign: 'center',
    },

    footerDivider: {
        width: '3.2rem',
        height: '1.2px',
        backgroundColor: '#cbd5e1',
        margin: '0 auto 0.4rem',
        borderRadius: 9999,
    },

    footerText: {
        fontSize: '0.75rem',
        color: '#94a3b8',
        margin: 0,
        opacity: 0.9,
    },
};

/* animation */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes dotBounce {
        0%, 100% { transform: translateY(0); opacity: 0.7; }
        50% { transform: translateY(-6px); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);
