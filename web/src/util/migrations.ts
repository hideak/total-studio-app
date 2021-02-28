/**
 * The list of migrations to be applied to the database
 */
const migrations: { (event: IDBVersionChangeEvent): void }[] = [
  /** Migration to version 1 */
  (event: IDBVersionChangeEvent) => {
    // Getting the database
    const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

    // Creating basic object stores
    db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('services', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
  }
];

/**
 * Migrate the database based on the old and new database version values
 * @param event the event associated with the database version change
 */
function migrate(event: IDBVersionChangeEvent) {
  // Get the current version of the database
  let migrationIndex = event.oldVersion;

  if (event.newVersion) {
    while (migrationIndex < event.newVersion) {
      // Apply the migration
      migrations[migrationIndex](event);

      // Go to the next version
      migrationIndex++;
    }
  }
}

export { migrate };
