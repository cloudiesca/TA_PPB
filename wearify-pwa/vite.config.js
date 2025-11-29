// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'logo.png', 'logo192.png', 'logo512.png'],

//       manifest: {
//         name: 'Wearify Fashion Store',
//         short_name: 'Wearify',
//         description: 'Fashion Store untuk Pria dan Wanita - Belanja online dengan mudah',
//         theme_color: '#0284c7',
//         background_color: '#ffffff',
//         display: 'standalone',
//         scope: '/',
//         start_url: '/',
//         orientation: 'portrait-primary',
//         icons: [
//           {
//             src: '/logo192.png',
//             sizes: '192x192',
//             type: 'image/png',
//             purpose: 'any'
//           },
//           {
//             src: '/logo192.png',
//             sizes: '192x192',
//             type: 'image/png',
//             purpose: 'maskable'
//           },
//           {
//             src: '/logo512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any'
//           },
//           {
//             src: '/logo512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'maskable'
//           }
//         ]
//       },

//       workbox: {
//         // Cache all static assets
//         globPatterns: [
//           '**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ico,woff,woff2,ttf,eot}'
//         ],

//         // Clean old caches
//         cleanupOutdatedCaches: true,
//         clientsClaim: true,
//         skipWaiting: true,

//         // Runtime caching strategies
//         runtimeCaching: [
//           // Supabase API
//           {
//             urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'supabase-api-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60 * 24 // 24 hours
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               },
//               networkTimeoutSeconds: 10
//             }
//           },

//           // Unsplash Images
//           {
//             urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'unsplash-images',
//               expiration: {
//                 maxEntries: 100,
//                 maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },

//           // Other images
//           {
//             urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'images-cache',
//               expiration: {
//                 maxEntries: 200,
//                 maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
//               }
//             }
//           },

//           // Fonts
//           {
//             urlPattern: /\.(?:woff|woff2|ttf|eot|otf)$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'fonts-cache',
//               expiration: {
//                 maxEntries: 20,
//                 maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
//               }
//             }
//           },

//           // API calls (general)
//           {
//             urlPattern: /^https:\/\/.*\/api\/.*/i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'api-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 5 // 5 minutes
//               },
//               networkTimeoutSeconds: 10
//             }
//           }
//         ],

//         // Navigation fallback
//         navigateFallback: '/index.html',
//         navigateFallbackDenylist: [/^\/api/]
//       },

//       devOptions: {
//         enabled: false, // Set true to test PWA in dev mode
//         type: 'module',
//         navigateFallback: 'index.html'
//       }
//     })
//   ],

//   // Build optimizations
//   build: {
//     target: 'es2015',
//     minify: 'terser',
//     cssMinify: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//           icons: ['lucide-react']
//         }
//       }
//     },
//     terserOptions: {
//       compress: {
//         drop_console: true, // Remove console.log in production
//         drop_debugger: true
//       }
//     }
//   },

//   // Server config for development
//   server: {
//     port: 5173,
//     strictPort: false,
//     host: true, // Listen on all addresses
//     open: true
//   },

//   // Preview config
//   preview: {
//     port: 4173,
//     strictPort: false,
//     host: true,
//     open: true
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/', // TAMBAHKAN INI - PENTING!

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'logo.png', 'logo192.png', 'logo512.png'],

      manifest: {
        name: 'Wearify Fashion Store',
        short_name: 'Wearify',
        description: 'Fashion Store untuk Pria dan Wanita',
        theme_color: '#0284c7',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400
              }
            }
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 2592000
              }
            }
          }
        ]
      },

      devOptions: {
        enabled: false
      }
    })
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },

  server: {
    port: 5173,
    host: true,
    open: true
  }
})