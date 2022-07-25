import { UserRegister } from 'src/entities/create-user.entity';

export const UserRegisterProvider = [
  {
    provide: 'USER_REGISTRATION_REPOSITORY',
    useValue: UserRegister,
  },
];
