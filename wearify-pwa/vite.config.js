// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'
// // import { VitePWA } from 'vite-plugin-pwa'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [
// //     react(),
// //     VitePWA({
// //       registerType: 'prompt',
// //       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],

// //       manifest: {
// //         name: 'Wearify - Fashion Store',
// //         short_name: 'Wearify',
// //         description: 'Fashion Store untuk Pria dan Wanita. Belanja fashion online dengan mudah dan aman.',
// //         theme_color: '#0284c7',
// //         background_color: '#ffffff',
// //         display: 'standalone',
// //         orientation: 'portrait',
// //         scope: '/',
// //         start_url: '/',
// //         icons: [
// //           {
// //             src: 'pwa-64x64.png',
// //             sizes: '64x64',
// //             type: 'image/png'
// //           },
// //           {
// //             src: 'pwa-192x192.png',
// //             sizes: '192x192',
// //             type: 'image/png',
// //             purpose: 'any'
// //           },
// //           {
// //             src: 'pwa-512x512.png',
// //             sizes: '512x512',
// //             type: 'image/png',
// //             purpose: 'any'
// //           },
// //           {
// //             src: 'maskable-icon-512x512.png',
// //             sizes: '512x512',
// //             type: 'image/png',
// //             purpose: 'maskable'
// //           }
// //         ],
// //         categories: ['shopping', 'lifestyle']
// //       },

// //       workbox: {
// //         globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'],

// //         runtimeCaching: [
// //           {
// //             urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
// //             handler: 'NetworkFirst',
// //             options: {
// //               cacheName: 'supabase-api-cache',
// //               expiration: {
// //                 maxEntries: 50,
// //                 maxAgeSeconds: 60 * 60 * 24,
// //               },
// //               cacheableResponse: {
// //                 statuses: [0, 200]
// //               },
// //               networkTimeoutSeconds: 10
// //             },
// //           },
// //           {
// //             urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
// //             handler: 'CacheFirst',
// //             options: {
// //               cacheName: 'unsplash-images-cache',
// //               expiration: {
// //                 maxEntries: 100,
// //                 maxAgeSeconds: 60 * 60 * 24 * 30,
// //               },
// //               cacheableResponse: {
// //                 statuses: [0, 200]
// //               }
// //             },
// //           },
// //           {
// //             urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
// //             handler: 'CacheFirst',
// //             options: {
// //               cacheName: 'google-fonts-cache',
// //               expiration: {
// //                 maxEntries: 10,
// //                 maxAgeSeconds: 60 * 60 * 24 * 365,
// //               },
// //               cacheableResponse: {
// //                 statuses: [0, 200]
// //               }
// //             },
// //           },
// //           {
// //             urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
// //             handler: 'CacheFirst',
// //             options: {
// //               cacheName: 'gstatic-fonts-cache',
// //               expiration: {
// //                 maxEntries: 10,
// //                 maxAgeSeconds: 60 * 60 * 24 * 365,
// //               },
// //               cacheableResponse: {
// //                 statuses: [0, 200]
// //               }
// //             },
// //           },
// //           {
// //             urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
// //             handler: 'CacheFirst',
// //             options: {
// //               cacheName: 'images-cache',
// //               expiration: {
// //                 maxEntries: 60,
// //                 maxAgeSeconds: 60 * 60 * 24 * 30,
// //               },
// //             },
// //           },
// //           {
// //             urlPattern: /\.(?:js|css)$/i,
// //             handler: 'StaleWhileRevalidate',
// //             options: {
// //               cacheName: 'static-resources',
// //               expiration: {
// //                 maxEntries: 60,
// //                 maxAgeSeconds: 60 * 60 * 24 * 7,
// //               },
// //             },
// //           },
// //         ],

// //         navigateFallback: null,
// //         cleanupOutdatedCaches: true,
// //       },

// //       devOptions: {
// //         enabled: true,
// //         type: 'module',
// //       },
// //     }),
// //   ],

// //   build: {
// //     sourcemap: false,
// //     rollupOptions: {
// //       output: {
// //         manualChunks(id) {
// //           // ✅ Dynamic chunking yang lebih aman
// //           if (id.includes('node_modules')) {
// //             if (id.includes('react') || id.includes('react-dom')) {
// //               return 'vendor-react'
// //             }
// //             if (id.includes('react-router')) {
// //               return 'vendor-router'
// //             }
// //             return 'vendor'
// //           }
// //         },
// //       },
// //     },
// //   },

// //   server: {
// //     port: 3000,
// //   },
// // })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       devOptions: {
//         enabled: true, // Enable PWA in development
//         type: 'module'
//       },
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
//       manifest: {
//         name: 'Wearify Fashion Store',
//         short_name: 'Wearify',
//         description: 'Fashion Store untuk Pria dan Wanita',
//         theme_color: '#0284c7',
//         background_color: '#ffffff',
//         display: 'standalone',
//         orientation: 'portrait',
//         scope: '/',
//         start_url: '/',
//         icons: [
//           {
//             src: '/pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//             purpose: 'any maskable'
//           },
//           {
//             src: '/pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'unsplash-images-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: /^https?:\/\/localhost:5000\/api\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'api-cache',
//               networkTimeoutSeconds: 10,
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 5 // 5 minutes
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: /^https:\/\/.*\.vercel\.app\/api\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'api-production-cache',
//               networkTimeoutSeconds: 10,
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 5 // 5 minutes
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'supabase-cache',
//               networkTimeoutSeconds: 10,
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 5
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           }
//         ]
//       }
//     })
//   ],
//   server: {
//     port: 3000,
//     host: true
//   },
//   preview: {
//     port: 4173
//   }
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Wearify Fashion Store',
        short_name: 'Wearify',
        description: 'Fashion Store untuk Pria dan Wanita',
        theme_color: '#0284c7',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          // Cache Unsplash Images
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Localhost API (Development)
          {
            urlPattern: ({ url }) => {
              return url.hostname === 'localhost' &&
                url.port === '5000' &&
                url.pathname.startsWith('/api/');
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-dev-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 10 // 10 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Production API (Vercel)
          {
            urlPattern: /^https:\/\/.*\.vercel\.app\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-production-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 10 // 10 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache Supabase
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 10
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173
  }
});