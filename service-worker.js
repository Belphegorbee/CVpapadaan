const CACHE_NAME = "cvpapadaan-v4";

const urlsToCache = [
  "/CVpapadaan/",
  "/CVpapadaan/index.html",
  "/CVpapadaan/manifest.json",
  "/CVpapadaan/image/logo.png,
  "/CVpapadaan/page/192M.png",
  "/CVpapadaan/page/512M.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache opened");
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
