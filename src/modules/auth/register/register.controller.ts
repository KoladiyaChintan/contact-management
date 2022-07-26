import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatcher/transform.interceptor';
import { SuccessResponse } from 'src/interfaces/responce.interface';
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
    console.log(user);
    return { data: user, message: 'User Created' };
  }
}
