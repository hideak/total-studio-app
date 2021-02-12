import Client from '@/model/client.model';
import Record from '@/model/record.model';
import services from './services.data';

const clients: Client[] = [
  new Client(1, 'Cliente 1', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), services[0], 'Details 1')
  ]),
  new Client(2, 'Cliente 2', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), services[0], 'Details 1'),
    new Record(2, new Date(2000, 0, 1), services[1], 'Details 2')
  ]),
  new Client(3, 'Cliente 3', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), services[0], 'Details 1'),
    new Record(2, new Date(2000, 0, 1), services[1], 'Details 2'),
    new Record(3, new Date(2000, 0, 1), services[2], 'Details 3')
  ])
];

export default clients;
