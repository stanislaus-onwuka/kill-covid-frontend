/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
//   maxRetentionTime: 24 * 60
// });

self.addEventListener('install',()=>{
    console.log('I just got installed')
})

//It is this fetch event that handles all fetch requests and enables us intercept fetch made from the app

// self.addEventListener('fetch',(e)=>{
//    e.respondWith(
//     caches.match(e.request)
//     .then(cachedFile => {
//         if(cachedFile){
//             return cachedFile
//         }else{
//             console.log(!e.request.url.includes(location.origin))
//             if(!e.request.url.includes(location.origin)){
//                 var init = {
//                     "status": 200,
//                     "message": 'Finally worked'
//                 }
//                 return new Response(null,init)
//             }
//         }
//     })
//    )
// })



workbox.routing.registerRoute(
    self.location.origin,
  workbox.strategies.cacheFirst()
)

workbox.precaching.precacheAndRoute([]);

    // Image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|eot|ttf|woff|woff2|ico)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
        /\.(?:json)$/,
        workbox.strategies.cacheFirst({
          cacheName: "manifest",
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        })
      );

    // JS, CSS caching
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.cacheFirst({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );
