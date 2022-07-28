import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ContactList } from 'src/entities/contact-list.entity';
import { ContactListDto } from './dto/add-contact-list.request.dto';
import { UserRegister } from 'src/entities/create-user.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { AddContactResponseDto } from './dto/add-contact.response.dto';
import { GetContactResponseDto } from './dto/get-contact.response.dto';
import { UpdateContactResponseDto } from './dto/update-contact.response.dto';
import { UpdateContactRequestDto } from './dto/update-contact.request.dto';

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
  ): Promise<AddContactResponseDto> {
    const data = await this.CONTACT_LIST_REPOSITORY.create({
      userid: tokenDto.id,
      name: contactListDto.name,
      email: contactListDto.email,
      phonenumber: contactListDto.phonenumber,
    });
    return new AddContactResponseDto(data);
  }

  async getall(tokenDto: JwtTokenInterface): Promise<GetContactResponseDto> {
    const data = await this.USER_REGISTRATION_REPOSITORY.findOne({
      where: { id: tokenDto.id },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: ContactList,
          attributes: ['id', 'name', 'email', 'phonenumber'],
        },
      ],
    });
    return new GetContactResponseDto(data);
  }

  async update(
    contactid: string,
    tokenDto: JwtTokenInterface,
    updateContactDto: UpdateContactRequestDto,
  ): Promise<UpdateContactResponseDto> {
    const find = await this.CONTACT_LIST_REPOSITORY.findOne({
      where: { userid: tokenDto.id, id: contactid },
    });
    if (!find) {
      throw new BadRequestException(
        'YOU ARE NOT ABLE TO CHANGE THIS CONTACT NUMBER',
      );
    }
    await this.CONTACT_LIST_REPOSITORY.update(updateContactDto, {
      where: { id: contactid },
    });

    const updateduser = await this.CONTACT_LIST_REPOSITORY.findOne({
      where: { id: contactid },
    });
    return new UpdateContactResponseDto(updateduser);
  }

  async delete(id: string): Promise<any> {
    const get = await this.CONTACT_LIST_REPOSITORY.destroy({
      where: { id },
    });
    return { get };
  }
}
