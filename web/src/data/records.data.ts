import Record from '@/model/record.model';

const records: Record[] = [
  new Record(1, 1, new Date(2000, 0, 1), 'Serviço', 'Details 1'),
  new Record(1, 2, new Date(2000, 0, 1), 'Serviço', 'Details 1'),
  new Record(2, 2, new Date(2000, 0, 1), 'Serviço', 'Details 2'),
  new Record(1, 3, new Date(2000, 0, 1), 'Serviço', 'Details 1'),
  new Record(2, 3, new Date(2000, 0, 1), 'Serviço', 'Details 2'),
  new Record(3, 3, new Date(2000, 0, 1), 'Serviço', 'Details 3'),
];

export default records;
