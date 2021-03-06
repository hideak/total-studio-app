import Record from '@/model/record.model';
import RecordCreate from '@/model/dto/record-create';
import ServiceInterface from './shared/service.interface';
import records from '@/data/records.data';

export default class RecordMockService
  implements ServiceInterface<Record, RecordCreate> {
  /**
   * Gets a record from the mocked data
   * @param id the id of the record to get
   */
  async get(id: number): Promise<Record> {
    // finding the record to get
    const record = records.find((record: Record) => record.id === id);
    if (record === undefined) {
      throw new Error(`record not found with id ${id}`);
    }

    return record;
  }

  /**
   * Gets a record based on the client id from the mocked data
   * @param id the id of the client from where to get records
   */
  async getByClientId(id: number): Promise<Record[]> {
    // finding the records to get
    const filteredRecords = records.filter(
      (record: Record) => record.clientId == id
    );
    if (filteredRecords === undefined) {
      throw new Error(`records not found with client id ${id}`);
    }

    return filteredRecords;
  }

  /**
   * Creates a record in the mocked data
   * @param entity the record to be created
   */
  async create(entity: RecordCreate): Promise<void> {
    const lastRecordId = Math.max(
      ...records.map((record: Record) => record.id)
    );

    // assigning a new id different from the existing ones
    const newRecord = Object.assign({}, entity) as Record;
    newRecord.id = lastRecordId === Math.max() ? 1 : lastRecordId + 1;

    // pushes the new record
    records.push(newRecord);
  }

  /**
   * Updates a record in the mocked data
   * @param entity the record to be updated
   */
  async update(entity: Record): Promise<void> {
    // finding the record to update
    const record = records.find((record: Record) => record.id === entity.id);
    if (record === undefined) {
      throw new Error(`record not found with id ${entity.id}`);
    }

    // updates the record
    Object.assign(record, entity);
  }

  /**
   * Deletes a record in the mocked data
   * @param id the id of the record to be deleted
   */
  async delete(id: number): Promise<void> {
    // finding the record to update
    const index = records.findIndex((record: Record) => record.id === id);
    if (index < 0) {
      throw new Error(`record not found with id ${id}`);
    }

    // deletes the record
    records.splice(index, 1);
  }
}
