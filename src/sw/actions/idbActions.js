import * as idb from 'idb';
import * as constants from '../constants';
const STORE_NAME = 'records';

export const upgradeIdb = async () => {
    const upgrade = (db) => {
        db.createObjectStore(STORE_NAME, { keyPath: 'timestamp' });
    };

    await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION, { upgrade });
};

export const getRecords = async (lower = 0, upper = 99999) => {
    const db = await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION);

    const range = IDBKeyRange.bound(lower, upper);
    const records = await db.getAll(STORE_NAME, range);

    return records.reverse();
};

export const saveRecord = async (record) => {
    const db = await idb.openDB(constants.IDB_NAME, constants.IDB_VERSION);

    await db.put(STORE_NAME, record);

    return record;
};
