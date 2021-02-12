import Service from './service.model';

/**
 * Class that represents the record of a service
 */
export default class Record {
  id: number;
  date: Date;
  service: Service;
  details: string;

  /**
   * Constructor
   */
  constructor(id: number, date: Date, service: Service, details: string) {
    this.id = id;
    this.date = date;
    this.service = service;
    this.details = details;
  }
}
