import { UserVerify } from 'src/entities/user-verify.entity';

export const UserVerifyProvider = [
  {
    provide: 'USER_VERIFY_REPOSITORY',
    useValue: UserVerify,
  },
];
