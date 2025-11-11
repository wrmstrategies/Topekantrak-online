
self.addEventListener('install', e=>{
  e.waitUntil(caches.open('tnpwa-v1').then(c=>c.addAll([
    '/', '/index.html','/events.html','/roster.html','/join.html',
    '/assets/styles.css','/assets/logo.svg','/js/app.js','/data/events.json','/data/roster.json'
  ])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request))
  );
});
