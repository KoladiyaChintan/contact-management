import { ContactList } from 'src/entities/contact-list.entity';

export class UpdateContactResponseDto {
  readonly name: string;
  readonly email: string;
  readonly phonenumber: string;

  constructor(contactList: ContactList) {
    this.name = contactList.name;
    this.email = contactList.email;
    this.phonenumber = contactList.phonenumber;
  }
}
