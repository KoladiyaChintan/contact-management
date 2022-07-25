import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserSessionProvider } from 'src/providers/user-session.providers';
import { UserRegisterProvider } from 'src/providers/user-registration.providers';
import { JwtHelper } from 'src/utils/jwt.helper';

@Module({
  providers: [
    LoginService,
    JwtHelper,
    ...UserSessionProvider,
    ...UserRegisterProvider,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
