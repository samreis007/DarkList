const CACHE_NAME = 'pwa-cache-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './list.js',
  './images/favicon.ico',
  './images/icon.png',
  './images/android-chrome-192x192.png',
  './images/android-chrome-512x512.png',
  './images/apple-touch-icon.png' 
];

// Instalação do Service Worker e salvamento dos arquivos no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Intercepta as requisições para responder offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});