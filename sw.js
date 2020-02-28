var MY_CACHE = [
  {
    name: 'my-static-html-v1',
    urls: ['/offline/test-offline.html']
  },
  {
    name: 'my-styles-cache-v1',
    urls: ['/styles/main.css']
  },
  {
    name: 'my-images-cache-v1',
    urls: ['/images/1.png']
  }
];

// install service worker cache
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    MY_CACHE.map(function(cacheObj) {
      caches.open(cacheObj.name)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(cacheObj.urls);
        })
    })
  );
});

// serve cached content if appear in cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// or we can serve cached content if we have it and append more data to the cache that was not initially set to be cached
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         return fetch(event.request).then(
//           function(response) {
//             // Check if we received a valid response
//             if(!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             // IMPORTANT: Clone the response. A response is a stream
//             // and because we want the browser to consume the response
//             // as well as the cache consuming the response, we need
//             // to clone it so we have two streams.
//             var responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then(function(cache) {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//     );
// });

self.addEventListener('activate', function(event) {

  console.log("inside activate");
  

  var cacheWhitelist = ['my-static-html-v1', 'my-images-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// add event listener for push events that come into the service worker
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push';
  const options = {
    body: 'Yay it works.',
    icon: 'images/1.png',
    badge: 'images/2.jpg'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// let deferredPrompt;
// self.addEventListener("beforeinstallprompt", function(event) {
//   event.preventDefault();

//   deferredPrompt = event;
// });

// deferredPrompt.prompt();