/**
 * Class that represents the record of a service
 */
export default class Record {
  id: number;
  clientId: number;
  date: Date;
  service: string;
  details: string;

  /**
   * Constructor
   */
  constructor(id: number, clientId: number, date: Date, service: string, details: string) {
    this.id = id;
    this.clientId = clientId;
    this.date = date;
    this.service = service;
    this.details = details;
  }
}
