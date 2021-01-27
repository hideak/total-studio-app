import SortableListItem from './interface/sortable-list-item.interface';

/**
 * Class that represents the a service provided
 */
export default class Service implements SortableListItem {
  id: number;
  name: string;
  details: string;

  /**
   * Constructor
   */
  constructor(id: number, name: string, details: string) {
    this.id = id;
    this.name = name;
    this.details = details;
  }
}
