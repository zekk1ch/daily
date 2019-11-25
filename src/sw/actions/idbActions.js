import * as idb from 'idb';
import * as constants from '../constants';
const STORE_NAME = 'records';
const TIMESTAMP = 'timestamp';

export const upgradeObjectStores = async () => {
    const upgrade = (db) => {
        db.createObjectStore(STORE_NAME, { keyPath: TIMESTAMP });
    };

    await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION, { upgrade });
};

const data2entry = (data) => ({
    timestamp: Date.UTC(data.year, data.month, data.day) / 1e5,
    status: data.status,
});
const entry2data = (entry) => {
    const date = new Date(entry.timestamp * 1e5);
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        status: entry.status,
    };
};

export const getRecords = async (data = {}) => {
    const { from = 0, to = 99999999 } = data;

    const db = await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION);

    const range = IDBKeyRange.bound(from, to);
    const entries = await db.getAll(STORE_NAME, range);

    return entries.map((entry) => entry2data(entry));
};

export const saveRecord = async (data) => {
    const entry = data2entry(data);

    const db = await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION);
    await db.add(STORE_NAME, entry);

    return data;
};
