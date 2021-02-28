import Service from '@/model/service.model';
import ServiceCreate from '@/model/dto/service-create';
import ServiceInterface from './shared/service.interface';
import services from '@/data/services.data';

export default class ServiceMockService implements ServiceInterface<Service, ServiceCreate> {
  /**
   * Gets a service from the mocked data
   * @param id the id of the service to get
   */
  async get(id: number): Promise<Service> {
    // finding the client to get
    const service = services.find((service: Service) => service.id === id);
    if (service === undefined) {
      throw new Error(`service not found with id ${id}`);
    }

    return service;
  }

  /**
   * Gets all the services from the mocked data
   * @returns a list of service objects
   */
  async getAll(): Promise<Service[]> {
    // returning all services
    return services;
  }

  /**
   * Creates a service in the mocked data
   * @param entity the service to be created
   */
  async create(entity: ServiceCreate): Promise<void> {
    const lastServiceId = Math.max(
      ...services.map((service: Service) => service.id)
    );

    // assigning a new id different from the existing ones
    const newService = Object.assign({}, entity) as Service;
    newService.id = lastServiceId === Math.max() ? 1 : lastServiceId + 1;

    // pushes the new service
    services.push(newService);
  }

  /**
   * Updates a service in the mocked data
   * @param entity the service to be updated
   */
  async update(entity: Service): Promise<void> {
    // finding the service to update
    const service = services.find(
      (service: Service) => service.id === entity.id
    );
    if (service === undefined) {
      throw new Error(`client not found with id ${entity.id}`);
    }

    // updates the client
    Object.assign(service, entity);
  }

  /**
   * Deletes a service in the mocked data
   * @param id the id of the service to be deleted
   */
  async delete(id: number): Promise<void> {
    // finding the service to update
    const index = services.findIndex((service: Service) => service.id === id);
    if (index < 0) {
      throw new Error(`service not found with id ${id}`);
    }

    // deletes the client
    services.splice(index, 1);
  }
}
