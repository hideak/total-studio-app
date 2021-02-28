export default interface DatabaseConnection {
  database?: IDBDatabase;
  dbName: string;
  dbVersion: number;
}
