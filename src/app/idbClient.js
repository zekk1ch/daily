import * as actionTypes from '../actionTypes';

const postData = (action, data) => new Promise((resolve, reject) => {
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

export const getRecords = postData.bind(null, actionTypes.GET_RECORDS);
export const saveRecord = postData.bind(null, actionTypes.SAVE_RECORD);
