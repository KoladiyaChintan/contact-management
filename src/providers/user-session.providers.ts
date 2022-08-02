import { UserSession } from '../entities/user-session.entity';

export const UserSessionProvider = [
  {
    provide: 'USER_SESSION_REPOSITORY',
    useValue: UserSession,
  },
];
