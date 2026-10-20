const CACHE_NAME = 'darklist-pwa-v2';
const CACHE_PREFIX = 'darklist-pwa-';
const LEGACY_CACHE_NAME = 'pwa-cache-v1';
const assets = [
  './index.html',
  './manifest.json',
  './style.css',
  './list.js',
  './images/favicon.ico',
  './images/android-chrome-192x192.png',
  './images/android-chrome-512x512.png',
  './images/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) =>
          (cacheName.startsWith(CACHE_PREFIX) || cacheName === LEGACY_CACHE_NAME) &&
          cacheName !== CACHE_NAME
        )
        .map((cacheName) => caches.delete(cacheName))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const request = e.request;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() =>
        caches.open(CACHE_NAME).then((cache) =>
          cache.match(new URL('./index.html', self.registration.scope).href)
        ).then((response) => response || new Response(
          'Esta página não está disponível offline.',
          { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
        ))
      )
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((response) => {
        return response || fetch(request);
      })
    ).catch((error) => {
      console.error('Falha ao responder à requisição:', error);
      throw error;
    })
  );
});