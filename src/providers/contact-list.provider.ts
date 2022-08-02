import { ContactList } from '../entities/contact-list.entity';

export const ContactListProvider = [
  {
    provide: 'CONTACT_LIST_REPOSITORY',
    useValue: ContactList,
  },
];
