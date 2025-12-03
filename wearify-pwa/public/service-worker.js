// // 

// // public/service-worker.js
// const CACHE_STATIC = "wearify-static-v3";
// const CACHE_IMAGES = "wearify-images-v3";
// const CACHE_API = "wearify-api-v3";

// const STATIC_ASSETS = [
//     "/",
//     "/index.html",
//     "/manifest.webmanifest",
//     "/offline.html"
// ];

// // Install SW
// self.addEventListener("install", (event) => {
//     console.log('🔧 Service Worker installing...');
//     event.waitUntil(
//         caches.open(CACHE_STATIC)
//             .then((cache) => {
//                 console.log('✅ Cache opened');
//                 return cache.addAll(STATIC_ASSETS).catch(err => {
//                     console.warn('⚠️ Some assets failed to cache:', err);
//                 });
//             })
//     );
//     // Aktifkan SW baru tanpa menunggu
//     self.skipWaiting();
// });

// // Activate — delete old caches
// self.addEventListener("activate", (event) => {
//     console.log('🔄 Service Worker activating...');
//     event.waitUntil(
//         caches.keys().then((keys) =>
//             Promise.all(
//                 keys
//                     .filter((k) => ![CACHE_STATIC, CACHE_IMAGES, CACHE_API].includes(k))
//                     .map((k) => {
//                         console.log('🗑️ Deleting old cache:', k);
//                         return caches.delete(k);
//                     })
//             )
//         )
//     );
//     // PENTING: Jangan pakai clients.claim() untuk menghindari reload loop
//     return self.clients.claim();
// });

// // FETCH HANDLER
// self.addEventListener("fetch", (event) => {
//     const req = event.request;
//     const url = new URL(req.url);

//     // Skip non-GET requests
//     if (req.method !== 'GET') {
//         return;
//     }

//     // HTML → network-first
//     if (req.destination === "document") {
//         event.respondWith(
//             fetch(req)
//                 .then(res => {
//                     if (res.ok && res.status === 200) {
//                         const clone = res.clone();
//                         caches.open(CACHE_STATIC).then(c => c.put(req, clone));
//                     }
//                     return res;
//                 })
//                 .catch(() =>
//                     caches.match(req).then(cached =>
//                         cached || caches.match("/offline.html")
//                     )
//                 )
//         );
//         return;
//     }

//     // JS/CSS → cache-first
//     if (req.destination === "script" || req.destination === "style") {
//         event.respondWith(
//             caches.match(req).then((cached) =>
//                 cached ||
//                 fetch(req).then((res) => {
//                     if (res.ok && res.status === 200) {
//                         const clone = res.clone();
//                         caches.open(CACHE_STATIC).then((c) => c.put(req, clone));
//                     }
//                     return res;
//                 })
//             )
//         );
//         return;
//     }

//     // IMAGES → cache-first
//     if (req.destination === "image") {
//         event.respondWith(
//             caches.match(req).then((cached) =>
//                 cached ||
//                 fetch(req).then((res) => {
//                     if (res.ok && res.status === 200) {
//                         const clone = res.clone();
//                         caches.open(CACHE_IMAGES).then((c) => c.put(req, clone));
//                     }
//                     return res;
//                 }).catch(() => {
//                     // Return placeholder or cached version
//                     return cached || new Response('', { status: 404 });
//                 })
//             )
//         );
//         return;
//     }

//     // External API (Vercel, Supabase) → network-first dengan timeout
//     if (url.hostname.includes("vercel.app") || url.hostname.includes("supabase")) {
//         event.respondWith(
//             Promise.race([
//                 fetch(req).then(res => {
//                     if (res.ok && res.status === 200) {
//                         const clone = res.clone();
//                         caches.open(CACHE_API).then(c => c.put(req, clone));
//                     }
//                     return res;
//                 }),
//                 new Promise((_, reject) =>
//                     setTimeout(() => reject(new Error('API timeout')), 8000)
//                 )
//             ]).catch(() => {
//                 console.log('📦 Using cached API response for:', url.pathname);
//                 return caches.match(req);
//             })
//         );
//         return;
//     }

//     // Default → network with cache fallback
//     event.respondWith(
//         fetch(req).catch(() => caches.match(req))
//     );
// });

// public/service-worker.js
const CACHE_VERSION = 'v4';
const CACHE_STATIC = `wearify-static-${CACHE_VERSION}`;
const CACHE_IMAGES = `wearify-images-${CACHE_VERSION}`;
const CACHE_API = `wearify-api-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/offline.html"
];

// Install SW
self.addEventListener("install", (event) => {
    console.log('🔧 Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then((cache) => {
                console.log('✅ Cache opened');
                return cache.addAll(STATIC_ASSETS).catch(err => {
                    console.warn('⚠️ Some assets failed to cache:', err);
                });
            })
    );
    // Aktifkan SW baru tanpa menunggu
    self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener("activate", (event) => {
    console.log('🔄 Service Worker activating...');
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => ![CACHE_STATIC, CACHE_IMAGES, CACHE_API].includes(k))
                    .map((k) => {
                        console.log('🗑️ Deleting old cache:', k);
                        return caches.delete(k);
                    })
            )
        )
    );
    // PENTING: Jangan pakai clients.claim() untuk menghindari reload loop
    return self.clients.claim();
});

// FETCH HANDLER
self.addEventListener("fetch", (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Skip non-GET requests
    if (req.method !== 'GET') {
        return;
    }

    // HTML → network-first
    if (req.destination === "document") {
        event.respondWith(
            fetch(req)
                .then(res => {
                    if (res.ok && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_STATIC).then(c => c.put(req, clone));
                    }
                    return res;
                })
                .catch(() =>
                    caches.match(req).then(cached =>
                        cached || caches.match("/offline.html")
                    )
                )
        );
        return;
    }

    // JS/CSS → cache-first
    if (req.destination === "script" || req.destination === "style") {
        event.respondWith(
            caches.match(req).then((cached) =>
                cached ||
                fetch(req).then((res) => {
                    if (res.ok && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_STATIC).then((c) => c.put(req, clone));
                    }
                    return res;
                })
            )
        );
        return;
    }

    // IMAGES → cache-first
    if (req.destination === "image") {
        event.respondWith(
            caches.match(req).then((cached) =>
                cached ||
                fetch(req).then((res) => {
                    if (res.ok && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_IMAGES).then((c) => c.put(req, clone));
                    }
                    return res;
                }).catch(() => {
                    // Return placeholder or cached version
                    return cached || new Response('', { status: 404 });
                })
            )
        );
        return;
    }

    // External API (Vercel, Supabase) → network-first dengan timeout
    if (url.hostname.includes("vercel.app") || url.hostname.includes("supabase")) {
        event.respondWith(
            Promise.race([
                fetch(req).then(res => {
                    if (res.ok && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_API).then(c => c.put(req, clone));
                    }
                    return res;
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('API timeout')), 8000)
                )
            ]).catch(() => {
                console.log('📦 Using cached API response for:', url.pathname);
                return caches.match(req);
            })
        );
        return;
    }

    // Default → network with cache fallback
    event.respondWith(
        fetch(req).catch(() => caches.match(req))
    );
});