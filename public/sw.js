const CACHE_NAME = "programmer-handbook-v1"
const PRECACHE_URLS = ["/", "/manifest.webmanifest", "/search-index.json"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
  )
  self.clients.claim()
})

// Stale-while-revalidate: responde do cache imediatamente (se existir) e
// atualiza o cache em segundo plano a cada requisição GET bem-sucedida.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request)
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response.ok) cache.put(event.request, response.clone())
          return response
        })
        .catch(() => cached)

      return cached ?? networkFetch
    })
  )
})
