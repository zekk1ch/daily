export const sendResponse = (client, data) => {
    client.postMessage({ ok: true, data });
};

export const sendError = (client, errorMessage) => {
    client.postMessage({ ok: false, errorMessage });
};
