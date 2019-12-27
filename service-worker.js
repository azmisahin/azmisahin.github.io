var version = '1.0.0';
var cacheName = 'azmisahin-com-' + version;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/index.html'
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('push', function (event) {
    const promiseChain = self.registration.showNotification('Kiosk, Pano.');

    event.waitUntil(promiseChain);

});
