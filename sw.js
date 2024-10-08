function sleep(ms){
        return new Promise(resolve => setTimeout(resolve,ms));
}
function awaitUntil(event,promise){
        event.waitUntil((async()=>{
               await sleep(1); 
               await promise
               await sleep(1);
        })());
        return promise;
}
//register service worker to the current script
self?.navigator?.serviceWorker?.register?.(document?.currentScript?.src);

/* Define levels of cache search */
const loose = {
  ignoreVary: true,
  ignoreMethod: false,
  ignoreSearch: false
};

const looser = {
  ignoreVary: true,
  ignoreMethod: true,
  ignoreSearch: false
};

const loosen = {
  ignoreVary: true,
  ignoreMethod: false,
  ignoreSearch: true
};

const loosest = {
  ignoreVary: true,
  ignoreMethod: true,
  ignoreSearch: true
};


  async function cascadeMatchesTier1(req) {
    res = await caches.match(req);
    if (res) { return res; }
    res = await caches.match(req, loose);
    if (res) { return res; }
    return res;
  }

  async function cascadeMatchesTier2(req) {
    res = await caches.match(req, looser);
    return res;
  }

  async function cascadeMatches(req) {
    res = await caches.match(req);
    if (res) { return res; }
    res = await caches.match(req, loose);
    if (res) { return res; }
    res = await caches.match(req, looser);
    if (res) { return res; }
    res = await caches.match(req, loosen);
    if (res) { return res; }
    res = await caches.match(req, loosest);
    return res;
  }

  async function cacheResponse(req, res) {
    const copy = res.clone();
    const cache = await caches.open('app');
    return cache.put(req, copy);
  }

  const endings = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.css',
    '.scss',
    '.json',
    '.jpg',
    '.png',
    '.pnj',
    '.gif',
    '.webp',
    '.svg',
    '.ico',
    '.woff',
    '.woff2'
  ];

  const endings_length = endings.length;
  function checkEndings(fileURL){
    for (let i = 0; i < endings_length; i++) {
      if (fileURL.toLowerCase().split('?')[0].split('#')[0].endsWith(endings[i])) {
        return true;
      }
    }
    return false;
  }

  /* On install, cache core assets */
  const coreAssets = [];
  self.addEventListener('install',async (event) => {
    /* start working immediately */
    await awaitUntil(event,self.skipWaiting());
    /* Cache core assets */
    await awaitUntil(event,cacheCoreAssets());
    async function cacheCoreAssets() {
      const cache = await caches.open('app');
      const coreAssets_length = coreAssets.length;
      for (let i = 0; i < coreAssets_length; i++) {
        cache.add(new Request(coreAssets[i]));
      }
      return cache;
    }
    return;
  });

  self.addEventListener("activate", event => event.waitUntil(clients.claim()));

  /* Listen for request events */
  self.addEventListener('fetch', (event) => {
    try {
      const FetchEvent = (async()=>{
        /* Get the request */
        let request = event.request;
        /* Always send google analytics */
        if (~request.url.indexOf('GoogleAnalytics')) {
          return;
        }
        if (request.url.startsWith('chrome-extenstion://')) {
          return;
        }
        if (!(request.url.startsWith(self.location.origin))){return;}
        /* Images */
        /* CSS & JavaScript */
        /* Offline-first */
        if (checkEndings(request.url)) {
          async function offFirstFetch() {
            let res = await cascadeMatchesTier1(request);
            if (res) {
              return res;
            }
            try {
              res = await fetch(request); 
              if ((res)&&(res.status<300)) {
                return await cacheResponse(request, res);
              }
              return res;
            } catch (e) {
              return res;
            }
          }
          /* Don't turn off Service Worker until this is done */
          const response = await awaitUntil(event,offFirstFetch(request))
          if(response && (response instanceof Response)){
            event.respondWith(response.clone());
          }else{
            console.log(response);
          }
          return;
        }
        /* HTML files */
        /* Network-first */
        if (!checkEndings(request.url)) {
          async function netFirstFetch() {
            try {
              let res = await fetch(request);
              /* Save a copy of it in cache */
              /* Return the response */
              if (res) {
                await cacheResponse(request, res);
                return res;
              }
              return await cascadeMatches(request);
            } catch (e) {
              return await cascadeMatches(request);
            }
          }
          /* Don't turn off Service Worker until this is done */
          const response = await awaitUntil(event,netFirstFetch(request))
          if(response && (response instanceof Response)){
            event.respondWith(response.clone());
          }else{
            console.log(response);
          }
          return;
        }
      })();
      /* Don't turn off Service Worker until everything is done */
        event.waitUntil(FetchEvent);
    } catch (e) {
      console.log(e);
      return;
    }
  });

