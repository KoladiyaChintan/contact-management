import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../dispatcher/transform.interceptor';
import { SuccessResponse } from '../../../interfaces/responce.interface';
import { LoginDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginService } from './login.service';

@Controller()
@ApiTags('User')
@UseInterceptors(TransformInterceptor)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async Login(
    @Body() loginDto: LoginDto,
  ): Promise<SuccessResponse<LoginResponseDto>> {
    const data = await this.loginService.Login(loginDto);
    return { data, message: 'Login successfull' };
  }
}
