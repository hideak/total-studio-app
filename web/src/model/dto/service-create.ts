/**
 * A DTO that represents a request to create a service
 */
export default class ServiceCreate {
  name: string;
  details: string;

  /**
   * Constructor
   */
  constructor(name: string, details: string) {
    this.name = name;
    this.details = details;
  }
}
