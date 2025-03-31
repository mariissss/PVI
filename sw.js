const CACHE_NAME = "pwa-cache-v1";

const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/header/header.html',
    '/header/header.css',
    '/header/header.js',
    '/students/students.html',
    '/students/students.js',
    '/students/students.css',
    '/dashboard/dashboard.html',
    '/dashboard/dashboard.js',
    '/dashboard/dashboard.css',
    '/messages/messages.html',
    '/messages/messages.js',
    '/messages/messages.css',
    '/tasks/tasks.html',
    '/tasks/tasks.js',
    '/tasks/tasks.css',
    '/images/add.png',
    '/images/avatar1.png',
    '/images/avatar2.png',
    '/images/avatar3.png',
    '/images/bell.png',
    '/images/delete-all.png',
    '/images/delete.png',
    '/images/edit.png',
    '/images/logo.png',
    '/images/userphoto.png',
    '/images/icons/icon72.png',
    '/images/icons/icon96.png',
    '/images/icons/icon128.png',   
    '/images/icons/icon144.png',
    '/images/icons/icon152.png',
    '/images/icons/icon192.png',
    '/images/icons/icon384.png',
    '/images/icons/icon512.png'   
];

// install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(ASSETS).catch(console.error);
    })
  );
});

// fetch sw
self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith("chrome-extension://")) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const networkFetch = fetch(event.request).then((networkResponse) => {
                    if (event.request.method === "GET") {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => cachedResponse); 
                return cachedResponse || networkFetch;
            });
        })
    );
});


// activate sw
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))  
      );
    }).then(() => {
      console.log("New Service Worker is activated.");
      return self.clients.claim();
    })
  );
});