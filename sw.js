async function importJSDOM(){
  return globalThis.jsdom ?? (await(async function jsdomImport(){
  eval?.(await (await fetch('https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js')).text());
  const pako = globalThis.pako;
  const data = await fetch('https://raw.githubusercontent.com/Patrick-ring-motive/jsdom-bundle/refs/heads/main/bundles/kid-index.js.gz');
  const stream = data.body;
  const inflator = new pako.Inflate();
  const decoder = new TextDecoder();
  for await (const chunk of stream) {
    inflator.push(chunk);
  }
  const output = inflator.result;
  eval?.(decoder.decode(output));
  return globalThis.jsdom;
})());
}
void async function(){
  await importJSDOM();
}();

(()=>{
  const q = (varFn) => {
    try{
      return varFn?.();
    }catch(e){
      if(e.name != 'ReferenceError'){
        throw e;
      }
    }
  }

  const globalObject = q(()=>globalThis) // works in most modern runtimes
                    ?? q(()=>self) // also works in most modern runtimes
                    ?? q(()=>global) // fallback for older nodejs
                    ?? q(()=>window) // fallback for older browsers
                    ?? this ?? {}; // fallbacks for edge cases.
                    
  for(let x of ['globalThis','self','global']){
    globalObject[x] = globalObject;
  }
  self.q = q;

self.newQ = (...args) => {
   const fn = args?.shift?.();
   return fn && new fn(...args);
};



async function toXHTML(res){
  self.jsdom ?? await importJSDOM();
  self.JSDOM ??= self.jsdom.JSDOM;
  self.DOM ??= new JSDOM();
  self.win ??=DOM.window;
  self.parser ??= newQ(win.DOMParser);
  self.parseHTML ??= (str) => parser?.parseFromString?.(str, 'text/html');
  self.parseXML ??= (str) => parser?.parseFromString?.(str, 'application/xhtml+xml');
  self.serializer ??= newQ(win.XMLSerializer);
  self.serializeXML ??= (node) => serializer?.serializeToString?.(node);
  const doc = parseHTML?.(await res.text());
   return new Response(serializeXML?.(doc), {headers:{
    "Content-Type": "application/xhtml+xml",
  }});
}


  self.InvalidStateErrorLogged = false;
  globalThis.znewURL = function znewURL(){
    try{
        return new URL(...arguments);
    }catch(e){
        console.warn(e,...arguments);
        try{
            return new URL(arguments[0]);
        }catch{
            try{
                return new URL(`https://${arguments[0]}`);
            }catch{
                return new URL(`${e.name}://`);
            }
        }
    }
  }

setTimeout(()=>{
 try{
  if(/ios/i.test(globalThis?.window?.userAgent)){
    window.stop();
  }
 }catch{}
},7000);

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

async function zfetch(){
 try{
  let response = await fetch(...arguments);
  /*<insert response exceptions>*/
  if(response?.status == 403){
    response = await exceptFn(new Request(...arguments),response);
  }
  return new Response(response.body,response);
 }catch(e){
   console.warn(e,...arguments);
   return new Response(e.message+'\n'+e.stack,{status:569,headers:{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"}});
 }
}

async function exceptFn(request,response){
 const Q = (varFn)=>{try{return varFn()}catch{}};
 const $Q = async (varFn)=>{try{return await varFn()}catch{}};
 try{
   if(response?.status == 403){
     const text = await $Q(async()=>(await response.text()));
     if(/usaa/i.test(text)){
       response = new Response(text,{status:243,statusText:"Forbidden?"});
       globalThis.cache ??= (await caches.open('app'));
       await cache.put(request,response);
     }
   }
 }catch{return response;}
 return response;
}

fetch.prototype ??= (fetch.constructor = fetch);
globalThis.newFetch = function newFetch(init) {
  const fech = Object.assign(Object.create(fetch.prototype), init);
  fech.constructor = fetch;
  return fech;
}

globalThis.serializeHTTP = function serializeHTTP(re){
    const reDTO = newFetch({
        headers:Object.fromEntries(re.headers)
      });
    for(const a in re){
        if(re[a] == null || typeof re[a] === 'function'){continue;}
        if(~String(a).search(/headers|fetcher|signal/)){continue;}
        reDTO[a] = re[a];
    }
    return reDTO;
}

function fetchWith(event,request=event.request){
 return event.respondWith(fetch(request.url,serializeHTTP(request)));
}
function zfetchWith(event,request=event.request){
 try{
   event.respondWith(zfetch(request.url,serializeHTTP(request)));
 }catch(e){
   console.warn(e,...arguments);
 }
}

function zrespondWith(event,response){
 try{
  return event.respondWith(response);
 }catch(e){
  if(InvalidStateErrorLogged){
    return e;
  }
  console.warn(e,...arguments);
  if(e.name == 'InvalidStateError'){
    InvalidStateErrorLogged = true;
  }
  return e;
 }
}
//register service worker to the current script
self?.navigator?.serviceWorker?.register?.(document?.currentScript?.src);

/* Define levels of  search */
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
   globalThis.cache ??= (await caches.open('app'));
    res = await cache.match(req);
    if (res) { return res; }
    res = await cache.match(req, loose);
    if (res) { return res; }
    return res;
  }

  async function cascadeMatchesTier2(req) {
   globalThis.cache ??= (await caches.open('app'));
    res = await cache.match(req, looser);
    return res;
  }

  async function cascadeMatches(req) {
   globalThis.cache ??= (await caches.open('app'));
    res = await cache.match(req);
    if (res) { return res; }
    res = await cache.match(req, loose);
    if (res) { return res; }
    res = await cache.match(req, looser);
    if (res) { return res; }
    res = await cache.match(req, loosen);
    if (res) { return res; }
    res = await cache.match(req, loosest);
    return res;
  }

  async function cacheResponse(req, res) {
    const copy = res.clone();
    globalThis.cache ??= (await caches.open('app'));
    return cache.put(req.url??req, new Response(copy.body,copy));
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
      globalThis.cache ??= (await caches.open('app'));
      const coreAssets_length = coreAssets.length;
      for (let i = 0; i < coreAssets_length; i++) {
        cache.add(new Request(coreAssets[i]));
      }
      return cache;
    }
    return;
  });

  self.addEventListener("activate", event => event.waitUntil(clients.claim()));

  async function getClientURL(event){
    const clientId = await event?.clientId;
    const client = await self?.clients?.get?.(clientId);
    const clientURL = await client?.url;
    return clientURL;
  }

  async function zgetClientURL(event){
    return znewURL(await getClientURL(event));
  }


  /* Listen for request events */
  self.addEventListener('fetch', function onRequest(event){
    try {
      event.waitUntil((async()=>{})());
      const FetchEvent = (async()=>{
       globalThis.cache ??= (await caches.open('app'));
        /* Get the request */
        let request = event?.request;
        
        /*<insert request exceptions>*/
       
        const reqURL = `${request.url}`.split('/');
        if(reqURL[2]=='developer.mozilla.org'){
         reqURL[2]='developer.typescripts.org';
         request = new Request(reqURL.join`/`,request);
         Object.defineProperty(event,'request',{value:request});
        }

        try{
          const clientURL = `${(await zgetClientURL(event))}`;
          if((`${request.headers.get('referer')}`.includes('path=')&&!request.url.includes('path='))
           ||(clientURL.includes('path=')&&!request.url.includes('path='))){
            const incomingURL = znewURL(request?.url);
            const path = incomingURL?.searchParams?.get?.('path');
            if(!path){
              incomingURL?.searchParams?.set?.('path',encodeURIComponent(incomingURL.pathname));
              (incomingURL??{}).pathname = '';
              request = new Request(incomingURL,request);
            }
          }
        }catch(e){
          console.warn(e,request,...arguments);
        }
        
        if(/ios/i.test(request?.headers?.get?.('User-Agent'))){
          return zfetchWith(event,request);
        }
        /* Always send google analytics */
        if (~request.url.indexOf('GoogleAnalytics')) {
          return zfetchWith(event,request);
        }
        if (request.url.startsWith('chrome-extenstion://')) {
          return zfetchWith(event,request);
        }
        if (!(~`${request?.url}`.search(/typescripts\.org/i))){return zfetchWith(event);}
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
              res = await zfetch(request); 
              if ((res)&&(res.status<300)) {
                return await cacheResponse(request, res);
              }
              return res;
            } catch (e) {
              console.warn(e,...arguments);
              return res;
            }
          }
          /* Don't turn off Service Worker until this is done */
          const presponse = awaitUntil(event,offFirstFetch(request));
          const response = await presponse;
          if(response && (response instanceof Response)){
            if(request.url.includes('content-type=xhtml')){
              response = await toXHTML(response);
            }
            return zrespondWith(event,response.clone());
          }else{
            console.warn(response);
          }
          event.waitUntil(presponse);
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
              console.warn(e,...arguments);
              return await cascadeMatches(request);
            }
          }
          /* Don't turn off Service Worker until this is done */
          const presponse = awaitUntil(event,netFirstFetch(request));
          const response = await presponse;
          if(response && (response instanceof Response)){
            if(request.url.includes('content-type=xhtml')){
              response = await toXHTML(response);
            }
            return zrespondWith(event,response.clone());
          }else{
            try{
              throw new Error(response);
            }catch(e){
              console.warn(e,response,...aguments);
            }
          }
          event.waitUntil(presponse);
        }
      })();
      /* Don't turn off Service Worker until everything is done */
        event.waitUntil(awaitUntil(event,FetchEvent));
    } catch (e) {
      console.warn(e,event,...arguments);
      return zfetchWith(event);
    }
  });

})();
