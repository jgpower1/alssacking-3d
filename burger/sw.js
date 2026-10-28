/* bhc 버거게임 — 홈 화면 앱용 서비스 워커: 화면(HTML)은 항상 최신을 먼저, 그림·소리는 저장해 두고 빠르게 */
const CACHE='bhc-burger-v2';
const CORE=['./','./manifest.json','./audio/bgm.mp3','./images/bhc-burger-game.webp','./images/burger-classic.webp','./images/burger-bburinkle.webp','./images/burger-matcho.webp','./images/burger-kwasak.webp','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return;}
  e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;}).catch(()=>m);return m||net;}));});
