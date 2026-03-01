const CACHE_NAME = "papadaan-pwa-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./image/logo.png",
  "./page/192M.png",
  "./page/512M.png",
  // tambahkan CSS/JS/HTML lainnya jika ada
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});