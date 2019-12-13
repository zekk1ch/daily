export function sendResponse(client, data) {
    client.postMessage({ ok: true, data });
}

export function sendError(client, errorMessage) {
    client.postMessage({ ok: false, errorMessage });
}
