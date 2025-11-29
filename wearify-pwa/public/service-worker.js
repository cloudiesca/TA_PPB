const CACHE_STATIC = "wearify-static-v2"; // Ubah versi
const CACHE_IMAGES = "wearify-images-v2";
const CACHE_API = "wearify-api-v2";

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
];

// Install SW
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    // ✅ Jangan pakai self.skipWaiting() di sini
});

// Activate — delete old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => ![CACHE_STATIC, CACHE_IMAGES, CACHE_API].includes(k))
                    .map((k) => caches.delete(k))
            )
        )
    );

    // ❌ HAPUS BARIS INI → Ini penyebab loop!
    // self.clients.claim();
});

// FETCH HANDLER
self.addEventListener("fetch", (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // HTML → network-first dengan proper error handling
    if (req.destination === "document") {
        event.respondWith(
            fetch(req)
                .then(res => {
                    // Hanya cache response yang valid
                    if (res.ok) {
                        const clone = res.clone();
                        caches.open(CACHE_STATIC).then(c => c.put(req, clone));
                    }
                    return res;
                })
                .catch(() => caches.match(req).then(cached =>
                    cached || caches.match("/index.html")
                ))
        );
        return;
    }

    // JS/CSS → cache-first
    if (req.destination === "script" || req.destination === "style") {
        event.respondWith(
            caches.match(req).then((cached) =>
                cached ||
                fetch(req).then((res) => {
                    if (res.ok) {
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
                    if (res.ok) {
                        const clone = res.clone();
                        caches.open(CACHE_IMAGES).then((c) => c.put(req, clone));
                    }
                    return res;
                })
            )
        );
        return;
    }

    // Supabase API → network-first dengan timeout
    if (url.hostname.includes("supabase")) {
        event.respondWith(
            Promise.race([
                fetch(req).then(res => {
                    if (res.ok) {
                        caches.open(CACHE_API).then(c => c.put(req, res.clone()));
                    }
                    return res;
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('timeout')), 5000)
                )
            ]).catch(() => caches.match(req))
        );
        return;
    }

    // Default → network fallback to cache
    event.respondWith(
        fetch(req).catch(() => caches.match(req))
    );
});