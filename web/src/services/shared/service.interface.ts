/**
 * Interface that represents the common methods related to a REST service
 */
export default interface ServiceInterface<Entity, EntityCreate> {
  /**
   * Gets the entity of type Entity
   */
  get: (id: number) => Promise<Entity>;

  /**
   * Creates a new entity of type Entity based on EntityCreate
   */
  create: (entity: EntityCreate) => Promise<void>;

  /**
   * Updates a new entity of type Entity based on itself
   */
  update: (entity: Entity) => Promise<void>;

  /**
   * Deletes an existent entity T
   */
  delete: (id: number) => Promise<void>;
}
