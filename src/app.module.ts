import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user-register.module';
import * as dotenv from 'dotenv';
import { LoginModule } from './modules/auth/login/login.module';
import { ContactListModule } from './modules/contact-list/contact-list.module';

dotenv.config();
@Module({
  imports: [DatabaseModule, UserModule, LoginModule, ContactListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
