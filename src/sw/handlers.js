import * as constants from './constants';
import * as cacheActions from './actions/cacheActions';
import * as networkActions from './actions/networkActions';
import * as messageActions from './actions/messageActions';

export const handleInstall = (e) => {
    e.waitUntil(
        Promise.all([
            cacheActions.cacheAssets(constants.CACHE_NAME, constants.ASSET_URLS),
        ])
    );
};

export const handleActivate = (e) => {
    e.waitUntil(
        Promise.all([
            cacheActions.invalidateForeignCaches(constants.CACHE_NAME),
            cacheActions.invalidateForeignAssets(constants.CACHE_NAME, constants.ASSET_URLS),
        ])
    );
};

export const handleFetch = (e) => {
    e.respondWith(
        networkActions.fetchNetworkFirst(e.request, constants.CACHE_NAME)
    );
};

export const handleMessage = (e) => {
    const { data: { action, data }, ports: [client] } = e;

    let promise;
    switch (action) {
        default:
            promise = Promise.reject(new Error(`Unknown action type – "${action}"`));
    }

    promise = promise
        .then((response) => messageActions.sendResponse(client, response))
        .catch((err) => messageActions.sendError(client, err.message));

    e.waitUntil(
        promise,
    );
};
