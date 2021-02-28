/**
 * Class that represents the record of a service
 */
export default class Record {
  id: number;
  clientId: number;
  service: string;
  date: Date | null;
  time: string;
  details: string;

  /**
   * Constructor
   */
  constructor(
    id: number,
    clientId: number,
    service: string,
    date: Date | null,
    time: string,
    details: string
  ) {
    this.id = id;
    this.clientId = clientId;
    this.service = service;
    this.date = date;
    this.time = time;
    this.details = details;
  }
}
