import Record from '@/model/record.model';

const records: Record[] = [
  new Record(1, 1, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 1'),
  new Record(2, 2, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 1'),
  new Record(3, 2, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 2'),
  new Record(4, 3, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 1'),
  new Record(5, 3, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 2'),
  new Record(6, 3, 'Serviço', new Date(2000, 0, 1), '00:00', 'Details 3')
];

export default records;
