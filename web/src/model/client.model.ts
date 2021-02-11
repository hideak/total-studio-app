import SortableListItem from './interface/sortable-list-item.interface';
import Record from './record.model';

/**
 * Class that represents a client
 */
export default class Client implements SortableListItem {
  id: number;
  name: string;
  phone: string;
  birthday: Date;
  records: Record[];

  /**
   * Constructor
   */
  constructor(id: number, name: string, phone: string, birthday: Date) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.birthday = birthday;
    this.records = [];
  }
}
