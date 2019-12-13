import * as actionTypes from '../actionTypes';

function _postData(action, data) {
    return new Promise((resolve, reject) => {
        if (navigator.serviceWorker.controller === null) {
            return reject('Service worker is not registered');
        }

        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (e) => {
            if (e.data.ok) {
                resolve(e.data.data);
            } else {
                reject(e.data.errorMessage);
            }
        };

        navigator.serviceWorker.controller.postMessage({ action, data }, [messageChannel.port2]);
    });
}

export function getRecords(query) {
    return _postData(actionTypes.GET_RECORDS, query);
}
export function saveRecord(record) {
    return _postData(actionTypes.SAVE_RECORD, record);
}
