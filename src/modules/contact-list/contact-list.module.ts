import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { ContactListController } from './contact-list.controller';
import { ContactListProvider } from '../../providers/contact-list.provider';
import { JwtHelper } from '../../utils/jwt.helper';
import { UserRegisterProvider } from '../../providers/user-registration.providers';

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
