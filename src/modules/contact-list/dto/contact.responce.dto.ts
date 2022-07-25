export class ContactResponceDto {
  id?: string;
  userid?: string;
  name: string;
  email: string;
  phonenumber: string;
}
export class AddcontactResponce extends ContactResponceDto {
  readonly contact_List?: string[];
}
