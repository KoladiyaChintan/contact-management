import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/auth/register/register.module';
import * as dotenv from 'dotenv';
import { LoginModule } from './modules/auth/login/login.module';
import { ContactListModule } from './modules/contact-list/contact-list.module';
import { LogoutModule } from './modules/auth/logout/logout.module';

dotenv.config();
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    LoginModule,
    ContactListModule,
    LogoutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
