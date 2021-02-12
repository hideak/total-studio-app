/**
 * Interface that represent the common methods related to a REST service
 */
export default interface ServiceInterface<T> {
    /**
     * Gets the entity T
     */
    get: (id: number) => T;

    /**
     * Creates a new entity T
     */
    create: (entity: T) => T;

    /**
     * Updates a new entity T
     */
    update: (entity: T) => T;

    /**
     * Deletes an existent entity T
     */
    delete: (id: number) => void;
}