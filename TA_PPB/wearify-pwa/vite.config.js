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
//       includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       injectRegister: false,
//       pwaAssets: {
//         disabled: false,
//         config: true,
//       },
//       manifest: {
//         name: 'Wearify - Fashion Store',
//         short_name: 'Wearify',
//         description: 'Modern fashion store for men and women',
//         theme_color: '#2563eb',
//         background_color: '#ffffff',
//         display: 'standalone',
//         scope: '/',
//         start_url: '/',
//         orientation: 'portrait',
//         icons: [
//           {
//             src: '/pwa-64x64.png',
//             sizes: '64x64',
//             type: 'image/png'
//           },
//           {
//             src: '/pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: '/pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any'
//           },
//           {
//             src: '/maskable-icon-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'maskable'
//           }
//         ]
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg}'],
//         cleanupOutdatedCaches: true,
//         clientsClaim: true,
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/api\./i,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'api-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60 * 24, // 24 hours
//               },
//               cacheableResponse: {
//                 statuses: [0, 200],
//               },
//             },
//           },
//           {
//             urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'images-cache',
//               expiration: {
//                 maxEntries: 100,
//                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
//               },
//             },
//           },
//         ],
//       },
//       devOptions: {
//         enabled: false,
//         navigateFallback: 'index.html',
//         suppressWarnings: true,
//         type: 'module',
//       },
//     })
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'logo.png'],
      manifest: {
        name: 'Wearify - Fashion Store',
        short_name: 'Wearify',
        description: 'Modern fashion store for men and women',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/svsqfoyntbomowcetkhg\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
})