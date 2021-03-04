import DatabaseConnection from '@/model/interface/database-connection.interface';
import { migrate } from '@/util/migrations';

// Error messages
const indexedDBNotAvailable =
  'Sorry, but the IndexedDB is not available in your browser';

/**
 * Connects to a database by pouplating a Database Connection
 * @param dbConnection Object representing the data used to connect
 */
async function dbConnect(
  dbConnection: DatabaseConnection
): Promise<DatabaseConnection> {
  return new Promise((resolve, reject) => {
    // Check if indexedDB is available in the user's browser
    if (!window.indexedDB) {
      reject(new Error(indexedDBNotAvailable));
    }

    // Connecting to the database
    const request: IDBOpenDBRequest = window.indexedDB.open(
      dbConnection.dbName,
      dbConnection.dbVersion
    );

    // Success callback
    request.onsuccess = (event: Event) => {
      dbConnection.database = (event.target as IDBOpenDBRequest).result;
      resolve(dbConnection);
    };

    // Upgrade callback
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      migrate(event);
      dbConnection.database = (event.target as IDBOpenDBRequest).result;
      resolve(dbConnection);
    };

    // Error callback
    request.onerror = (error: Event) => {
      reject(error);
    };
  });
}

/**
 * Retrieves an item from a store in the database
 * @param db the database to use
 * @param store the store where the data will be retrieved
 * @param key the key of the item to retrieve
 */
async function dbGet<T>(
  db: DatabaseConnection,
  store: string,
  key: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = db.database
      ?.transaction(store)
      .objectStore(store)
      .get(key);

    if (request) {
      // Success callback
      request.onsuccess = () => {
        resolve(request.result);
      };

      // Error callback
      request.onerror = (error: Event) => {
        reject(error);
      };
    }
  });
}

/**
 * Retrieves all items from a store in the database
 * @param db the database to use
 * @param store the store where the data will be retrieved
 */
async function dbGetAll<T>(
  db: DatabaseConnection,
  store: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const request = db.database
      ?.transaction(store)
      .objectStore(store)
      .getAll();

    if (request) {
      // Success callback
      request.onsuccess = () => {
        resolve(request.result);
      };

      // Error callback
      request.onerror = (error: Event) => {
        reject(error);
      };
    }
  });
}

/**
 * Creates an item from a store in the database
 * @param db the database to use
 * @param store the store where the data will be created
 * @param object the object that will be created
 */
async function dbCreate<T>(
  db: DatabaseConnection,
  store: string,
  object: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = db.database
      ?.transaction(store, 'readwrite')
      .objectStore(store)
      .add(object);

    if (request) {
      // Success callback
      request.onsuccess = () => {
        resolve();
      };

      // Error callback
      request.onerror = (error: Event) => {
        reject(error);
      };
    }
  });
}

/**
 * Creates an item from a store in the database
 * @param db the database to use
 * @param store the store where the data will be created
 * @param object the object that will be created
 */
async function dbUpdate<T>(
  db: DatabaseConnection,
  store: string,
  object: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = db.database
      ?.transaction(store, 'readwrite')
      .objectStore(store)
      .put(object);

    if (request) {
      // Success callback
      request.onsuccess = () => {
        resolve();
      };

      // Error callback
      request.onerror = (error: Event) => {
        reject(error);
      };
    }
  });
}

/**
 * Deletes an item from a store in the database
 * @param db the database to use
 * @param store the store where the data will be retrieved
 * @param key the key of the item to retrieve
 */
async function dbDelete<T>(
  db: DatabaseConnection,
  store: string,
  key: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = db.database
      ?.transaction(store, 'readwrite')
      .objectStore(store)
      .delete(key);

    if (request) {
      // Success callback
      request.onsuccess = () => {
        resolve();
      };

      // Error callback
      request.onerror = (error: Event) => {
        reject(error);
      };
    }
  });
}

export { dbConnect, dbGet, dbGetAll, dbCreate, dbUpdate, dbDelete };
