// FRZ.DEV High-Performance Service Worker v2.5
// Offline caching & Progressive Web App (PWA) runtime for Fariza Arlistiana's Portfolio

const CACHE_NAME = 'frz-dev-pwa-v2.5';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/images/profile.png',
  '/images/profile-cutout.png',
  '/images/og-banner.png',
  '/cv/fariza-cv.pdf',
  '/certificates/cisco-ccna-official.pdf',
  '/certificates/unpam-lpkks-ccna.pdf'
];

// Install Event - Precache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[PWA SW] Precache warning:', err);
      })
  );
});

// Activate Event - Clean up stale cache versions & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch Event - Hybrid Strategy:
// 1. Navigation (HTML): Network first with offline fallback to cached index.html
// 2. Static Assets (CSS, JS, Fonts, Images): Cache First with dynamic update
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-http requests (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // Handle HTML document navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html').then((fallback) => {
            if (fallback) return fallback;
            return caches.match('/');
          });
        })
    );
    return;
  }

  // Handle Static Assets & Local Resources
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.origin === self.location.origin
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch fresh copy in background (Stale-While-Revalidate)
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Cache miss -> fetch from network & cache dynamically
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch(() => {
            return new Response('', { status: 408, statusText: 'Offline Resource' });
          });
      })
    );
    return;
  }

  // Default network fetch
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
