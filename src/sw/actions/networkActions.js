export const fetchNetworkFirst = async (request, cacheName) => {
    let response, isResponseOk;

    try {
        response = await fetch(request);
        isResponseOk = response.ok;
    } catch {
        isResponseOk = false;
    }

    if (isResponseOk) {
        const cache = await caches.open(cacheName);
        await cache.put(request, response.clone());
    } else {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
    }

    return response;
};
