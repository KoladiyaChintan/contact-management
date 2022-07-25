import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { ContactListController } from './contact-list.controller';
import { ContactListProvider } from 'src/providers/contact-list.provider';
import { UserRegisterProvider } from 'src/providers/user-registration.providers';
import { JwtHelper } from 'src/utils/jwt.helper';

@Module({
  providers: [
    ContactListService,
    JwtHelper,
    ...ContactListProvider,
    ...UserRegisterProvider,
  ],
  controllers: [ContactListController],
})
export class ContactListModule {}
