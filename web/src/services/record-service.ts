import Record from '@/model/record.model';
import RecordCreate from '@/model/dto/record-create';
import GenericService from './shared/generic-service';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import { dbGetAll } from '@/util/idb';

export default class RecordService extends GenericService<
  Record,
  RecordCreate
> {
  /**
   * Constructor
   */
  constructor(db: DatabaseConnection, store: string) {
    // call super
    super(db, store);
  }

  /**
   * Gets all records by client id from the database
   * @param id the id of the client from where to get the records
   */
  async getByClientId(id: number): Promise<Record[]> {
    const records = await dbGetAll<Record>(this.db, this.store);
    return records.filter((record: Record) => record.clientId === id);
  }
}
