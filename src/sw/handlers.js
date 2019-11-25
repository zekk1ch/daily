import * as actionTypes from '../actionTypes';
import * as cacheActions from './actions/cacheActions';
import * as idbActions from './actions/idbActions';
import * as networkActions from './actions/networkActions';
import * as messageActions from './actions/messageActions';

export const handleInstall = (e) => {
    e.waitUntil(
        Promise.all([
            cacheActions.cacheAssets(),
        ])
    );
};

export const handleActivate = (e) => {
    e.waitUntil(
        Promise.all([
            cacheActions.invalidateForeignCaches(),
            cacheActions.invalidateForeignAssets(),
            idbActions.upgradeObjectStores(),
        ])
    );
};

export const handleFetch = (e) => {
    e.respondWith(
        networkActions.fetchNetworkFirst(e.request)
    );
};

export const handleMessage = (e) => {
    const { data: { action, data }, ports: [client] } = e;

    let promise;
    switch (action) {
        case actionTypes.GET_RECORDS:
            promise = idbActions.getRecords(data);
            break;
        case actionTypes.SAVE_RECORD:
            promise = idbActions.saveRecord(data);
            break;
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
