import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../dispatcher/transform.interceptor';
import { SuccessResponse } from '../../../interfaces/responce.interface';
import { JwtHelper } from '../../../utils/jwt.helper';
import { LogoutService } from './logout.service';

@Controller()
@ApiTags('User')
@ApiBasicAuth()
@UseInterceptors(TransformInterceptor)
export class LogoutController {
  constructor(
    private readonly logoutService: LogoutService,
    private readonly jwtToken: JwtHelper,
  ) {}

  @Post('/logout')
  async Logout(@Req() request: any): Promise<SuccessResponse<[]>> {
    const token = this.jwtToken.getTokenFromHeader(request);
    await this.logoutService.logout(token);
    return { data: [], message: 'Logged out successfully' };
  }
}
