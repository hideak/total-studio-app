import SortableListItem from './interface/sortable-list-item.interface';

/**
 * Class that represents the a service that were provided to a client
 */
export default class ServiceEntry implements SortableListItem {
  id: number;
  name: string;
  price: number;

  /**
   * Constructor
   */
  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
