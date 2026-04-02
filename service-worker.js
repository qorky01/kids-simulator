const CACHE_NAME = 'kids-simulator-v1';

const STATIC_ASSETS = [
  '/kids-simulator/',
  '/kids-simulator/index.html',
  '/kids-simulator/manifest.json',
  '/kids-simulator/elevator/index.html',
  '/kids-simulator/taximeter/index.html',
  '/kids-simulator/police/index.html',
  '/kids-simulator/train/index.html',
  '/kids-simulator/remotecontrol/index.html',
  '/kids-simulator/airportsubway/index.html',
  '/kids-simulator/slidecontrol/index.html',
  '/kids-simulator/secom/index.html',
  '/kids-simulator/bus/index.html',
];

// 설치: 핵심 파일 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 오래된 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 요청 가로채기: 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('/kids-simulator/index.html'))
  );
});
