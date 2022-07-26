import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRegister } from 'src/entities/create-user.entity';
import { RegisterUserDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserRegisterResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REGISTRATION_REPOSITORY')
    private readonly USER_REGISTRATION_REPOSITORY: typeof UserRegister,
  ) {}

  async RegisterUser(
    registerUserDto: RegisterUserDto,
  ): Promise<UserRegisterResponseDto> {
    const email = registerUserDto.email;
    console.log('email', email);
    const user = await this.USER_REGISTRATION_REPOSITORY.findOne({
      // attributes: ['email'],
      where: { email },
    });

    console.log('aaa', user);
    if (user) {
      throw new ConflictException('ACCOUNT ALREADY EXISTS');
    }

    try {
      const salt = 10;
      const hashedpassword = await bcrypt.hash(registerUserDto.password, salt);
      const createdUser = await this.USER_REGISTRATION_REPOSITORY.create({
        name: registerUserDto.name,
        email: registerUserDto.email.toLowerCase(),
        password: hashedpassword,
      });

      return createdUser;
    } catch (error) {
      return error;
    }
  }
}
