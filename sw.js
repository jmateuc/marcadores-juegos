const CACHE='marcadores-juegos-v8';

const CORE=[
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './flip7/',
  './flip7/index.html',
  './lacuenta/',
  './lacuenta/index.html'
];

const OPTIONAL=[
  './assets/images/flip7-banner.PNG',
  './assets/images/la-cuenta-banner.PNG'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    (async()=>{
      const cache=await caches.open(CACHE);

      await cache.addAll(CORE);

      await Promise.allSettled(
        OPTIONAL.map(url=>cache.add(url))
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    (async()=>{
      const keys=await caches.keys();

      await Promise.all(
        keys
          .filter(key=>key!==CACHE)
          .map(key=>caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'){
    return;
  }

  const request=event.request;

  if(request.mode==='navigate'){

    event.respondWith(
      (async()=>{
        const cached=
          await caches.match(
            request,
            {ignoreSearch:true}
          );

        if(cached){

          event.waitUntil(
            fetch(request)
              .then(async response=>{
                if(response && response.ok){
                  const cache=await caches.open(CACHE);
                  await cache.put(request,response.clone());
                }
              })
              .catch(()=>{})
          );

          return cached;
        }

        try{
          const response=await fetch(request);

          if(response && response.ok){
            const cache=await caches.open(CACHE);
            await cache.put(request,response.clone());
          }

          return response;

        }catch(e){

          const url=new URL(request.url);
          let fallback='./index.html';

          if(
            url.pathname.endsWith('/flip7/') ||
            url.pathname.endsWith('/flip7/index.html')
          ){
            fallback='./flip7/index.html';
          }

          if(
            url.pathname.endsWith('/lacuenta/') ||
            url.pathname.endsWith('/lacuenta/index.html')
          ){
            fallback='./lacuenta/index.html';
          }

          return (
            await caches.match(fallback)
          ) || (
            await caches.match('./index.html')
          );
        }
      })()
    );

    return;
  }

  event.respondWith(
    (async()=>{
      const cached=
        await caches.match(
          request,
          {ignoreSearch:true}
        );

      if(cached){
        return cached;
      }

      try{
        const response=await fetch(request);

        if(response && response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(request,response.clone());
        }

        return response;

      }catch(e){
        return new Response(
          '',
          {
            status:504,
            statusText:'Offline'
          }
        );
      }
    })()
  );
});
