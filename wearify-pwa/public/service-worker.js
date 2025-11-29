// public/service-worker.js
const CACHE_NAME = 'wearify-v1';
const API_CACHE = 'wearify-api-v1';

// Assets yang akan di-cache saat install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/pwa-192x192.png.png',
    '/pwa-512x512.png.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME && cache !== API_CACHE) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests (Supabase)
    if (url.hostname.includes('supabase')) {
        event.respondWith(
            caches.open(API_CACHE).then((cache) => {
                return fetch(request)
                    .then((response) => {
                        // Cache successful API responses
                        if (response.status === 200) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    })
                    .catch(() => {
                        // Return cached response if offline
                        return cache.match(request).then((cached) => {
                            return cached || new Response(
                                JSON.stringify({
                                    error: 'Offline',
                                    message: 'Data tidak tersedia offline'
                                }),
                                {
                                    status: 503,
                                    headers: { 'Content-Type': 'application/json' }
                                }
                            );
                        });
                    });
            })
        );
        return;
    }

    // Handle image requests
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then((cached) => {
                return cached || fetch(request).then((response) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, response.clone());
                        return response;
                    });
                }).catch(() => {
                    // Return placeholder image if offline
                    return new Response(
                        '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect fill="#f0f0f0" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Image Not Available</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                });
            })
        );
        return;
    }

    // Handle other requests (cache-first strategy)
    event.respondWith(
        caches.match(request).then((cached) => {
            return cached || fetch(request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, response.clone());
                    return response;
                });
            });
        })
    );
});