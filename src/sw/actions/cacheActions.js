import * as constants from '../constants';

export async function cacheAssets() {
    const cache = await caches.open(constants.CACHE_NAME);
    await cache.addAll(constants.ASSET_URLS);
}

export async function invalidateForeignCaches() {
    const availableCacheNames = await caches.keys();

    const promises = availableCacheNames
        .filter((availableCacheName) => availableCacheName !== constants.CACHE_NAME)
        .map((foreignCacheName) => caches.delete(foreignCacheName));
    await Promise.all(promises);
}

export async function invalidateForeignAssets() {
    const cache = await caches.open(constants.CACHE_NAME);
    const availableAssets = await cache.matchAll();

    const promises = availableAssets
        .map((availableAsset) => availableAsset.url.replace(location.origin, ''))
        .filter((availableAssetUrl) => !constants.ASSET_URLS.includes(availableAssetUrl))
        .map((foreignAssetUrl) => cache.delete(foreignAssetUrl));
    await Promise.all(promises);
}
