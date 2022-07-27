import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRegister } from 'src/entities/create-user.entity';
import { RegisterUserDto } from './dto/user-register.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRegisterResponseDto } from './dto/user-register.response.dto';
import { SendGridService } from 'src/lid/sendgrid';
import { UserVerify } from 'src/entities/user-verify.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REGISTRATION_REPOSITORY')
    private readonly USER_REGISTRATION_REPOSITORY: typeof UserRegister,
    @Inject('USER_VERIFY_REPOSITORY')
    private readonly USER_VERIFY_REPOSITORY: typeof UserVerify,
    private readonly sendgridService: SendGridService,
  ) {}

  async RegisterUser(
    registerUserDto: RegisterUserDto,
  ): Promise<UserRegisterResponseDto> {
    const email = registerUserDto.email.toLowerCase();
    const user = await this.USER_REGISTRATION_REPOSITORY.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException('ACCOUNT ALREADY EXISTS');
    }

    try {
      const salt = 10;
      const hashedpassword = await bcrypt.hash(registerUserDto.password, salt);
      const createdUser = await this.USER_REGISTRATION_REPOSITORY.create(
        {
          name: registerUserDto.name,
          email: registerUserDto.email.toLowerCase(),
          password: hashedpassword,
        },
        {
          returning: true,
        },
      );

      await this.sendgridService.sendVerifyUserMail({
        userid: createdUser.id,
        email: email,
      });

      return createdUser;
    } catch (error) {
      return error;
    }
  }

  async verify(token: string) {
    const findUserToken = await this.USER_VERIFY_REPOSITORY.findOne({
      where: {
        randomtoken: token,
      },
    });

    if (findUserToken && findUserToken.randomtoken == token) {
      const verifyuser = await this.USER_REGISTRATION_REPOSITORY.update(
        {
          is_verified: true,
        },
        {
          where: { id: findUserToken.userid },
        },
      );
      console.log(verifyuser);
      return [];
    } else {
      throw new BadRequestException('USER NOT VERIFIED');
    }
  }
}
