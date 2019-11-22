import * as constants from './constants';
import * as cacheActions from './actions/cacheActions';
import * as networkActions from './actions/networkActions';

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
