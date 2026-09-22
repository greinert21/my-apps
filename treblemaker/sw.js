// Tiny offline cache: network-first so updates land, cache fallback at the board.
const CACHE = 'treblemaker-v2';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    // Bypass the HTTP cache. GitHub Pages puts a max-age on index.html and a
    // plain fetch() honours it, so "network-first" would still hand back a
    // stale build for minutes after a deploy.
    fetch(e.request.url, { cache: 'reload' })
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true })
          .then(m => m || caches.match('./index.html'))
      )
  );
});
