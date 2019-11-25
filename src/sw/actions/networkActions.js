import * as constants from '../constants';

export const fetchNetworkFirst = async (request) => {
    let response, isResponseOk;

    try {
        response = await fetch(request);
        isResponseOk = response.ok;
    } catch {
        isResponseOk = false;
    }

    if (isResponseOk) {
        const cache = await caches.open(constants.CACHE_NAME);
        await cache.put(request, response.clone());
    } else {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
    }

    return response;
};
