import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRegister } from 'src/entities/create-user.entity';
import { RegisterUserDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { SuccessResponse } from 'src/interfaces/responce.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REGISTRATION_REPOSITORY')
    private readonly USER_REGISTRATION_REPOSITORY: typeof UserRegister,
  ) {}

  async RegisterUser(
    registerUserDto: RegisterUserDto,
  ): Promise<SuccessResponse<RegisterUserDto>> {
    const email = registerUserDto.email;

    const user = await this.USER_REGISTRATION_REPOSITORY.findOne({
      attributes: ['email'],
      where: { email },
    });

    if (user) {
      throw new ConflictException('ACCOUNT ALREADY EXISTS');
    }

    if (user) {
      const salt = 10;
      const hashedpassword = await bcrypt.hash(registerUserDto.password, salt);

      try {
        const createdUser = await this.USER_REGISTRATION_REPOSITORY.create({
          name: registerUserDto.name,
          email: registerUserDto.email.toLowerCase(),
          password: hashedpassword,
        });

        return { data: createdUser };
      } catch (error) {
        return error;
      }
    }
  }
}
