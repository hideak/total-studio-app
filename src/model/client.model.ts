import SortableListItem from './interface/sortable-list-item.interface';
import Register from './register.model';

/**
 * Class that represents a client
 */
export default class Client implements SortableListItem {
  id: number;
  name: string;
  phone: string;
  birthday: Date;
  registers: Register[];

  /**
   * Constructor
   */
  constructor(id: number, name: string, phone: string, birthday: Date) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.birthday = birthday;
    this.registers = [];
  }
}
