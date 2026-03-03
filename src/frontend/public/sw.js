const CACHE_NAME = 'unani-pyq-v1';

// Assets to cache on install (app shell)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
];

// Patterns that should always go to the network (ICP canister calls, API)
const NETWORK_ONLY_PATTERNS = [
  /\/api\//,
  /icp0\.io/,
  /ic0\.app/,
  /localhost:4943/,
  /127\.0\.0\.1:4943/,
];

function isNetworkOnly(url) {
  return NETWORK_ONLY_PATTERNS.some(function (pattern) {
    return pattern.test(url);
  });
}

function isStaticAsset(url) {
  return (
    url.includes('/assets/') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.svg') ||
    url.endsWith('.ico') ||
    url.endsWith('.woff') ||
    url.endsWith('.woff2') ||
    url.endsWith('.ttf') ||
    url.endsWith('.css') ||
    url.endsWith('.js')
  );
}

// Install: pre-cache the app shell
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Fetch: network-first for canister calls, cache-first for static assets
self.addEventListener('fetch', function (event) {
  var url = event.request.url;

  // Always use network for ICP canister / API calls
  if (isNetworkOnly(url)) {
    event.respondWith(
      fetch(event.request).catch(function () {
        return new Response(
          JSON.stringify({ error: 'You are offline. Please check your connection.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Cache-first for static assets (images, fonts, scripts, styles)
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        return fetch(event.request).then(function (response) {
          if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(function () {
          // Return nothing for missing static assets when offline
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }

  // Network-first for HTML navigation (app shell)
  event.respondWith(
    fetch(event.request).then(function (response) {
      if (response && response.status === 200) {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(function () {
      // Fallback to cached version when offline
      return caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        // Final fallback: serve the cached index.html for SPA navigation
        return caches.match('/index.html');
      });
    })
  );
});
