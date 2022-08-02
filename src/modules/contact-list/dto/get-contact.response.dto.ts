import { ContactList } from '../../../entities/contact-list.entity';
import { UserRegister } from '../../../entities/create-user.entity';

export class GetContactResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly contactlist: ContactResponseDto[];

  constructor(user: UserRegister) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.contactlist = user.contactlist;
    // ? user.contactlist.map((i) => new ContactResponceDto(i))
    // : null;
  }
}

export class ContactResponseDto {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly phonenumber: string;

  constructor(contactList: ContactList) {
    this.id = contactList.id;
    this.name = contactList.name;
    this.email = contactList.email;
    this.phonenumber = contactList.phonenumber;
  }
}
