import { Body, Controller, Post } from '@nestjs/common';
import { SuccessResponse } from 'src/interfaces/responce.interface';
import { RegisterUserDto } from './dto/user-register.dto';
import { UserService } from './user-register.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user-register')
  async RegisterUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<SuccessResponse<RegisterUserDto>> {
    const user = await this.userService.RegisterUser(registerUserDto);
    return user;
  }
}
