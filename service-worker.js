const CACHE_NAME = 'blocnote-pro-v1';
const FILES_TO_CACHE = [
  '/', '/index.html', '/styles/main.css', '/main.js', '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // cache-first for app shell
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request).catch(()=>cached))
  );
});
