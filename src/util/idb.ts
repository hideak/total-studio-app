import DatabaseConnection from '@/models/database-connection.model';

const indexedDBNotAvailable: string = 'Sorry, but the IndexedDB is not available in your browser';
const indexedDBError: string = 'Sorry, an error ocurred during the request of IndexedDB';

/**
 * Connects to a database by pouplating a Database Connection
 * @param dbConnection Object representing the data used to connect
 */
async function connect(dbConnection: DatabaseConnection): Promise<void> {
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

    // Callbacks
    if (!request) {
      reject(indexedDBError);
    }
  });
}
