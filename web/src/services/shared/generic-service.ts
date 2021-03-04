import ServiceInterface from './service.interface';
import DatabaseConnection from '@/model/interface/database-connection.interface';
import { dbGet, dbGetAll, dbCreate, dbUpdate, dbDelete } from '@/util/idb';

export default class GenericService<Entity, EntityCreate>
  implements ServiceInterface<Entity, EntityCreate> {
  /**
   * The name of the store from where to get data
   */
  store: string;

  /**
   * The database connection
   */
  db: DatabaseConnection;

  /**
   * Constructor
   */
  constructor(db: DatabaseConnection, store: string) {
    this.db = db;
    this.store = store;
  }

  /**
   * Gets an entity from the database
   * @param id the id of the entity to get
   */
  async get(id: number): Promise<Entity> {
    return dbGet(this.db, this.store, id).then();
  }

  /**
   * Gets all entities from the database
   */
  async getAll(): Promise<Entity[]> {
    return dbGetAll(this.db, this.store).then();
  }

  /**
   * Creates an entity in the database
   * @param entity the entity to be created
   */
  async create(entity: EntityCreate): Promise<void> {
    return dbCreate(this.db, this.store, entity);
  }

  /**
   * Updates an entity in the database
   * @param entity the entity to be updated
   */
  async update(entity: Entity): Promise<void> {
    return dbUpdate(this.db, this.store, entity);
  }

  /**
   * Deletes an entity in the database
   * @param id the id of the entity to be deleted
   */
  async delete(id: number): Promise<void> {
    return dbDelete(this.db, this.store, id);
  }
}
