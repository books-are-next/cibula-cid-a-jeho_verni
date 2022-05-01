/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-eafe4ef';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./cid_a_jeho_verni_002.html","./cid_a_jeho_verni_005.html","./cid_a_jeho_verni_006.html","./cid_a_jeho_verni_007.html","./cid_a_jeho_verni_008.html","./cid_a_jeho_verni_009.html","./cid_a_jeho_verni_010.html","./cid_a_jeho_verni_011.html","./cid_a_jeho_verni_012.html","./cid_a_jeho_verni_013.html","./cid_a_jeho_verni_014.html","./cid_a_jeho_verni_015.html","./cid_a_jeho_verni_016.html","./cid_a_jeho_verni_017.html","./cid_a_jeho_verni_018.html","./cid_a_jeho_verni_019.html","./cid_a_jeho_verni_020.html","./cid_a_jeho_verni_021.html","./cid_a_jeho_verni_022.html","./cid_a_jeho_verni_023.html","./cid_a_jeho_verni_024.html","./cid_a_jeho_verni_025.html","./cid_a_jeho_verni_026.html","./cid_a_jeho_verni_027.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/mzk_logo_tyrkys_transparent.jpg","./resources/obalka_cid_a_jeho_verni.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
