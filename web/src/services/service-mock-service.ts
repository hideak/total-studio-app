import Service from '@/model/service.model';
import ServiceInterface from './interfaces/service.interface';
import services from '@/data/services.data';

export default class ServiceMockService implements ServiceInterface<Service> {
  /**
   * Gets a service from the mocked data
   * @param id the id of the service to get
   */
  get(id: number): Service {
    // finding the client to get
    const service = services.find((service: Service) => service.id === id);
    if (service === undefined) {
      throw new Error(`service not found with id ${id}`);
    }

    return service;
  }

  /**
   * Creates a service in the mocked data
   * @param entity the service to be created
   */
  create(entity: Service): Service {
    const lastServiceId = Math.max(
      ...services.map((service: Service) => service.id)
    );

    // assigning a new id different from the existing ones
    entity.id = lastServiceId === Math.max() ? 1 : lastServiceId + 1;

    // pushes the new service
    services.push(entity);

    return entity;
  }

  /**
   * Updates a service in the mocked data
   * @param entity the service to be updated
   */
  update(entity: Service): Service {
    // finding the service to update
    const service = services.find((service: Service) => service.id === entity.id);
    if (service === undefined) {
      throw new Error(`client not found with id ${entity.id}`);
    }

    // updates the client
    Object.assign(service, entity);

    return service;
  }

  /**
   * Deletes a service in the mocked data
   * @param id the id of the service to be deleted
   */
  delete(id: number): void {
    // finding the service to update
    const index = services.findIndex((service: Service) => service.id === id);
    if (index < 0) {
      throw new Error(`service not found with id ${id}`);
    }

    // deletes the client
    services.splice(index, 1);
  }
}
