import { UserSession } from 'src/entities/user-session.entity';

export const UserSessionProvider = [
  {
    provide: 'USER_SESSION_REPOSITORY',
    useValue: UserSession,
  },
];
