import ServiceEntry from '../service-entry.model';

/**
 * A DTO that represents a request to create a record
 */
export default class RecordCreate {
  clientId: number;
  services: ServiceEntry[];
  date: Date | null;
  time: string;
  details: string;

  /**
   * Constructor
   */
  constructor(
    clientId: number,
    services: ServiceEntry[],
    date: Date | null,
    time: string,
    details: string
  ) {
    this.clientId = clientId;
    this.services = services;
    this.date = date;
    this.time = time;
    this.details = details;
  }
}
