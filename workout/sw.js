// Tiny offline cache: network-first so updates land, cache fallback for the gym.
const CACHE = 'workout-v4';
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
  // Same-origin only. Supabase reads are cross-origin GETs; caching them would
  // hand back stale sync data on a weak connection.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    // Bypass the HTTP cache. GitHub Pages puts a max-age on index.html, and a
    // plain fetch() honours it - so "network-first" was still handing back a
    // stale build for minutes after a deploy. Same-origin GETs only, and the
    // cache below still covers offline, so there is nothing to lose here.
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
