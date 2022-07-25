import { Body, Controller, Post } from '@nestjs/common';
import { SuccessResponse } from 'src/interfaces/responce.interface';
import { LoginDto } from './dto/login.request.dto';
import { LoginResponceDto } from './dto/login.responce.dto';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async Login(
    @Body() loginDto: LoginDto,
  ): Promise<SuccessResponse<LoginResponceDto>> {
    const data = await this.loginService.Login(loginDto);
    return { data };
  }
}
