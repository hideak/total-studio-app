import Client from '@/model/client.model';

const clients: Client[] = [
  new Client(1, 'Cliente 1', '999-9999', new Date(2000, 1, 1)),
  new Client(2, 'Cliente 2', '999-9999', new Date(2000, 1, 1)),
  new Client(3, 'Cliente 3', '999-9999', new Date(2000, 1, 1))
];

export default clients;
