import { Module } from '@nestjs/common';
import { UserService } from './register.service';
import { UserController } from './register.controller';
import { UserRegisterProvider } from 'src/providers/user-registration.providers';
import { SendGridService } from 'src/lid/sendgrid';
import { UserVerifyProvider } from 'src/providers/user-verify.provider';

@Module({
  providers: [
    UserService,
    SendGridService,
    ...UserRegisterProvider,
    ...UserVerifyProvider,
  ],
  controllers: [UserController],
})
export class UserModule {}
