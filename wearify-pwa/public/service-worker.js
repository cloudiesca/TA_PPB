const CACHE_STATIC = "wearify-static-v1";
const CACHE_IMAGES = "wearify-images-v1";
const CACHE_API = "wearify-api-v1";

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
];

// Install SW — cache static files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    // ❗ JANGAN pakai skipWaiting agar tidak loop
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

    // Klaim SW baru setelah reload manual
    self.clients.claim();
});

// FETCH HANDLER
self.addEventListener("fetch", (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // HTML → network-first
    if (req.destination === "document") {
        event.respondWith(
            fetch(req).catch(() => caches.match("/index.html"))
        );
        return;
    }

    // JS/CSS → cache-first with fallback
    if (req.destination === "script" || req.destination === "style") {
        event.respondWith(
            caches.match(req).then((cached) =>
                cached ||
                fetch(req).then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_STATIC).then((c) => c.put(req, clone));
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
                    const clone = res.clone();
                    caches.open(CACHE_IMAGES).then((c) => c.put(req, clone));
                    return res;
                })
            )
        );
        return;
    }

    // Supabase API → network-first
    if (url.hostname.includes("supabase")) {
        event.respondWith(
            caches.open(CACHE_API).then((cache) =>
                fetch(req)
                    .then((res) => {
                        cache.put(req, res.clone());
                        return res;
                    })
                    .catch(() => cache.match(req))
            )
        );
        return;
    }

    // Default → network fallback to cache
    event.respondWith(
        fetch(req).catch(() => caches.match(req))
    );
});
