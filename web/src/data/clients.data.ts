import Client from '@/model/client.model';
import Record from '@/model/record.model';

const clients: Client[] = [
  new Client(1, 'Cliente 1', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), 'Serviço', 'Details 1')
  ]),
  new Client(2, 'Cliente 2', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), 'Serviço', 'Details 1'),
    new Record(2, new Date(2000, 0, 1), 'Serviço', 'Details 2')
  ]),
  new Client(3, 'Cliente 3', '999-9999', new Date(2000, 0, 1), 'Info', [
    new Record(1, new Date(2000, 0, 1), 'Serviço', 'Details 1'),
    new Record(2, new Date(2000, 0, 1), 'Serviço', 'Details 2'),
    new Record(3, new Date(2000, 0, 1), 'Serviço', 'Details 3')
  ])
];

export default clients;
