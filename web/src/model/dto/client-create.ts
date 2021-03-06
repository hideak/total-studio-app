/**
 * A DTO that represents a request to create a client
 */
export default class ClientCreate {
  name: string;
  phone: string;
  address: string;
  birthday: Date | null;
  additionalInfo: string;

  /**
   * Constructor
   */
  constructor(
    name: string,
    phone: string,
    address: string,
    birthday: Date | null,
    additionalInfo: string
  ) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
    this.additionalInfo = additionalInfo;
  }
}
