import ServiceEntry from './service-entry.model';

/**
 * Class that represents the record of a service
 */
export default class Record {
  id: number;
  clientId: number;
  services: ServiceEntry[];
  date: Date | null;
  time: string;
  details: string;

  /**
   * Constructor
   */
  constructor(
    id: number,
    clientId: number,
    services: ServiceEntry[],
    date: Date | null,
    time: string,
    details: string
  ) {
    this.id = id;
    this.clientId = clientId;
    this.services = services;
    this.date = date;
    this.time = time;
    this.details = details;
  }
}
