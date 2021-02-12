import Client from '@/model/client.model';
import ServiceInterface from './interfaces/service.interface';
import clients from '@/data/clients.data';

export default class ClientMockService implements ServiceInterface<Client> {
  /**
   * Gets a client from the mocked data
   * @param id the id of the client to get
   */
  get(id: number): Client {
    // finding the client to get
    const client = clients.find((client: Client) => client.id === id);
    if (client === undefined) {
      throw new Error(`client not found with id ${id}`);
    }

    return client;
  }

  /**
   * Creates a client in the mocked data
   * @param entity the client to be created
   */
  create(entity: Client): Client {
    const lastClientId = Math.max(
      ...clients.map((client: Client) => client.id)
    );

    // assigning a new id different from the existing ones
    entity.id = lastClientId === Math.max() ? 1 : lastClientId + 1;

    // pushes the new client
    clients.push(entity);

    return entity;
  }

  /**
   * Updates a client in the mocked data
   * @param client the client to be updated
   */
  update(entity: Client): Client {
    // finding the client to update
    const client = clients.find((client: Client) => client.id === entity.id);
    if (client === undefined) {
      throw new Error(`client not found with id ${entity.id}`);
    }

    // updates the client
    Object.assign(client, entity);

    return client;
  }

  /**
   * Deletes a client in the mocked data
   * @param client the client to be deleted
   */
  delete(id: number): void {
    // finding the client to update
    const index = clients.findIndex((client: Client) => client.id === id);
    if (index < 0) {
      throw new Error(`client not found with id ${id}`);
    }

    // deletes the client
    clients.splice(index, 1);
  }
}
