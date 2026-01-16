const CACHE_NAME = 'snake-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

// Installation: Cache aufbauen
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Aktivierung: Alte Caches löschen (falls Update)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch: Anfragen abfangen und aus Cache bedienen (Offline Support)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});