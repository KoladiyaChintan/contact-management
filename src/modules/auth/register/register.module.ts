import { Module } from '@nestjs/common';
import { UserService } from './register.service';
import { UserController } from './register.controller';
import { UserRegisterProvider } from 'src/providers/user-registration.providers';

@Module({
  providers: [UserService, ...UserRegisterProvider],
  controllers: [UserController],
})
export class UserModule {}
