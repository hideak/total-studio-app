/**
 * A DTO that represents a request to create a record
 */
export default class RecordCreate {
  clientId: number;
  service: string;
  date: Date | null;
  time: string;
  details: string;

  /**
   * Constructor
   */
  constructor(
    clientId: number,
    service: string,
    date: Date | null,
    time: string,
    details: string
  ) {
    this.clientId = clientId;
    this.service = service;
    this.date = date;
    this.time = time;
    this.details = details;
  }
}
