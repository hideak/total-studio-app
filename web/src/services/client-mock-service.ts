import Client from '@/model/client.model';
import ClientCreate from '@/model/dto/client-create';
import ServiceInterface from './shared/service.interface';
import clients from '@/data/clients.data';

export default class ClientMockService
  implements ServiceInterface<Client, ClientCreate> {
  /**
   * Gets a client from the mocked data
   * @param id the id of the client to get
   */
  async get(id: number): Promise<Client> {
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
  async create(entity: ClientCreate): Promise<void> {
    const lastClientId = Math.max(
      ...clients.map((client: Client) => client.id)
    );

    // assigning a new id different from the existing ones
    const newClient = Object.assign({}, entity) as Client;
    newClient.id = lastClientId === Math.max() ? 1 : lastClientId + 1;

    // pushes the new client
    clients.push(newClient);
  }

  /**
   * Updates a client in the mocked data
   * @param entity the client to be updated
   */
  async update(entity: Client): Promise<void> {
    // finding the client to update
    const client = clients.find((client: Client) => client.id === entity.id);
    if (client === undefined) {
      throw new Error(`client not found with id ${entity.id}`);
    }

    // updates the client
    Object.assign(client, entity);
  }

  /**
   * Deletes a client in the mocked data
   * @param id the id of the client to be deleted
   */
  async delete(id: number): Promise<void> {
    // finding the client to update
    const index = clients.findIndex((client: Client) => client.id === id);
    if (index < 0) {
      throw new Error(`client not found with id ${id}`);
    }

    // deletes the client
    clients.splice(index, 1);
  }
}
