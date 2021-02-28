import SortableListItem from './interface/sortable-list-item.interface';

/**
 * Class that represents a client
 */
export default class Client implements SortableListItem {
  id: number;
  name: string;
  phone: string;
  birthday: Date | null;
  additionalInfo: string;

  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    phone: string,
    birthday: Date | null,
    additionalInfo: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.birthday = birthday;
    this.additionalInfo = additionalInfo;
  }
}
