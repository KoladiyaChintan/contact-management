import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRegister } from '../../../entities/create-user.entity';
import { UserSession } from '../../../entities/user-session.entity';
import { JwtTokenInterface } from '../../../interfaces/jwt.token.interface';
import { JwtHelper } from '../../../utils/jwt.helper';
import { LoginDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject('USER_REGISTRATION_REPOSITORY')
    private readonly USER_REGISTRATION_REPOSITORY: typeof UserRegister,
    @Inject('USER_SESSION_REPOSITORY')
    private readonly USER_SESSION_REPOSITORY: typeof UserSession,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async Login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const email = loginDto.email.toLowerCase();
    const user = await this.USER_REGISTRATION_REPOSITORY.findOne({
      where: { email },
      raw: true,
    });

    if (user.is_verified == false) {
      throw new BadRequestException('PLEASE VERIFIED USER');
    }

    // console.log(user);
    if (!user) {
      throw new BadRequestException('your email is incorrect . try again');
    }

    const tokenDto: JwtTokenInterface = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    try {
      if (await bcrypt.compare(loginDto.password, user.password)) {
        const token = await this.jwtHelper.generateToken(tokenDto);

        await this.USER_SESSION_REPOSITORY.create({
          userid: user.id,
          email: user.email,
          jwttoken: token,
        });
        return { token };
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new BadRequestException('password incorrect . try again');
    }
  }
}
