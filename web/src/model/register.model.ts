import Service from './service.model';

/**
 * Class that represents the registration of a service
 */
export default class Register {
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
