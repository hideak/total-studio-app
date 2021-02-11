import Service from './service.model';

/**
 * Class that represents the record of a service
 */
export default class Record {
  date: Date;
  service: Service;
  details: string;

  /**
   * Constructor
   */
  constructor(date: Date, service: Service, details: string) {
    this.date = date;
    this.service = service;
    this.details = details;
  }
}
