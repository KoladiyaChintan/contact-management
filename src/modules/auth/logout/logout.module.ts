import { Module } from '@nestjs/common';
import { UserSessionProvider } from '../../../providers/user-session.providers';
import { JwtHelper } from '../../../utils/jwt.helper';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService, JwtHelper, ...UserSessionProvider],
})
export class LogoutModule {}
