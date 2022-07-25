import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ContactList } from 'src/entities/contact-list.entity';
import { ContactListDto } from './dto/contact-list.dto';
import { UserRegister } from 'src/entities/create-user.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { AddcontactResponce } from './dto/contact.responce.dto';

@Injectable()
export class ContactListService {
  constructor(
    @Inject('CONTACT_LIST_REPOSITORY')
    private readonly CONTACT_LIST_REPOSITORY: typeof ContactList,
    @Inject('USER_REGISTRATION_REPOSITORY')
    private readonly USER_REGISTRATION_REPOSITORY: typeof UserRegister,
  ) {}

  async create(
    tokenDto: JwtTokenInterface,
    contactListDto: ContactListDto,
  ): Promise<AddcontactResponce> {
    const find = await this.CONTACT_LIST_REPOSITORY.findOne({
      where: { id: tokenDto.id },
    });

    if (find && find.phonenumber == contactListDto.phonenumber) {
      throw new ConflictException('Phonenumber Already Exists');
    }

    const get = await this.CONTACT_LIST_REPOSITORY.create({
      userid: tokenDto.id,
      name: contactListDto.name,
      email: contactListDto.email,
      phonenumber: contactListDto.phonenumber,
    });
    try {
      if (get) {
        return get;
      }
    } catch (err) {
      return err;
    }
  }

  async getall(tokenDto: JwtTokenInterface): Promise<any> {
    const get = await this.USER_REGISTRATION_REPOSITORY.findOne({
      where: { id: tokenDto.id },
      attributes: ['name', 'email'],
      include: [
        {
          model: ContactList,
          attributes: ['id', 'name', 'email', 'phonenumber'],
        },
      ],
    });
    // console.log(get);
    return { get };
  }

  async update(id: string, contactListDto: ContactListDto): Promise<any> {
    const get = await this.CONTACT_LIST_REPOSITORY.update(contactListDto, {
      where: { id },
    });
    return { get };
  }

  async delete(id: string): Promise<any> {
    const get = await this.CONTACT_LIST_REPOSITORY.destroy({ where: { id } });
    return { get };
  }
}
