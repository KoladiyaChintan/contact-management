import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../dispatcher/transform.interceptor';
import { SuccessResponse } from '../../../interfaces/responce.interface';
import { RegisterUserDto } from './dto/user-register.request.dto';
import { UserRegisterResponseDto } from './dto/user-register.response.dto';
import { UserService } from './register.service';

@Controller()
@ApiTags('User')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user-register')
  async RegisterUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<SuccessResponse<UserRegisterResponseDto>> {
    const user = await this.userService.RegisterUser(registerUserDto);
    return { data: user, message: 'User Created' };
  }

  @Post('verify-user/:token')
  async verifyUser(
    @Param('token') token: string,
  ): Promise<SuccessResponse<any>> {
    const verify = await this.userService.verify(token);
    return verify;
  }
}
