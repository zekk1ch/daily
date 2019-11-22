export const cacheAssets = async (cacheName, assets) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(assets);
};

export const invalidateForeignCaches = async (cacheName) => {
    const availableCacheNames = await caches.keys();

    const promises = availableCacheNames
        .filter((availableCacheName) => availableCacheName !== cacheName)
        .map((foreignCacheName) => caches.delete(foreignCacheName));
    await Promise.all(promises);
};

export const invalidateForeignAssets = async (cacheName, assetUrls) => {
    const cache = await caches.open(cacheName);
    const availableAssets = await cache.matchAll();

    const promises = availableAssets
        .map((availableAsset) => availableAsset.url.replace(location.origin, ''))
        .filter((availableAssetUrl) => !assetUrls.includes(availableAssetUrl))
        .map((foreignAssetUrl) => cache.delete(foreignAssetUrl));
    await Promise.all(promises);
};
