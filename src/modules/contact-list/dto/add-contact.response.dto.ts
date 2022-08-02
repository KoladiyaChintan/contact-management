import { ContactList } from '../../../entities/contact-list.entity';

export class AddContactResponseDto {
  readonly id?: string;
  readonly userid?: string;
  readonly name: string;
  readonly email: string;
  readonly phonenumber: string;

  constructor(contactList: ContactList) {
    this.id = contactList.id;
    this.userid = contactList.userid;
    this.name = contactList.name;
    this.email = contactList.email;
    this.phonenumber = contactList.phonenumber;
  }
}
