// Sube este número cada vez que cambies index.html, manifest.json o los iconos.
// Si no lo subes, el móvil seguirá usando la versión guardada en caché y no verá los cambios.
const CACHE_VERSION = 'jb-recetas-v2';

const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: el "esqueleto" de la app (html/manifest/iconos) se sirve desde caché
// y se actualiza en segundo plano. Las llamadas a TheMealDB y MyMemory van siempre
// a la red (son datos que cambian y necesitan internet igualmente).
self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.includes('themealdb.com') || url.includes('mymemory.translated.net')) {
    return; // deja pasar directo a la red, sin interceptar
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        if (response && response.ok) {
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
